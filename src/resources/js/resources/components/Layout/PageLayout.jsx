import React from "react";

import { AlertState } from "../../components";
import BasePageLayout from "./BasePageLayout";

const PageLayout = ({ children, pageUtils }) => {
    return (
        <BasePageLayout pageUtils={pageUtils}>
            <div className="container-lg">
                <AlertState />
                {children}
            </div>
        </BasePageLayout>
    );
};

export default PageLayout;
