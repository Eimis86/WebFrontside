import {useLocation} from 'react-router-dom';

export function parseQueryParams(search: string): { [ key: string ]: string; } {
    search = search.substring(search.indexOf('?') + 1);

    if (search.length) {
        const params = search.split('&');

        return params.reduce<{ [ key: string ]: string; }>((c, item) => {
            const [key, value] = item.split('=');
            c[key] = value;
            return c;
        }, {});
    }

    return  {};
}

export function useQueryParams<T extends { [ key: string ]: string; }>(): T {
    const location = useLocation();
    return parseQueryParams(location.search) as T;
}
