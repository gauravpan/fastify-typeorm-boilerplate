import fp from 'fastify-plugin';
import fastifyJwt, { FastifyJWTOptions } from 'fastify-jwt';

export default fp<FastifyJWTOptions>(async (fastify, opts) => {
    fastify.register(fastifyJwt, {
        secret: process.env.JWT_SECRET,
        sign: { expiresIn: process.env.JWT_EXPIRATION },
    });

    fastify.decorate('authenticate', async function (request, reply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });
});

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
    export interface FastifyInstance {
        authenticate(): Promise<void>;
    }
}

declare module 'fastify-jwt' {
    interface FastifyJWT {
        payload: {
            name: string;
            role: string;
            email: string;
            username: string;
        };
    }
}
