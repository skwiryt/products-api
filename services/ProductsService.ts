import Product from '../models/product.model';
import {IProduct } from '..//models/product.model';
import { Service } from 'typedi';

@Service()
class ProductsService {
  async getAll(): Promise<IProduct[]> {
    const products = await Product.find();
    if (!products) return [];
    else return products.map((r: any) => r.toClient());
  }
  async getOne(id: string): Promise<IProduct | null> {
    const product = await Product.findById(id);    
    return product ? product.toClient() : product;
  }
  async addOne(newProduct: IProduct): Promise<IProduct> {   
    const { Name, Price } =  newProduct;
    const UpdateDate = new Date();    
    const product = new Product({ Name, Price, UpdateDate });
    const productSaved = await product.save();
    return productSaved.toClient();
  }
  async edit(newProduct: any): Promise<IProduct | null> {   
    let { Name, Price, Id } = newProduct;
    const product = await Product.findById(Id);
    if (!product) {
      return null;
    } else {
      product.Name = Name ? Name : product.Name;
      product.Price = Price ? Price : product.Price;
      product.UpdateDate = new Date();   
      const productSaved = await product.save();
      return productSaved.toClient();
    }    
  }
  async delete(id: string): Promise<IProduct | null> {   
    const prod = await Product.findById(id);
    if (prod) {
      await Product.deleteOne({_id: id});  
    }
    return prod;
  }
}
export default ProductsService;