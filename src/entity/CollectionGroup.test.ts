import { describe, it, before, after } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { getManager, EntityManager } from "typeorm";
import app from "./../CentralControl";
import { UserType } from "./User";
import { CollectionGroup, CollectionItem, User } from "./";

chai.use(chaiHttp);


describe("entity/CollectionGroup", () => {
    let db: EntityManager;
    let users: User[];
    let organizer: User;
    let attendants: User[];

    before(async () => {
        await app.start();

        // 创建测试时使用的用户。
        users = [
            new User("user1@test.com", UserType.Teacher),
            new User("user2@test.com", UserType.Student),
            new User("user3@test.com", UserType.Student)
        ];
        for (let i = 0; i < users.length; ++i) {
            db = getManager();
            await users[i].modifyPassword("user.password");
            users[i] = await db.save(users[i]);
        }
        organizer = users[0];
        attendants = users.filter((_, index) => index !== 0);
    });

    let group: CollectionGroup;

    it("should create CollectionGroup", async () => {
        group = new CollectionGroup();
        group = await db.save(group);
    });

    it("should set organizer and attendants", async () => {
        group.organizer = organizer;
        group.attendants = attendants;
        await db.save(group);

        const groupFromDb = await db.findOne(CollectionGroup, group.id, { relations: ["organizer", "attendants"] });
        if (groupFromDb.organizer.id !== organizer.id) {
            throw "Fail to set organizer.";
        }
        if (groupFromDb.attendants.length !== attendants.length) {
            throw "Fail to set attendants";
        }
    });

    it("should add CollectionItem", async () => {
        const items = [
            new CollectionItem(),
            new CollectionItem()
        ];
        items.forEach(item => {
            item.group = group;
        });
        await db.save(items);

        if ((await db.findOne(CollectionGroup, group.id, { relations: ["items"] })).items.length !== items.length) {
            throw "Fail to add CollectionItem.";
        }
    });

    it("should remove CollectionGroup", async () => {
        await db.remove(await db.find(CollectionItem, { group: group }));
        await db.remove(group);
    });

    after(async () => {
        // 清理测试时使用的用户。
        await db.remove(users);
        await app.stop();
    });
});
