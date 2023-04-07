import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Voter as Entity } from "../../../../http/entities";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import {
    setPageIconAction,
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { votersPage as strings } from "../../../../constants/strings";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { searchUserSchema as schema } from "../../../validations";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Voters", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            itemsCount: 0,
            votedCount: 0,
            item: null,
            items: null,
            action: null,
        };
    }

    onLoad() {
        super.onLoad();
        this.dispatch(setPageIconAction("pe-7s-rocket"));
        this.fillForm();
    }

    editAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(`${BASE_PATH}/voters/edit/${id}`);
        }
    }

    async fillForm(data = null) {
        this.dispatch(setLoadingAction(true));
        const result = await this.entity.getPaginate(
            data?.name ?? "",
            data?.nationalCode ?? "",
            this.pageState.props?.pageNumber ?? 1
        );
        this.handleFetchResultCallback(
            result,
            () => this.handleFetchIfResultOK(result),
            this.propsIfNull()
        );
    }

    handleFetchIfResultOK(result) {
        const props = this.propsIfOK(result);
        this.dispatch(setPagePropsAction(props));
        this.dispatch(
            setPageTitleAction(
                strings._title,
                `${strings._subTitle} - [ ${
                    strings.votedCount
                }: ${utils.en2faDigits(result.votedCount)} ${strings.vote} ]`
            )
        );
    }

    propsIfOK(result) {
        try {
            return {
                items: result.items,
                itemsCount: result.itemsCount,
                votedCount: result.votedCount,
            };
        } catch {}
    }
}
