import React from "react";

import { BASE_PATH } from "../../../constants";
import { footer, general } from "../../../constants/strings";

const FallbackError = () => {
    return (
        <div className="app-container app-theme-white body-tabs-shadow">
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
                                        <div
                                            className="alert alert-danger"
                                            role="alert"
                                        >
                                            {general.fallbackError}
                                        </div>
                                        <div className="text-center">
                                            <a
                                                className="btn btn-primary"
                                                href={BASE_PATH}
                                            >
                                                {general.fallbackReturnHome}
                                            </a>
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
        </div>
    );
};

export default FallbackError;
