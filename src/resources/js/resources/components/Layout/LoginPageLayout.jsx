import React from "react";
import { useSelector } from "react-redux";

import { AlertState } from "../../components";
import { footer, general } from "../../../constants/strings";
import BasePageLayout from "./BasePageLayout";

const LoginPageLayout = ({ children, pageUtils }) => {
    const layoutState = useSelector((state) => state.layoutReducer);

    return (
        <BasePageLayout authPage={false} pageUtils={pageUtils}>
            <div className="app-container">
                <div className="h-100 bg-plum-plate bg-animation">
                    <div className="d-flex h-100 justify-content-center align-items-center">
                        <div className="mx-auto app-login-box col-md-8">
                            <div className="app-logo-inverse mx-auto mb-3">
                                <span>{general.brandLogo}</span>
                            </div>
                            <div className="modal-dialog w-100 mx-auto">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <div className="h5 modal-title text-center">
                                            <h4 className="mt-2">
                                                <div>
                                                    {pageUtils.strings.welcome}
                                                </div>
                                                <span>
                                                    {
                                                        pageUtils.strings
                                                            .description
                                                    }
                                                </span>
                                            </h4>
                                        </div>
                                        <AlertState />
                                        {children}
                                    </div>
                                    <div className="modal-footer clearfix justify-content-end">
                                        <div className="mx-3">
                                            <button
                                                className="btn btn-primary btn-lg"
                                                onClick={pageUtils.useForm.handleSubmit(
                                                    pageUtils.onSubmit
                                                )}
                                                type="button"
                                                disabled={layoutState?.loading}
                                            >
                                                {pageUtils.strings.login}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center text-white opacity-8 mt-3">
                                {footer.copyright}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BasePageLayout>
    );
};

export default LoginPageLayout;
