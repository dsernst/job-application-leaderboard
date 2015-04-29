require('dotenv').load();
var Asana = require('asana');
var _ = require('lodash');
var request = require('request');
var ASANA_KEY = process.env.ASANA_API_KEY;
var asana = Asana.Client.create().useBasicAuth(ASANA_KEY);
var Promise = require('bluebird');

function getAsanaProjectsByTeamName(teamName) {
  asana.workspaces.findAll()
    .then(function (workspaces) {
      return workspaces.data;
    })
    .filter(function (workspace) {
      // find the 'Hack Reactor' org workspace
      return workspace.name === process.env.ORG_NAME;
    })
    .then(function (workspace) {
      return asana.teams.findByOrganization(workspace[0].id);
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
        return team.name === teamName;
      })[0];
    })
    .then(function (team) {
      console.log('team:  ', team);
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
}
// getAsanaProjectsByTeamName(process.env.MARCH);



var march2015students = require('./march2015students.js');
var sample = march2015students.projects[47];

// console.log(sample);

function getAllTasksByProjectId(id, debug) {
  return new Promise(function (resolve, reject) {
    var all = [];
    (function getAPageOfTasks(offset) {
      asana.tasks.findByProject(id, {offset: offset})
        .then(function (data) {
          if (debug) {
            console.log(data);
          }
          return data;
        })
        .then(function (tasks) {
          [].push.apply(all, tasks.data);
          if (tasks.next_page) {
            getAPageOfTasks(tasks.next_page.offset);
          } else {
            resolve(all);
          }
        })
        .catch(reject);
    }());
  });
}


// Parse through the list of tasks to sum up the number of companies applied to
var listOfCountable = ['Graveyard', 'Applied', 'Phone Screen Scheduled', 'Phone Screen Completed', 'Technical Screen Scheduled', 'Technical Screen Completed', 'Coding Challenge Received', 'Coding Challenge Completed', 'On-site Interview Scheduled', 'On-side Interview Completed', 'Offers'];
function countApplied(tasks) {
  var inAppliedSection = false;
  return tasks.reduce(function countApplied(memo, item) {
    if (item.name.slice(-1) === ':') {
      // we're in a section header. check if it is one of the ones above that we want to count
      inAppliedSection = _.contains(listOfCountable, item.name.slice(0, item.name.length - 1));
    } else {
      if (inAppliedSection) {
        // don't count empty names (why doesn't anyone know how to use Asana?)
        if (item.name) {
          memo++;
        }
      }
    }
    return memo;
  }, 0);
}



function countAllStudentsApplied(students) {
  // map each student onto a promise
  var studentApplicationCountsPromises = students.projects.map(function (student) {
    return getAllTasksByProjectId(student.id)
      .then(countApplied)
      .then(function (count) {
        console.log(student.asanaName, ':', count);
        return count;
      });
  });


  // do promise.all on the entire array of Student Promises
    // will return an array all the projects
  return Promise.all(studentApplicationCountsPromises)
    .then(function (studentApplicationCounts) {
      return students.projects.reduce(function (memo, student, i) {
        memo[student.asanaName] = studentApplicationCounts[i];
        return memo;
      }, {});
    });


  // return something like this:
  // {
  //  'David Ernst': 16,
  //  'Tess Myers': 10,
  // }

}

countAllStudentsApplied(march2015students)
  .tap(console.log)
  .catch(console.log.bind(console));
