import express from "express";
import bookController from "../../controller/bookController";

const router = express.Router();

router.get('/', bookController.getAllBooks);

export = router;