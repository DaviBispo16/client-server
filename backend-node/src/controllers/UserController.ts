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

    async create(req: Request, res: Response): Promise<void> {
        const {username, email, password} = req.body;
        try {
            const encryptedPassword = await brypt.hash(password, this.saltRounds);
            const newUser = await this.userRepository.createUser(uuidv4(), username, email, encryptedPassword);
            res.status(201).json(newUser);
            return;
        } catch (error) {
            res.status(500).json({error: `${error}`});
            return;
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userRepository.getAllUsers();
            res.status(200).json(users);
            return;
        } catch (error) {
            res.status(500).json({error: "Error get users"});
            return;
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const {id} = req.params
        try {
            const user = await this.userRepository.findUserById(id);
            if (user) {
                res.status(200).json(user);
                return;
            } else {
                res.status(404).json({message: "User not found"});
                return;
            }
        } catch (error) {
            res.status(500).json({error: "Error to search user"});
            return;
        }
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        const {email, password} = req.body;
        try {
            const user = await this.userRepository.findUserByEmail(email);
            if (!user) {
                res.status(404).json({message: "User not authorized"});
                return;
            }

            const isPasswordValid = await brypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({message: "User not authorized"});
                return;
            }

            res.status(200).json({user});
            return;

        } catch (error) {
            res.status(500).json({error: `${error}`});
            return;
        }
    }
}