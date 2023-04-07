import * as yup from "yup";
import { validation, usersPage as strings } from "../../../constants/strings";

const searchUserSchema = yup.object().shape({
    username: yup
        .string(validation.stringMessage.replace(":field", strings.username))
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.username)
                .replace(":max", "50")
        ),
    name: yup
        .string(validation.stringMessage.replace(":field", strings.name))
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.name)
                .replace(":max", "50")
        ),
});

export default searchUserSchema;
