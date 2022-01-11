import * as express from 'express'
import Container, { Service } from 'typedi';
import Product from '../models/product.model';
import ProductsService from '../services/ProductsService';

const validation = ({ Name, Price }: any): boolean => {
  return Name && Name.length <= 100 && Price && !isNaN(Number(Price)); 
}
@Service()
class ProductsController {
  
  // constructor(private readonly productsService: ProductsService) {}
  constructor() {
    this.productsService = Container.get(ProductsService);
  }
  private productsService: ProductsService; 
  
  async getAll(req: express.Request, res: express.Response) {
    console.log('this', this);
    console.log('this.productsService', this.productsService);
    try {
      const result = await this.productsService.getAll();
      if(!result.length) res.status(404).json({ product: 'Not found' });
      else res.json(result);
    } catch(err) {
      res.status(500).json({message: err});      
    }
  }
  async getOne(req: express.Request, res: express.Response) {
    console.log('getOne in controller was called');
    try {
      const prod = await this.productsService.getOne(req.params.id)
      if (!prod) {
        res.status(404).json({message: 'Not found'});
      } else {
        res.json(prod);
      }
    } catch(err) {
      res.status(500).json({message: err});
    }  
  }
  async addOne(req: express.Request, res: express.Response) {
    if (validation(req.body)) {      
      try {       
        const savedProduct = await this.productsService.addOne(req.body);
        res.json(savedProduct);
      } catch(err) {
        res.status(500).json({message: err});
      }
    } else {
      res.status(400).json({message: 'ERROR. Required fields are missing or incorrect'});
    }
    
  }
  async edit(req: express.Request, res: express.Response) {
    let { Name, Price, Id } = req.body;  
    if (Id) {      
      try {
        const newProduct = await this.productsService.edit({Name, Price, Id});
        if (!newProduct) {
          res.status(404).json({message: 'Not found'});
        } else {         
          res.json(newProduct);
        }
      } catch(err) {
        res.status(500).json({message: err});
      }
    } else {
      res.status(400).json({message: 'ERROR. Id is required to edit'});
    }
  }
  async delete(req: express.Request, res: express.Response) {
    try {
      const prod = this.productsService.delete(req.params.id);
      if (!prod) {
        res.status(404).json({message: 'Not found'});
      } else {              
        res.json({message: 'OK, product is deleted'});
      }
    } catch(err) {
      res.status(500).json({message: err});
    }
  }
}

 export default ProductsController;