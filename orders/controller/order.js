import axios from "axios";
import Order from "../models/orders.js";

export const createOrder = async (req,res) =>{
    try {
        const ID = genID();
        const Orderdate = Date.now();
        const details = req.body;
        const neworder = new Order({...details, order_id: ID,date:Orderdate});
        //payment check
        //products database decrement
        axios.post("http://localhost:5000/shipping/",{"order_id":ID,"address":details.address,"total":details.product.price});
        // send mail axios.post("http://localhost:5005/notification/",{"order_id":ID,"address":details.address,"total":details.product.price})
        await neworder.save();
        res.status(200).json(neworder);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

export const updateOrder = async (req,res)=>{
        try{
            const id = req.params.id;
    
            const order = await Order.findOne({order_id: id});
    
            let newStatus;
            switch(order.status){
                case 'CREATED':
                    newStatus = 'PROCESSING';
                    break;
                case 'PROCESSING':
                    newStatus = Math.random() > .5? 'FULLFILLED': 'CANCELED'
                    break;
                    default:
                        newStatus = 'CREATED'
            };
    
            await Order.findOneAndUpdate({order_id: id}, {status: newStatus});
            res.status(200).json(newStatus);
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    }


function genID(){
    let ID="";
    const st = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for(let i=0;i<5;i++){
        ID += st.charAt(Math.floor(Math.random()*st.length));
}
    return ID;
}