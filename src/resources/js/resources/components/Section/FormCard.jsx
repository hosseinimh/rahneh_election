import React from "react";
import { useSelector } from "react-redux";

import { general } from "../../../constants/strings";

const FormCard = ({
    children,
    pageUtils,
    hasSubmit = true,
    submitEnabled = true,
    hasCancel = true,
}) => {
    const layoutState = useSelector((state) => state.layoutReducer);

    return (
        <div className="row">
            <div className="col-12">
                <div className="card mb-4 px-2">
                    <div className="card-body">
                        <div className="row">{children}</div>
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-sm-12">
                                {hasSubmit && (
                                    <button
                                        className="btn btn-success px-4 ml-2"
                                        type="button"
                                        title={
                                            pageUtils?.strings &&
                                            "submit" in pageUtils.strings
                                                ? pageUtils.strings["submit"]
                                                : general.submit
                                        }
                                        onClick={pageUtils.useForm.handleSubmit(
                                            pageUtils.onSubmit
                                        )}
                                        disabled={
                                            layoutState?.loading ||
                                            !submitEnabled
                                        }
                                    >
                                        {pageUtils?.strings &&
                                        "submit" in pageUtils.strings
                                            ? pageUtils.strings["submit"]
                                            : general.submit}
                                    </button>
                                )}
                                {hasCancel && (
                                    <button
                                        className="btn btn-secondary px-4"
                                        type="button"
                                        title={
                                            pageUtils?.strings &&
                                            "cancel" in pageUtils.strings
                                                ? pageUtils.strings["cancel"]
                                                : general.cancel
                                        }
                                        onClick={pageUtils.onCancel}
                                        disabled={layoutState?.loading}
                                    >
                                        {pageUtils?.strings &&
                                        "cancel" in pageUtils.strings
                                            ? pageUtils.strings["cancel"]
                                            : general.cancel}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormCard;
