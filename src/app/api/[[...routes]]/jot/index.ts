import {Elysia, t} from 'elysia';

const jot_routes = new Elysia({
  prefix: '/jot',
  serve: {
    maxRequestBodySize: 1024 * 1024 * 8,
  },
})
  .post('/create', async ({body, set}) => {
    try {
      set.status = 200;
      return {
        message: 'created',
      };
    } catch (error) {
      set.status = 500;
      return {
        message: 'Error: ' + error,
      };
    }
  },{
    body: t.Object({
      title: t.String(),
      content: t.String(),
    }),
  })
  .get('/:id', async ({params: {id}}) => {
    return {id};
  });

export default jot_routes;
