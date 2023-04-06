import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const register = asyncHandler(async (req, res) => {
   
    const email = req.body.email;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error(`User ${email} already exists`);
  }
  const user = await User.create(req.body);
  if (user) {
    let token = generateToken(user._id);

    res
      .status(200)

      .json({
        name: user.username,
        email: user.email,

        token: token,
      });
  } else {
    res.status(404);
    throw new Error("failed to create user");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    let token = generateToken(user._id);

    res.status(200).json({
      name: user.username,
      email: user.email,

      token: token,
    });
  } else {
    res.status(404);
    throw new Error("invalid Email or password");
  }
});

export const logout = asyncHandler(async (req, res) => {});
