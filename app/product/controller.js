const connection = require('../../config/mysql');
const path = require('path');
const fs = require('fs');

const index = (req, res) => {
    const {search} = req.query;
    let exec ={};
    if (search) {
        exec = {
            sql: 'SELECT * FROM product WHERE item LIKE ?',
            values:[`%${search}%`]
        }
    } else {
        exec = {
            sql: 'SELECT * FROM product',
        }
    }
    connection.query(exec,_response(res));
}

const data = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM product WHERE id=?',
        values: [req.params.id]
    },_response(res));
}

const destroy = (req, res) => {
    connection.query({
        sql: 'DELETE FROM product WHERE id=?',
        values: [req.params.id]
    },_response(res));
}

const store = (req, res) => {
    const {users_id, item, price, stock,nama, status} = req.body;
    const image =req.file;
    if (image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        connection.query({
            sql: 'INSERT INTO product (users_id, item, price, stock, nama, status, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            values: [users_id, item, price, stock, nama, status, `http://localhost:4000/public/${image.originalname}`]
        },_response(res));
    }    
}
const update = (req, res) => {
    const {users_id, item, price, stock, status, nama} = req.body;
    const image =req.file;
    let sql = '';
    let values = [];
    if (image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        sql ='UPDATE product SET users_id= ?, item = ?, price = ?, stock = ?, status = ?, nama = ?, image_url= ? WHERE id = ?';
        values = [users_id, item, price, stock, nama, status, `http://localhost:4000/public/${image.originalname}`, req.params.id]
    }  
    else{
        sql= 'UPDATE product SET users_id= ?, item = ?, price = ?, stock = ?, status = ?,nama = ?, image_url= ? WHERE id = ?';
        values= [users_id, item, price, stock, nama, status, req.params.id]
    }
    connection.query({sql, values},_response(res));  
}
const _response = (res) =>{
    return (error, result)=>{
        if (error) {
            res.send({
                status: ' failed',
                response: 'failed to fetch data'
            });
        } else {
            res.send({
                status: 'success',
                response: result
            });           
        }
    }
}
module.exports = {
    index,
    data,
    store,
    update,
    destroy
}