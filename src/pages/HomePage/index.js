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
      <h2><em>It's a Numbers Game</em></h2>
    );
  }
});

var data = [
  {name: 'David Ernst', cohort: 'HR23', total: 1, lastDay: 0, last7: 0, last30: 1},
  {name: 'Jake Obron', cohort: 'HR22', total: 1, lastDay: 0, last7: 0, last30: 1}
  {name: 'Kiran Rao', cohort: 'HR23', total: 30, lastDay: 5, last7: 11, last30: 30},
  {name: 'Neil Lokare', cohort: 'HR23', total: 13, lastDay: 0, last7: 4, last30: 13},
  {name: 'Steven Williams', cohort: 'HR23', total: 45, lastDay: 4, last7: 18, last30: 45},
];

var Highscores = React.createClass({
  render: function () {
    return (
      <Paper zDepth={2}>
        <ReactTable data={data} />
      </Paper>
    );
  }
});
