import { Dashboard as Entity } from "../../../http/entities";
import { setLoadingAction } from "../../../state/layout/layoutActions";
import {
    setPageIconAction,
    setPagePropsAction,
} from "../../../state/page/pageActions";
import { dashboardPage as strings } from "../../../constants/strings";
import { BasePageUtils } from "../../../utils/BasePageUtils";

export class PageUtils extends BasePageUtils {
    constructor(useForm) {
        super("Dashboard", strings, useForm);
        this.entity = new Entity();
        this.initialPageProps = {
            usersCount: 0,
        };
    }

    onLoad() {
        super.onLoad();
        this.dispatch(setPageIconAction("pe-7s-rocket"));
        this.dispatch(setPagePropsAction(this.initialPageProps));
        this.fillForm();
    }

    async fillForm(data = null) {
        this.dispatch(setLoadingAction(true));
        await this.fetchData(data);
        this.dispatch(setLoadingAction(false));
    }

    async fetchData() {
        try {
            let result = await this.entity.get();
            this.handleFetchResult(
                result,
                this.propsIfOK(result),
                this.propsIfNull()
            );
        } catch {}
    }

    propsIfOK(result) {
        return {
            usersCount: result?.usersCount ?? 0,
        };
    }

    propsIfNull() {
        return this.initialPageProps;
    }
}
