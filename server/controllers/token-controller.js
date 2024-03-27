/**
 * @file Creates and validates tokens for staff (protected routes)
 * @version 1.1.1
 */

const jwt = require('jsonwebtoken');
const key = 'staff_verified'; // Key used for signing the token

/**
 * Generates a JWT token with the provided username and pin.
 * @param {string} username - The username to include in the token payload.
 * @param {string} pin - The pin to include in the token payload.
 * @returns {string} Generated JWT token.
 */
function generateToken(username, pin) {
    const payload = {
        username: username,
        pin: pin,
    }
    return jwt.sign(payload, key, { expiresIn: '1h' });
}

/**
 * Middleware function to verify JWT token.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {json} The decoded token as a html response. 
 */
function verifyToken(req, res, next) {
    const token = req.headers.authorization; // Token should be in the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    // Verify the token using the key
    jwt.verify(token.split(' ')[1], key, (err, decoded) => { // Extract the token part after 'Bearer '
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
        req.user = decoded;
        next();
    });
}

// Example usage:
const username = 'admin';
const pin = '1234';
const token = generateToken(username, pin);
console.log('Generated token:', token);

// Simulate verifying a token before accessing a protected route
const req = { headers: { authorization: `Bearer ${token}` } }; // Token is included in the Authorization header
verifyToken(req, null, () => {
    console.log('Token is valid. User:', req.user);
});

module.exports = { generateToken, verifyToken };