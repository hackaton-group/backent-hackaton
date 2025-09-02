import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const { username, password, avatar, lastname } = req.body;

    if (!password || !username) {
        return res.status(400).json({ error: "Please complete all required fields" });
    }

    try {
        const existingUser = await userModel.findOne({ username });
        
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await userModel.create({ username, password, avatar, lastname });
        
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                lastname: user.lastname,
                image: user.avatar
            }
        });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please provide username and password" });
    }

    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }       

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                image: user.avatar
            },
            token
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export const allUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}