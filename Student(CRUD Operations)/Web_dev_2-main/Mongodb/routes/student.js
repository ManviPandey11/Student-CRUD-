const express = require('express');
const router = express.Router();

const st_model = require('../Models/students');
const students = require('../Models/students');

router.post('/getStudents', async(req, res) => {
    try {
        const students = await st_model.find({});
        res.status(200).send(students);
    } catch (err) {
        res.status(404).send(err);
    }
});
router.get("/getStudent/:id", async(req, res) => {
    try {
        // const students = await st_model.find({ _id: req.params.id });
        const student = await st_model.findById(req.params.id);
        res.status(200).send(student);
    } catch (err) {
        res.status(404).send(err);
    }
});
router.post('/addStudents', async(req, res) => {
    try {
        let students = [];
        for (let i = 0; i < req.body.length; i++) {
            students.push({
                name: req.body[i].name,
                email: req.body[i].email,
                enrollnumber: req.body[i].enrollnumber
            });
        }
        console.log(students);
        const response = await st_model.insertMany(students);
        res.status(200).send(response);
    } catch (err) {
        res.status(404).send(err);
    }
});
router.post('/addStudent', async(req, res) => {
    try {
        const response = await st_model.create({ name: req.body.name, email: req.body.email, enrollnumber: req.body.enrollnumber });
        res.status(200).send(response);
    } catch (err) {
        res.status(404).send(err);
    }
});
router.put('/:id', async(req, res) => {
    try {
        await st_model.findByIdAndUpdate(req.params.id, req.body);
        res.send({ message: 'The student was updated' });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});
router.delete('/:id', async(req, res) => {
    try {
        await st_model.findByIdAndDelete(req.params.id);
        res.send({ message: 'The student was removed' });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});
router.post('/:id', async(req, res) => {
    try {
        await st_model.updateOne({ _id: req.params.id }, { $set: { name: req.body.name, email: req.body.email, enrollnumber: req.body.enrollnumber } });
        res.send({ message: 'The student was updated' });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});
router.delete('/:id', async(req, res) => {
    try {
        await st_model.deleteOne({ _id: req.params.id });
        res.send({ message: 'The student was removed' });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});
router.delete('/deleteAll', async(req, res) => {
    try {
        await st_model.deleteMany();
        res.send({ message: 'The student was removed' });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});
module.exports = router;