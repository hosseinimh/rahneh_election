import React from "react";
import { useSelector } from "react-redux";

import { IMAGES_PATH } from "../../../constants";
import { general } from "../../../constants/strings";

const TableItems = ({ children, columnsCount }) => {
    const ls = useSelector((state) => state.layoutReducer);

    if (children?.length > 0) {
        return children;
    } else if (ls?.loading) {
        return (
            <tr>
                <td colSpan={columnsCount} className="img-loading-wrapper">
                    <img
                        src={`${IMAGES_PATH}/loading.gif`}
                        className="img-loading mx-2"
                    />
                    {general.loading}
                </td>
            </tr>
        );
    }

    return (
        <tr>
            <td colSpan={columnsCount}>{general.noDataFound}</td>
        </tr>
    );
};

export default TableItems;
