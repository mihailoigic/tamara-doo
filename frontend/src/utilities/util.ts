export const detectIE = (): number | boolean => {
    const userAgent = window.navigator.userAgent;
    const msie = userAgent.indexOf('MSIE ');

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(
            userAgent.substring(msie + 5, userAgent.indexOf('.', msie)),
            10,
        );
    }
    const trident = userAgent.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        const rv = userAgent.indexOf('rv:');
        return parseInt(
            userAgent.substring(rv + 3, userAgent.indexOf('.', rv)),
            10,
        );
    }
    const edge = userAgent.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(
            userAgent.substring(edge + 5, userAgent.indexOf('.', edge)),
            10,
        );
    }
    // other browser
    return false;
};

export const firstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
