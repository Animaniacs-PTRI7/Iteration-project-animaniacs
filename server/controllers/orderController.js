const db = require('../../database/pg_model.js');
const createError = require('../utils/constants')

const orderController = {};

//user buyer_id and seller_id to create order entry in orders table, 
// then use the returned order_id and the dish_id from request body to create entry in the Order-dish table
orderController.createOrder = async(req, res, next) =>{
  const sqlQuery1 = `INSERT INTO public.Orders 
  (fk_buyer_id, fk_seller_id, order_date, fulfilled) 
  VALUES ($1, $2, $3, $4) 
  RETURNING *;`;

  const sqlQuery2 = `INSERT INTO public.Order_dish 
    (fk_order_id, fk_dish_id, quantity)
    VALUES ($1, $2, $3) 
    RETURNING *`;
    
  try{
    const { buyer_id, seller_id, order_date, dishes } = req.body;
    const data = await db.query(sqlQuery1, [buyer_id, seller_id, order_date, false]);
    const order_id = data.rows[0].pk_order_id;

    //dishes is an array with each el being an object with dish_id and quantity
    // [{dish_id, quantity}]
    //loop through dishes array, for each dish, do a Insert Query with Order_id and Dishi_id and Quantity into the Order-dish table
    
    for(const key in dishes){
      db.query(sqlQuery2,[order_id, key, dishes[key].quantity])
    }
    
    return next();
  }catch (error) {
    return next(createError({ message: { err: error.message } }));
  }
}

//use user_id to get all orders of the user (Buyer)
orderController.getBuyerOrders = async(req, res, next) =>{

  // userType, userId 
  // req.body.userType === 'seller'

  try{
    const {  userId, userType } = req.body;
    // which order related to this userId and join table
    // orderId, orderDate , orderDails, name, 
    //"1" : {"name": "Dumplings -10 pcs", "price": "$8.00", "quantity": 1},

    // use userId to find order (orderTable) 
    // set orderId, to find the dish_id for the order (orderDish Table)
    // dish_id to get details name (dish)

    // join orderDish with Dish Table to get name


    return next()
  }catch (error) {
    return next(createError({ message: { err: error.message } }));
  }
}

//user user_id to get all orders of the user (Seller)
orderController.getSellerOrders = async(req, res, next) =>{
  try{
    const {  userId, userType } = req.body;
    // which order related to this userId and join table

    return next()
  }catch (error) {
    return next(createError({ message: { err: error.message } }));
  }

}

//seller can update order status to Fulfilled once done. use order_id
orderController.updateOrder = async() =>{

}

module.exports = orderController;