var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // use for taking inputs from body
var session = require('express-session');
var cookieParser = require('cookie-parser'); // optional as such this code doesn't use cookies

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // optional as such this code doesn't use cookies
app.use(session({ secret: "Your secret key" })); //password of the file where the original session is created

var Users = []; //collection in which multiple documents are added
//for signup
app.post('/signup', function(req, res) {
    if (!req.body.id || !req.body.password) {
        res.status(400);
        res.send("Invalid details!");
    } else {
        isError = false; // flag is created to run the prog without error
        Users.filter(function(user) {
            if (user.id === req.body.id) {
                isError = true;
                res.status(500);
                res.json({ message: "User Already Exists! Login or choose another user id" });

                return;
            }
        });
        if (!isError) {
            var newUser = { id: req.body.id, password: req.body.password };
            Users.push(newUser);
            req.session.user = newUser;
            res.status(200);
            res.json({ message: "Signed up successful" });
        }
    }
});
//for login from password
app.post('/login', function(req, res) {
    if (!req.body.id || !req.body.password) {
        res.status(404);
        res.json({ message: "Please enter both id and password" });
    } else {
        let isLoggedIn = false;
        Users.filter(function(user) {
            if (user.id === req.body.id && user.password === req.body.password) {
                isLoggedIn = true;
                req.session.user = user;
                res.status(200);
                res.json({ message: "Authentication successful" });
                return;
            }
        });
        if (!isLoggedIn) {
            res.status(404);
            res.json({ message: "Invalid credentials!" });
        }
    }
});
//for logging out of prog
app.get('/logout', function(req, res) {
    req.session.destroy(function() {
        console.log("user logged out.")
    });
    res.status(200);
    res.json({ message: "Logged out." });
});
/*
app.get('/page', function(req, res) {
    if (!req.session.user) {
        res.status(200);
        res.json({ message: "Page is rendering" });
    } else {
        res.status(400);
        res.json({ message: "Login first." });
    }
});
*/
//page is created when the user is login
app.get('/page', function(req, res) {                   //for authentication we have use isLoggedIn()
    if (!req.session.user || req.session.user.id) {
        res.status(200);
        res.json({ message: "Page is rendering" });
        return;
    }
    let isLoggedIn = false;
    Users.filter(function(user) {
        if (user.id === req.body.id && user.password === req.body.password) {
            isLoggedIn = true;
            res.status(200);
            res.json({ message: "Authentication successful" });
            return;
        }
    });
    if (!isLoggedIn) {
        res.status(404);
        res.json({ message: "Invalid Credential!" })
    }
});

app.listen(3000); // to run the prog