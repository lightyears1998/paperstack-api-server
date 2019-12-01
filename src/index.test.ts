import "reflect-metadata";
import { getManager } from "typeorm";
import app from "./CentralControl";
import { User, UserType, Session } from "./entity";

app.start();

setTimeout(async () => {
    const user = new User();
    user.email = "432423@qq.com";
    user.passwordHash = "7k7k7";
    user.type = UserType.Administrator;

    const session = new Session();
    user.sessions = [session];

    const manager = getManager();
    await manager.save(user);
    await manager.save(session);

    await manager.remove(session);
    await manager.remove(user);
}, 1000);
