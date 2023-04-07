import React from "react";
import { useSelector } from "react-redux";

import { usersPage as strings, general } from "../../../../constants/strings";
import {
    InputTextColumn,
    ListPage,
    SearchBox,
    TableFooter,
    TableItems,
} from "../../../components";
import utils from "../../../../utils/Utils";
import { USER_ROLES } from "../../../../constants";
import { PageUtils } from "./PageUtils";

const Users = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const userState = useSelector((state) => state.userReducer);
    const columnsCount = 5;
    const pageUtils = new PageUtils();

    const renderSearch = () => (
        <div className="row">
            <InputTextColumn
                field="username"
                inputStyle={{
                    textAlign: "left",
                }}
            />
            <InputTextColumn field="name" />
        </div>
    );

    const renderHeader = () => (
        <tr>
            <th scope="col" style={{ width: "50px" }}>
                #
            </th>
            <th scope="col" style={{ width: "150px" }}>
                {strings.username}
            </th>
            <th scope="col">{strings.name}</th>
            <th scope="col" style={{ width: "150px" }}>
                {strings.role}
            </th>
            <th scope="col" style={{ width: "100px" }}>
                {strings.status}
            </th>
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item, index) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td scope="row">
                        {utils.en2faDigits(
                            (pageState?.props?.pageNumber - 1) * 10 + index + 1
                        )}
                    </td>
                    <td>{item.username}</td>
                    <td>{item.name}</td>
                    <td>
                        {item.role === USER_ROLES.ADMINISTRATOR
                            ? general.administrator
                            : general.user}
                    </td>
                    <td>
                        {item.isActive === 1
                            ? strings.active
                            : strings.notActive}
                    </td>
                </tr>
                <tr>
                    <td colSpan={columnsCount}>
                        <button
                            type="button"
                            className="btn btn-warning mb-2 px-4 ml-2"
                            onClick={() => pageUtils.onEdit(item)}
                            title={general.edit}
                            disabled={layoutState?.loading}
                        >
                            {general.edit}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary mb-2 px-4 ml-2"
                            onClick={() => pageUtils.onChangePassword(item)}
                            title={strings.changePassword}
                            disabled={layoutState?.loading}
                        >
                            {strings.changePassword}
                        </button>
                    </td>
                </tr>
            </React.Fragment>
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
            hasAdd={
                userState?.user?.role === USER_ROLES.ADMINISTRATOR
                    ? true
                    : false
            }
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

export default Users;
