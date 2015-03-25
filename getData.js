var request = require('request');
var asanaUrl = 'https://app.asana.com/api/1.0/';
var ASANA_KEY = process.env.ASANA_API_KEY;
var workspaceId = 498346170860;

// GET a list of projects:

request.get(asanaUrl + 'workspaces/' + workspaceId + '/projects').auth(ASANA_KEY, null);

// curl -u API_KEY: https://app.asana.com/api/1.0/workspaces/498346170860/projects

// returns:

// {
//   "data":[
//     {
//       "id":29918323866102,
//       "name":"testing asana API 1"
//     },
//     {
//       "id":29918323866112,
//       "name":"testing asana API 2"
//     }
//   ]
// }


// For each relevant project:


  // GET all the tasks in the project:

  request.get(asanaUrl + 'projects/' + projectId + '/tasks').auth(ASANA_KEY, null);

  // curl -u API_KEY: https://app.asana.com/api/1.0/projects/29918323866112/tasks

  // returns:

  // {
  //   "data":[
  //     {
  //       "id":29918323866114,
  //       "name":"heres a task"
  //     },
  //     {
  //       "id":29918323866116,
  //       "name":"and this task"
  //     },
  //     {
  //       "id":29918323866118,
  //       "name":"hello world"
  //     },
  //     {
  //       "id":29918323866120,
  //       "name":"and another task"
  //     },
  //     {

