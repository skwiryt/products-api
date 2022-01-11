var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Product from '../models/product.model';
const validation = ({ Name, Price }) => {
    return Name && Name.length <= 100 && Price && !isNaN(Number(Price));
};
const productController = {
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('getAll controller was called');
        try {
            const result = yield Product.find();
            if (!result)
                res.status(404).json({ product: 'Not found' });
            else
                res.json(result.map((r) => r.toClient()));
        }
        catch (err) {
            res.status(500).json({ message: err });
        }
    }),
    getOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const prod = yield Product.findById(req.params.id);
            if (!prod) {
                res.status(404).json({ message: 'Not found' });
            }
            else {
                res.json(prod.toClient());
            }
        }
        catch (err) {
            res.status(500).json({ message: err });
        }
    }),
    addOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (validation(req.body)) {
            const { Name, Price } = req.body;
            const UpdateDate = new Date();
            try {
                const product = new Product({ Name, Price, UpdateDate });
                const savedProduct = yield product.save();
                res.json(savedProduct.toClient());
            }
            catch (err) {
                res.status(500).json({ message: err });
            }
        }
        else {
            res.status(400).json({ message: 'ERROR. Required fields are missing or incorrect' });
        }
    }),
    edit: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.params.id) {
            let { Name, Price } = req.body;
            try {
                const product = yield Product.findById(req.params.id);
                if (!product) {
                    res.status(404).json({ message: 'Not found' });
                }
                else {
                    product.Name = Name ? Name : product.Name;
                    product.Price = Price ? Price : product.Price;
                    const productSaved = yield product.save();
                    res.json(productSaved.toClient());
                }
            }
            catch (err) {
                res.status(500).json({ message: err });
            }
        }
        else {
            res.status(400).json({ message: 'ERROR. Id is required to edit' });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const prod = Product.findById(req.params.id);
            if (!prod) {
                res.status(404).json({ message: 'Not found' });
            }
            else {
                yield Product.deleteOne({ _id: req.params.id });
                res.json({ message: 'OK, product is deleted' });
            }
        }
        catch (err) {
            res.status(500).json({ message: err });
        }
    })
};
export default productController;
