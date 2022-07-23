const { Router, json } = require("express");
const router = Router();
const order = require("../controllers/orderController");
const tokenVerifier = require("../controllers/verifyTokenController");

router.post('/create-order',tokenVerifier, order.createOrder, (req, res)=>{
  return res.status(200).json(res.locals.data);
})

//get buyer orders '/orders/:userId'
router.get('/orders/:userId',tokenVerifier, order.getBuyerOrders, (req, res)=>{
  return res.status(200).json(res.locals.orders)
})


//get seller orders
router.get('/orderSales/:userId',tokenVerifier, order.getSellerOrders, (req, res)=>{
  return res.status(200).json(res.locals.orders)
})

//update orders
router.post('/update-order',tokenVerifier, order.updateOrder, (req, res)=>{
  return res.status(200).json(res.locals.order)
})

module.exports = router;