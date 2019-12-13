import { describe, it, before, after } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { getManager, Db } from "typeorm";
import app from "./../CentralControl";
import { User, Student } from "./";

chai.use(chaiHttp);


describe("entity/Student", async () => {
    before(async () => {
        await app.start();
    });

    const testEmail = "student@test.com";
    const testNumber = "1706300000";
    const testPhoneNumber = "12345678910";

    it("should create student.", async () => {
        const student = new Student(testEmail);
        student.number = testNumber;
        student.phoneNumber = testPhoneNumber;

        const db = getManager();
        db.save(student);
        db.save(student.user);
    });

    it ("should load student.", async() => {
        
    });

    after(async () => {
        await app.stop();
    });
});
