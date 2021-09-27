'use strict'

const firebase = require('../../firebase');
const firestore = firebase.firestore();
const Producto = require('../models/producto');

/**
 * 
 * @param {*} req datos que recibe 
 * @param {*} res datos que responde
 * @param {*} next seguir el flujo cuando se haya verifcado el midleware
 */
const addProducto = async (req, res, next) =>{
    try {
        console.log(req.body);
        const data = req.body;
        await firestore.collection('producto').doc().set(data);
        res.status(200).send({
            status:200,
            message:'Producto guardado correctamente',
        })
    } catch (error) {
        res.status(400).send({
            status:400,
            message:`error ${error.message}`,
        })
    }
}

const getAllProductos = async (req, res) =>{
    try {
        const allProductos = [];
        const productos = await firestore.collection('producto').get();
        if(productos.empty){
            res.status(404).send({
                status:404,
                message:'No se encontraron datos',
                data:[],
            })
        }else{
           productos.forEach(elem => {
               allProductos.push({
                   id:elem.id,
                   ...elem.data(),
               })
           });
           res.status(200).send({
               status:200,
               message:'Datos obtenidos correctamente',
               data:allProductos
           })
        }
    } catch (error) {
        res.status(400).send({
            status:200,
            message:'Error al obtener los productos'
        })
    }
}

const getProductoById = async (req, res) =>{
    try {
        const id = req.params.id;
        const producto = await firestore.collection('producto').doc(id).get();

        if(producto.exists){
            res.status(200).send({
                status:200,
                message:'Producto obtenido correctamente',
                data:{
                    id: id,
                    ...producto.data(),
                }
            })
        }else{
            res.status(404).send({
                status:404,
                message:'No se encontro el producto',
                data:[]
            })
        }
    } catch (error) {
        res.status(400).send({
            status:400,
            message:'Ocurrio un error al obtener el producto',
        })
    }
}

const updateProducto = async(req, res) =>{
    try {
        const id = req.params.id;
        const data = req.body;
        await firestore.collection('producto').doc(id).update(data);
        res.status(200).send({
            status:200,
            message:'Actualizado correctamente',
        })
    } catch (error) {
        res.status(400).send({
            status:400,
            message:'Error al actualizar producto'
        })
    }
}

const deleteProducto = async (req, res) =>{
    try {
        const id = req.params.id;
        await firestore.collection('producto').doc(id).delete();
        res.status(200).send({
            status:200,
            message:'Producto eliminado correctamente'
        })
    } catch (error) {
        res.status(400).send({
            status:400,
            message:'Ocurrio un error al eliminar el producto'
        })
    }
}

module.exports = {
    addProducto,
    getAllProductos,
    getProductoById,
    updateProducto,
    deleteProducto
}