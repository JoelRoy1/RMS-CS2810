/**
 * @file Manges all help routes.
 * @version 1.0.0
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/help-controllers');

/**
 * request help using customer id
 */
router.post('/request', async (req, res) => {
    const { customerId } = req.body;
    try {
      await controller.requestHelp(customerId);
      res.status(200).json({ message: 'Help requested successfully' });
    } catch (error) {
      console.error(`Error calling for help: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
});


/**
 * request help using customer id
 */
router.get('/retrieve', async (req, res) => {
    try {
      await controller.getCustomersNeedingHelp();
      res.status(200).json({ message: 'Help requests retreived successfully' });
    } catch (error) {
      console.error(`Error retrieving help requests: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
});
