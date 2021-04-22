const bcrypt = require("bcrypt");
const dbService = require("../dbService");

exports.renderRegisterPage = (req, response) => {
    response.render('instructor_register.ejs');
}

exports.registerUser = async (req, response) => {
    //checkNotAuthenticated for if user is already logged in, don't run register POST
    try {
      //Try to hash password, if it fails then redirect back to register page
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const { fname, lname, email, username } = req.body;
  
      const db = dbService.getDbServiceInstance();
      const result = db.register(fname, lname, email, username, hashedPassword);
      //initializeInstructor();
      console.log("Successfully added instructor");
      response.redirect("/login");
    } catch {
      response.redirect("/register");
    }
    //console.log(users);
}