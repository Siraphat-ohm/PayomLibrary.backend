import express from "express";
import bookController from "../../controller/bookController";
import verifyRoles from "../../middleware/verifyRole";
import roles from "../../config/roles.json"

const router = express.Router();

router.route('/').get(verifyRoles(roles.student), bookController.getAllBooks);

router.route('/pages').get(verifyRoles(roles.student), bookController.getNumberOfPages);

router.route('/:page').get(verifyRoles(roles.student), bookController.paginationBooks );


export = router;