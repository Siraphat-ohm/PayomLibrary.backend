import express from "express";
import verifyRoles from "../../middleware/verifyRole";
import roles from "../../config/roles.json"
import orderController from "../../controller/orderController";

const router = express.Router();

router.route('/').get(verifyRoles(roles.libralian), orderController.handleOrder);



export = router;