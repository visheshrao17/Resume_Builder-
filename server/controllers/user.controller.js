import User from '../models/user.model.js';
import Resume from '../models/resume.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
    return token;
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Registration logic here
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = generateToken(newUser._id);

        newUser.password = undefined;

        return res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            token
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if(!user.comparePassword(password)) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id);
        user.password = undefined;

        return res.status(200).json({
            message: "User logged in successfully",
            user,
            token
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};  

export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId)
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = undefined;
        
        return res.status(200).json({
            message: "User retrieved successfully",
            user
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getUserResumes = async(req, res) => {
    try {
        const userId = req.userId;

        const resumes = await Resume.find({ user: userId });
        
        return res.status(200).json({
            message: "Resumes retrieved successfully",
            resumes
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};