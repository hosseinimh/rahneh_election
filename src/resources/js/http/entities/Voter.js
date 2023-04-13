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

    async getVotedPaginate(name, nationalCode, _pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(`${BASE_URL}/a/voters/voted`, {
            name: name ?? "",
            national_code: nationalCode ?? "",
            _pn,
            _pi,
        });
    }

    async get(id) {
        return await this.handlePost(`${BASE_URL}/a/voters/show/${id}`);
    }

    async getByNationalCode(nationalCode) {
        return await this.handlePost(`${BASE_URL}/a/voters/show/nc`, {
            national_code: nationalCode,
        });
    }

    async personalVote(id) {
        return await this.handlePost(
            `${BASE_URL}/a/voters/personal_vote/${id}`
        );
    }

    async proxicalVote(id, nationalCode) {
        return await this.handlePost(
            `${BASE_URL}/a/voters/proxical_vote/${id}`,
            {
                national_code: nationalCode,
            }
        );
    }

    async notShareholderVote(id, nationalCode, name, family) {
        return await this.handlePost(
            `${BASE_URL}/a/voters/not_shareholder_vote/${id}`,
            {
                national_code: nationalCode,
                name: name,
                family: family,
            }
        );
    }

    async voteForShareholder(id, nationalCode) {
        return await this.handlePost(
            `${BASE_URL}/a/voters/vote_shareholder/${id}`,
            {
                national_code: nationalCode,
            }
        );
    }
}
