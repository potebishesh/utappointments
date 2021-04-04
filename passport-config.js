const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByUsername) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username);
        if (user == null) {
            return done(null, false, { message: "No user with that username" });    //return if user not found
        }

        try {
            if( await bcrypt.compare(password, user.password)) {                    //decrypt password, check if it matches
                return done(null, user);                                            //if passwords match, return user object
            }
            else {
                return done(null, false, { message: "Password incorrect." });       //if password is wrong, return false and a message
            }
        } catch {
            return done(e)                                                          //if decryption fails, catch error
        }

    }

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.username));
    passport.deserializeUser((username, done) => {
        return done(null, getUserByUsername(username));
    });
}

module.exports = initialize;