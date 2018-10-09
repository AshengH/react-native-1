import {
    AsyncStorage
} from 'react-native';

import zh_cn from './zh-CN';
import zh_hant from './zh-hant';
import ja from './ja';
import ko from './ko';
import id from './id';
import java from './java'

import {
    DefaultLanguage
} from "../config";

import {Schedule} from "../module";

const language = [
    {
        name: '简体中文',
        value: 'zh_cn',
        des: 'Chinese,Simplified'
    },
    {
        name: 'English',
        value: 'en',
        des: 'English'
    },
    // {
    //     name: '繁體中文',
    //     value: 'zh_hant',
    //     des: 'Chinese,Traditional'
    // },
    // {
    //     name: '日文',
    //     value: 'ja',
    //     des: 'japanese'
    // },
    // {
    //     name: '한국어',
    //     value: 'ko',
    //     des: 'Korean'
    // },
    // {
    //     name: 'Indonesian',
    //     value: 'id',
    //     des: 'Bahasa Indonesian'
    // },
    // {
    //     name: 'Javanesse',
    //     value: 'java',
    //     des: 'Javanesse'
    // }
];

const map = {
    'zh_cn': zh_cn,
    'zh_hant':zh_hant,
    'ja':ja,
    'ko':ko,
    'id':id,
    'java':java
};

let set = DefaultLanguage;

export function lang(key) {
    if (map[set] !== undefined) {
        return map[set][key];
    } else {
        return key;
    }
}

export function getCurrentlyLanguage() {
    return language.find(({value})=>{
        return value === set
    })
}

export function currentLanguage() {
    return set;
}

export function setLanguage(key) {
    set = key;
    Schedule.dispatchEvent({event: 'updateLanguage'});
    AsyncStorage.setItem('lang', key)
}

export async function getLanguage() {
    try{
        let lang = await AsyncStorage.getItem('lang');
        if (lang !== null) {
            set = lang;
            Schedule.dispatchEvent({event: 'updateLanguage'});
        } else {
            Schedule.dispatchEvent({event: 'loadLanguage'});
        }
    }catch (err){
        Schedule.dispatchEvent({event: 'loadLanguage'});
    }
}

export function getAvailableLanguage() {
    return language;
}