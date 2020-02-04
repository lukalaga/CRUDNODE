const mongose = require('mongoose');

var employeeSchema = new mongose.Schema({
    fullname: {
        type: String,
        required:'Full Name Required'
    },
    email: {
        type: String,
        required:'Email Required'
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    }
});

mongose.model('Employee', employeeSchema);
