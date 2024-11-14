import 'dotenv/config';
import {Elysia} from 'elysia';
import {swagger} from '@elysiajs/swagger';
import {cors, HTTPMethod} from '@elysiajs/cors';

import {withAxiom} from 'next-axiom';
import {jwt} from '@elysiajs/jwt';
// Routes
import {auth_routes} from './auth';
import studio_routes from './studio';
import profile_routes from './profile';
import {validate_auth} from './auth/validate_auth';
import {connectToDatabase} from '../middleware';
import jot_routes from './jot';

const corsConfig = {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'] as HTTPMethod[],
  allowedHeaders: '*',
  exposedHeaders: '*',
  maxAge: 5,
};
const swaggerConfig = {
  documenation: {
    info: {
      title: 'Xander API Documentation',
      version: '0.0.0',
    },
  },

  path: '/',
};

// export function useAPI(prefix?: string) {
//   const app = new Elysia({prefix: "/api"})
//     .use(
//       jwt({
//         name: 'jwt',
//         secret: process.env.SECRET || 'SECRET',
//       })
//     ) // Auth routes
//     .use(cors(corsConfig))
//     .use(swagger(swaggerConfig))
//     .resolve(connectToDatabase)
//     .derive(validate_auth)
//     .use(auth_routes) //auth routes
//     .use(studio_routes)
//     .use(profile_routes);

//   return app;
// }

// const app = useAPI('/api');

const app = new Elysia({prefix: '/api'})
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.SECRET || 'SECRET',
    })
  ) // Auth routes
  .use(cors(corsConfig))
  .use(swagger(swaggerConfig))
  .resolve(connectToDatabase)
  .derive(validate_auth)
  .use(auth_routes) //auth routes
  .use(studio_routes)
  .use(profile_routes)
  .use(jot_routes);

// Expose methods
export const GET = withAxiom(app.handle);
export const POST = withAxiom(app.handle);
export const PATCH = withAxiom(app.handle);
export const DELETE = withAxiom(app.handle);
export const PUT = withAxiom(app.handle);

export type API = typeof app;
