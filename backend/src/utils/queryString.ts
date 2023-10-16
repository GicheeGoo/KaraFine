export const stringify = <T extends Record<string, any>>(query: T): string => {
    const keys = Object.keys(query);
    const nonNullKeys = keys.filter((key) => query[key]);

    let string = '';
    nonNullKeys.forEach((key) => {
        string += (string ? '&' : '') + key + '=' + query[key];
    });

    return string;
};
