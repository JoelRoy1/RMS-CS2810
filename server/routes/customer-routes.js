/**
 * @file Manges all menu routes.
 * @version 1.0.0
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controllers');


router.post('/', async (req, res) => {
    const { customerName, customerAllergies } = req.body
    try {
      const customer = await controller.addCustomer( customerName, customerAllergies);
      res.json(customer);
    } catch (error) {
      res.status(500).json({ error: `Error: ${error.message}` });
    }
});

module.exports = router;