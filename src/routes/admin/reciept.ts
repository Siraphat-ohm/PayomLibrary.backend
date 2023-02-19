import express from "express";
import recieptControllet from "../../controller/recieptControllet";

const router = express.Router();

router.route("/all").get( recieptControllet.getRecieptAll );

router.route("/:id/receive").get( recieptControllet.handleReciept );

export = router;
