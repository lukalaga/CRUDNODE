const mongose = require('mongoose');

mongose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeded')
    }
    else {
        console.log('Error in DB Connection:' + err)
    }

});

require('./employee.model');