const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class ProductsManagementModel {
    tableName = 'products';

    findProducts = async (params = {}) => {
        if(params!="" && Object.keys(params)[0]=="custom_query" && params.custom_query!=""){
            return await query(params.custom_query);
        }
        let sql = `SELECT * FROM ${this.tableName}`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}` ;
        return await query(sql, [...values]);
    }
    addProducts = async ({ product_category_id, product_name, product_description, price, status }) => {
        const sql = `INSERT INTO ${this.tableName} (product_category_id, product_name, product_description, price, status) VALUES (?,?,?,?,?)`;
        const result = await query(sql, [product_category_id, product_name, product_description, price, status]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }
    update = async (product_id,updateData) => {
        const sql = `UPDATE ${this.tableName} SET ? WHERE id= ?`;
        const result = await query(sql, [updateData,product_id]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }
    delete = async (product_id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE (id) = (?)`;
        const result = await query(sql, [product_id]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }
}

module.exports = new ProductsManagementModel;