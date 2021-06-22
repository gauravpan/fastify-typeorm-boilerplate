import fp from 'fastify-plugin';
import swagger, { SwaggerOptions } from 'fastify-swagger';

export default fp<SwaggerOptions>(async (fastify, opts) => {
    fastify.register(swagger, {
        routePrefix: '/docs',
        swagger: {
            info: {
                title: 'Test swagger',
                description: 'Testing the Fastify swagger API',
                version: '0.1.0',
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here',
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'user', description: 'User related end-points' },
                { name: 'code', description: 'Code related end-points' },
            ],
            definitions: {
                User: {
                    type: 'object',
                    required: ['id', 'email'],
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                    },
                },
            },
            securityDefinitions: {
                apiKey: {
                    type: 'apiKey',
                    name: 'apiKey',
                    in: 'header',
                },
            },
        },
        uiConfig: {
            // docExpansion: 'full',
            deepLinking: false,
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        exposeRoute: true,
    });

    fastify.ready((err) => {
        if (err) throw err;
        fastify.swagger();
    });
});
