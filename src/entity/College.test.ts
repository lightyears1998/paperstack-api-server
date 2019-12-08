import { describe, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { getManager } from "typeorm";
import app from "./../CentralControl";
import { User, UserType } from "./";

chai.use(chaiHttp);


describe("entity/College", async () => {
    before(async () => {
        await app.start();
    });

    const testCollegeName = "测试学院";
    const testClassName = ["测试171", "测试172"];

    it("should create college", async() => {
        const db = getManager();
        
    });

    it("should create classes", async() => {
        const db = getManager();
    });

    it("should remove classes", async() => {
        const db = getManager();
    })

    it("should remove college", async() => {
        const db = getManager();
    });

    after(async () => {
        await app.stop();
    });
});
