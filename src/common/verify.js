//import AlertFunction from "../../lib/AlertFunction";

// import React, {Component} from 'react';
import {
    Alert,
} from 'react-native'

export default function (obj) {

    return Object.entries(obj).every(([key, o]) => {
        if (o.type === 'input') {
            if (o.value === '') {
                // this.alertFunction('哈哈','hehe');
                Alert.alert('警告',`请输入${o.title}`);
                // AlertFunction({title: '警告', msg: `请输入${o.title}`});
                return false;
            }
            if ((o.style === 'number' || o.style === 'tel') && o.min !== undefined && o.min > 0) {
                if (o.value < o.min) {
                    Alert.alert('警告',`${o.title}最低${o.min}`);
                    // AlertFunction({title: '警告', msg: `${o.title}最低${o.min}`});
                    return false;
                }
            }
            if ((o.style === 'number' || o.style === 'tel') && o.max !== undefined && o.max > 0) {
                if (o.value > o.max) {
                    Alert.alert('警告',`${o.title}最高${o.max}`);
                    // AlertFunction({title: '警告', msg: `${o.title}最高${o.max}`});
                    return false;
                }
            }
            if (o.float !== undefined) {
                if ((o.value.toString().indexOf('.') !== -1) !== o.float) {
                    Alert.alert('警告',`${o.title}${o.float ? '必须' : '不能'}含有小数`);
                    // AlertFunction({title: '警告', msg: `${o.title}${o.float ? '必须' : '不能'}含有小数`});
                    return false;
                }
            }
            if (o.nonzero !== undefined && o.nonzero) {
                if(o.value.toString().slice(-1) === '0'){
                    Alert.alert('警告',`${o.title}最后一位不能为0`);
                    // AlertFunction({title: '警告', msg: `${o.title}最后一位不能为0`});
                    return false;
                }
            }
            if (o.chn !== undefined) {
                o.value = o.value.replace(/\r\n/g, '');
                let pattern = /^([u4e00-u9fa5]|[ufe30-uffa0])*$/gi;
                let other = /\d/g;
                if (o.chn) {
                    if (pattern.test(o.value)) {
                        Alert.alert('警告',`${o.title}请输入中文`);
                        // AlertFunction({title: '警告', msg: `${o.title}请输入中文`});
                        return false
                    }
                } else {
                    if (!pattern.test(o.value)) {
                        Alert.alert('警告',`${o.title}请不要输入中文`);
                        // AlertFunction({title: '警告', msg: `${o.title}请不要输入中文`});
                        return false
                    }
                }
            }
            return true
        } else if (o.type === 'select') {
            if (o.value === '') {
                Alert.alert('警告',`请选择${o.title}`);
                // AlertFunction({title: '警告', msg: `请选择${o.title}`});
                return false;
            }
            return true
        } else {
            return true
        }
    })
}