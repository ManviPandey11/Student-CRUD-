require('./Models/db');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 5000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cors')());
app.use('/students', require('./routes/student'));

app.listen(PORT, () => console.log(`App Running on Port ${PORT}`));