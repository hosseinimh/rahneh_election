import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    FormCard,
    FormPageLayout,
    InputTextColumn,
    LabelColumn,
    Span,
    TableCard,
    TableItems,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import {
    general,
    votePage as strings,
    voteTypes,
} from "../../../../constants/strings";
import utils from "../../../../utils/Utils";
import { ProxicalUtils } from "./ProxicalUtils";
import { setMessageAction } from "../../../../state/message/messageActions";
import { MESSAGE_CODES, MESSAGE_TYPES } from "../../../../constants";
import { setPagePropsAction } from "../../../../state/page/pageActions";

const Vote = () => {
    const dispatch = useDispatch();
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const pageUtils = new PageUtils();
    const proxicalUtils = new ProxicalUtils();
    const hasSubmit = pageState?.props?.item?.votedAt ? false : true;
    const columnsCount = 5;

    useEffect(() => {
        if (
            typeof proxicalUtils?.useForm?.formState?.errors === "object" &&
            proxicalUtils?.useForm?.formState?.errors
        ) {
            const hasKeys = !!Object.keys(
                proxicalUtils?.useForm?.formState?.errors
            ).length;
            if (hasKeys) {
                dispatch(
                    setMessageAction(
                        proxicalUtils?.useForm?.formState?.errors[
                            Object.keys(
                                proxicalUtils?.useForm?.formState?.errors
                            )[0]
                        ].message,
                        MESSAGE_TYPES.ERROR,
                        MESSAGE_CODES.FORM_INPUT_INVALID,
                        true,
                        Object.keys(
                            proxicalUtils?.useForm?.formState?.errors
                        )[0]
                    )
                );
            }
        }
    }, [proxicalUtils?.useForm?.formState?.errors]);

    useEffect(() => {
        dispatch(setPagePropsAction({ proxy: null }));
    }, []);

    const renderHeader = () => (
        <tr>
            <th scope="col" style={{ width: "50px" }}>
                #
            </th>
            <th scope="col" style={{ width: "100px" }}>
                {strings.actions}
            </th>
            <th scope="col">{strings.nameFamily}</th>
            <th scope="col" style={{ width: "150px" }}>
                {strings.voteStatus}
            </th>
            <th scope="col" style={{ width: "150px" }}>
                {strings.nationalCode}
            </th>
        </tr>
    );

    const renderItems = () => {
        const children = [];
        let length = 0;

        if (utils.isId(pageState?.props?.item?.voterId1)) {
            children.push(
                renderProxicalVoted(
                    ++length,
                    pageState?.props?.item?.voterId1,
                    pageState?.props?.item?.voter1Name,
                    pageState?.props?.item?.voter1Family,
                    pageState?.props?.item?.voter1NationalCode
                )
            );
        }
        if (utils.isId(pageState?.props?.item?.voterId2)) {
            children.push(
                renderProxicalVoted(
                    ++length,
                    pageState?.props?.item?.voterId2,
                    pageState?.props?.item?.voter2Name,
                    pageState?.props?.item?.voter2Family,
                    pageState?.props?.item?.voter2NationalCode
                )
            );
        }
        if (utils.isId(pageState?.props?.item?.voterId3)) {
            children.push(
                renderProxicalVoted(
                    ++length,
                    pageState?.props?.item?.voterId3,
                    pageState?.props?.item?.voter3Name,
                    pageState?.props?.item?.voter3Family,
                    pageState?.props?.item?.voter3NationalCode
                )
            );
        }

        return <TableItems columnsCount={columnsCount} children={children} />;
    };

    const renderProxicalVoted = (index, id, name, family, nationalCode) => (
        <tr key={index}>
            <td scope="row">{utils.en2faDigits(index)}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-warning mb-2 px-4"
                    onClick={() => pageUtils.onView({ id })}
                    title={general.view}
                    disabled={layoutState?.loading}
                >
                    {general.view}
                </button>
            </td>
            <td>{`${name} ${family}`}</td>
            <td>{voteTypes.notNaturalVoted}</td>
            <td>{nationalCode}</td>
        </tr>
    );

    return (
        <>
            <FormPageLayout pageUtils={pageUtils}>
                <FormCard pageUtils={pageUtils} hasSubmit={hasSubmit}>
                    <LabelColumn field={"name"} />
                    <LabelColumn field={"family"} />
                    <LabelColumn field={"nationalCode"} />
                    <div className="col-12 pb-4">
                        <span className="ml-2">{strings.voteStatus}:</span>
                        <Span
                            spanStyle={{
                                color: pageState?.props?.item?.votedAt
                                    ? "green"
                                    : "rgb(133 95 4)",
                            }}
                        >
                            {pageState?.props?.item?.votedAt &&
                            pageState?.props?.item?.isNatural
                                ? voteTypes.naturalVoted
                                : ""}
                            {pageState?.props?.item?.votedAt &&
                            !pageState?.props?.item?.isNatural
                                ? voteTypes.notNaturalVoted
                                : ""}
                            {!pageState?.props?.item?.votedAt
                                ? voteTypes.notVoted
                                : ""}
                        </Span>
                        {pageState?.props?.item?.votedAt && (
                            <>
                                <span>{pageState.props.item.votedAtFa}</span>
                                <span className="mr-2">
                                    [ {pageState.props.item.username} ]
                                </span>
                            </>
                        )}
                    </div>
                    {pageState?.props?.item?.voter && (
                        <div className="col-12 pb-4">
                            <span className="ml-2">{strings.voter}:</span>
                            <Span>{`${pageState?.props?.item?.voter?.name} ${pageState?.props?.item?.voter?.family} - ${pageState?.props?.item?.voter?.nationalCode}`}</Span>
                        </div>
                    )}
                </FormCard>
                {pageState?.props?.item?.isNatural === 1 &&
                    pageState?.props?.item?.proxicalCount < 3 && (
                        <FormCard
                            pageUtils={proxicalUtils}
                            hasSubmit={
                                pageState?.props?.proxy &&
                                !pageState.props.proxy.votedAt
                            }
                            hasCancel={false}
                        >
                            <h6>{strings.voteProxical}</h6>
                            <div className="col-12 pt-4">
                                <div className="row">
                                    <InputTextColumn
                                        field={"nationalCode"}
                                        inputStyle={{
                                            textAlign: "left",
                                            direction: "ltr",
                                        }}
                                        useForm={proxicalUtils?.useForm}
                                        strings={strings}
                                    />
                                    <div
                                        className="col pr-0 d-flex align-items-center"
                                        style={{ marginBottom: "10px" }}
                                    >
                                        <button
                                            className="btn btn-warning px-4 ml-2"
                                            type="button"
                                            title={general.search}
                                            onClick={proxicalUtils.useForm.handleSubmit(
                                                proxicalUtils.onSearch
                                            )}
                                            disabled={layoutState?.loading}
                                        >
                                            {general.search}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {pageState?.props?.proxy && (
                                <>
                                    <div className="col-md-3 col-12 pb-4">
                                        <label className="form-label ml-2">
                                            {strings.name}:
                                        </label>
                                        <Span>
                                            {pageState.props.proxy.name}
                                        </Span>
                                    </div>
                                    <div className="col-md-3 col-12 pb-4">
                                        <label className="form-label ml-2">
                                            {strings.family}:
                                        </label>
                                        <Span>
                                            {pageState.props.proxy.family}
                                        </Span>
                                    </div>
                                    <div className="col-md-3 col-12 pb-4">
                                        <label className="form-label ml-2">
                                            {strings.nationalCode}:
                                        </label>
                                        <Span>
                                            {pageState.props.proxy.nationalCode}
                                        </Span>
                                    </div>
                                    <div className="col-12 pb-4">
                                        <span className="ml-2">
                                            {strings.voteStatus}:
                                        </span>
                                        <Span
                                            spanStyle={{
                                                color: pageState.props.proxy
                                                    .votedAt
                                                    ? "green"
                                                    : "rgb(133 95 4)",
                                            }}
                                        >
                                            {pageState.props.proxy.votedAt &&
                                            pageState.props.proxy.isNatural
                                                ? voteTypes.naturalVoted
                                                : ""}
                                            {pageState.props.proxy.votedAt &&
                                            !pageState.props.proxy.isNatural
                                                ? voteTypes.notNaturalVoted
                                                : ""}
                                            {!pageState.props.proxy.votedAt
                                                ? voteTypes.notVoted
                                                : ""}
                                        </Span>
                                        {pageState.props.proxy.votedAt && (
                                            <>
                                                <span>
                                                    {
                                                        pageState.props.item
                                                            .votedAtFa
                                                    }
                                                </span>
                                                <span className="mr-2">
                                                    [{" "}
                                                    {
                                                        pageState.props.item
                                                            .username
                                                    }{" "}
                                                    ]
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </FormCard>
                    )}
                {pageState?.props?.item?.isNatural === 1 && (
                    <>
                        <h6>{strings.voted}</h6>
                        <TableCard table={{ renderHeader, renderItems }} />
                    </>
                )}
            </FormPageLayout>
        </>
    );
};

export default Vote;
