import * as yup from "yup";
import { validation, votersPage as strings } from "../../../constants/strings";

const searchVoterSchema = yup.object().shape({
    name: yup
        .string(validation.stringMessage.replace(":field", strings.name))
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.name)
                .replace(":max", "50")
        ),
    nationalCode: yup
        .string(
            validation.stringMessage.replace(":field", strings.nationalCode)
        )
        .max(
            10,
            validation.maxMessage
                .replace(":field", strings.nationalCode)
                .replace(":max", "10")
        ),
});

export default searchVoterSchema;
