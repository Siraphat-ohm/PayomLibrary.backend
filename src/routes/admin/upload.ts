import express, { Request, Response } from "express";
import uploadController from "../../controller/uploadController";


const router = express.Router();

router.get('/',  uploadController.handleUpload);

export = router;