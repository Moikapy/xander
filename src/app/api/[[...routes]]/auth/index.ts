import {Elysia, t} from 'elysia';
import {connectToDatabase} from '../../middleware';
// DAO

import {validate_auth} from './validate_auth';
import jwt from '@elysiajs/jwt';

export const auth_routes = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.SECRET || 'SECRET',
    })
  )
  .resolve(connectToDatabase)
  .post(
    '/signup',
    async ({body, db, usersCollection}) => {
      console.log('eb', typeof db);

      try {
        const {email, password} = body as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          return {
            status: 400,
            body: {message: 'Email and password are required'},
          };
        }

        const existingUser = await usersCollection.findOne({email});
        if (existingUser) {
          return {status: 400, body: {message: 'User already exists'}};
        }
        // Hash the password before storing
        const hashedPassword = await Bun.password.hash(password, {
          memoryCost: 4, // memory usage in kibibytes
          timeCost: 3, // the number of iterations
          algorithm: 'argon2id',
        });
        await usersCollection.insertOne({email, password: hashedPassword});
        return {
          status: 201,
          body: {message: 'User registered successfully'},
        };
      } catch (error: any) {
        console.log('Error Message - Signup: ', error.message);
        return {status: 500, body: {message: error.message}};
      }
    },
    {body: t.Object({email: t.String(), password: t.String()})}
  )
  .post(
    '/login',
    async ({body, jwt, db, usersCollection, set}) => {
      try {
        const {email, password} = body as {
          email: string;
          password: string;
        };
        // Check if the user exists
        const user = await usersCollection.findOne({email});
        // If the user does not exist, return an error
        if (!user) {
          set.status = 401;
          return {
            status: 401,
            body: {message: 'Invalid username or password'},
          };
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await Bun.password.verify(
          password,
          user.password
        );
        if (!isPasswordValid) {
          set.status = 401;
          return {
            status: 401,
            body: {message: 'Invalid username or password'},
          };
        }

        const token = await jwt.sign({email});
        set.status = 200;
        return {status: 200, body: {message: 'Login successful', token}};
      } catch (error: any) {
        set.status = 500;
        return {status: 500, body: {message: error.message}};
      }
    },
    {body: t.Object({email: t.String(), password: t.String()})}
  )
  .derive(validate_auth)
  .get('/auth', async ({jwt, db, usersCollection, user, set}) => {
    try {
      if (user === null) {
        set.status = 401;
        return {status: 401, message: 'Unauthorized'};
      }
      const _user = await usersCollection.findOne({email: user.email});
      if (!_user) {
        set.status = 401;
        return {status: 401, message: 'Unauthorized'};
      }
      set.status = 200;
      return {status: 200, message: 'Authorized'};
    } catch (error: any) {
      set.status = 500;
      return {status: 500, message: error.message};
    }
  });
