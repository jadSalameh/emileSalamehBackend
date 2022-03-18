import { Knex } from "knex";
import { v4 as uuid } from "uuid";
import { Ip, IpStore, UserCount } from "./IpStore";
interface KnexIp {
  id: string;
  ip: string;
  count: number;
  lastVisit: Date;
}
export class KnexIpStore implements IpStore {
  knex: Knex;
  constructor(knex: Knex) {
    this.knex = knex;
  }
  async removeAllTenPlus(): Promise<boolean> {
    try {
      await this.knex<KnexIp>("Ips").where("count", ">", 10).delete();
      return true;
    } catch {
      return false;
    }
  }
  async getAllIps(): Promise<Ip[]> {
    try {
      return (await this.knex<KnexIp>("Ips").select()).map((e) => this.toIp(e));
    } catch (e) {
      throw e;
    }
  }
  async insertIp(ip: string): Promise<boolean> {
    try {
      let knexIp = this.knex<KnexIp>("Ips");
      let ki = await knexIp.select().where({ ip }).first();
      if (ki) {
        await knexIp.update({ count: ki.count + 1, lastVisit: new Date() });
        return true;
      } else {
        return (
          (
            await knexIp
              .insert({ id: uuid(), count: 1, ip, lastVisit: new Date() })
              .returning("*")
          )[0] != null
        );
      }
    } catch (e) {
      throw e;
    }
  }
  async getUserCount(): Promise<UserCount> {
    try {
      let returning = 0;
      let unique = 0;
      let ips = await this.knex<KnexIp>("Ips").select();
      unique = ips.length;
      ips.forEach((e) => (returning += e.count));
      return { returning, unique };
    } catch (e) {
      throw e;
    }
  }
  toIp(ki: KnexIp): Ip {
    return {
      count: ki.count,
      ip: ki.ip,
      lastVisit: ki.lastVisit,
    };
  }
}
