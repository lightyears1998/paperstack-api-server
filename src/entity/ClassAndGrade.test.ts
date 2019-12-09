import { describe, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { getManager } from "typeorm";
import app from "./../CentralControl";
import { ClassAndGrade } from "./";

chai.use(chaiHttp);


describe("entity/ClassAndGrade", async () => {
    before(async () => {
        await app.start();
    });

    /**
     * @todo 补充setReferenceInStudentToNull方法的测试。
     */

    after(async () => {
        await app.stop();
    });
});
