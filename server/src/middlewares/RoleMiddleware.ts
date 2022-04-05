import express from "express";
import {Role} from "../db";

export default (roleName: string) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.user) {
        console.log("Прежде чем использовать RoleMiddleware нужно использовать AuthMiddleware.")
        return res.status(500).json({error: "Ошибка сервера проверьте консоль"})
    }

    let role_system_names = await Role.find
}