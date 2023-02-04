import express, { Router } from "express";
import { Order } from "../entity/Order";
import verifyRoles from "../middleware/verifyRole";
import roles from '../config/roles.json'
import { Book } from "../entity/Book";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    res.json(
        await Order.insert( {
            ...req.body,
        } )
    )
  } catch (err) {
    next(err);
  }
});

router.get('/' , async ( req , res , next ) => {
    try {

        const order = await Order.find({
            where : {
                user : {
                    id : req.user 
                }
            }
        })

        res.json(
            order
        )

    } catch (err) {
        next(err)
    }
} )
router.get('/:id' , async ( req , res , next ) => {
    try {
        const order = Order.findOne({
            where : {
                user : {
                    id : req.user
                } ,
                id : req.params.id
            }
        })

        if (!order) {
            return res.status(404).json({
                "message" : "Not Found"
            })
        }

        res.json(
            order
        )

    } catch (err) {
        next(err)
    }
})

router.use( verifyRoles( roles.libralian) )

router.get('/all', async ( req , res , next ) => {
    try {
        res.json(
            await Order.find({})
        ) 
    } catch (err) {
        next(err)
    }
})

router.post('/:id/approve', async ( req , res , next ) => {

    try {

        const order = await Order.findOne({ where: { id: req.params.id } });

        if (!order) {
            res.status(404).json({
                message : "notfound"
            })
        }

        res.json(
            await order.DoApprove()
        ) 

    } catch (err) {
        next(err)
    }
})

export default router
