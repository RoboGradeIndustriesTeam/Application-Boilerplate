import express from "express";
import RoleService from "../services/RoleService";

export default new (class {
    async getAll(req: express.Request, res: express.Response) {
        return res.status(200).json(await RoleService.getAll())
    }
    async get(req: express.Request, res: express.Response) {
        let {
            id,
        } = req.params;

        let resp = await RoleService.get(id)

        if (resp.error) {
            return res.status(resp.status).json({error: resp.error})
        }

        return res.status(resp.status).json({ role: resp.role })
    }
    async create(req: express.Request, res: express.Response) {
        let {
            system_name,
            display_name
        } = req.body;

        let resp = await RoleService.create({system_name, display_name})

        if (resp.error) {
            return res.status(resp.status).json({ error: resp.status })
        }

        return res.status(resp.status).json( {role: resp.role} )
    }
})()