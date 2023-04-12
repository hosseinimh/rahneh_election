import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { User as Entity } from "../../../../http/entities";
import {
    setPageAction,
    setPageIconAction,
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { editUserPage as strings } from "../../../../constants/strings";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, USER_ROLES } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { editUserSchema as schema } from "../../../validations";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Users", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            userId: null,
        };
        this.callbackUrl =
            this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
                ? `${BASE_PATH}/users`
                : BASE_PATH;
    }

    onLoad(params) {
        super.onLoad();
        let userId = utils.isId(params?.userId)
            ? parseInt(params?.userId)
            : this.userState?.user?.id;
        const name =
            userId === this.userState?.user?.id ? "EditProfile" : "Users";
        const data = { userId };
        this.dispatch(setPageAction(name));
        this.dispatch(setPageIconAction("pe-7s-id"));
        this.dispatch(setPagePropsAction(data));
        this.fillForm(data);
    }

    async fillForm(data) {
        try {
            this.dispatch(setLoadingAction(true));
            this.navigateIfNotValidId(data.userId);
            const result = await this.fetchItem(data.userId);
            this.navigateIfItemNotFound(result);
            this.updateForm(result);
            this.handleFetchResult(result);
        } catch {
        } finally {
            this.dispatch(setLoadingAction(false));
        }
    }

    async fetchItem(id) {
        return this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
            ? await this.entity.get(id)
            : await this.entity.getFromUser();
    }

    updateForm(result) {
        this.useForm.setValue("name", result.item.name);
        this.useForm.setValue("isActive", result.item.isActive);
        this.useForm.setValue(
            result.item.role === USER_ROLES.ADMINISTRATOR
                ? "administrator"
                : "user",
            "on"
        );
    }

    handleFetchResult(result) {
        this.dispatch(setPagePropsAction({ userId: result.item.id }));
        this.dispatch(
            setPageTitleAction(
                `${strings._title} [ ${result.item.name} - ${result.item.username} ]`,
                strings._subTitle
            )
        );
    }

    async onSubmit(data) {
        this.onSendRequest();
        const role = data.administrator
            ? USER_ROLES.ADMINISTRATOR
            : USER_ROLES.USER;
        const result = await this.entity.update(
            this.pageState?.props?.userId,
            data.name,
            role,
            data.isActive ? 1 : 0
        );
        this.handleModifyResultAndNavigate(result);
    }
}
