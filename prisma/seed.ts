import { Book, Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import hierarchies from './mock/hierarchies.json';
import authors from './mock/authors.json';
import books from './mock/books.json';

async function main() {
    await prisma.dDC.createMany({
        data: [
            { id: '0', name: '000', description: 'Computer science infromation and general works' },
            { id: '1', name: '100', description: 'Philosophy and psychology' },
            { id: '2', name: '200', description: 'Religion' },
            { id: '3', name: '300', description: 'Social sciences' },
            { id: '4', name: '400', description: 'Language' },
            { id: '5', name: '500', description: 'Science' },
            { id: '6', name: '600', description: 'Technology' },
            { id: '7', name: '700', description: 'Arts and recreation' },
            { id: '8', name: '800', description: 'Literature' },
            { id: '9', name: '900', description: 'History and geography' },
        ],
    });

    await prisma.dDC.createMany({
        data: hierarchies.map(entry => (
            {
            ...entry,
        })),
    });

    await prisma.author.createMany({
        data: authors.map(entry => (
            {
            ...entry,
        })),
    });



    const createBooks = prisma.book.createMany({
        data: books.map(entry => entry.data) as Book[],
    });

    const connectAuthors = books.map(book => {
        return prisma.book.update({
            where: {
                ISBN: book.data.ISBN
            },
            data: { ...book.connect as Prisma.BookUpdateInput }
        })
    });

    await prisma.$transaction([createBooks, ...connectAuthors]);

    console.log( 'DDC seeded' );
    console.log( 'Hierarchies seeded' );
    console.log( 'Authors seeded' );
    console.log( 'Books seeded' );

}

main()
    .catch(e => {
        console.error("Error: ", e.message);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });