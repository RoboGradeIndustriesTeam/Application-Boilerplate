import express from "express";
import ValidatorMiddleware from "../middlewares/ValidatorMiddleware";
import {body, param} from "express-validator";
import UserService from "../services/UserService";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import UserController from "../controllers/UserController";

const router = express.Router();

router.use(ValidatorMiddleware)

router.post("/register",
    body("login")
        .notEmpty()
        .isLength({ min: 3, max: 32 }),
    body("password")
        .notEmpty()
        .isLength({ min: 8, max: 64 }),
    UserController.register
)
router.post("/login",
    body("login")
        .notEmpty()
        .isLength({ min: 3, max: 32 }),
    body("password")
        .notEmpty()
        .isLength({ min: 8, max: 64 }),
    UserService.login
)
router.get("/me",
    AuthMiddleware,
    UserController.me
)
router.get("/", UserController.getAll)
router.get("/:id",
    param("id")
        .notEmpty()
        .isString(),
    UserController.get)

export default router;