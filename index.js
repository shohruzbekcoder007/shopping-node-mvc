const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require("cookie-parser")

const user_router = require('./routers/user')
const category_router = require('./routers/category')
const file_router = require('./routers/files')
const product_router = require('./routers/product')

const app = express();

const port = process.env.PORT || 8080;

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
mongoose.connect('mongodb://127.0.0.1:27017/shopping')
// mongoose.connect('mongodb+srv://forhumoyun_aka:forhumoyun_aka@cluster0.ycg5joo.mongodb.net/shoping?retryWrites=true&w=majority')
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

app.get("/", (req, res) => {
    return res.render('main', {
    })
});

app.get("/contact", (req, res) => {
    return res.render('contact', {
    })
});

app.get("/admin", (req, res) => {
    return res.render('login', {
    })
});

// app.get("/admin", (req, res) => {
//     return res.render('main_admin', {
//     })
// });

app.get("/admin-product", (req, res) => {
    return res.render('admin_product', {
    })
});

app.get("/order", (req, res) => {
    return res.render('admin_order', {
    })
}); 

app.listen(port, () => {
    console.log(`Application is up and running under localhost:${port}`)
})