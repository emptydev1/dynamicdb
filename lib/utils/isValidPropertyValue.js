module.exports = function(value) {
    return typeof value === 'string' ||
        typeof value === 'boolean' ||
        typeof value === 'number' ||
        value === null ||
        (Array.isArray(value) && value.every(isValidBSONPropertyValue)) ||
        (typeof value === 'object' && Object.values(value).every(isValidBSONPropertyValue));
};
