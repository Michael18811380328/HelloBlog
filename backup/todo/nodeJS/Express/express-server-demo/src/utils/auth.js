import logger from "../logger";
import {ERROR_TYPE} from "./callback-message";
import jwt from "jsonwebtoken";
import {PRIVATE_KEY} from "../config/config";

export function decodeAdminAuthorization(authorization) {
    if (!authorization || authorization.split(' ').length !== 2 || authorization.split(' ')[0] !== 'Token') {
        return null;
    }
    let accessToken = authorization.split(' ')[1];
    let {payload} = decodeAdminAccessToken(accessToken);
    return payload;
}

export function decodeAuthorization(authorization, dtable_uuid) {
    if (!authorization || authorization.split(' ').length !== 2 || authorization.split(' ')[0] !== 'Token') {
        return null;
    }
    let accessToken = authorization.split(' ')[1];
    let {payload} = decodeAccessToken(accessToken, dtable_uuid);
    return payload;
}

export function decodeAdminAccessToken(accessToken) {
    let result = {payload: null, error_type: ERROR_TYPE.PERMISSION_DENIED};
    jwt.verify(accessToken, PRIVATE_KEY, {algorithms: ['HS256']}, (err, decode) => {
        if (err) {
            logger.error(err.message);
            result = {payload: null, error_type: ERROR_TYPE.TOKEN_EXPIRED};
        }
        if (decode) {
            if (!decode.admin) {
                result = {payload: null, error_type: ERROR_TYPE.PERMISSION_DENIED};
            } else {
                result = {payload: decode};
            }
        }
    });
    return result;
}

export function decodeAccessToken(accessToken, dtable_uuid) {
    let result = {payload: null, error_type: ERROR_TYPE.PERMISSION_DENIED};
    jwt.verify(accessToken, PRIVATE_KEY, {algorithms: ['HS256']}, (err, decode) => {
        if (err) {
            logger.error(err.message);
            result = {payload: null, error_type: ERROR_TYPE.TOKEN_EXPIRED};
        }

        if (decode) {
            if (decode.dtable_uuid !== dtable_uuid) {
                logger.error('You don\'t have permission to get data from the current table.');
                result = {payload: null, error_type: ERROR_TYPE.PERMISSION_DENIED};
            } else {
                result = {payload: decode};
            }
        }
    });
    return result;
}