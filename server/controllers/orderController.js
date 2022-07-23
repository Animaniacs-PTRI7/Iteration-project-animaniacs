const db = require("../../database/pg_model.js");
const createError = require("../utils/constants");

const orderController = {};

//user buyer_id and seller_id to create order entry in orders table, 
// then use the returned order_id and the dish_id from request body to create entry in the Order-dish table
orderController.createOrder = async (req, res, next) => {
  const currentDate = new Date();
  const cDay = currentDate.getDate()
  const cMonth = currentDate.getMonth() + 1
  const cYear = currentDate.getFullYear()
  const dateFormat = `${cYear}-${cMonth}-${cDay}`

  console.log('date for create order', dateFormat);
  try {
    const sqlQuery1 = `INSERT INTO public.Orders 
    (fk_buyer_id, fk_seller_id, order_date, total, fulfilled) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;`;

        const sqlQuery2 = `INSERT INTO public.Order_dish 
      (fk_order_id, fk_dish_id, quantity)
      VALUES ($1, $2, $3) 
      RETURNING *`;


    const { buyer_id, seller_id, dishes, price } = req.body;
    const data = await db.query(sqlQuery1, [buyer_id, seller_id, dateFormat, Number(price), false]);
    const order_id = data.rows[0].pk_order_id;

    for (const key in dishes) {
      db.query(sqlQuery2, [order_id, key, dishes[key].quantity])
    }
    const sqlQuery3 = `SELECT kitchen_name FROM sellers
    WHERE pk_seller_id = $1`
    const kitchenData = await db.query(sqlQuery3, [seller_id])

    res.locals.data = { order_id, kitchen_name: kitchenData.rows[0].kitchen_name, price }
    return next();
  } catch (error) {
    return next(createError({ message: { err: error.message } }));
  }
}

//use user_id to get all orders of the user (Buyer)
orderController.getBuyerOrders = async (req, res, next) => {
  try {
    // const { userId } = req.params;
    const { userId } = req.params;
    //console.log('userId-->', userId)
    // which order related to this userId and join table
    // TO GET orderId, orderDate , orderDails, name, 


        // use userId to find order (orderTable) 
        // set orderId, to find the dish_id from the order (orderDish Table)
        // dish_id to get details name (dish)

        // join orderDish with Dish Table to get name
        //"1" : {"name": "Dumplings -10 pcs", "price": "$8.00", "quantity": 1},


    // get all oreder from userId
    const queryOrderId = `SELECT o.*, s.kitchen_name, s.seller_street_name, s.seller_city, s.seller_zip_code, s.seller_state FROM Orders as o
    JOIN Sellers as s
    ON fk_seller_id = pk_seller_id
    WHERE fk_buyer_id = $1;`;
    const dataOrderByUser = await db.query(queryOrderId, [userId])


    // iterate thru order to get each order id
    const orderId = []

    const resultOrder = []
    dataOrderByUser.rows.forEach((ele) => {
      resultOrder.push(ele);
      orderId.push(ele.pk_order_id);
    })

    const querOderDish = `SELECT fk_dish_id, quantity FROM Order_dish
    WHERE fk_order_id in ($1)`;

    const query = `SELECT * FROM Dishes
    WHERE pk_dish_id in ($1)`
    for (let i = 0; i < resultOrder.length; i++) {
      await db.query(querOderDish, [resultOrder[i].pk_order_id]).then(async data => {
        const newRow = []
        // console.log('order_dish', data.rows)
        for (let j = 0; j < data.rows.length; j++) {
          // console.log('data.rows', data.rows[j].fk_dish_id)
          // use fk_dish_id to find Dishes id
          await db.query(query, [data.rows[j].fk_dish_id]).then(dish => {
            //console.log('dish again-->', dish.rows[0])
            newRow.push({ ...data.rows[j], dish_name: dish.rows[0].dish_name, price: dish.rows[0].price, description: dish.rows[0].description }
            )
          }
          )
        }

        resultOrder[i].dishes = [...newRow];
      }
      )
    }
    res.locals.orders = resultOrder;
    return next()
  } catch (error) {
    return next(createError({ message: { err: error.message } }));
  }
}

//user user_id to get all orders of the user (Seller)
orderController.getSellerOrders = async (req, res, next) => {

  try {
    const { userId } = req.params;

    const queryOrderId = `SELECT o.*, s.kitchen_name, s.seller_street_name, s.seller_city, s.seller_zip_code, s.seller_state FROM Orders as o
    JOIN Sellers as s
    ON fk_seller_id = pk_seller_id
    WHERE fk_seller_id = $1;`;
    const dataOrderByUser = await db.query(queryOrderId, [userId])

    const orderId = []

    const resultOrder = []
    dataOrderByUser.rows.forEach((ele) => {
      resultOrder.push(ele);
      orderId.push(ele.pk_order_id);
    })

    const querOderDish = `SELECT fk_dish_id, quantity FROM Order_dish
      WHERE fk_order_id in ($1)`;

    const query = `SELECT * FROM Dishes
      WHERE pk_dish_id in ($1)`
    for (let i = 0; i < resultOrder.length; i++) {
      await db.query(querOderDish, [resultOrder[i].pk_order_id]).then(async data => {
        const newRow = []
        for (let j = 0; j < data.rows.length; j++) {
          await db.query(query, [data.rows[j].fk_dish_id]).then(dish => {
            newRow.push({ ...data.rows[j], dish_name: dish.rows[0].dish_name, price: dish.rows[0].price, description: dish.rows[0].description }
            )
          }
          )
        }
        resultOrder[i].dishes = [...newRow];
      }
      )
    }
    res.locals.orders = resultOrder;
    return next()
  } catch (error) {
    //return next({ message: error.message });
    return next(createError({ message: { err: error.message } }));
  }
}

orderController.updateOrder = async (req, res, next) => {
  const { order_id, fulfilled } = req.body;
  const query = `UPDATE orders
  SET fulfilled=$1
  WHERE pk_order_id=$2
  RETURNING *;`;

  const update = fulfilled ? false : true

  try {
    const data = await db.query(query, [update, order_id]);
    res.locals.order = data.rows[0];
    return next()
  }
  catch (err) {
    return next(createError({ message: { err: error.message } }));
  }
}

module.exports = orderController;