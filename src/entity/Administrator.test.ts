import { describe, it, before, after } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { getManager } from "typeorm";
import app from "./../CentralControl";
import { User, Administrator } from "./";

chai.use(chaiHttp);


describe("entity/Administrator", () => {
    before(async () => {
        await app.start();
    });

    const testEmail = "admin@unit.test.com";
    const testPassword = "testpassword";

    it("should craete new Administrator", async () => {
        const admin = new Administrator(testEmail);
        await admin.user.modifyPassword(testPassword);

        const db = getManager();
        await db.save(admin.user);
        await db.save(admin);
    });

    it("should load administrator", async () => {
        const db = getManager();
        const user = await db.findOneOrFail(User, { email: testEmail });
        await db.findOneOrFail(Administrator, { user: user });
    });

    it("should delete administrator", async () => {
        const db = getManager();
        const user = await db.findOne(User, { email: testEmail });
        const admin = await db.findOne(Administrator, { user: user });

        await admin.user.terminateAllSessions();
        await db.remove(admin);
        await db.remove(user);

        if (await db.count(Administrator, { user: user }) > 0 || await db.count(User, { email: testEmail }) > 0) {
            throw "Fail to remove Administrator";
        }
    });

    after(async () => {
        await app.stop();
    });
});
