require('./models/db.js');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 5000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cors')());
app.use('/api/students', require('./routes/students'));

app.listen(PORT, () => console.log(`App running on port ${PORT}`)  );