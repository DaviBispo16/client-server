import { UserRepository } from "../repositories/UserRepository";
import { Knex } from "knex"
import { Request, Response } from "express";

export class UserController {
    private userRepository: UserRepository;

    constructor(db: Knex) {
        this.userRepository = new UserRepository(db);
    }

    async create(req: Request, res: Response) {
        const {username, password} = req.body;
        try {
            const newUser = await this.userRepository.createUser(username, password)
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({error: "Error to create user"});
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