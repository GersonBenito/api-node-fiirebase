const express = require('express');
const { addProducto, getAllProductos, getProductoById, updateProducto, deleteProducto } = require('../controllers/producto-controller');

const router = express.Router();

router.post('/producto', addProducto);
router.get('/productos', getAllProductos)
router.get('/producto/:id', getProductoById);
router.put('/producto/:id', updateProducto);
router.delete('/producto/:id', deleteProducto);
module.exports = {
    routes: router
}
