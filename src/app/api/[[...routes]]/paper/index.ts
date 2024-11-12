import {Elysia,t}from "elysia";

const paper_routes = new Elysia({
  serve: {
    maxRequestBodySize: 1024 * 1024 * 8,
  },
});

export default paper_routes;