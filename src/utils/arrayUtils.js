export function checkObjectInArray(array, key, value) {
    return array.some(obj => obj[key] === value);
}