export const ActionTypes = {
    INIT: 'INIT',
    SET_LOADER: '[UI] SET_LOADER',
    SHOW_LOADER: 'SHOW_LOADER',
    HIDE_LOADER: 'HIDE_LOADER',
    API_REQUEST: 'API_REQUEST',
    API_SUCCESS: 'API_SUCCESS',
    API_ERROR: 'API_ERROR',
    MAINTENANCE_SET: 'MAINTENANCE_SET',
    NOT_FOUND: 'NOT_FOUND',
    SET_ERROR_MODE: 'SET_ERROR_MODE',
    ENTER_IN_MAINTENANCE_MODE: 'ENTER_IN_MAINTENANCE_MODE',
    SET_API_RESPONSE_IN_CACHE: 'SET_API_RESPONSE_IN_CACHE',
    SET_CAPTCHA_REQUIRED: 'SET_CAPTCHA_REQUIRED',
    SET_ITEM_IN_LOCAL_STORAGE: 'SET_ITEM_IN_LOCAL_STORAGE',
    GET_ITEM_FROM_LOCAL_STORAGE: 'GET_ITEM_FROM_LOCAL_STORAGE',
    REDIRECT_TO: 'REDIRECT_TO',
    PRODUCTS: {
        FETCH: `[PRODUCTS] FETCH`,
        SET: `[PRODUCTS] SET`,
        ENRICH: `[PRODUCTS] ENRICH`,
    },
};

export default ActionTypes;