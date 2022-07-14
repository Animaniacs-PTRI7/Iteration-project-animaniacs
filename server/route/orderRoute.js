const { Router, json } = require('express');
const router = Router();
const order = require('../controllers/orderController')

router.post('/create-order', order.createOrder, (res, req)=>{
  return res.status(200).json({message: 'Success'})
})

module.exports = router;