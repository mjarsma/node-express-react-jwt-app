var teamService = require("../routes/routes");
var dispatcher = require("../dispatcher/dispatcher");

function TeamsStore() {
    var listeners = [];

    function getTeams(){
        teamService().getTeams().then(function(res){
            cb(res);
        });
    }

    function onChange(listener) {
        getTeams(listeners);
        listeners.push(listener);
    }

    function addTeam(team) {
        teamService.addTeam(team).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

    function deleteTeam(team) {
        teamService.deleteTeam(team).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

    function triggerListeners(){
        getTeams(function(res){
            listeners.forEach(function(listener){
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "team") {
            switch (split[1]) {
                case "addTeam":
                    addTeam(payload.team);
                    break;
                case "deleteTeam":
                    deleteTeam(payload.team);
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = TeamsStore();
