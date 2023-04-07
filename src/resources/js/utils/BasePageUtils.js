import { useSelector } from "react-redux";

import { BASE_PATH, MESSAGE_CODES, MESSAGE_TYPES } from "../constants";
import { general } from "../constants/strings";
import { setLoadingAction } from "../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../state/message/messageActions";
import { setPagePropsAction } from "../state/page/pageActions";
import utils from "./Utils";

export class BasePageUtils {
    constructor(name, strings = {}, useForm = null) {
        this.name = name;
        this.strings = strings;
        this.useForm = useForm;
        this.initialPageProps = {};
        this.callbackUrl = "";
        this.pageState = useSelector((state) => state.pageReducer);
        this.userState = useSelector((state) => state.userReducer);
        this.dispatch = this.pageState.dispatch;
        this.navigate = this.pageState.navigate;
        this.onAdd = this.onAdd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onLoad() {
        this.dispatch(setPagePropsAction(this.initialPageProps));
    }

    onAction(props) {}

    onSendRequest() {
        this.dispatch(setLoadingAction(true));
        this.dispatch(clearMessageAction());
    }

    handleFetchResult(result, propsIfOK, propsIfNull) {
        this.dispatch(setLoadingAction(false));
        if (result === null) {
            this.handleFetchIfResultNull(propsIfNull);
        } else {
            this.handleFetchIfResultOK(propsIfOK);
        }
    }

    handleFetchResultCallback(result, ok, propsIfNull) {
        this.dispatch(setLoadingAction(false));
        if (result === null) {
            this.handleFetchIfResultNull(propsIfNull);
        } else {
            ok();
        }
    }

    handleFetchIfResultOK(props) {
        this.dispatch(setPagePropsAction(props));
    }

    handleFetchIfResultNull(props) {
        this.dispatch(setPagePropsAction(props));
        this.dispatch(
            setMessageAction(
                this.entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                this.entity.errorCode
            )
        );
    }

    propsIfOK(result) {
        try {
            return {
                items: result.items,
                itemsCount: result.count,
            };
        } catch {}
    }

    propsIfNull() {
        return this.initialPageProps;
    }

    handleModifyAndNavigateResult(result) {
        this.dispatch(setLoadingAction(false));
        if (result === null) {
            this.handleModifyIfResultNull();
        } else {
            this.handleModifyAndNavigateIfResultOK();
        }
    }

    handleModifyIfResultNull() {
        this.dispatch(
            setMessageAction(
                this.entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                this.entity.errorCode
            )
        );

        return;
    }

    handleModifyAndNavigateIfResultOK() {
        this.dispatch(
            setMessageAction(
                this.strings.submitted,
                MESSAGE_TYPES.SUCCESS,
                MESSAGE_CODES.OK,
                false
            )
        );
        this.navigate(this.callbackUrl);
    }

    navigateIfNotValidId(id) {
        if (!utils.isId(id)) {
            this.dispatch(
                setMessageAction(
                    general.itemNotFound,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.ITEM_NOT_FOUND,
                    false
                )
            );
            this.navigate(this.callbackUrl);

            throw new Error();
        }
    }

    navigateIfItemNotFound(result) {
        if (result === null) {
            this.dispatch(
                setMessageAction(
                    general.itemNotFound,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.ITEM_NOT_FOUND,
                    false
                )
            );
            this.navigate(this.callbackUrl);

            throw new Error();
        }
    }

    onAction(props) {
        switch (props.action) {
            case "SET_PAGE":
                this.onSubmit();

                break;
            case "ADD":
                this.addAction();

                break;
            case "EDIT":
                this.editAction(props.item);

                break;
        }

        this.dispatch(setPagePropsAction({ action: null }));
    }

    onAdd() {
        this.dispatch(setPagePropsAction({ action: "ADD" }));
    }

    onEdit(item) {
        this.dispatch(
            setPagePropsAction({
                action: "EDIT",
                item,
            })
        );
    }

    setPage(page) {
        this.dispatch(
            setPagePropsAction({ action: "SET_PAGE", pageNumber: page })
        );
    }

    onSubmit(data = null) {
        this.dispatch(clearMessageAction());
        this.fillForm(data);
    }

    onReset() {
        this.useForm.reset();
        this.dispatch(
            setPagePropsAction({ action: "SET_PAGE", pageNumber: 1 })
        );
    }

    onCancel() {
        this.navigate(this.callbackUrl);
    }
}
