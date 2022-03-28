const express = require('express');
const router  = express.Router();
const ProductsMangment    = require('../controllers/ProductsMangment.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
router.get('/getProducts',awaitHandlerFactory(ProductsMangment.getProducts));
router.post('/addProducts', awaitHandlerFactory(ProductsMangment.addProducts));
router.put('/updateProducts/:id', awaitHandlerFactory(ProductsMangment.updateProducts));
router.delete('/deleteProducts/:id', awaitHandlerFactory(ProductsMangment.deleteProducts));
module.exports = router;