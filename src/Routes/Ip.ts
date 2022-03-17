import { FastifyInstance } from "fastify";
import { Knex } from "knex";
import { AddressInfo } from "net";
import { KnexIpStore } from "../stores/Ip/KnexIpStore";
export type IpInput = { ip: string };
export function ipRoutes(fastify: FastifyInstance, options: any, done: any) {
  fastify.get("/ip", async (req, res) => {
    try {
      let knex = req.requestContext.get("knex") as Knex;
      let kip = new KnexIpStore(knex);
      return await kip.insertIp(req.connection.remoteAddress as string);
    } catch (e) {
      return e;
    }
  });
  fastify.get("/del123321", async (req, res) => {
    try {
      let knex = req.requestContext.get("knex") as Knex;
      let kip = new KnexIpStore(knex);
      res.send(await kip.removeAllTenPlus());
    } catch (e) {
      return e;
    }
  });
  fastify.get("/allIps", async (req, res) => {
    try {
      let knex = req.requestContext.get("knex") as Knex;
      let kip = new KnexIpStore(knex);
      res.send(await kip.getAllIps());
    } catch (e) {
      return e;
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
