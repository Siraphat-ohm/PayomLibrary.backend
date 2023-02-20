import express from "express";
import bookController from "../../../controller/bookController";
import verifyRoles from "../../../middleware/verifyRole";
import roles from "../../../config/roles.json"

const router = express.Router();

router.route('/page').get( verifyRoles(roles.student), bookController.getPage );
router.route('/by/:page').get( verifyRoles(roles.student), bookController.paginationBooks );
router.route('/:id').get( verifyRoles(roles.student), bookController.getBookById )

export = router;