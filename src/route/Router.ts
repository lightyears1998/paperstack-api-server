import * as express from "express";
import { generate as randomString } from "randomstring";
import logger from "../logger";


/**
 * 路由
 *
 * @todo 将Express.Router写入自定义Router的constructor
 */
export default abstract class Router {
    private path: string
    private req: express.Request;
    private requestId: string;

    constructor(path: string, req: express.Request) {
        this.path = path;
        this.req = req;
    }

    /**
     * 处理请求
     */
    public handleRequest(): Record<string, string | boolean | number> {
        this.generateRequestId();
        this.verifyRequestArgument();
        this.getCurrentSessionUesr();
        logger.info(`[${this.path}] (${this.requestId})`);
        return this.process();
    }

    /**
     * 生成请求Id
     */
    protected generateRequestId() {
        this.requestId = randomString({readable: true, length: 5});
    }

    /**
     * 验证请求参数
     */
    protected verifyRequestArgument() {

    }

    /**
     * 获取会话用户
     */
    protected getCurrentSessionUesr() {

    }

    /**
     * 执行控制逻辑
     */
    protected abstract process(): Record<string, string | boolean | number>
}
