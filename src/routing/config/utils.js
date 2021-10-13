import { intersection } from 'lodash';

export function isLoggedIn() {
	return !! localStorage.getItem('userdetails');
}

export function isArrayWithLength(arr) {
 return (Array.isArray(arr) && arr.length)
}

function conversion() {
    const roles = JSON.parse(localStorage.getItem('access'));
    let temp = [];
    Object.entries(roles).forEach(([key, val]) => {
        if (key != 'employee_id') {
            Object.entries(val).forEach(([k, v]) => {
                temp.push(k)
            })
        }
    })
    return temp;
}

export function checkPermission(permission) {
    let permit =  conversion();
    if(!isArrayWithLength(permission)) return true;
    else return intersection(permission, permit).length;
}

export function allowedRoutes(routes) {
    let permit =  conversion();
    return routes.filter(({ permission }) => {
        if(!permission) return true;
        else if(!isArrayWithLength(permission)) return true;
        else return intersection(permission, permit).length;
    });
}

export function allowed(permission) {
    console.log('checking', permission)
    let permit =  conversion();
    if(!isArrayWithLength(permission)) return true;
    else return intersection(permission, permit).length;
}