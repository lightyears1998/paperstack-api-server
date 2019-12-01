import { describe, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../CentralControl";
import { Administrator } from "./";

chai.use(chaiHttp);


describe("entity/Administrator", async () => {
    before(async () => {
        await app.start();
    });

    it("should craete new Administrator", async ()=> {
        const admin = new Administrator();
    });

    after(async () => {
        await app.stop();
    });
});
