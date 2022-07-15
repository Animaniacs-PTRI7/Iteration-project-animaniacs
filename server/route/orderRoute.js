const { Router, json } = require('express');
const router = Router();
const order = require('../controllers/orderController')
const tokenVerifier = require('../controllers/verifyTokenController');

router.post('/create-order',tokenVerifier, order.createOrder, (res, req)=>{
  return res.status(200).json('Success')
})

module.exports = router;