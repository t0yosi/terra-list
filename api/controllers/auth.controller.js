import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (err) {
    if (err.code === 11000) {
      // Handle duplicate key error
      const field = Object.keys(err.keyPattern)[0];
      const errorMessage = `The ${field} '${err.keyValue[field]}' is already taken. Please choose a different ${field}.`;
      next(errorHandler(400, errorMessage));
    } else {
      next(err);
    }
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      next(errorHandler(404, "User not found"));
    } else {
      const isPasswordValid = bcryptjs.compareSync(password, user.password);
      if (!isPasswordValid) {
        next(errorHandler(401, "Invalid credentials"));
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie("access_token", token, {
            httpOnly: true,
            // expires: new Date(Date.now() + 12 * 60 * 60),
          })
          .status(200)
          .json(rest);
      }
    }
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          // expires: new Date(Date.now() + 12 * 60 * 60),
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          // expires: new Date(Date.now() + 12 * 60 * 60),
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};
