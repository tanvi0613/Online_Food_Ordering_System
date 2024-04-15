const Order = require('../../../models/order');

function orderController() {
    return {
        async index(req, res) {
            try {
                const orders = await Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).populate('customerId', '-password');
                res.render('adminOrders', { orders });
            } catch (err) {
                console.error(err);
                // Handle errors appropriately (e.g., send an error response)
            }
        }
    };
}

module.exports = orderController;
