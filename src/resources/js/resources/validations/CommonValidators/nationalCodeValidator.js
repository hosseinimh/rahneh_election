import { validation } from "../../../constants/strings";

const validate = (schema, field) => {
    return schema
        .matches(/^[0-9]+$/, validation.numberMessage.replace(":field", field))
        .min(
            10,
            validation.minDigitMessage
                .replace(":field", field)
                .replace(":min", "10")
        )
        .max(
            10,
            validation.maxDigitMessage
                .replace(":field", field)
                .replace(":max", "10")
        );
};

const nationalCodeValidator = (schema, field, required = true) => {
    if (required) {
        return validate(schema, field).required(
            validation.requiredMessage.replace(":field", field)
        );
    }
    return validate(schema, field);
};

export default nationalCodeValidator;
