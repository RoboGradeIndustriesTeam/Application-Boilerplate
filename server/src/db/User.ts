import {model, Schema} from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const UserSchema = new Schema(
    {
        login: {
            type: String,
            unique: true,
            maxlength: 32
        },
        password: {
            type: String,
        },
        role: [{
            type: Schema.Types.ObjectId,
            ref: "role",
            autopopulate: true
        }],
        avatar: {
            type: String,
            unique: true
        }
    }
)

UserSchema.plugin(mongooseAutoPopulate)

export {
    UserSchema
}

export default model("user", UserSchema)