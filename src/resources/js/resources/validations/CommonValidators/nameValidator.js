import { validation } from "../../../constants/strings";

const validate = (schema, field) => {
    return schema
        .min(
            2,
            validation.minMessage.replace(":field", field).replace(":min", "2")
        )
        .max(
            50,
            validation.maxMessage.replace(":field", field).replace(":max", "50")
        )
        .matches(/^[a-z]+$/, validation.stringMessage.replace(":field", field));
};

const nameValidator = (schema, field, required = true) => {
    if (required) {
        return validate(schema, field).required(
            validation.requiredMessage.replace(":field", field)
        );
    }
    return validate(schema, field);
};

export default nameValidator;
