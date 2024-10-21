const User = require("../../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const createToken = (user)=>{
    const payload = {
        _id: user._id,
        email: user.email,
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '31d' })
}
const register = async(req, res)=>{
    try {
        const {password} = req.body
        req.body.password = await bcrypt.hash(password, 10)
        const user = await User.create(req.body)
        const token = createToken(user)
        res.status(201).json({token, message: "Account created successfully!"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const login = async(req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        const token = createToken(user)
        res.status(200).json({token, message: "Logged in successfully!"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {register, login}
