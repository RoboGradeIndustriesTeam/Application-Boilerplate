import {model, Schema} from "mongoose";

export const RoleSchema = new Schema(
    {
        display_name: {
            type: String,
        },
        system_name: {
            type: String,
            unique: true
        }
    }
)

export default model("role", RoleSchema)