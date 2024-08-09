var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'john_doe', { maxAge: 3600, httpOnly: true });
    res.send('Cookie has been set');
});

app.get('/get-cookie', (req, res) => {
    const username = req.cookies.username;
    res.send('Username From Cookie: ' + username);
});

app.get('/set-cookie/:username', (req, res) => {
    res.cookie('username', req.params.username, { expire: 3600 + Date.now(), httpOnly: true }); //maxAge means minutes or age of 
    res.send('Cookie has been set');
})

app.listen(3000);