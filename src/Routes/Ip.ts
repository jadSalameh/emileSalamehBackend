import { FastifyInstance } from "fastify";
import { KnexIpStore } from "../stores/Ip/KnexIpStore";
export type IpInput = { ip: string };
export function ipRoutes(fastify: FastifyInstance, options: any, done: any) {
  fastify.post("/ip", async (req, res) => {
    try {
      let knex = req.requestContext.get("knex");
      let kip = new KnexIpStore(knex);
      await kip.insertIp((req.body as IpInput).ip);
    } catch (e) {
      return "failed to insert or update";
    }
  });
  fastify.get("/userCount", async (req, res) => {
    try {
      let knex = req.requestContext.get("knex");
      let kip = new KnexIpStore(knex);
      res.send(await kip.getUserCount());
    } catch (e) {
      return e;
    }
  });
  fastify.get("/", async () => "hello");
  done();
}
