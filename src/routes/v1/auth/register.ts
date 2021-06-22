import { FastifyPluginAsync } from 'fastify';
import { User } from '../../../db/entities/User';

const USER = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        username: { type: 'string' },
        name: { type: 'string' },
    },
};

const register: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post(
        '/register',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['email', 'password', 'username'],
                    properties: {
                        email: { type: 'string' },
                        password: { type: 'string' },
                        username: { type: 'string' },
                    },
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            user: USER,
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            let user = new User();
            user = Object.assign(user, request.body);
            user.hashPassword();
            await User.save(user);
            reply.send({ user });
        },
    );
};

export default register;
