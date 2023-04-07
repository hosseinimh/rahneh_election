import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class Voter extends Entity {
    constructor() {
        super();
    }

    async getPaginate(name, nationalCode, _pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(`${BASE_URL}/a/voters`, {
            name: name ?? "",
            national_code: nationalCode ?? "",
            _pn,
            _pi,
        });
    }

    async get(id) {
        return await this.handlePost(`${BASE_URL}/a/voters/show/${id}`);
    }

    async update(id, name, role, isActive) {
        return await this.handlePost(`${BASE_URL}/a/voters/update/${id}`, {
            name: name,
            role: role,
            is_active: isActive,
        });
    }
}