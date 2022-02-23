import bcrypt from 'bcryptjs';
import User from '../../../model/User';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
const JWT = "AngusAbhishaKumarChittore"
export default async function loginUser(req, res) {

    if (req.method === "DELETE") {
        const { cookies } = req;
        const jsonweb = cookies.AuthToken;

        const serialized = serialize("AuthToken", null, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: -1,
            path: "/"
        })
        res.setHeader('Set-Cookie', serialized)
        res.status(200).json({
            success: true,
            message: "You are successfully Logged out !!"
        })


    }
    if (req.method === "POST") {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Please Login with correct credentials"
            })
        }


        const logUser = await User.findOne({ email })
        if (!logUser) {
            return res.json({
                success: false,
                message: "Please Login with correct credentials"
            })
        }
        const passCompare = await bcrypt.compare(password, logUser.password)
        if (!passCompare) {
            return res.status(400).json({
                success: false,
                message: "Please Login with correct credentials"
            })
        }
        const data = {
            exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30, // Expiring Date in 30 days
            id: logUser._id

        }
        const authtoken = await jwt.sign(data, JWT)
        const serialized = serialize("AuthToken", authtoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
            path: "/"
        })
        res.setHeader('Set-Cookie', serialized)
        res.json({ success: true, authtoken, email })
    }
}