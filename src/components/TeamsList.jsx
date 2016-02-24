var React = require('react');
var TeamInfo = require('./TeamInfo.jsx');
var AddTeam = require('./AddTeam.jsx');

module.exports = React.createClass({
    render:function(){
        return(
            <div className='row'>
                <div className='col-md-6'>
                    <AddTeam/>
                </div>
                <div className='col-md-6'>
                    {
                        this.props.teams.map(function(s,index){
                            return(
                                <TeamInfo info={s} key={'team'+index} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
});
