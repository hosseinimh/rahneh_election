import React from "react";

import { InputTextColumn, FormPage } from "../../../components";
import { PageUtils } from "./PageUtils";

const ChangePasswordUser = () => {
    const pageUtils = new PageUtils();

    return (
        <FormPage pageUtils={pageUtils}>
            <InputTextColumn
                field="newPassword"
                type="password"
                inputStyle={{ direction: "ltr" }}
            />
            <InputTextColumn
                field="confirmPassword"
                type="password"
                inputStyle={{ direction: "ltr" }}
            />
        </FormPage>
    );
};

export default ChangePasswordUser;
