require('./Models/db.js');
const st_model = require('./Models/students.js');

async function getStudents() {
    try {
        const students = await st_model.find({});
        console.log(students);
    } catch (err) {
        console.log(err);
    }
}
// getStudents();
async function getdata() {
    try {
        /*const students = await st_model.find({
        "_id": "65c083304564c8622c9e097a"
    });*/
        const students = await st_model.findById('65c1d2fb04cf158914244d1f');
        console.log(students);
    } catch (err) {
        console.log(err);
    }
}
// getdata();
async function addStudent() {
    try {
        const newStudent = await st_model.create({
            name: "Jimmy",
            email: "jimmypatel1@gmail.com",
            enrollnumber: 13
        });
        console.log(newStudent);
    } catch (err) {
        console.log(err);
    }
}
// addStudent();
// getStudents();
async function addmultipleStudent() {
    try {
        const newStudents = await st_model.insertMany([{
            name: "Bhavana",
            email: "sankebhavana1@gmail.com",
            enrollnumber: 1
        }, {
            name: "Ninad",
            email: "ninadvaidya@gmail.com",
            enrollnumber: 2
        }]);
        console.log(newStudents);
    } catch (err) {
        console.log(err);
    };
}
// addmultipleStudent();
// getStudents();
async function updateStudent() {
    try {
        const updateResponse = await st_model.updateOne({ enrollnumber: 2 }, { $set: { name: "Ninad Vaidya" } });
        console.log(updateResponse);
    } catch (err) {
        console.log(err)
    }
}
// updateStudent();
// getStudents();
async function mongooseUpdate() {
    try {
        const updateResponse = await st_model.findByIdAndUpdate('65c1d232b79c3be371e79be7', { name: "Bhavana Sanke", enrollnumber: 17 });
    } catch (err) {
        console.log(err);
    }
}
// mongooseUpdate();
// getStudents();
async function deleteAlStudents() {
    try {
        const deleteResponse = await st_model.deleteMany({});
        console.log(deleteResponse);
    } catch (err) {
        console.log(err);
    }
}
// deleteAlStudents();
// getStudents();
async function mongooseDelete() {
    try {
        const deleteResponse = await st_model.findByIdAndDelete('65c1d232b79c3be371e79be6');
    } catch (err) {
        console.log(err);
    }
}
// mongooseDelete();
getStudents();