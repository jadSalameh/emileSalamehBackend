import fastify from "fastify";
import {
  fastifyRequestContextPlugin,
  RequestContext,
} from "fastify-request-context";
import knexfile from "../knexfile";
import knex from "knex";
import { ipRoutes } from "./Routes/Ip";

const server = fastify({ logger: true });
const port = process.env.PORT || 3000;
server.register(fastifyRequestContextPlugin, {
  defaultStoreValues: {
    knex: knex(process.env.PORT ? knexfile.production : knexfile.development),
  },
});
server.register(ipRoutes);
server.listen(port, process.env.YOUR_HOST || "0.0.0.0", (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
