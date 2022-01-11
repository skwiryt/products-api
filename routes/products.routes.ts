import * as express from 'express'
import ProductsController from '../controllers/ProductsController';
import Container from 'typedi';


const router = express.Router();

const productsController = Container.get(ProductsController)
router.get('/list', (res, req) => productsController.getAll(res, req));

router.get('/details/:id', (res, req) => productsController.getOne(res, req));

router.post('/create', (res, req) => productsController.addOne(res, req));

router.put('/edit', (res, req) => productsController.edit(res, req));

router.delete('/delete/:id', (res, req) => productsController.delete(res, req));

export { router }