import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Voter as Entity } from "../../../../http/entities";
import { setPagePropsAction } from "../../../../state/page/pageActions";
import { votePage as strings } from "../../../../constants/strings";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, MESSAGE_TYPES } from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { proxicalVoteVoterSchema as schema } from "../../../validations";
import utils from "../../../../utils/Utils";
import { setMessageAction } from "../../../../state/message/messageActions";

export class ProxicalUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Voters", strings, form);
        this.entity = new Entity();
        this.onSearch = this.onSearch.bind(this);
        this.initialPageProps = {
            proxy: null,
        };
    }

    onView(item) {
        this.dispatch(
            setPagePropsAction({
                action: "VIEW",
                item,
            })
        );
    }

    onAction(props) {
        switch (props.action) {
            case "VIEW":
                this.viewAction(props.item);

                break;
        }

        super.onAction(props);
    }

    viewAction({ id }) {
        if (utils.isId(id)) {
            window.location.href = `${BASE_PATH}/voters/vote/${id}`;
        }
    }

    async onSearch(data) {
        this.dispatch(setLoadingAction(true));
        const result = await this.fetchItem(data.nationalCode);
        this.dispatch(setLoadingAction(false));
        if (result === null) {
            this.dispatch(setPagePropsAction(this.propsIfNull()));
            this.dispatch(
                setMessageAction(
                    this.entity.errorMessage,
                    MESSAGE_TYPES.ERROR,
                    this.entity.errorCode,
                    true,
                    "nationalCode"
                )
            );
            return;
        } else {
            this.dispatch(setPagePropsAction(this.propsIfOK(result)));
        }
    }

    async fetchItem(nationalCode) {
        return await this.entity.getByNationalCode(nationalCode);
    }

    propsIfOK(result) {
        try {
            return {
                proxy: result.item,
            };
        } catch {}
    }

    async onSubmit() {
        this.onSendRequest();
        const result = await this.entity.proxicalVote(
            this.pageState?.props?.proxy?.id,
            this.pageState?.props?.item?.id
        );
        this.dispatch(setLoadingAction(false));
        if (this.handleModifyResult(result)) {
            this.useForm.reset();
            this.dispatch(
                setPagePropsAction({ action: "REFRESH", proxy: null })
            );
        }
    }
}
