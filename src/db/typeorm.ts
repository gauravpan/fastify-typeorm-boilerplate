import { createConnection, Connection } from 'typeorm';
import { User } from './entities/User';

export default async function connectDB(): Promise<Connection> {
    return createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User],
        synchronize: true,
    }).then((connection) => {
        console.log(' 🧲✨ Database connected✨🧲');
        return connection;
    });
}
