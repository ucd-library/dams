const {logger, keycloak, config} = require('@ucd-lib/fin-service-utils');
const api = require('@ucd-lib/fin-api');

class WorkflowUtils {

  constructor() {
    this.AUTO_WORKFLOWS = {
      'pdf-image-products' : {
        mimeTypes : ['application/pdf'],
        property : 'images',
        pageSearch : {
          multiPage : true
        }
      },
      'image-products' : {
        mimeTypes : ['image/jpeg', 'image/png', 'image/tiff'],
        property: 'images',
        pageSearch : {
          multiPage : false
        }
      },
      'video-to-stream' : {
        mimeTypes : ['video/mp4', 'video/quicktime'],
        property : 'streamingVideo'
      }
    }
  }

  async autoTriggerWorkflow(node) {
    for( let workflow in this.AUTO_WORKFLOWS ) {
      let def = this.AUTO_WORKFLOWS[workflow];

      if( node.clientMedia && node.clientMedia[def.property] ) continue;
      if( !node.fileFormat ) continue;
      if( !def.mimeTypes.includes(node.fileFormat) ) continue;

      await this._triggerWorkflow(node, workflow);
      break;
    }
  }


  async _triggerWorkflow(node, finWorkflowName) {
    // make sure the workflow has not already run!!
    let response = await api.get({
      path : node['@id']+'/svc:workflow',
      host : config.gateway.host,
      jwt : await keycloak.getServiceAccountToken()
    });

    let hasRunCheck = JSON.parse(response.last.body);
    for( let workflow of hasRunCheck ) {
      if( workflow.name === finWorkflowName ) {
        Logger.error(`Workflow ${finWorkflowName} has already been run on ${node['@id']}. Something is wrong with the item transform!!`);
        return;
      }
    }

    logger.info('Auto triggering '+finWorkflowName+' workflow for '+node['@id']);

    response = await api.post({
      path : node['@id']+'/svc:workflow/'+finWorkflowName,
      host : config.gateway.host,
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({gracefulReload: true}),
      jwt : await keycloak.getServiceAccountToken()
    })

    if( response.last.statusCode >= 400 ) {
      logger.error('Error triggering '+finWorkflowName+' workflow for '+node['@id'], response.last.statusCode, response.last.body);
      throw new Error('Error triggering '+finWorkflowName+' workflow for '+node['@id']+" "+response.last.statusCode+" "+response.last.body)
    }
  }
}

module.exports = new WorkflowUtils();