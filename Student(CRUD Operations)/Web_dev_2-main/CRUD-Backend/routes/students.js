const express = require('express');
const router = express.Router();

const st_model = require('../models/students.js');

router.get('/', async (req, res) => {
    try {
        const students = await st_model.find({});
        res.send({ students })
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const student = await st_model.findById(req.params.id);
        res.send({ student });
    } catch (err) {
        res.status(404).send({ message: 'Student not found!' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newStudent = await st_model.create({ name: req.body.name, email: req.body.email, enrollnumber: req.body.enrollnumber });
        res.send({ newStudent });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await st_model.findByIdAndUpdate(req.params.id, req.body);
        res.send({ message: 'The student was updated' });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const removeStudent = await st_model.findByIdAndDelete(req.params.id);
        res.send({ message: 'The student was removed' });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

module.exports = router;