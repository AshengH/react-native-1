import {
    QUOTE
} from "../config";

export default async function ({url, type, data}) {
    let quote = null;
    try {
        url = url || '';

        let str = '';
        if (!!data) {
            str = '?';
            for (let [n, v] of Object.entries(data)) {
                str += `${n}=${v}&`
            }
        }

        type = type || 'GET';
        const res = await fetch(`${QUOTE}${url}${str}`, {
            method: type
        });
        let body = await res.text();
        body = body.match(/data:'([\s\S]+)'/);
        if (body !== null && body.length > 0) {
            [, quote] = body;
            if(quote.indexOf(';') !== -1){
                quote = quote.split(';');
                quote = quote.map((e) => e.split(','));
            }
        } else {
            quote = null;
        }
    } catch (err) {
        console.warn(err);
    }
    return new Promise(function (resolve, reject) {
        if (quote) {
            resolve(quote)
        } else {
            reject(quote)
        }
    })
};