import { BASE_URL, USER_ROLES } from "../../constants";
import utils from "../../utils/Utils";
import Entity from "./Entity";

export class Dashboard extends Entity {
    constructor() {
        super();
    }

    async get() {
        const lsUser = utils.getLSUser();

        return lsUser?.role === USER_ROLES.ADMINISTRATOR
            ? await this.getFromAdministrator()
            : await this.getFromUser();
    }

    async getFromAdministrator() {
        return await this.handlePost(`${BASE_URL}/a/dashboard`);
    }

    async getFromUser() {
        return await this.handlePost(`${BASE_URL}/u/dashboard`);
    }
}
