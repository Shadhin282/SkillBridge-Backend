import app from './app';
import { prisma } from './lib/prisma';

const PORT = process.env.PORT ;




async function main() {
    try {
        await prisma.$connect()
    console.log("Connected to the database Successfully")

//     app.listen(PORT,()=>{
//     console.log('Server is running on port ', PORT);
// })
    } catch (error) {
        console.log("failed to connect to the database,  ", error)
        await prisma.$disconnect()
        process.exit(1)
    }
}

main();