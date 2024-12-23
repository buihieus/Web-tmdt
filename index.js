const express = require('express')
const path = require('path');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()

const routes = require("./routes/client/index.route")
const routesAdmin = require("./routes/admin/index.route")

const app = express()
const port = process.env.PORT; 

app.use(methodOverride('_method'))

const database = require("./config/database");
database.connect();

const configSystem = require("./config/system");

// parse application/x-www-form-urlencoded (Lấy dữ liệu từ req.body)
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

//Flash (Hiện thông báo)
app.use(cookieParser('VANCHIKHANH'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(express.static(`${__dirname}/public`))

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//App Locals variables (chỉ sử dụng biến toàn cục này trong file pug)
app.locals.preFixAdmin = configSystem.prefixAdmin;

//Routes
routes(app);
routesAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})