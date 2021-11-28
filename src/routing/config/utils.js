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
            val.forEach((item) => {
                Object.entries(item).forEach(([k, v]) => {
                    temp.push(v)
                })
            })
        }
    })
    return temp;
}
function conversion1() {
    const roles = JSON.parse(localStorage.getItem('access'));
    let temp = [];
    Object.entries(roles).forEach(([key, val]) => {
        if (key != 'employee_id') {
            val.forEach((item) => {
                Object.entries(item).forEach(([k, v]) => {
                    Object.entries(v).forEach(([KEY, VAL]) => {
                        temp.push(KEY)
                    })
                })
            })
        }
    })
    return temp;
}

export function checkPermission(permission) {
    let permit =  conversion1();
    if(!isArrayWithLength(permission)) return true;
    else return intersection(permission, permit).length;
}

export function allowedRoutes(routes) {
    let permit =  conversion1();
    return routes.filter(({ permission }) => {
        if(!permission) return true;
        else if(!isArrayWithLength(permission)) return true;
        else return intersection(permission, permit).length;
    });
}

export function allowed(permission, str = '') {
    let permit2 =  conversion();
    if(!isArrayWithLength(permission)) {
        return true;
    } else {
        let bol = false;
        Object.entries(permit2[0]).forEach(([key, val]) => {
            if (key === permission[0] && val[str] === 1) {
                bol = true;
            }
        })
        return bol;
    }
    
}