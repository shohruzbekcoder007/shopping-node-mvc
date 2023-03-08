const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require("cookie-parser")

const user_router = require('./routers/user')
const category_router = require('./routers/category')
const file_router = require('./routers/files')
const product_router = require('./routers/product')
const admin_router = require('./routers/admin')
const order_product_router = require('./routers/order_product')
const order_router = require('./routers/order')

const { Product, validateProduct } = require('./models/product')
const { Category, validateCategory } = require('./models/category')

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('q1y1npar0l'));
app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.static('./static'));
app.set("view engine", "pug");

mongoose.set('strictQuery', false);
// mongoose.connect('mongodb://127.0.0.1:27017/shopping')
// mongoose.connect('mongodb+srv://forhumoyun_aka:forhumoyun_aka@cluster0.ycg5joo.mongodb.net/shoping?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://mdbadmin:12333456@cluster0.ksjp1qk.mongodb.net/shopping?retryWrites=true&w=majority')
    .then(() => {
        console.log('MongoDBga ulanish hosil qilindi...');
    })
    .catch((err) => {
        console.error('MongoDBga ulanish vaqtida xato ro\'y berdi...', err);
    });

app.use('/user', user_router)
app.use('/category', category_router)
app.use('/file', file_router)
app.use('/product', product_router)
app.use('/admin', admin_router)
app.use('/order-product', order_product_router)
app.use('/order', order_router)

app.get("/", async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    let category = ''
    if(req.query.category != ''){
        category = await Category.findOne({ _id: req.query.category })
    }

    try {

        if (category && category != '') {
            const products = await Product.find({ category: category._id }).limit(limit).skip((page - 1) * limit)
            const count = await Product.countDocuments({ category: category._id })
            const totalPages = Math.ceil(count / limit)
            let result = {}
            result.products = products
            result.page = page
            result.totalPages = totalPages
            result.count = count
            return res.render('main', {
                result: result,
                category: category._id
            })
        } else {
            const products = await Product.find({}).limit(limit).skip((page - 1) * limit)
            const count = await Product.countDocuments()
            const totalPages = Math.ceil(count / limit)
            let result = {}
            result.products = products
            result.page = page
            result.totalPages = totalPages
            result.count = count
            return res.render('main', {
                result: result,
                category: ''
            })
        }


    } catch (error) {

        return res.render('main', {

        })

    }
});

app.get("/contact", (req, res) => {
    return res.render('contact', {
    })
});

app.listen(port, () => {
    console.log(`Application is up and running under localhost:${port}`)
})