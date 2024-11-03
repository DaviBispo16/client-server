import { UserRepository } from "../repositories/UserRepository";
import { Knex } from "knex"
import { Request, Response } from "express";
import brypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import "dotenv/config";

export class UserController {
    private userRepository: UserRepository;

    constructor(db: Knex) {
        this.userRepository = new UserRepository(db);
    }

    private readonly saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);

    async create(req: Request, res: Response) {
        const {username, email, password} = req.body;
        try {
            const encryptedPassword = await brypt.hash(password, this.saltRounds);
            const newUser = await this.userRepository.createUser(uuidv4(), username, email, encryptedPassword);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({error: `${error}`});
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userRepository.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({error: "Error get users"});
        }
    }

    async getUserById(req: Request, res: Response) {
        const {id} = req.params
        try {
            const user = await this.userRepository.findUserById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({message: "User not found"});
            }
        } catch (error) {
            res.status(500).json({error: "Error to search user"});
        }
    }
}