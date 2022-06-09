import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
  order_id:{type: String, unique: true}, // String is shorthand for {type: String}
  status: {type:String, enum: ['CREATED', 'PROCESSING', 'FULFILLED', 'CANCELED'], default:"CREATED"},
  date: {type:Date, required: true},
  product: {
    name: String,
    id: String,
    description: String,
    price: Number
  },
  address:{type:String}
});
const Order = mongoose.model('Order',orderSchema);
export default Order;