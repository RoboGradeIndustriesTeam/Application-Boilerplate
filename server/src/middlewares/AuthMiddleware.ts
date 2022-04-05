import express from "express";
import UserService from "../services/UserService";

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const header = req.headers.authorization;

    if (!header) return res.status(400).json({ error: "Не указан хедер авторизации." })

    const token = header.split(" ")[1]

    if (!token) return res.status(400).json({ error: "Не верный хедер авторизации." })

    const user = await UserService.getUserByToken(token)

    if (!user) {
        return res.status(401).json({ error: "Не верный токен" })
    }

    req.user = user

    next()
}