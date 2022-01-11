import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import 'reflect-metadata';
import {router as productsRoutes} from './routes/products.routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})


const PORT = 8080;

app.listen(PORT, () => console.log(`app running on port ${PORT}`));

const devDBString = 'mongodb://localhost:27017/products-API';
const dbURI =  devDBString; 


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database on uri: ', dbURI);
});
db.on('error', err => console.log('Error ' + err));