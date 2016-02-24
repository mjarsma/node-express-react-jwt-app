var React = require('react');
var ReactDOM = require('react-dom');
var TeamsList = require('./components/TeamsList.jsx');
var teamsStore = require('./stores/teamsStore');
var _teams = [];
var getTeamsCallback = function(teams){
    _teams = teams;
    render();
};

teamsStore.onChange(getTeamsCallback);

function render(){
    ReactDOM.render(<TeamsList teams={_teams} />, document.getElementById('root'));
}
