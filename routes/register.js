"use strict";
const express = require("express");
let router = express.Router();

router.get('/register', (req, response) => {  //checkNotAuthenticated for if user is already logged in, don't go back to register page
    response.render('instructor_register.html');
});

// app.post('/register', checkNotAuthenticated, async (req, response) => {  //checkNotAuthenticated for if user is already logged in, don't run register POST
// try {                                                               //Try to hash password, if it fails then redirect back to register page
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     users.push({
//         fname: req.body.fname,
//         lname: req.body.lname,
//         email: req.body.email,
//         username: req.body.username,
//         password: hashedPassword
//     });
//     response.redirect('/login');
// } catch {
//     response.redirect('/instructor_register');
// }
// console.log(users);
// });

module.exports = router;