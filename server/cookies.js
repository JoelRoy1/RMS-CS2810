//Version 1.0.0
const cookie = require('cookie');

// Function to set a cookie
function setCookie(name, value, days) {
    const cookieOptions = {
        maxAge: days * 24 * 60 * 60, // Convert days to seconds
        httpOnly: true // Cookie cannot be accessed by client-side scripts
    };
    return cookie.serialize(name, value, cookieOptions);
}

// Function to parse cookies and get a cookie value
function getCookie(cookieString, name) {
    const cookies = cookie.parse(cookieString || '');
    return cookies[name];
}

module.exports = { setCookie, getCookie };