const { Router, json } = require('express');
const router = Router();
const order = require('../controllers/orderController')
const tokenVerifier = require('../controllers/verifyTokenController');

router.post('/create-order',tokenVerifier, order.createOrder, (req, res)=>{
  return res.status(200).json('Success')
})
router.get('/orders/:userId',tokenVerifier, order.getBuyerOrders, (req, res)=>{
  return res.status(200).json(res.locals.orders)
})

router.get('/orderSales/:userId',tokenVerifier, order.getSellerOrders, (req, res)=>{
  return res.status(200).json(res.locals.orders)
})
module.exports = router;