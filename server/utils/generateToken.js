const jwt = require("jsonwebtoken");
const UserToken = require("../models/token");

async function generateTokens(user) {
  const payload = { id: user._id, role: user.role?.title };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "9h",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  try {
    const existingUserToken = await UserToken.findOne({ userId: user._id });
    if (existingUserToken) {
      await UserToken.deleteOne({ userId: user._id });
    }
    const newUserToken = new UserToken({
      userId: user._id,
      token: accessToken,
    });
    await newUserToken.save();

    return accessToken;
  } catch (error) {
    throw error;
  }
}

async function generateClientTokens(client) {
  const payload = { id: client._id };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  try {
    const existingUserToken = await UserToken.findOne({ userId: client._id });
    if (existingUserToken) {
      await UserToken.deleteOne({ userId: client._id });
    }
    const newUserToken = new UserToken({
      userId: client._id,
      token: accessToken,
    });
    await newUserToken.save();

    return accessToken;
  } catch (error) {
    throw error;
  }
}

module.exports = { generateTokens, generateClientTokens };
