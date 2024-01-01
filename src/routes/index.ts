import { Router } from "express";
import authentication from "../middleware/authentication";
import userRoute from "./user.route";
import authorization from "../middleware/authorization";


const router = Router();

router.use(userRoute);
router.use(authentication);
router.use('/test', authorization(['ADMIN']), (req, res) => {
    res.json({ message: "Hello World" });
});

export default router;