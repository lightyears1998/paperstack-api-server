import { describe, it, before, after } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../CentralControl";

chai.use(chaiHttp);


describe("entity/ClassAndGrade", () => {
    before(async () => {
        await app.start();
    });

    /**
     * @todo 补充setReferenceInStudentToNull方法的测试。
     */
    it("current do nothing", async () => {
        // do nothing.
    });

    after(async () => {
        await app.stop();
    });
});
