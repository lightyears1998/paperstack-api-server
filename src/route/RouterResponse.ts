/**
 * 返回前端的消息代码
 *
 * 通用代码占1位数字。
 * 注册子系统代码以1开头。
 * 登录子系统代码以2开头。
 */
export enum RouterResponseCode {
    Success = 0,
    Failure = 1,
    EmailNotRegistered = 11,
    EmailAlreadyRegisterd = 12,
    RegisterPasswordEmpty = 14,
    RegisterEmailEmpty = 13,
    LoginPasswordMismatch = 21
}


/**
 * 以JSON格式返回前端的路由响应。
 */
export class RouterResponse {
    code: number
    message: string
    result: Record<string, unknown>

    constructor(code = RouterResponseCode.Success, message = "请求处理完毕。", result: Record<string, unknown> = {}) {
        this.code = code;
        this.message = message;
        this.result = result;
    }

    static getSucess(): RouterResponse {
        return new RouterResponse(RouterResponseCode.Success, "请求处理成功。", {});
    }

    setCode(code: number): void {
        this.code = code;
    }

    setMessage(message: string): void {
        this.message = message;
    }

    setResult(result: Record<string, unknown>): void {
        this.result = result;
    }

    toJSON(): Record<string, unknown> {
        return {
            code:    this.code,
            message: this.message,
            result:  this.result
        };
    }
}
