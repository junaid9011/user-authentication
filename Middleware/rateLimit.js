const rateLimit = require('express-rate-limit');

// Rate limiting middleware for login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per `windowMs`
    message: "Too many login attempts, please try again after 15 minutes",
    headers: true, // Included rate limit info in the response headers
});

module.exports = loginLimiter;
