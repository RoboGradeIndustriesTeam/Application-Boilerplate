import mongoose from "mongoose";
import Role from "./Role";
import getLogger from "../utils/getLogger";
import User from "./User";

type Default = {
    model: mongoose.Model<any>,
    doc: any
}

const defaults: Default[] = [
    {
        model: Role,
        doc: {
            system_name: "ADMIN",
            display_name: "Администратор"
        }
    },
    {
        model: Role,
        doc: {
            system_name: "USER",
            display_name: "Пользователь"
        }
    }
]

const connect = async () => {
    let lgr = getLogger("database")

    let db_link = process.env.DB || "mongodb://db/application"
    lgr.info("Connecting to the database...")
    try {
        await mongoose.connect(db_link);
    }
    catch (e) {
        lgr.error("Connecting to the database... Failed");
        lgr.error(e);
        process.exit(1);
    }
    lgr.info("Connecting to the database... OK")

    for await (let def of defaults) {
        let candidate = await def.model.findOne(def.doc)

        if (!candidate) {
            try {
                await def.model.create(def.doc)
            }
            catch (e) {
                lgr.info("When adding a default document to the database an error occurred.")
                lgr.error(e);
                process.exit(1);
            }
        }
    }
}

export {
    User,
    Role,
    connect
}