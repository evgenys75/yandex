export const getOrderDate = (dateOrder: string): string => {
    const date = new Date(dateOrder).setHours(0, 0, 0, 0);
    const currentDate = new Date().setHours(0, 0, 0, 0);
    let day = new Date(date).toLocaleDateString("ru-RU", {});

    if (date === currentDate) {
        day = "Сегодня";
    } else if (currentDate - date === 24 * 60 * 60 * 1000) {
        day = "Вчера";
    } else if (currentDate - date === -24 * 60 * 60 * 1000) {
        day = "Завтра";
    }
    const time = new Date(dateOrder).toLocaleTimeString("ru-Ru", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    });

    return `${day}, ${time}`;
}

export async function checkResponse(res: Response) {
    return res.ok ? await res.json() : Promise.reject(
        `res.ok: ${res.ok}, res.status: ${res.status}`);
}

export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props: any) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
    setCookie(name, '', {expires: -1});
}