import { Knex } from "knex";
import { requestContext } from "fastify-request-context";
import { FastifyInstance } from "fastify";

export function ipRoutes(fastify: FastifyInstance, options: any, done: any) {
  fastify.post("/ip", (req, res) => {
    let knex = req.requestContext.get("knex");
  });
  fastify.get("/", async (req, res) => {
    return "hello";
  });
  done();
}
