const express = require('express');
const router = express.Router();
const controller = require('../BackendControllers/StaffLoginController');

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const result = await controller.signIn(username, password);
  res.status(result.error ? 401 : 200).json(result);
});

router.post('/create-account', async (req, res) => {
  const { username, password } = req.body;
  const result = await controller.createAccount(username, password);
  res.status(result.error ? 400 : 200).json(result);
});

module.exports = router;