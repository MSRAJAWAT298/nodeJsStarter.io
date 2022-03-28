const { body } = require('express-validator');
exports.createProductsSchema = [
    body('product_category_name')
        .exists()
        .withMessage('Product category is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('product_name')
        .exists()
        .withMessage('product_name is required'),
    body('product_description')
    .exists()
    .withMessage('product_description is required'),
    body('price')
    .exists()
    .withMessage('price is required'),
];
