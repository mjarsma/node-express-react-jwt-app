var dispatcher = require("../dispatcher/dispatcher");

module.exports = {
    addTeam:function(team){
        dispatcher.dispatch({
            team:team,
            type:"team:addTeam"
        });
    },
    deleteTeam:function(team){
        dispatcher.dispatch({
            team:team,
            type:"team:deleteTeam"
        });
    }
}
