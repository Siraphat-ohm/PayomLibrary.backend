import express, { Request, Response } from "express";
import uploadController from "../../controller/uploadController";
import verifyRoles from "../../middleware/verifyRole";
import roles from "../../config/roles.json"


const router = express.Router();

router.get('/',  uploadController.handleUpload);

export = router;