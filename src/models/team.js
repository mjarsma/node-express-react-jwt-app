var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var teamSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
});

var Team = mongoose.model('Team', teamSchema);
module.exports = Team;
