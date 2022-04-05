import express from "express";
import RoleRouter from "./routers/RoleRouter";
import UserRouter from "./routers/UserRouter";

const app = express();

app.use(express.json())
app.use(express.static("static"))
app.use('roles', RoleRouter)
app.use('users', UserRouter)

export default app;