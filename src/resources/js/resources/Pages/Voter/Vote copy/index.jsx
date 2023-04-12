import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    FormCard,
    FormPageLayout,
    InputHiddenElement,
    InputSelectColumn,
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
import { VOTED_TYPES } from "../../../../constants";
import { setPagePropsAction } from "../../../../state/page/pageActions";

const voteTyeItems = [
    { id: VOTED_TYPES.PERSONAL, value: voteTypes.personal },
    { id: VOTED_TYPES.PROXICAL, value: voteTypes.proxical },
    { id: VOTED_TYPES.NOT_SHAREHOLDER, value: voteTypes.notShareholder },
];

const Vote = () => {
    const dispatch = useDispatch();
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const pageUtils = new PageUtils();
    const hasSubmit = pageState?.props?.item?.votedAt ? false : true;
    const columnsCount = 5;

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

    const renderVoteType = () => {
        if (pageState?.props?.item && !pageState?.props?.item?.votedAt) {
            return (
                <div className="col-12">
                    <div className="row">
                        <InputSelectColumn
                            handleChange={(e) =>
                                pageUtils.onSelectVoteType(e.target.value)
                            }
                            field={"voteType"}
                            items={voteTyeItems}
                        />
                    </div>
                </div>
            );
        }

        return <></>;
    };

    const renderProxicalVoter = () => {
        if (pageState?.props?.voteType === VOTED_TYPES.PROXICAL) {
            return (
                <div
                    className="col-12"
                    style={{
                        borderTop: "1px solid rgba(26, 54, 126, 0.125)",
                    }}
                >
                    <h6 className="py-4">{strings.voter}</h6>
                    <div className="row">
                        <InputTextColumn
                            field={"proxicalVoterNationalCode"}
                            inputStyle={{
                                textAlign: "left",
                                direction: "ltr",
                            }}
                        />
                        <div
                            className="col pr-0 d-flex align-items-center"
                            style={{ marginBottom: "10px" }}
                        >
                            <button
                                className="btn btn-warning px-4 ml-2"
                                type="button"
                                title={general.search}
                                onClick={pageUtils.useForm.handleSubmit(
                                    pageUtils.onSearch
                                )}
                                disabled={layoutState?.loading}
                            >
                                {general.search}
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return <></>;
    };

    return (
        <>
            <FormPageLayout pageUtils={pageUtils}>
                <FormCard pageUtils={pageUtils} hasSubmit={hasSubmit}>
                    <InputHiddenElement
                        field={"votedType"}
                        value={
                            pageState?.props?.item?.votedType ??
                            VOTED_TYPES.NOT_VOTED
                        }
                    />
                    <LabelColumn field={"name"} />
                    <LabelColumn field={"family"} />
                    <LabelColumn field={"nationalCode"} />
                    <div
                        className={
                            pageState?.props?.item?.votedType ===
                            VOTED_TYPES.NOT_VOTED
                                ? "col-md-4 col-12 pb-4"
                                : "col-12 pb-4"
                        }
                    >
                        <span className="ml-2">{strings.votedType}:</span>
                        <Span
                            spanStyle={{
                                color: pageState?.props?.item?.votedAt
                                    ? "green"
                                    : "rgb(133 95 4)",
                            }}
                        >
                            {pageState?.props?.item?.votedTypeText}
                        </Span>
                        {pageState?.props?.item?.votedAt && (
                            <>
                                <Span>{pageState.props.item.votedAtFa}</Span>
                                <Span>[ {pageState.props.item.username} ]</Span>
                            </>
                        )}
                    </div>
                    {renderVoteType()}
                    {renderProxicalVoter()}
                    {pageState?.props?.voteType ===
                        VOTED_TYPES.NOT_SHAREHOLDER && (
                        <>
                            <div
                                className="col-12"
                                style={{
                                    borderTop:
                                        "1px solid rgba(26, 54, 126, 0.125)",
                                }}
                            >
                                <h6 className="py-4">{strings.voter}</h6>
                                <div className="row">
                                    <InputTextColumn
                                        field={"nationalCode"}
                                        inputStyle={{
                                            textAlign: "left",
                                            direction: "ltr",
                                        }}
                                    />
                                    <InputTextColumn field={"name"} />
                                    <InputTextColumn field={"family"} />
                                </div>
                            </div>
                        </>
                    )}
                    {pageState?.props?.item?.voter && (
                        <div className="col-12 pb-4">
                            <span className="ml-2">{strings.voter}:</span>
                            <Span>{`${pageState?.props?.item?.voter?.name} ${pageState?.props?.item?.voter?.family} - ${pageState?.props?.item?.voter?.nationalCode}`}</Span>
                        </div>
                    )}
                </FormCard>
                {pageState?.props?.item?.votedAt !== null &&
                    pageState?.props?.item?.votedType ===
                        VOTED_TYPES.PERSONAL &&
                    pageState?.props?.item?.proxicalCount < 3 && (
                        <FormCard
                            hasSubmit={
                                pageState?.props?.proxy &&
                                !pageState.props.proxy.votedAt &&
                                pageState?.props?.proxy?.id !==
                                    pageState?.props?.item?.id
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
                                    />
                                    <div
                                        className="col pr-0 d-flex align-items-center"
                                        style={{ marginBottom: "10px" }}
                                    >
                                        <button
                                            className="btn btn-warning px-4 ml-2"
                                            type="button"
                                            title={general.search}
                                            onClick={pageUtils.useForm.handleSubmit(
                                                pageUtils.onSearch
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
                                            {strings.votedType}:
                                        </span>
                                        <Span
                                            spanStyle={{
                                                color: pageState.props.proxy
                                                    .votedAt
                                                    ? "green"
                                                    : "rgb(133 95 4)",
                                            }}
                                        >
                                            {
                                                pageState.props.proxy
                                                    .votedTypeText
                                            }
                                        </Span>
                                        {pageState.props.proxy.votedAt && (
                                            <>
                                                <Span>
                                                    {
                                                        pageState.props.item
                                                            .votedAtFa
                                                    }
                                                </Span>
                                                <Span>
                                                    [{" "}
                                                    {
                                                        pageState.props.item
                                                            .username
                                                    }{" "}
                                                    ]
                                                </Span>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </FormCard>
                    )}
                {pageState?.props?.item?.votedAt &&
                    pageState?.props?.item?.votedType ===
                        VOTED_TYPES.PERSONAL && (
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
