/**
 * @file Manges all staff routes.
 * @version 1.1.0
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/staff-controller');

/**
 * Sign in route
 */
router.post('/', async (req, res) => {
  const { username, pin } = req.body;
  try {
    const user = await controller.signIn(username, pin);
    res.json(user);
  } catch (error) {
    //console.error(`Error signing in: ${error.message}`);
    res.status(500).json({ error: `Error signing in: ${error.message}` });
  }
});

/**
 * Create account route
 */
router.post('/create-account', async (req, res) => {
  const { username, pin, specialization } = req.body;
  try {
    const newUser = await controller.createAccount(username, pin, specialization);
    res.status(201).json(newUser);
  } catch (error) {
    //console.error(`Error creating user: ${error.message}`);
    res.status(500).json({ error: `Error signing in: ${error.message}` });
  }
});

module.exports = router;
