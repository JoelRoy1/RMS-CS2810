/**
 * @file help-routes.js manages all help routes.
 * @module server/help
 * @version 1.0.0
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/help-controllers');

/**
 * request help using customer id
 */
router.post('/', async (req, res) => {
    const { customerId } = req.body;
    try {
      const cust = await controller.requestHelp(customerId);
      res.status(200).json({ message: 'Help requested successfully' });
    } catch (error) {
      console.error(`Error calling for help: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
});


/**
 * retrieve all customers in need of help
 */
router.get('/retrieve', async (req, res) => {
    try {
      const cust = await controller.getCustomersNeedingHelp();
      res.json(cust);
    } catch (error) {
      console.error(`Error retrieving help requests: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
});

/**
 * resolve a given help request
 */
router.post('/resolve', async (req, res) => {
  const { helpId } = req.body;
  try {
    await controller.resolveHelpRequest(helpId);
    res.status(200).json({ message: 'Help resolved successfully' });
  } catch (error) {
    console.error(`Error resolving help: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
