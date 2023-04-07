import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { User as Entity } from "../../../../http/entities";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import {
    setPageIconAction,
    setPagePropsAction,
} from "../../../../state/page/pageActions";
import { usersPage as strings } from "../../../../constants/strings";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { searchUserSchema as schema } from "../../../validations";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Users", strings, form);
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
        this.dispatch(setPageIconAction("pe-7s-users"));
        this.fillForm();
    }

    onAction(props) {
        switch (props.action) {
            case "CHANGE_PASSWORD":
                this.changePasswordAction(props.item);

                break;
        }

        super.onAction(props);
    }

    addAction() {
        this.navigate(`${BASE_PATH}/users/add`);
    }

    editAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(`${BASE_PATH}/users/edit/${id}`);
        }
    }

    changePasswordAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(`${BASE_PATH}/users/change_password/${id}`);
        }
    }

    onChangePassword(item) {
        this.dispatch(
            setPagePropsAction({
                action: "CHANGE_PASSWORD",
                item,
            })
        );
    }

    async fillForm(data = null) {
        this.dispatch(setLoadingAction(true));
        const result = await this.entity.getPaginate(
            data?.username ?? "",
            data?.name ?? "",
            this.pageState.props?.pageNumber ?? 1
        );
        this.handleFetchResult(
            result,
            this.propsIfOK(result),
            this.propsIfNull()
        );
    }
}
