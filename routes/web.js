const path = require('path');
const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/customersController');
const menuController = require('../app/http/controllers/menuController');
const orderController = require('../app/http/controllers/customers/orderController');
const AdminOrderController = require('../app/http/controllers/admin/orderController');
const guest = require('../app/http/middlewares/guest');
const auth = require('../app/http/middlewares/auth');
function initRoutes(app){
    //storing routes
    app.get('/', homeController().index);
    app.get('/index', homeController().index);
    app.get('/main_menu', menuController().main);
    app.get('/menu2', menuController().menu2);

    app.get('/login', guest, authController().login);
    app.post('/login', authController().postLogin);

    app.get('/register', guest, authController().register);
    app.post('/register', authController().postRegister);

    app.get('/logout',  authController().logout);

    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);

    app.post('/orders', auth, orderController().store);
    app.get('/orders', auth, orderController().index);

    //Admin Routes
    app.get('/adminOrders', auth, AdminOrderController().index);
}
//in node project every file is a module and modules can be exported
module.exports = initRoutes; //exporting this function
