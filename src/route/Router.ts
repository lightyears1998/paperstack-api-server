import * as express from "express";


/**
 * 路由
 *
 * @todo 将Express.Router写入自定义Router的constructor
 */
export default abstract class Router {
    /**
     * 挂载路径
     */
    public static path: string
    private req: express.Request;

    public static mount<T extends Router>(rootRouter: express.Express, path: string, router: new(req: express.Request, res: express.Response) => T) {
        rootRouter.all(path, async (req, res)=> {
            const response = new router(req, res).handleRequest();
            res.json(response);
        });
    }

    constructor(req: express.Request) {
        this.req = req;
    }

    /**
     * 处理请求
     */
    public handleRequest(): Record<string, string | boolean | number> {
        this.generateRequestId();
        this.verifyRequestArgument();
        this.getCurrentSessionUesr();
        return this.process();
    }

    /**
     * 生成请求Id
     */
    protected generateRequestId() {

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
