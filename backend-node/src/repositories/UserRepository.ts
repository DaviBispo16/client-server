import knex, { Knex } from "knex";

export class UserRepository {
    private db: Knex;
  
    constructor(db: Knex) {
      this.db = db;
    }

    async createUser(id: string, username: string, email: string, password: string) {
        const [newUser] = await this.db("users").insert({id, username, email, password})
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

    async findUserByEmail(email: string) {
      const user = (await this.db("users").where({email}).first());
      return user;
    }
}