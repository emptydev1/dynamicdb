module.exports = function isValidPropertyValue(value) {
    return typeof value === 'string' ||
        typeof value === 'boolean' ||
        typeof value === 'number' ||
        value === null ||
        (Array.isArray(value) && value.every(isValidPropertyValue)) ||
        (typeof value === 'object' && Object.values(value).every(isValidPropertyValue));
};
