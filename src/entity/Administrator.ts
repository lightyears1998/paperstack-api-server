import { Entity } from "typeorm";
import User from "./User";

/**
 * 管理员
 */
@Entity()
export class Administrator extends User {

}
