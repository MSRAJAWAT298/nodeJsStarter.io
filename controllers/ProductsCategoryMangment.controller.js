const ProductsCategoryMangment = require('../models/ProductsCategoryMangment.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Category Controller
 ******************************************************************************/
class ProductsCategoryMangment {
    getProductCategory= async (req, res, next) => {
        let ProductCategoryList = await ProductsCategoryMangment.findAll();
        if (!ProductCategoryList.length) {
            throw new HttpException(404, 'Category not found');
        }
        res.send(ProductCategoryList);
    };
    createCategory = async (req, res, next) => {
        const result = await ProductsCategoryMangment.create({...req.body});
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('Category is created!');
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ProductsCategoryMangment;