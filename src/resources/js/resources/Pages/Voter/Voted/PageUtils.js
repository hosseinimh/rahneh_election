import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Voter as Entity } from "../../../../http/entities";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import {
    setPageIconAction,
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { votedPage as strings, voteTypes } from "../../../../constants/strings";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, VOTED_TYPES } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { searchUserSchema as schema } from "../../../validations";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Voted", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            itemsCount: 0,
            item: null,
            items: null,
            action: null,
        };
    }

    onLoad() {
        super.onLoad();
        this.dispatch(setPageIconAction("pe-7s-pen"));
        this.fillForm();
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
            this.navigate(`${BASE_PATH}/voters/vote/${id}`);
        }
    }

    async fillForm(data = null) {
        this.dispatch(setLoadingAction(true));
        const result = await this.entity.getVotedPaginate(
            data?.name ?? "",
            data?.nationalCode ?? "",
            parseInt(data?.voter ?? VOTED_TYPES.NOT_VOTED),
            this.pageState.props?.pageNumber ?? 1
        );
        this.handleFetchResultWithCallback(
            result,
            () => this.handleFetchResultIfOK(result),
            this.propsIfNull()
        );
    }

    handleFetchResultIfOK(result) {
        const props = this.propsIfOK(result);
        this.dispatch(setPagePropsAction(props));
        this.dispatch(
            setPageTitleAction(
                strings._title,
                `${strings._subTitle} - [ ${
                    strings.votedCount
                }: ${utils.en2faDigits(result.votedCount)} ${strings.vote} - ${
                    voteTypes.personal
                }: ${utils.en2faDigits(result.personalVotedCount)} / ${
                    voteTypes.proxical
                }: ${utils.en2faDigits(result.proxicalVotedCount)} / ${
                    voteTypes.notShareholder
                }: ${utils.en2faDigits(result.notShareholderVotedCount)} ]`
            )
        );
    }

    propsIfOK(result) {
        try {
            return {
                items: result.items,
                itemsCount: result.itemsCount,
            };
        } catch {}
    }
}
