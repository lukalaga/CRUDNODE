const express = require('express');
var router = express.Router();
const mongose = require('mongoose');
const Employee = mongose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addorEdit", {
        viewTitle: "Insert Employee"
    });
});
//Update and Post operation
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

//filter condition to find corresponding record
//second object with updated details
//last function is a callback function(err,doc)
//if new = true updated records are stored in the doc parameter else err is returned
function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect("employee/list");
        }
        else {
            if (err.fullname == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addorEdit", {
                    viewTitle: "Update Employee",
                    employee: doc
                });
            }
            else
                console.log('Error during Record Update:' + err);
        }
    });
}

function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullname = req.body.fullname;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.fullname == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addorEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during Insertion of record' + err);

        }
    });
}
//Getting Records from Db
router.get('/list', (req, res) => {
    Employee.find((err, docs) => { //docs are all data in mongose
        if (!err) {
            res.render("employee/list", {
                list: docs //returning from list property
            });
        }
        else {
            console.log('Error while retrieveing Employee Records:' + err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullname':
                body['fullnameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;

        }

    }
}

//Editing
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addorEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

//Deleting
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else {
            console.log('Error occured:' + err);
        }
    });
});

module.exports = router;
