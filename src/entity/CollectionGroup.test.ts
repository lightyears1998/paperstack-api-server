import { describe, it, before, after } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { getManager } from "typeorm";
import app from "./../CentralControl";
import { CollectionGroup, Teacher, Student } from "./";

chai.use(chaiHttp);


describe("entity/CollectionGroup", () => {
    before(async () => {
        await app.start();
    });

    let group: CollectionGroup;
    let teacher: Teacher;
    let student: Student[];

    it("should create CollectionGroup", async () => {
        group = new CollectionGroup();

        const db = getManager();
        await db.save(group);
    });

    it("should set organizer", async () => {
        const db = getManager();
        await db.save(group);
    });

    // it("should set attendants")

    it("should remove CollectionGroup", async () => {
        const db = getManager();
        await db.remove(group);
    });

    after(async () => {
        await app.stop();
    });
});
