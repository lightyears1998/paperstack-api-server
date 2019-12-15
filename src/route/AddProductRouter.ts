import { UserType } from "../entity";
import { CollectionGroupManager, UserManager } from "../control";
import { RouterResponse, RouterResponseCode } from "./RouterResponse";
import { Router } from ".";


/**
 * 作业收集子系统：提交作业路由
 */
export class AddProductRouter extends Router {
    private id: string
    private isPublic?: boolean;
    private fileHash: string;

    verifyRequestArgument(): void {
        super.verifyRequestArgument();
        this.id = this.normalizeString(this.req.body.id);
        this.isPublic = this.normalizeBoolean(this.req.body.isPublic);
        this.fileHash = this.normalizeString(this.req.body.fileHash);
    }

    async process(): Promise<RouterResponse> {
        if (!this.user) {
            return new RouterResponse(
                RouterResponseCode.Failure,
                "用户凭证无效。"
            );
        }

        if (this.id === "") {
            return new RouterResponse(
                RouterResponseCode.Failure,
                "作业收集项的id不能为空。"
            );
        }

        // 默认不公开作业。
        if (!this.isPublic) this.isPublic = false;

        const item = await CollectionGroupManager.getCollectionItemById(this.id);
        if (!item) {
            return new RouterResponse(
                RouterResponseCode.Failure,
                "作业收集项不存在。"
            );
        }

        const product = await item.addProduct(this.user, this.isPublic, this.fileHash);
        return new RouterResponse(
            RouterResponseCode.Success,
            "成功提交作业",
            {
                isPublic: product.isPublic,
                fileHash: product.fileHash
            }
        );
    }
}
