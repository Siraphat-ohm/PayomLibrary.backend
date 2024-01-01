import { Router } from "express";
import authentication from "../middleware/authentication";
import userRoute from "./user.route";
import bookRoute from "./book.route";
import orderRoute from "./order.route";

const router = Router();

router.use( userRoute );
router.use( authentication );
router.use( '/books', bookRoute );
router.use( '/order', orderRoute );

export default router;