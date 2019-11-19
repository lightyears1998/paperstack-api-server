/**
 * @todo 将Express.Router写入自定义Router的constructor
 */
export abstract class Router {
    /**
     * 挂载路径
     */
    public path: string 

    /**
     * 处理请求
     */
    public processRequest() {
        
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
    protected abstract execute(): void
}
