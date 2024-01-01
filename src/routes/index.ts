import { Router } from "express";
import authentication from "../middleware/authentication";
import userRoute from "./user.route";
import bookRoute from "./book.route";

const router = Router();

router.use(userRoute);
router.use(authentication);
router.use('/books', bookRoute);

export default router;