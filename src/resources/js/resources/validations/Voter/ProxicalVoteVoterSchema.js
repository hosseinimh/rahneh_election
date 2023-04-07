import * as yup from "yup";
import { validation, votePage as strings } from "../../../constants/strings";

const proxicalVoteVoterSchema = yup.object().shape({
    nationalCode: yup
        .string(
            validation.stringMessage.replace(":field", strings.nationalCode)
        )
        .matches(
            /^[0-9]{10}$/,
            validation.exactDigitMessage
                .replace(":field", strings.nationalCode)
                .replace(":digit", "10")
        )
        .required(
            validation.requiredMessage.replace(":field", strings.nationalCode)
        ),
});

export default proxicalVoteVoterSchema;
