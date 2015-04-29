require('dotenv').load();
var Asana = require('asana');
var _ = require('lodash');
var request = require('request');
var ASANA_KEY = process.env.ASANA_API_KEY;
var asana = Asana.Client.create().useBasicAuth(process.env.ASANA_API_KEY);


var reactorSpace;

asana.workspaces.findAll()
  .then(function (workspaces) {
    return workspaces.data;
  })
  .filter(function (workspace) {
    // find the 'Hack Reactor' org workspace
    return workspace.name === 'Reactor Education Group';
  })
  .then(function (workspace) {
    reactorSpace = workspace[0];
    return asana.teams.findByOrganization(reactorSpace.id);
  })
  // .then(function (teams) {
  //   // find all 'JOB SEARCH' teams
  //   return teams.data.filter(function (team) {
  //     return team.name.toLowerCase().indexOf('job search') >= 0;
  //   });
  // })
  .then(function (teams) {
    // find the team for March 2015 Job Searchers
    return teams.data.filter(function (team) {
      return team.name === 'HR - MAR 2015 JOB SEARCH TRACKING';
    })[0];
  })
  .then(function (team) {
    // We need to use request() here because the node-asana library doesn't support querying projects by team
    var response = '';
    request.get('https://app.asana.com/api/1.0/teams/' + team.id + '/projects')
      .auth(ASANA_KEY)
      .on('data', function (data) {
        response += data;
      })
      .on('end', function () {
        console.log(JSON.parse(response));
      });
  });



// For each relevant project:


  // GET all the tasks in the project:
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



// Parse through the list of tasks to sum up the number of companies applied to

// Graveyard
// Applied
// Phone Screen Scheduled
// Phone Screen Completed
// Technical Screen Scheduled
// Technical Screen Completed
// Coding Challenge Received
// Coding Challenge Completed
// On-site Interview Scheduled
// On-side Interview Completed
// Offers

var inAppliedSection = false;
// tasks.reduce(function countApplied(memo, item) {
//   if (item.name.slice(-1) === ':') {
//     // we're in a section header. check if it is one of the ones above that we want to count
//     inAppliedSection = listOfCountable.contains(item.name);
//   } else {
//     if (inAppliedSection) {
//       memo++;
//     }
//   }

//   return memo;
// }, 0);
