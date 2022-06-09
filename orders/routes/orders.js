import express from 'express'
import {createOrder,updateOrder} from "../controller/order.js"
const router = express.Router();

router.post('/',createOrder)
router.patch('/:id',updateOrder)

export default router;