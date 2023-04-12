import * as yup from "yup";

import { VOTED_TYPES } from "../../../constants";
import { votePage as strings } from "../../../constants/strings";
import { nameValidator, nationalCodeValidator } from "../CommonValidators";

const voteVoterSchema = yup.object().shape({
    proxicalVoterNationalCode: yup.string().when("voter", (voter, schema) => {
        if (voter == VOTED_TYPES.PROXICAL) {
            return nationalCodeValidator(
                schema,
                strings.proxicalVoterNationalCode
            );
        }
        return schema;
    }),
    notShareholderVoterNationalCode: yup
        .string()
        .when("voter", (voter, schema) => {
            if (voter == VOTED_TYPES.NOT_SHAREHOLDER) {
                return nationalCodeValidator(
                    schema,
                    strings.notShareholderVoterNationalCode
                );
            }
            return schema;
        }),
    notShareholderVoterName: yup.string().when("voter", (voter, schema) => {
        if (voter == VOTED_TYPES.NOT_SHAREHOLDER) {
            return nameValidator(schema, strings.notShareholderVoterName);
        }
        return schema;
    }),
    notShareholderVoterFamily: yup.string().when("voter", (voter, schema) => {
        if (voter == VOTED_TYPES.NOT_SHAREHOLDER) {
            return nameValidator(schema, strings.notShareholderVoterFamily);
        }
        return schema;
    }),
});

export default voteVoterSchema;
