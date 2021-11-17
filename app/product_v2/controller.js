const path = require('path');
const fs = require('fs');
const db = require('./model');


const index = async (req, res) => {
    try {
        let Products = await db.findAll()
        
            if(Products.length > 0){
                res.json({
                    status:'success',
                    response: Products
                })
            }else{
                res.json({
                    status:'failed',
                    response:'failed to fetch data'
                })
            }
        
    } catch (e) {
        res.status(404).json({
            message: e.message
        })
    }
};

const data = async (req, res) => {
    try {
        let Products = await db.findAll({
            where:{
                id: req.params.id
            }
        })
        if (Products.length >0) {
            res.json({
                message:'success',
                data:Products
            })
        } else {
            res.json({
                status:'failed',
                response:'failed to fetch data'
            })
        }
    } catch (e) {
        res.status(404).json({
            message: e.message
        })
    }
};
 
const uploadd = async (req,res)=>{
    const{users_id, item, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try {
            await db.sync();
            const result = await db.create({users_id, item, price, stock, status, image_url:`http://localhost:4000/public/${image.originalname}`});  
            res.json({
                message:"success"
            });    
        }catch(e){
            res.send(e);
        }
    }
}
const update = async (req, res)=>{
    const{users_id, item, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try {
            
            await db.sync();
            // const result = await db.update({users_id, item, price, stock, status, image_url:`http://localhost:4000/public/${image.originalname}`}); 
            const result = await db.update({ users_id, item, price, stock, status, image_url: `http://localhost:4000/public/${image.originalname}` },
            {
            where: { 
                id:req.params.id},
            }); 
            res.json({
                message:"success",
                response: error
            });    
        }catch(e){
            res.send(e);
        }
    }  
}

const destroy = async (req, res) => {
    db.destroy({
        where:{
            id: req.params.id
        }
    }).then(() => res.json({
        message:"success deleted"
    }));
};

module.exports = {
    index,
    uploadd,
    data,
    destroy,
    update
}