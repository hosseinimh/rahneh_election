import React from "react";

import {
    InputRadioColumn,
    InputTextColumn,
    FormPage,
    InputCheckboxColumn,
} from "../../../components";
import { addUserPage as strings } from "../../../../constants/strings";
import { PageUtils } from "./PageUtils";

const AddUser = () => {
    const pageUtils = new PageUtils();

    return (
        <FormPage pageUtils={pageUtils}>
            <InputTextColumn
                field="username"
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                field="password"
                type="password"
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                field="confirmPassword"
                type="password"
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn field="name" />
            <div className="col-md-3 col-sm-12 pb-4">
                <label className="form-label">{strings.status}</label>
                <InputCheckboxColumn field="isActive" checked={true} />
            </div>
            <div className="col-md-3 col-sm-12 pb-4">
                <label className="form-label">{strings.type}</label>
                <InputRadioColumn
                    field="administrator"
                    name="type"
                    checked={true}
                />
                <InputRadioColumn field="user" name="type" />
            </div>
        </FormPage>
    );
};

export default AddUser;
