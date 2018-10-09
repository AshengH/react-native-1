import {
    HOST,
    DOMAIN
} from "../config";
import {Schedule} from "../module";

export default async function ({url, type, data, animate,file}) {
    let body;
    let error;
    try {
        if(!!animate) Schedule.dispatchEvent({event:'loadingStart'});
        url = url || '';

        let str = '';
        if (!!data) {
            str = '?';
            for (let [n, v] of Object.entries(data)) {
                str += `${n}=${v}&`
            }
        }
        type = type || 'GET';
        let  panduanStr = "/api/news/calendar.htm";
        if (url.indexOf(panduanStr) > -1){
            console.log(`${file?DOMAIN:HOST}${url}${str}`,'打印URL');
        }
        const res = await fetch(`${file?DOMAIN:HOST}${url}${str}`, {
            method: type,
            mode: 'cors',
        });
        if(res._bodyText === undefined || res._bodyText.indexOf('!doctype html') === -1){
            body = await res.text();
            body = JSON.parse(body);
        }else{
            console.warn(res);
            throw 'unknown error';
        }
    } catch (err) {
        console.warn(err);
        body = null;
        error = err;
    }

    return new Promise(function (resolve, reject) {
        if(!!animate) Schedule.dispatchEvent({event:'loadingEnd'});
        
        if (body !== null) {
            if(file){
                resolve(body)
            }else if (body.code === 200 || body.status === 200 || body.code === 0 || body.errorCode === 200 || body.errorCode === 0 || body.resultCode === 200 || body.resultCode === 0) {
                if (body.success !== undefined) {
                    if (body.success) {
                        resolve(body)
                    } else {
                        reject(body)
                    }
                } else {
                    resolve(body)
                }
            } else {
                reject(body)
            }
            
        } else {
            reject(error)
        }
    })
};