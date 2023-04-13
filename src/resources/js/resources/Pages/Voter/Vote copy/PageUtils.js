import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Voter as Entity } from "../../../../http/entities";
import {
    setPageIconAction,
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { votePage as strings } from "../../../../constants/strings";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, VOTED_TYPES } from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import utils from "../../../../utils/Utils";
import { voteVoterSchema as schema } from "../../../validations";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Voters", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            voterId: null,
            item: null,
            voteType: VOTED_TYPES.PERSONAL,
        };
        this.callbackUrl = `${BASE_PATH}/voters`;
    }

    onLoad(params) {
        super.onLoad();
        let voterId = params?.voterId;
        const data = { voterId };
        this.dispatch(setPageIconAction("pe-7s-user"));
        this.dispatch(setPagePropsAction(data));
        this.fillForm(data);
    }

    onAction(props) {
        switch (props.action) {
            case "VOTE_TYPE":
                this.viewAction(props.item);

                break;
        }

        super.onAction(props);
    }

    onSelectVoteType(voteType) {
        voteType = parseInt(voteType);
        if (
            [
                VOTED_TYPES.PERSONAL,
                VOTED_TYPES.PROXICAL,
                VOTED_TYPES.NOT_SHAREHOLDER,
            ].includes(voteType)
        ) {
            this.dispatch(
                setPagePropsAction({
                    voteType,
                })
            );
        }
    }

    viewAction({ id }) {
        if (utils.isId(id)) {
            window.history.replaceState(
                null,
                "",
                `${BASE_PATH}/voters/vote/${id}`
            );
            this.fillForm({ voterId: id });
        }
    }

    refreshAction({ id }) {
        if (utils.isId(id)) {
            this.fillForm({ voterId: id });
        }
    }

    async fillForm(data) {
        try {
            this.dispatch(setLoadingAction(true));
            this.navigateIfNotValidId(data.voterId);
            const result = await this.fetchItem(data.voterId);
            this.navigateIfItemNotFound(result);
            this.handleFetchResult(result);
        } catch {
        } finally {
            this.dispatch(setLoadingAction(false));
        }
    }

    async fetchItem(id) {
        return await this.entity.get(id);
    }

    handleFetchResult(result) {
        this.dispatch(
            setPagePropsAction({ voterId: result.item.id, item: result.item })
        );
        this.dispatch(
            setPageTitleAction(
                `${strings._title} [ ${result.item.name} ${result.item.family} - ${result.item.nationalCode} ]`,
                strings._subTitle
            )
        );
    }

    async onSubmit(data) {
        this.onSendRequest();
        const result = await this.entity.personalVote(
            this.pageState?.props?.voterId
        );
        this.handleModifyResult(result);
        this.dispatch(setPagePropsAction({ action: "REFRESH" }));
    }
}
