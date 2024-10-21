const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")
const bcrypt = require("bcrypt")

passport.use(new LocalStrategy({usernameField: "email", passwordField: "password"}, async(email, password, done)=>{
    try {
        const user = await User.findOne({email})
        if(!user) return done(null, false, {message: "Email not found"})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return done(null, false, {message: "Password is incorrect"})
        return done(null, user)
    } catch (error) {
        done(error)
    }
}))
