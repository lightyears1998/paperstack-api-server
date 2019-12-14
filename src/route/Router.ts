import * as express from "express";
import { generate as randomString } from "randomstring";
import logger from "../Logger";
import { RouterResponse } from "./";


/**
 * 路由
 */
export abstract class Router {
    protected path: string
    protected req: express.Request;
    protected requestId: string;

    constructor(path: string, req: express.Request) {
        this.path = path;
        this.req = req;
    }

    /**
     * 处理请求
     */
    public async handleRequest(): Promise<Record<string, unknown>> {
        this.generateRequestId();
        this.verifyRequestArgument();
        await this.getCurrentSessionUesr();

        logger.info(`[${this.path}] (${this.requestId})`);
        return this.process().toJSON();
    }

    /**
     * 生成请求Id
     */
    protected generateRequestId(): void {
        this.requestId = randomString({ readable: true, length: 5 });
    }

    /**
     * 验证请求参数
     */
    protected verifyRequestArgument(): void {
        // 在子类中重写，用于确保路由接收的参数类型正确。
    }

    /**
     * 获取会话用户
     */
    protected async getCurrentSessionUesr(): Promise<void> {
        // this.user = ...
    }

    /**
     * 执行控制逻辑
     */
    protected abstract process(): RouterResponse
}
