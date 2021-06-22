import { FastifyPluginAsync } from 'fastify';
import { User } from '../../../db/entities/User';

const changePassword: FastifyPluginAsync = async (
    fastify,
    opts,
): Promise<void> => {
    fastify.post(
        '/change-password',
        {
            preValidation: [fastify.authenticate],
            schema: {
                body: {
                    type: 'object',
                    required: ['password'],
                    properties: {
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

        async (request, reply) => {
            const { password } = request.body as any;
            const email = request.user?.email;

            let user = await User.findOne({ where: { email } });
            if (!user) {
                return reply.status(301).send({ message: 'Email not found.' });
            }

            user.password = password;
            user.hashPassword();
            await User.save(user);
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

export default changePassword;
