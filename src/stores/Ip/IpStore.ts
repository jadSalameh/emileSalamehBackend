export interface UserCount {
  unique: number;
  returning: number;
}
export interface Ip {
  ip: string;
  count: number;
}
export interface IpStore {
  insertIp(ip: string): Promise<boolean>;
  getUserCount(): Promise<UserCount>;
  getAllIps(): Promise<Ip[]>;
}
