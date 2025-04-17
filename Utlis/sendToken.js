const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    const accessToken = user.getJwtToken();
    
    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_TIME }
    );

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
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
