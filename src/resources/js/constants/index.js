import serverConfig from "../../../server-config.json";
import { MESSAGE_TYPES } from "./messageTypes";
import { MESSAGE_CODES } from "./messageCodes";
import { UPLOADED_FILE } from "./UploadedFile";
import { USER_ROLES } from "./userRoles";
import { BASE_PATH, ASSETS_PATH, IMAGES_PATH, PAGE_ITEMS } from "./theme";

const BASE_URL = serverConfig.baseUrl;

export {
    BASE_URL,
    BASE_PATH,
    ASSETS_PATH,
    IMAGES_PATH,
    PAGE_ITEMS,
    MESSAGE_TYPES,
    MESSAGE_CODES,
    UPLOADED_FILE,
    USER_ROLES,
};
