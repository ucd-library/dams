const fetch = require('fetch');
const host = 'https://dev.dams.library.ucdavis.edu';
const itemsPerPage = 20;

async function query(page) {
  return fetch(host+'/api/item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text : '',
      filters: {},
      sort:[
        {"@graph.@id":{"order":"asc"}}
      ],
      limit : itemsPerPage,
      offset: page * itemsPerPage
    })
  });
}