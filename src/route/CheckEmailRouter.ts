import { RouterResponse, RouterResponseCode } from "./RouterResponse";
import validator from "validator";
import { Router } from "./";

export class CheckEmailRouter extends Router {
    private email: string;

    verifyRequestArgument(): void {
        this.email = String(this.req.body.email).trim();
    }

    process(): RouterResponse {
        if (this.email === "") {
            return new RouterResponse(
                RouterResponseCode.RegisterEmailEmpty,
                "邮箱为空。"
            );
        }

        if (validator.isEmail(this.email)) {
            return new RouterResponse(
                RouterResponseCode.Failure,
                "邮箱不符合一般规则。"
            );
        }

        

        return new RouterResponse();
    }
}
