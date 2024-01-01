import { Request, Response, NextFunction, Router } from 'express';
import prisma from '../utils/client';
import { HttpStatus } from '../utils/common/HttpStatusCode';
import { body, validationResult } from 'express-validator';
import { ApiError } from '../utils/common/ApiError';
import dayjs from 'dayjs';

const router = Router();

router.get( '/', async( req: Request, res: Response, next: NextFunction ) => {
    try {
        const orders = await prisma.order.findMany();
        res.status(HttpStatus.ACCEPTED).json(orders);
    } catch (e) {
        next(e);
    }
});

router.get( '/:id', async( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params;
        const foundOrder = await prisma.order.findUniqueOrThrow({
            where: { id: Number(id) }
        });
        res.status(HttpStatus.ACCEPTED).json(foundOrder);
    } catch (e) {
        next(e);
    }
});

router.post( '/', 
    [
        body('books').isArray( { min: 1} ).notEmpty().withMessage('Books must be provided'),
        body('books.*.id').notEmpty().isInt().withMessage('Books must be an array of integers'),
        body('books.*.quantity').notEmpty().isInt( { min: 1}).withMessage('Books must be an array of integers')
    ],
    async( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { books } = req.body;
        const errors = validationResult(req);
        const userId = req.payload?.id;
        if (!errors.isEmpty()) {
            throw new ApiError('Validation Error', HttpStatus.BAD_REQUEST, 'Invalid input', errors.array());
        }

        const foundBooks = books.map( (book: any) => prisma.book.findUniqueOrThrow({ where: { id: Number(book.id) } }) );

        const booksResult = await prisma.$transaction([...foundBooks ]);

        for ( let i = 0; i < booksResult.length; i++ ) {
            if ( booksResult[i].stock - books[i].quantity < 0 ) {
                throw new ApiError('Validation Error', HttpStatus.BAD_REQUEST, 'Not enough stock');
            }
        }

        const booksToUpdate = booksResult.map( (book: any, index: number) => {
            return prisma.book.update({
                where: { id: book.id },
                data: { stock: book.stock - books[index].quantity }
            });
        });

        const orders = booksResult.map( (book: any, index: number) => {
            return prisma.order.create({
                data: {
                    bookId: book.id,
                    userId: userId,
                    quantity: books[index].quantity,
                }
            });
        });

        await prisma.$transaction([...booksToUpdate, ...orders]);

        res.sendStatus(HttpStatus.CREATED);

    } catch (e) {
        next(e);
    }
});

router.get( '/approve/:id', async( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params;
        const foundOrder = await prisma.order.findUniqueOrThrow({
            where: { id: Number(id) }
        });

        if ( foundOrder.approved ) {
            throw new ApiError('Validation Error', HttpStatus.BAD_REQUEST, 'Order already approved');
        }

        await prisma.book.findUniqueOrThrow({
            where: { id: foundOrder.bookId }
        });

        await prisma.order.update({
            where: { id: foundOrder.id },
            data: { 
                approved: true,
                returnDate: dayjs().add(7, 'day').toDate()
             }
        });

        res.sendStatus(HttpStatus.NO_CONTENT);


    } catch (e) {
        next(e);
    }
});

router.delete( '/decline/:id', async( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params;
        const foundOrder = await prisma.order.findUniqueOrThrow({
            where: { id: Number(id) }
        });

        await prisma.book.findUniqueOrThrow({
            where: { id: foundOrder.bookId }
        });

        await prisma.book.update({
            where: { id: foundOrder.bookId },
            data: { stock: { increment: foundOrder.quantity } }
        });

        await prisma.order.delete({
            where: { id: foundOrder.id }
        });

        res.sendStatus(HttpStatus.NO_CONTENT);

    } catch (e) {
        next(e);
    }
});

router.get( '/return/:id', async( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params;
        const foundOrder = await prisma.order.findUniqueOrThrow({
            where: { id: Number(id) }
        });

        if ( !foundOrder.approved ) {
            throw new ApiError('Validation Error', HttpStatus.BAD_REQUEST, 'Order not approved');
        }

        if ( foundOrder.returned ) {
            throw new ApiError('Validation Error', HttpStatus.BAD_REQUEST, 'Order already returned');
        }

        await prisma.book.findUniqueOrThrow({
            where: { id: foundOrder.bookId }
        });

        await prisma.order.update({
            where: { id: foundOrder.id },
            data: { 
                returned: true,
             }
        });

        await prisma.book.update({
            where: { id: foundOrder.bookId },
            data: { stock: { increment: foundOrder.quantity } }
        });

        res.sendStatus(HttpStatus.NO_CONTENT);
    }
    catch (e) {
        next(e);
    }
});

export default router;