import { describe, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { getManager } from "typeorm";
import app from "./../CentralControl";
import { User, UserType } from "./";

chai.use(chaiHttp);


describe("entity/User", async () => {
    before(async () => {
        await app.start();
    });

    const testEmail = "test-user@test.com";
    const testPassword = "test.test";

    it("should create new User", async ()=> {
        const user = new User(testEmail, UserType.Student);
        await user.modifyPassword(testPassword);

        const db = getManager();
        await db.save(user);
    });

    it("should load user from DB", async ()=> {
        const db = getManager();
        const user = await db.findOneOrFail(User, { email: testEmail });

        if (user.email != testEmail) {
            throw "Fail to save/load email.";
        }
        if (! await user.verifyPassword(testPassword)) {
            throw "Fail to save/load password.";
        }
    });

    it("should modify password", async ()=> {
        const db = getManager();
        const user = await db.findOneOrFail(User, { email: testEmail });

        const newPassword = testPassword + testPassword;
        await user.modifyPassword(newPassword);
        if (await user.verifyPassword(testPassword)) {
            throw "Fail to modify password.";
        }
        if (! await user.verifyPassword(newPassword)) {
            throw "Fail to modify password.";
        }
    });

    it("should delete user", async () => {
        const db = getManager();
        const user = await db.findOneOrFail(User, { email: testEmail });
        await db.remove(user);

        const users = await db.find(User, { email: testEmail });
        if (users.length !== 0) {
            throw "Fail to delete user.";
        }
    });

    after(async () => {
        await app.stop();
    });
});
