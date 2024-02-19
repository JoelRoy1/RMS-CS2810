const jwt = require('jsonwebtoken');
const key = 'staff_verified'

function generateToken(username, pin) {
    const payload = {
        username: username,
        pin: pin,
    }
    return jwt.sign(payload, key, {expiresIn: '1h'});
}

function verifyToken(req, res, next) {
    const token = req.body.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
        req.user = decoded;
        next();
    });
}

// Example usage:
const username = 'example_user';
const pin = '1234';
const token = generateToken(username, pin);
console.log('Generated token:', token);

// Simulate verifying a token before accessing a protected route
const req = { body: { authorization: token } };
verifyToken(req, null, () => {
    console.log('Token is valid. User:', req.user);
});