import * as mongoose from 'mongoose';

export interface IProduct { 
  Name: string,
  Price: number, 
  UpdateDate?: Date,
  Id?: string,
}

const productSchema = new mongoose.Schema({
  Name: {type: String, required: true},
  Price: {type: Number, required: true},
  UpdateDate: {type: Date},
});
productSchema.method('toClient', function() {
  var obj = this.toObject();

  // Rename fields
  // obj.Id = obj._id;
  const Id = obj._id;
  delete obj._id;
  delete obj.__v;
  // return obj;
  return { ...obj, Id }
});

const Product = mongoose.model('product', productSchema);
export default Product;