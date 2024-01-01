import { Router } from "express";
import verify from "../middleware/verifyToken";
import userRoute from "./user.route";


const router = Router();

router.use('/user', userRoute);
router.use(verify);
router.get('/test', (req, res) => {
    res.send("Hello World!");
});

export default router;