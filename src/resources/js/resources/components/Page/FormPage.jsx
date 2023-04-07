import { useSelector } from "react-redux";

import { general } from "../../../constants/strings";
import { FormPageLayout } from "../";

const FormPage = ({ children, pageUtils, modals = null }) => {
    const layoutState = useSelector((state) => state.layoutReducer);

    return (
        <FormPageLayout pageUtils={pageUtils} modals={modals}>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4 px-2">
                        <div className="card-body">
                            <div className="row">{children}</div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-sm-12">
                                    <button
                                        className="btn btn-success px-4 ml-2"
                                        type="button"
                                        onClick={pageUtils.useForm.handleSubmit(
                                            pageUtils.onSubmit
                                        )}
                                        disabled={layoutState?.loading}
                                    >
                                        {general.submit}
                                    </button>
                                    <button
                                        className="btn btn-secondary px-4"
                                        type="button"
                                        onClick={pageUtils.onCancel}
                                        disabled={layoutState?.loading}
                                    >
                                        {general.cancel}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FormPageLayout>
    );
};

export default FormPage;
