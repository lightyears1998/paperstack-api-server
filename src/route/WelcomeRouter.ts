import app from "../CentralControl";
import Router from "./Router";

export class WelcomeRouter extends Router {
    process(): Record<string, string | number | boolean> {
        return {
            "message": "欢迎使用PaperStack API Server。",
            "version": app.version
        };
    }
}
