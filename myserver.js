var express = require("express");
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// var myLogger = function(req, res, next) {
//     console.log('LOGGED')
//     next()
// }

// app.use(myLogger)









var employees = [
    { Id: 1, Name: "Jayesh", Dept: "IT", Desgn: "Developer" },
    { Id: 2, Name: "Ramesh", Dept: "IT", Desgn: "Developer" },
    { Id: 3, Name: "Ram", Dept: "HR", Desgn: "Manager" },

];

function getAllEmployees() {
    return employees;
}


app.get('/getEmployeeData', function(req, res) {

    let emp = getAllEmployees();
    res.send(emp);

})

function getEmployeeDataById(id) {
    const employee = employees.filter((emp) => {
        return id == emp.Id
    })
    return employee;
}


app.get('/getDataById/:Id', function(req, res) {

    res.send(getEmployeeDataById(req.params.Id));

})

function getEmployeeDataByName(Name) {
    const employee = employees.filter((employee) => {
        return Name == employee.Name;
    })
    return employee;
}



app.get('/getDataByName/:Name', function(req, res) {

    res.send(getEmployeeDataByName(req.params.Name));

})

function insertEmployeeData(emp) {
    employees.push(emp);
}

app.post('/insertEmployeeData', function(req, res) {
    const emp = {
        ID: req.body.Id,
        Name: req.body.Name,
        Dept: req.body.Dept,
        Desgn: req.body.Desgn

    }
    insertEmployeeData(emp);
    res.send("Data Inserted Successfully");
})


function updateEmployeeRecord(emp) {
    employees.filter((employee) => {

        if (emp.Id == employee.Id) {
            employee.Id = emp.Id;
            employee.Name = emp.Name;
            employee.Dept = emp.Dept;
            employee.Desgn = emp.Desgn;
        }
    })

}
app.put('/updateEmployee', function(req, res) {
    const emp = {
        Id: req.body.Id,
        Name: req.body.Name,
        Dept: req.body.Dept,
        Desgn: req.body.Desgn

    }
    updateEmployeeRecord(emp);
    res.send("Record updated successfully")

})

function deleteEmployeeRecord(Id) {
    employees = employees.filter((employee) => employee.Id != Id);


};

app.delete('/deleteEmployee/:Id', function(req, res) {

    deleteEmployeeRecord(req.params.Id);

    res.send("Record Deleted Succesfully")
})






app.post('/login', function(req, res) {
    let name = req.body.name;
    let pwd = req.body.pwd;
    console.log(req.body);
    if (name === "Jayesh" && pwd === "admin") {
        res.send("Valid User");
    } else {
        res.send("Invalid User");
    }
});



app.get('/getAllEmployeeData', function(req, res) {
    res.send([{ Id: 1, Name: "Jayesh", Dept: "IT", Desgn: "Developer" },
        { Id: 2, Name: "Raj", Dept: "HR", Desgn: "Manager" }
    ]);
});

app.post('/totalSalary', function(req, res) {

    let tSalary = Number(req.body.basic) + Number(req.body.HRA) + Number(req.body.DA) - (Number(req.body.IT) + Number(req.body.PF));

    res.send("Total Salary Is  " + tSalary);
})












app.put('/updatestudent', (req, res) => {
    res.send("Student Record Updated");
})




app.delete('/deleteStudent/:id', (req, res) => {
    res.send(`Student Record with ${req.params.id} id deleted`);

})




app.listen(3000, function(req, res) {
    console.log("Server is running at port 3000");
});