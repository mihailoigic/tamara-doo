const Config = {
    PUBLIC_URL: process.env.PUBLIC_URL,
    websiteRoot: process.env.REACT_APP_WEBSITE_ROOT || "",
    prefixUrl: process.env.REACT_APP_URL_PREFIX || "",
    api: {
        baseUrl: process.env.REACT_APP_API_BASE_URL || "",
    },
};

export default Config;
