import fp from 'fastify-plugin';
import { Connection } from 'typeorm';
import connectDB from '../db/typeorm';

export default fp(async (fastify, opts, done) => {
    fastify.decorate('db', await connectDB());
    done();
});

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
    export interface FastifyInstance {
        db: Connection;
    }
}
