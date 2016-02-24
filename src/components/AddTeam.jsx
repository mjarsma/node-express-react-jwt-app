var React = require('react');
var actions = require("../actions/TeamActions");

module.exports = React.createClass({
    getInitialState:function(){
        return {
            name:""
        }
    },
    addTeam:function(e){
        e.preventDefault();
        actions.addTeam(this.state);
    },
    handleInputChange:function(e){
        e.preventDefault();
        var name = e.target.name;
        var state = this.state;
        state[name] = e.target.value;
        this.setState(state);
    },
    render:function(){
        return(
            <form className="form" onSubmit={this.addTeam}>
                <div className="form-group">
                    <label className="control-label" htmlFor="name">Team Name:</label>
                    <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Team Name" />
                </div>
                <div className="form-group">
                    <button className="btn" type="submit">Add Team</button>
                </div>
            </form>
        )
    }
});
