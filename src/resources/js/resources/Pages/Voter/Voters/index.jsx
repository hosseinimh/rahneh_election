import React from "react";
import { useSelector } from "react-redux";

import { votersPage as strings, general } from "../../../../constants/strings";
import {
    InputTextColumn,
    ListPage,
    SearchBox,
    TableFooter,
    TableItems,
} from "../../../components";
import utils from "../../../../utils/Utils";
import { PageUtils } from "./PageUtils";

const Voters = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount = 5;
    const pageUtils = new PageUtils();

    const renderSearch = () => (
        <div className="row">
            <InputTextColumn field="name" />
            <InputTextColumn
                field="nationalCode"
                inputStyle={{
                    textAlign: "left",
                    direction: "ltr",
                }}
            />
        </div>
    );

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
                {strings.hasVoted}
            </th>
            <th scope="col" style={{ width: "150px" }}>
                {strings.nationalCode}
            </th>
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item, index) => (
            <tr key={item.id}>
                <td scope="row">
                    {utils.en2faDigits(
                        (pageState?.props?.pageNumber - 1) * 10 + index + 1
                    )}
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-warning mb-2 px-4"
                        onClick={() => pageUtils.onEdit(item)}
                        title={general.edit}
                        disabled={layoutState?.loading}
                    >
                        {general.edit}
                    </button>
                </td>
                <td>{`${item.name} ${item.family}`}</td>
                <td>
                    <span style={{ color: "green" }}>
                        {item.hasVoted && item.isNatural
                            ? strings.naturalVoted
                            : ""}
                        {item.hasVoted && !item.isNatural
                            ? strings.notNaturalVoted
                            : ""}
                    </span>
                    <span style={{ color: "rgb(133 95 4)" }}>
                        {!item.hasVoted ? strings.notVoted : ""}
                    </span>
                </td>
                <td>{item.nationalCode}</td>
            </tr>
        ));

        return <TableItems columnsCount={columnsCount} children={children} />;
    };

    const renderFooter = () => (
        <TableFooter columnsCount={columnsCount} pageUtils={pageUtils} />
    );

    return (
        <ListPage
            pageUtils={pageUtils}
            table={{ renderHeader, renderItems, renderFooter }}
            hasAdd={false}
        >
            <SearchBox
                pageUtils={pageUtils}
                onSubmit={pageUtils.onSubmit}
                onReset={pageUtils.onReset}
            >
                {renderSearch()}
            </SearchBox>
        </ListPage>
    );
};

export default Voters;
