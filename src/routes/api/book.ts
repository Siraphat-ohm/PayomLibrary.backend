import express from "express";
import bookController from "../../controller/bookController";

const router = express.Router();

router.get('/', bookController.getAllBooks);

router.get('/pages', bookController.getNumberOfPages);

router.route('/:page').get( bookController.paginationBooks );


export = router;