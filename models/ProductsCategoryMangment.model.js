const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class ProductsCategoryManagementModel {
    tableName = 'product_category';

    findAll = async (params = {}) => {
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
    create = async ({ category_name, category_description, status=1 }) => {
        const sql = `INSERT INTO ${this.tableName} (category_name, category_description, status) VALUES (?,?,?)`;
        const result = await query(sql, [category_name, category_description, status]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }
    findOneByName = async (params) => {
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
}

module.exports = new ProductsCategoryManagementModel;