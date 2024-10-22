const User = require("../../models/User")
const Investment = require("../../models/Order")
const Invention = require("../../models/Invention")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const createToken = (user)=>{
    const payload = {
        _id: user._id,
        email: user.email,
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '31d' })
}
const register = async(req, res, next)=>{
    try {
        const {password} = req.body
        req.body.password = await bcrypt.hash(password, 10)
        const user = await User.create(req.body)
        const token = createToken(user)
        res.status(201).json({token, message: "Account created successfully!"})
    } catch (error) {
        next(error)
    }
}

const login = async(req, res, next)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        const token = createToken(user)
        res.status(200).json({token, message: "Logged in successfully!"})
    } catch (error) {
        next(error)
    }
}

const getUsers = async(req, res, next)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}
const getUser = async(req, res, next)=>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

const getProfile = async(req, res, next)=>{
    try {
        console.log("sajsoahsu")
        console.log(req.user)
        const user = await User.findOne({email: req.user.email}).select('-password').populate("inventions").populate("investments")

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

module.exports = {register, login, getUsers, getUser, getProfile}
