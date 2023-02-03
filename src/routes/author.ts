import { Router } from "express";
import { Author } from "../entity/Author";

const router = Router()

router.post('/', async ( req , res , next ) => {
    try {
        res.json(
            await Author.create( req.body ).save()
        ) 
    } catch (err) {
        next(err)
    }
})

router.get('/', async ( req , res , next ) => {
    try {
        res.json(
            await Author.find()
        ) 
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async ( req , res , next ) => {
    try {
        res.json(
            await Author.findOne({ where : { id : req.params.id }})
        )
    } catch (err) {
        next(err)
    }
})

export default router