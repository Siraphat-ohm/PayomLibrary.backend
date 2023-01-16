
import express from "express";
import refreshController from "../controller/refreshController";

const router = express.Router();

router.post('/', refreshController.handleRefresh);

export = router;