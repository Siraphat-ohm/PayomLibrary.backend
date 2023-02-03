import express, { Router } from "express";
import { Order } from "../../entity/Order";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

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
