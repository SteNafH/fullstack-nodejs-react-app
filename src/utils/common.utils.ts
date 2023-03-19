export function multipleColumnSet(object: Record<string, any>) {
    const keys = Object.keys(object);
    const values = Object.values(object);

    const columnSet = keys.map(key => `${key} = ?`).join(', ');

    return {
        columnSet,
        values
    };
}

export function multipleFilterSet(object: Record<string, any>) {
    const keys = Object.keys(object);
    const values = Object.values(object);

    const filterSet = keys.map(key => {
        if (Array.isArray(object[key]))
            return `${key} IN (?)`;

        return `${key} = ?`
    }).join(' AND ');

    return {
        filterSet,
        filterValues: values
    };
}
