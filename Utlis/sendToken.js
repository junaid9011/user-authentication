const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    const accessToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_TIME } // '15m'
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_TIME } // '7d'
    );

    const cookieOptions = {
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days in ms
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'Strict',
    };

    res
        .status(statusCode)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .json({
            success: true,
            accessToken,
            refreshToken,
            user,
        });
};

module.exports = sendToken;
