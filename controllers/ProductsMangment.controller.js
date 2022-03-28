const ProductsManagementModel = require('../models/productsMangment.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Products Controller
 ******************************************************************************/
class ProductsMangmentController {
    getProducts= async (req, res, next) => {
        let eventList = await ProductsManagementModel.findProducts();
        if (!eventList.length) {
            throw new HttpException(404, 'Products not found');
        }
        res.send(eventList);
    };
    addProducts = async (req, res, next) => {
        this.checkValidation(req);
        const result = await ProductsManagementModel.addProducts({...req.body});
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('Products is created!');
    };
    updateProducts = async (req, res, next) => {
        this.checkValidation(req);
        var product_id = req.params.id;
        var updateData = req.body;
        const result = await ProductsManagementModel.update(id,updateData);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('Products Update Succesfully...');
    };
    deleteProducts = async (req, res, next) => {
        this.checkValidation(req);
        var product_id = req.params.id;
        const result = await ProductsManagementModel.delete(product_id);
        if(result==0){
            throw new HttpException(404, 'Product Not found');
        }else if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('Products is Deleted Succesfully!');
    };
    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ProductsMangmentController;