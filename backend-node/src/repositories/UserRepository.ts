import knex, { Knex } from "knex";

export class UserRepository {
    private db: Knex;
  
    constructor(db: Knex) {
      this.db = db;
    }

    async createUser(username: string, password: string) {
        const [newUser] = await this.db("users").insert({username, password})
        .returning("*");
        return newUser;
    }

    async getAllUsers() {
      const users = await this.db("users").select("*");
      return users
    }

    async findUserById(id: string) {
      const user = (await this.db("users").where({id}).first());
      return user;
    }
}