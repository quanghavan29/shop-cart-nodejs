const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const homeRouter = require('./src/routes/home.router');
const productRouter = require('./src/routes/product.rotuer');
const registerRouter = require('./src/routes/register.router');
const loginRouter = require('./src/routes/login.router');
const profileRouter = require('./src/routes/profile.router');
const logoutRouter = require('./src/routes/logout.router');

// Require handlebars and just-handlebars-helpers
const Handlebars = require('handlebars');
const H = require('just-handlebars-helpers');
const bodyParser = require("body-parser");

// Register just-handlebars-helpers with handlebars
H.registerHelpers(Handlebars);

const app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('assets'));

// res locals
const Category = require('./src/models/category.model');
app.use(async function (req, res, next) {
    if (req.session.isAuthenticated === null) {
        req.session.isAuthenticated = false;
    }
    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.IsAuthUser = req.session.authUser;

    // get all category
    const categories = await Category.findAll();
    res.locals.categories = categories;

    next();
});

// set up handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main.handlebars',
}));
app.set('view engine', 'handlebars');

// call router => home
app.use('/home', homeRouter);

// call router => product
app.use('/product', productRouter);

// call router => register
app.use('/register', registerRouter);

// call router => register
app.use('/login', loginRouter);

// call router => profile
app.use('/profile', profileRouter);

// call router => register
app.use('/logout', logoutRouter);

// port
app.listen(4000, () => {
    console.log('Server is running at http://localhost:4000/home');
})