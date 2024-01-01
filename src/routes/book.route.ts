import { Request, Response, NextFunction, Router } from "express";
import prisma from "../utils/client";
import { HttpStatus } from "../utils/common/HttpStatusCode";
import { ApiError } from "../utils/common/ApiError";
import { body, validationResult } from "express-validator";

const router = Router();

router.post('/', 
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('ISBN').notEmpty().withMessage('ISBN is required'),
        body('language').isIn(['EN', 'TH']).withMessage('Invalid language'),
        body('stock').isInt({ min: 0 }).withMessage('Invalid stock'),
        body('authors').isArray().withMessage('Authors must be an array'),
        body('authors.*.id').notEmpty().withMessage('Each author must have an id'),
        body('ddc').isArray().withMessage('DDC must be an array'),
        body('ddc.*.id').notEmpty().isInt().withMessage('Each DDC entry must have an id')
    ],
    async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ApiError('Validation Error', HttpStatus.BAD_REQUEST, 'Invalid input', errors.array());
            }
            const { title, ISBN, language, authors, ddc } = req.body;
            const createdBook = await prisma.book.create({
                data: {
                    title,
                    ISBN,
                    language,
                    stock: 0,
                    authors: {
                        connect: authors.map((author: { id: number }) => ({ id: author.id }))
                    },
                    ddc: {
                        connect: ddc.map((ddc: { id: number }) => ({ id: ddc.id }))
                    }
                }
            });
            res.status(HttpStatus.CREATED).json(createdBook);
        } catch (e) {
            next(e);
        }
});

router.get('/', async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const books = await prisma.book.findMany({
            select: {
                id: true,
                title: true,
                ISBN: true,
                language: true,
                authors: {
                    select: { id: true, name: true }
                },
                ddc: {
                    select: { name: true, description: true }
                }
            }
        });
        res.status(HttpStatus.OK).json(books);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params;
        const foundBook = await prisma.book.findUniqueOrThrow({ 
            select: { 
                id: true, 
                title: true, 
                ISBN: true, 
                language: true, 
                authors: {
                    select: { id: true, name: true } 
                },
                ddc: {
                    select: { name: true, description: true }
                }
            },
            where: { id: Number(id) },
        });

        res.status(HttpStatus.OK).json(foundBook);

    } catch (e) {
        next(e);
    }
});

router.put('/:id', 
    async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params;
        const { title, ISBN, language, authors, ddc } = req.body;
        if (language && !['EN', 'TH'].includes(language)) {
            throw new ApiError('Validation Error', HttpStatus.BAD_REQUEST, 'Invalid language');
        }

        if (authors && (!Array.isArray(authors) || !authors.every(author => typeof author.id === 'number'))) {
            throw new ApiError('Validation Error', HttpStatus.BAD_REQUEST, 'Invalid authors format');
        }
        
        if (ddc && (!Array.isArray(ddc) || !ddc.every(ddcEntry => typeof ddcEntry.id === 'string'))) {
            throw new ApiError('Validation Error', HttpStatus.BAD_REQUEST, 'Invalid ddc format');
        }

        const foundBook = await prisma.book.findUniqueOrThrow({ where: { id: Number(id) }, include: { authors: true, ddc: true } });
        const updatedBook = await prisma.book.update({
            where: { id: Number(id) },
            data: {
                title : title || foundBook.title,
                ISBN : ISBN || foundBook.ISBN,
                language: language || foundBook.language,
                authors: {
                    set: !!authors ? authors.map((author: { id: number }) => ({ id: author.id })) : foundBook.authors
                },
                ddc: {
                    set: !!ddc ? ddc.map((ddc: { id: number }) => ({ id: ddc.id })) : foundBook.ddc
                }
            },
            include: {
                authors: true,
                ddc: true
            }

        });
        res.status(HttpStatus.OK).json(updatedBook);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params;
        await prisma.book.findUniqueOrThrow({ where: { id: Number(id) } });
        const deletedBook = await prisma.book.delete({
            where: { id: Number(id) }
        });
        res.status(HttpStatus.OK).json(deletedBook);
    } catch (e) {
        next(e);
    }
});

export default router;