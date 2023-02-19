import express from "express";
import orderController from "../controller/orderController";
import verifyRoles from "../middleware/verifyRole";
import roles from "../config/roles.json"

const router = express.Router();

router.route("/")
            .post( orderController.handleOrder )
            .get( orderController.getOrder )

router.route("/all")
            .get( orderController.getAllOrder );

router.route("/:id")
            .get( orderController.getOrderById );

router.route("/:id/approve")
            .get( verifyRoles(roles.libralian) ,orderController.handleApprove );

router.route("/:id/discard")
            .get( verifyRoles(roles.libralian) ,orderController.handleDiscard);

export default router;