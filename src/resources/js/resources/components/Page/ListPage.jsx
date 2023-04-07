import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { general } from "../../../constants/strings";
import { PageLayout, TableCard } from "../";

const ListPage = ({
    pageUtils,
    children,
    table,
    hasAdd = true,
    backUrl = null,
}) => {
    const navigate = useNavigate();
    const layoutState = useSelector((state) => state.layoutReducer);

    return (
        <PageLayout pageUtils={pageUtils}>
            {children}
            {(hasAdd || backUrl) && (
                <div className="row mb-2">
                    <div className="col-sm-12">
                        {hasAdd && (
                            <button
                                className="btn btn-success px-4"
                                type="button"
                                title={pageUtils.strings.add}
                                onClick={pageUtils.onAdd}
                                disabled={layoutState?.loading}
                            >
                                {pageUtils.strings.add}
                            </button>
                        )}
                        {backUrl && (
                            <button
                                className="btn btn-secondary mr-2 px-4"
                                type="button"
                                title={general.back}
                                onClick={() => navigate(backUrl)}
                                disabled={layoutState?.loading}
                            >
                                {general.back}
                            </button>
                        )}
                    </div>
                </div>
            )}

            <TableCard table={table} />
        </PageLayout>
    );
};

export default ListPage;
