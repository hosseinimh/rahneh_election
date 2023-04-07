import { useForm } from "react-hook-form";

import { Voter as Entity } from "../../../../http/entities";
import {
    setPageIconAction,
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { votePage as strings } from "../../../../constants/strings";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import utils from "../../../../utils/Utils";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm();
        super("Voters", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            voterId: null,
            item: null,
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
            case "REFRESH":
                this.refreshAction(props.item);

                break;
        }

        super.onAction(props);
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
            this.updateForm(result);
            this.handleFetchResult(result);
        } catch {
        } finally {
            this.dispatch(setLoadingAction(false));
        }
    }

    async fetchItem(id) {
        return await this.entity.get(id);
    }

    updateForm(result) {}

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
        const result = await this.entity.vote(this.pageState?.props?.voterId);
        this.handleModifyAndNavigateResult(result);
    }
}
