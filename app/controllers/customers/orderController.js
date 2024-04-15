const Order = require('../../../models/order');
function orderController () {
    return {
        store(req,res) {
            //console.log(req.body);
            //validate request
            const {phone, address} = req.body;
            const order = new Order({
                //passport makes the user available
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })
            order.save().then(result => {
                req.flash('success', 'Order placed successfully!');
                return res.redirect('/orders');
            }).catch(err => {
                return res.redirect('/cart');
            })
        },
        async index(req,res){
            const orders = await Order.find({ customerId: req.user._id },
                null,
                { sort: {'createdAt': -1 }});
            res.render('orders', {orders: orders});
        }
    }
}

module.exports = orderController;
