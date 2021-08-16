import { intersection } from 'lodash';

export function isLoggedIn() {
	return !! localStorage.getItem('userdetails');
}

export function isArrayWithLength(arr) {
 return (Array.isArray(arr) && arr.length)
}

export function checkPermission(permission) {
    const roles = JSON.parse(localStorage.getItem('userdetails'));
    if(!isArrayWithLength(permission)) return true;
    else return intersection(permission, roles?.role_list).length;
}

export function allowedRoutes(routes) {
    const roles = JSON.parse(localStorage.getItem('userdetails'));
    return routes.filter(({ permission }) => {
        if(!permission) return true;
        else if(!isArrayWithLength(permission)) return true;
        else return intersection(permission, roles?.role_list).length;
    });
}