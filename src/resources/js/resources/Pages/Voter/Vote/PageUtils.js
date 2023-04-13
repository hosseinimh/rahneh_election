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
import {
    BASE_PATH,
    MESSAGE_CODES,
    MESSAGE_TYPES,
    VOTED_TYPES,
} from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import utils from "../../../../utils/Utils";
import { voteVoterSchema as schema } from "../../../validations";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageActions";

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
            proxy: null,
            shareholder: null,
            voteType: VOTED_TYPES.PERSONAL,
        };
        this.callbackUrl = `${BASE_PATH}/voters`;
        this.onSearchProxy = this.onSearchProxy.bind(this);
        this.onSearchShareholder = this.onSearchShareholder.bind(this);
        this.onSubmitVoteForShareholder =
            this.onSubmitVoteForShareholder.bind(this);
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
            case "REFRESH":
                this.refreshAction(props.item);

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
            this.dispatch(clearMessageAction());
            this.dispatch(
                setPagePropsAction({
                    voteType,
                })
            );
        }
    }

    onView(id) {
        this.dispatch(
            setPagePropsAction({
                action: "VIEW",
                item: { id },
            })
        );
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

    async fetchItemByNationalCode(nationalCode) {
        return await this.entity.getByNationalCode(nationalCode);
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
        const result = await this.vote(this.pageState?.props?.voteType, data);
        this.handleModifyResult(result);
        this.dispatch(setPagePropsAction({ action: "REFRESH" }));
    }

    async vote(voteType, data) {
        switch (voteType) {
            case VOTED_TYPES.PERSONAL:
                return await this.entity.personalVote(
                    this.pageState?.props?.voterId
                );
            case VOTED_TYPES.PROXICAL:
                this.messageField = "proxicalVoterNationalCode";
                return await this.entity.proxicalVote(
                    this.pageState?.props?.voterId,
                    data.proxicalVoterNationalCode
                );
            case VOTED_TYPES.NOT_SHAREHOLDER:
                this.messageField = "notShareholderVoterNationalCode";
                return await this.entity.notShareholderVote(
                    this.pageState?.props?.voterId,
                    data.notShareholderVoterNationalCode,
                    data.notShareholderVoterName,
                    data.notShareholderVoterFamily
                );
            default:
                return null;
        }
    }

    async onSubmitVoteForShareholder(data) {
        this.onSendRequest();
        const result = await this.entity.voteForShareholder(
            this.pageState?.props?.voterId,
            data.shareholderNationalCode
        );
        this.handleModifyResult(result);
        this.dispatch(
            setPagePropsAction({ action: "REFRESH", shareholder: null })
        );
    }

    async onSearchProxy(data) {
        this.onSendRequest();
        const result = await this.fetchItemByNationalCode(
            data.proxicalVoterNationalCode
        );
        this.dispatch(setLoadingAction(false));
        if (result === null) {
            this.dispatch(setPagePropsAction({ proxy: null }));
            this.dispatch(
                setMessageAction(
                    strings.shareholderNationalCodeNotFound,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.FORM_INPUT_INVALID,
                    true,
                    "proxicalVoterNationalCode"
                )
            );
            return;
        } else {
            this.dispatch(setPagePropsAction({ proxy: result.item }));
        }
    }

    async onSearchShareholder(data) {
        this.onSendRequest();
        const result = await this.fetchItemByNationalCode(
            data.shareholderNationalCode
        );
        this.dispatch(setLoadingAction(false));
        if (result === null) {
            this.dispatch(setPagePropsAction({ shareholder: null }));
            this.dispatch(
                setMessageAction(
                    strings.shareholderNationalCodeNotFound,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.FORM_INPUT_INVALID,
                    true,
                    "shareholderNationalCode"
                )
            );
            return;
        } else {
            this.dispatch(setPagePropsAction({ shareholder: result.item }));
        }
    }
}
