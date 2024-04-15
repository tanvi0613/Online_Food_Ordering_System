const Menu = require('../../models/menu');
function menuController(){
    return {
        async main(req,res) {

            const order = await Menu.find();
            return res.render('main_menu',{order: order});
        },
        menu2(req,res) {
            res.render('menu2');
        }
    }
}
module.exports = menuController; 
