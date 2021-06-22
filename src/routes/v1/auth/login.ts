import { FastifyPluginAsync } from 'fastify';
import { User } from '../../../db/entities/User';

const login: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post(
        '/login',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string' },
                        password: { type: 'string' },
                    },
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            token: { type: 'string' },
                        },
                    },
                },
            },
        },
        async (req, reply) => {
            const { email, password } = req.body as any;

            let user = await User.findOne({ where: { email } });
            if (!user)
                return reply.status(301).send({ message: 'User not found.' });
            if (!user.checkIfPasswordMatch(password))
                return reply
                    .status(301)
                    .send({ message: 'Password is incorrect.' });

            const jwtPayload = {
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
            };

            const token = fastify.jwt.sign(jwtPayload);
            reply.send({ token });
        },
    );
};

export default login;
