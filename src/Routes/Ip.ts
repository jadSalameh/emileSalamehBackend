import { FastifyInstance } from "fastify";
import { Knex } from "knex";
import { AddressInfo } from "net";
import { KnexIpStore } from "../stores/Ip/KnexIpStore";
export type IpInput = { ip: string };
export function ipRoutes(fastify: FastifyInstance, options: any, done: any) {
  fastify.post("/ip", async (req, res) => {
    try {
      let knex = req.requestContext.get("knex") as Knex;
      let kip = new KnexIpStore(knex);
      await kip.insertIp(({ ...req.socket.address } as AddressInfo).address);
    } catch (e) {
      return "failed to insert or update";
    }
  });
  fastify.get("/userCount", async (req, res) => {
    try {
      let knex = req.requestContext.get("knex") as Knex;
      let kip = new KnexIpStore(knex);
      res.send(await kip.getUserCount());
    } catch (e) {
      return e;
    }
  });
  fastify.get("/", async () => "hello");
  done();
}
