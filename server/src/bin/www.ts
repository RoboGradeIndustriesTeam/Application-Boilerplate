import app from "../index";
import {config} from "dotenv";
import getLogger from "../utils/getLogger";
import {connect} from "../db";

config()

const HOST = process.env.HOST || "0.0.0.0";
const PORT = 7200 || Number(process.env.PORT);

const FORMATTED_HOST = HOST !== "0.0.0.0" ? HOST : "127.0.0.1";
const FORMATTED_PORT = +PORT !== 80 ? PORT : "";
const FORMATTED_ADDRESS = `http://${FORMATTED_HOST}:${FORMATTED_PORT}`;

(async () => {
    await connect()
    app.listen(PORT, HOST, () => getLogger("bootstrap").info(`Express started on ${FORMATTED_ADDRESS}.`))
})()

