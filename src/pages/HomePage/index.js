var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var ReactTable = require('react-table');

// If you are going to be using stores, be sure to first load in the `Fluxxor`
// module.
//
//     var Fluxxor = require('Fluxxor');
//
// If you want to leverage the use of stores, a suggestion would be to
// initialize an object, and set it to a `stores` variable, and adding a new
// instance of the store as a property to the object, like so:
//
//     var stores = {
//       SomeStore: new SomeStore()
//     };
//
// And also, because we are using the Flux architecture, you may also initialize
// an object full of methods that represent "actions" that will be called upon
// by a "dispatcher", like so:
//
//     var actions = {
//       doSomething: function (info) {
//         this.dispatch('DO_SOMETHING', {info: info});
//       }
//     };
//
// And finally, you would pass the stores and actions to our dispatcher, like
// so:
//
//     var flux = new Fluxxor.Flux(stores, actions);
//
// And, then, you would pass in the reference of your dispatcher to the view
// relies on the dispatcher (that view is returned by the `render` method), like
// so:
//
//     <SomeView flux={flux} />

module.exports = React.createClass({
  render: function () {
    return (
      <div className='home-page'>
        <Header />
        <Highscores />
        <Updated />
      </div>
    );
  }

});

var Header = React.createClass({
  render: function () {
    return (
      <div className='header'>
        <Headline />
        <Tagline />
      </div>
    );
  }
});

var Headline = React.createClass({
  render: function () {
    return (
      <h1>The Job Application Leaderboard</h1>
    );
  }
});

var Tagline = React.createClass({
  render: function () {
    return (
      <h2><em>It&rsquo;s a numbers game, keep applying!</em></h2>
    );
  }
});

var data = [
  {name: 'David Ernst', cohort: 'HR23', lastDay: 0, lastWeek: 0, lastMonth: 1, total: 1},
  {name: 'Jake Obron', cohort: 'HR22', lastDay: 0, lastWeek: 0, lastMonth: 1, total: 1},
  {name: 'Kiran Rao', cohort: 'HR23', lastDay: 5, lastWeek: 11, lastMonth: 30, total: 30},
  {name: 'Neil Lokare', cohort: 'HR23', lastDay: 0, lastWeek: 4, lastMonth: 13, total: 13},
  {name: 'Steven Williams', cohort: 'HR23', lastDay: 4, lastWeek: 18, lastMonth: 45, total: 45},
  {name: 'Matt Conrad', cohort: 'HR23', lastDay: 3, lastWeek: 20, lastMonth: 31, total: 31}
];

var Highscores = React.createClass({
  render: function () {
    return (
      <Paper zDepth={3}>
        <ReactTable data={data} />
      </Paper>
    );
  }
});

var Updated = React.createClass({
  render: function () {
    return (
      <p className='updated'>Data last updated: Friday March 27, 2015, 3:16pm PST</p>
    );
  }
});
