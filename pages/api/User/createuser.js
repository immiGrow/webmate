import User from "../../../model/User"
import dbConnect from '../../../mongodb/db'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT = "AngusAbhishaKumarChittore"
console.log(JWT)
dbConnect()

export default function createuser(req, res) {
    if (req.method === "GET") {
        res.json({
            message: "Everything is ok"
        })
    }
    if (req.method === "POST") {
        createNewUser(req, res)
    }
}
const createNewUser = async(req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.json({
            success: false,
            message: "Please add all fields"
        })
    }

    const findUser = await User.findOne({
        email
    })
    if (findUser) {
        return res.json({
            error: "Sorry, A user with this email already exists"
        })
    }


    let salt = await bcrypt.genSalt(10)
    let secpass = await bcrypt.hash(password, salt)
    const newAddedUser = await new User({
        username,
        email,
        password: secpass

    }).save()
    let data = {
        user: newAddedUser._id
    }
    console.log(data)
    const authtoken = await jwt.sign(data, JWT)

    await res.status(200).json({
        authtoken,
        newAddedUser
    })
}