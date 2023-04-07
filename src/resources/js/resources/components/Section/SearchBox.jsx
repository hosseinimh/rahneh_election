import React from "react";
import { useSelector } from "react-redux";

import { general } from "../../../constants/strings";

const SearchBox = ({ children, pageUtils, onSubmit, onReset }) => {
    const layoutState = useSelector((state) => state.layoutReducer);

    return (
        <div className="card mb-4">
            <div className="card-header bg-info">
                <div className="row">
                    <div className="col-12 mx-3">
                        <span className="text-white">{general.search}</span>
                    </div>
                </div>
            </div>
            <div className="card-body mx-3">{children}</div>
            <div
                className="card-footer bg-light"
                style={{ backgroundColor: "rgba(0, 0, 21, 0.5)" }}
            >
                <div className="row">
                    <div className="col-sm-12">
                        <button
                            className="btn btn-dark px-4 ml-2"
                            type="button"
                            disabled={layoutState?.loading}
                            title={general.search}
                            onClick={pageUtils.useForm.handleSubmit(onSubmit)}
                        >
                            {general.search}
                        </button>
                        <button
                            className="btn btn-secondary px-4"
                            type="button"
                            disabled={layoutState?.loading}
                            title={general.reset}
                            onClick={onReset}
                        >
                            {general.reset}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
