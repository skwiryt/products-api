import * as express from 'express'
import Product from '../models/product.model';

const validation = ({ Name, Price }: any): boolean => {
  return Name && Name.length <= 100 && Price && !isNaN(Number(Price)); 
}
const productController = {
  getAll: async (req: express.Request, res: express.Response) => {
    console.log('getAll controller was called');
    try {
      const result = await Product.find(); 
      if(!result) res.status(404).json({ product: 'Not found' });
      else res.json(result.map((r: any) => r.toClient()));
    } catch(err) {
      res.status(500).json({message: err});
    }
  },

  getOne: async (req: express.Request, res: express.Response) => {
    try {
      const prod = await Product.findById(req.params.id);
      if (!prod) {
        res.status(404).json({message: 'Not found'});
      } else {
        res.json(prod.toClient());
      }
    } catch(err) {
      res.status(500).json({message: err});
    }  
  },
  addOne: async (req: express.Request, res: express.Response) => {
    if (validation(req.body)) {
      const { Name, Price } = req.body;     
      const UpdateDate = new Date();
      try {
        const product = new Product({Name, Price, UpdateDate});
        const savedProduct = await product.save();
        res.json(savedProduct.toClient());
      } catch(err) {
        res.status(500).json({message: err});
      }
    } else {
      res.status(400).json({message: 'ERROR. Required fields are missing or incorrect'});
    }
    
  },
  edit: async (req: express.Request, res: express.Response) => {
    if (req.params.id) {
      let { Name, Price } = req.body;  
      try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          res.status(404).json({message: 'Not found'});
        } else {
          product.Name = Name ? Name : product.Name;
          product.Price = Price ? Price : product.Price;      
          const productSaved = await product.save();
          res.json(productSaved.toClient());
        }
      } catch(err) {
        res.status(500).json({message: err});
      }
    } else {
      res.status(400).json({message: 'ERROR. Id is required to edit'});
    }
  },
  delete: async (req: express.Request, res: express.Response) => {
    try {
      const prod = Product.findById(req.params.id);
      if (!prod) {
        res.status(404).json({message: 'Not found'});
      } else {
        await Product.deleteOne({_id: req.params.id});      
        res.json({message: 'OK, product is deleted'});
      }
    } catch(err) {
      res.status(500).json({message: err});
    }
  }
}
 export default productController;
