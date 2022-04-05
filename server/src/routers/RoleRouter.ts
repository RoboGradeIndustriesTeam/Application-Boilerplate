import express from "express";
import ValidatorMiddleware from "../middlewares/ValidatorMiddleware";
import {body, param} from "express-validator";
import RoleController from "../controllers/RoleController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import RoleMiddleware from "../middlewares/RoleMiddleware";

const router = express.Router();

router.use(ValidatorMiddleware)

router.get("/", RoleController.getAll)
router.get("/:id",
    param("id")
        .notEmpty()
        .isString(),
    RoleController.get
    )
router.post("/",
    AuthMiddleware,
    RoleMiddleware("ADMIN"),
    body("system_name")
        .notEmpty()
        .isString(),
    body("system_name")
        .notEmpty()
        .isString(),
    RoleController.create
    )

export default router;