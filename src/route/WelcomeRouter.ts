import app from "../CentralControl";
import Router from "./Router";

export class WelcomeRouter extends Router {
    process() {
        return {
            "message": "欢迎使用PaperStack API Server。",
            "version": app.version
        };
    }
}
