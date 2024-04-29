import { countries } from '../assets/data'

export const getCountry = (filterName) => {
    return countries.filter(obj => {
        for (const key in obj) {
            if (typeof obj[key] === 'string' && obj[key].includes(filterName)) {
                return true;
            }
        }
        return false;
    });
}