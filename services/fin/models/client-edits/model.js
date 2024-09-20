const {dataModels, logger, pg} = require('@ucd-lib/fin-service-utils');
const api = require('@ucd-lib/fin-api');
const {FinDataModel} = dataModels;

class ClientEditsModel extends FinDataModel {

  constructor() {
    // base name for model
    super('client-edits');

    // this.TYPE = 'http://digital.ucdavis.edu/schema#DamsClientEdit';

    this.isRegex = /^(\/application\/ucd-lib-client)?\/(item|collection)\//;

    // the transform service to use for this model.
    this.transformService = 'es-item-transform'
  }

  // you must override this function.  It should return true if the id 
  // to the model.  The fin standard practice is to 
  // bind a model to a root path in the ldp. In this case all `/item` paths
  // would bind to this model.
  is(id, types=[]) {
    return this.isRegex.test(id) ? true : false;
  //  return types.includes(this.TYPE);
  }
  
  async update(json) {
    let id = json['@id'].replace(/^\/application\/ucd-lib-client/, '');

    try {
      if( id.match(/^\/item\//) ) {
        await this.onItemUpdate(id);
      } else if( id.match(/^\/collection\//) ) {
        await this.onCollectionUpdate(id);
      }
    } catch(e) {
      logger.error('Error updating client edit: '+json['@id'], e);
    }
  }

  async onItemUpdate(id) {
    let edit = null;
    let editId = '/application/ucd-lib-client'+id;

    try {
      edit = await this.fetch(editId);
    } catch(e) {
      // no edit found
      return;
    }

    let item = await this.fetch(id);
    let collections = new Set();

    if( item['@graph'] ) {
      item = item['@graph'];
    }
    if( !Array.isArray(item) ) {
      item = [item];
    }

    for( let node of item ) {
      let isPartOf = node['http://schema.org/isPartOf'] || [];
      if( !Array.isArray(isPartOf) ) {
        isPartOf = [isPartOf];
      }

      for( let p of isPartOf ) {
        if( typeof p !== 'string' ) {
          p = p['@id'];
        }

        if( !p.match(/\/fcrepo\/rest\/collection\//) ) {
          continue;
        }

        collections.add(p.split('/fcrepo/rest').pop());
      }
    }

    await pg.query(
      `DELETE FROM dams_edits.edit WHERE edit_id = $1;`, 
      [editId]
    );

    for( let collectionId of collections ) {
      await pg.query(
        `INSERT INTO dams_edits.edit (collection_id, item_id, edit_id, edit)
         VALUES ($1, $2, $3, $4);`, 
        [collectionId, id, editId, JSON.stringify(edit)]
      );
    }
  }

  async onCollectionUpdate(id) {
    let edit = null;
    let editId = '/application/ucd-lib-client'+id;

    try {
      edit = await this.fetch(editId);
    } catch(e) {
      // no edit found
      return;
    }

    await pg.query(
      `DELETE FROM dams_edits.edit WHERE edit_id = $1;`, 
      [editId]
    );

    await pg.query(
      `INSERT INTO dams_edits.edit (collection_id, edit_id, edit)
       VALUES ($1, $2, $3);`, 
      [id, editId, JSON.stringify(edit)]
    );
  }

  async fetch(id) {
    let resp = await api.get({
      path : id,
      headers : {
        'Accept' : 'application/ld+json'
      }
    });
    if( resp.last.statusCode !== 200 ) {
      throw new Error(`Failed to get item for client edit: ${id}`);
    }

    return JSON.parse(resp.last.body);
  }

  async remove(id) {
    if( !id.match(/^\/application\/ucd-lib-client/) ) {
      return;
    }

    await pg.query(
      `DELETE FROM dams_edits.edit WHERE edit_id = $1;`, 
      [id]
    );
  }

  get(id) {
    if( id.match(/^\/item\//) ) {
      return this.getItemEdits(id);
    } else if( id.match(/^\/collection\//) ) {
      return this.getCollectionEdits(id);
    }
    return null;
  }

  async getItemEdits(id) {
    let resp = await pg.query(
      `SELECT * FROM dams_edits.edit WHERE item_id = $1;`, 
      [id]
    );

    let edits = [];
    for( let row of resp.rows ) {
      edits = edits.concat(row.edit);
    }

    return this.cleanEditForApi(id, edits);
  }

  async getCollectionEdits(id) {
    let resp = await pg.query(
      `SELECT * FROM dams_edits.edit WHERE collection_id = $1;`, 
      [id]
    );

    let itemEdits = {};
    let edits = [];

    for( let row of resp.rows ) {
      let arr = row.edit;

      if( row.item_id ) {
        if( !itemEdits[row.item_id] ) {
          itemEdits[row.item_id] = [];
        }
        itemEdits[row.item_id] = itemEdits[row.item_id].concat(arr);
      } else {
        edits = edits.concat(arr);
      }
    }

    for( let prop in itemEdits ) {
      itemEdits[prop] = this.cleanEditForApi(prop, itemEdits[prop]);
    }

    return {
      collection : this.cleanEditForApi(id, edits),
      items : itemEdits
    }
  }

  cleanEditForApi(id, edits, obj={}) {
    let nodes = edits.find(e => e['@id'].split('/fcrepo/rest/application/ucd-lib-client').pop() === id);
    if( !nodes ) return obj;

    if( !Array.isArray(nodes) ) {
      nodes = [nodes];
    }

    for( let edit of nodes ) {
      for( let prop in edit ) {
        if( !(prop.match(/^http:\/\/digital.ucdavis.edu\/schema/) ||
            prop.match(/http:\/\/schema.org/))) continue;

        let propName = prop.replace(/.*(#|\/)/, '');
        if( propName === 'isPartOf' ) continue;

        let v = edit[prop];
        if( !Array.isArray(v) ) {
          v = [v];
        }
        v = v.map(p => this.getValue(p, edits));

        if( v.length === 1 ) {
          obj[propName] = v[0];
        } else {
          obj[propName] = v;
        }
      }
    }

    return obj;
  }

  getValue(prop, edits) {
    if( typeof prop === 'string' ) {
      return prop;
    }
    if( prop['@value'] !== undefined ) {
      return prop['@value'];
    }
    if( prop['@id'] ) {
      let obj = this.cleanEditForApi(prop['@id'].split('/fcrepo/rest/application/ucd-lib-client').pop(), edits);
      if( Object.keys(obj).length === 0 ) {
        return prop;
      }
      return obj;
    }

    return prop;
  }

}

module.exports = new ClientEditsModel();