var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var playerSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name:       String,
    position:   String,
    team:       String,
    gm :        Number,
    salary:     Number,
    season:     Number,
    age:        Number,
    "G":        Number,
    "A":        Number,
    "P":        Number,
    "G60":      Number,
    "A60":      Number,
    "P60":      Number,
    "PenD":     Number,
    "CF%":      Number,
    "PDO":      Number,
    "PSh%":     Number,
    "ZSO%Rel":  Number,
    "TOI/gm":   Number
});

var Player = mongoose.model('Player', playerSchema);
module.exports = Player;
