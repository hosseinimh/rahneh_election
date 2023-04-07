import React from "react";

import { AlertState } from "../../components";
import BasePageLayout from "./BasePageLayout";

const FormPageLayout = ({ children, pageUtils, modals }) => {
    return (
        <BasePageLayout pageUtils={pageUtils} modals={modals}>
            <div className="container-lg">
                <AlertState />
                {children}
            </div>
        </BasePageLayout>
    );
};

export default FormPageLayout;
