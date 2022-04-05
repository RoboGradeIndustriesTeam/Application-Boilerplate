import {getLogger, Logger} from "log4js";

export default (category: string): Logger => {
    let lgr = getLogger(category)

    lgr.level = "INFO";

    return lgr
}