import { FastifyPluginAsync } from 'fastify';

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const routeOpts = {
        // schema: {
        //     body: {
        //         type: 'object',
        //         required: ['email'],
        //         properties: {
        //             email: { type: 'string' },
        //         },
        //     },
        // },
    };

    fastify.get('/', routeOpts, async function (request, reply) {
        return 'this is an example to copy paste :)';
    });
};

export default example;
