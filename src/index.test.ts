import { describe, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "./CentralControl";

chai.use(chaiHttp);

describe("App, CentralControl and WelcomRouter", () => {
    it("should start", async () => {
        await app.start();
    });

    it("should print welcome message", async () => {
        await chai.request(app.URI).get("/").then((res) => {
            chai.expect(res.body.version === app.version);
        });
    });

    it("should stop", async () => {
        await app.stop();
    });
});
