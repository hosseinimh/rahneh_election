import { BASE_URL, PAGE_ITEMS } from "../../constants";
import utils from "../../utils/Utils";
import Entity from "./Entity";

export class User extends Entity {
    constructor() {
        super();
    }

    async getPaginate(username, name, _pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(`${BASE_URL}/a/users`, {
            username: username,
            name: name,
            _pn,
            _pi,
        });
    }

    async get(id) {
        return await this.handlePost(`${BASE_URL}/a/users/show/${id}`);
    }

    async getFromUser() {
        return await this.handlePost(`${BASE_URL}/u/users/show`);
    }

    async store(username, password, confirmPassword, name, role, isActive) {
        return await this.handlePost(`${BASE_URL}/a/users/store`, {
            username: username,
            password: password,
            password_confirmation: confirmPassword,
            name: name,
            role: role,
            is_active: isActive,
        });
    }

    async update(id, name, role, isActive) {
        return await this.handlePost(`${BASE_URL}/a/users/update/${id}`, {
            name: name,
            role: role,
            is_active: isActive,
        });
    }

    async updateFromUser(name) {
        return await this.handlePost(`${BASE_URL}/u/users/update`, {
            name: name,
        });
    }

    async changePassword(id, newPassword, confirmPassword) {
        return await this.handlePost(
            `${BASE_URL}/a/users/change_password/${id}`,
            {
                new_password: newPassword,
                new_password_confirmation: confirmPassword,
            }
        );
    }

    async changePasswordFromUser(newPassword, confirmPassword) {
        return await this.handlePost(`${BASE_URL}/u/users/change_password`, {
            new_password: newPassword,
            new_password_confirmation: confirmPassword,
        });
    }

    logOut() {
        utils.clearLS();
    }
}
