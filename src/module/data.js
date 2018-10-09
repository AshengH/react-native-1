import jsonp from '../lib/jsonp';

import {
    Contracts,
    Schedule,
    Rest, Data
} from "./index";

export default {
    initial:false,
    digitalBrief: [],
    domesticBrief: [],
    foreignBrief: [],
    stockBrief:[],
    selfBrief:[],
    total: {},
    strap: '',
    plan: null,
    callbackList: [],
    interval:2000,
    init() {
        for (let {contract} of Contracts.digitalArray) {
            if(!!contract){
                let o = {name: contract, price: null, rate: null, isUp: null};
                this.digitalBrief.push(o);
                this.total[contract] = o;
            }
        }
        for (let {contract,name} of Contracts.domesticArray) {
            if(!!contract){
                let o = {code: contract, name:name, price: null, rate: null, isUp: null};
                this.domesticBrief.push(o);
                this.total[contract] = o;
            }
        }
        for (let {contract,name} of Contracts.foreignArray) {
            if(!!contract){
                let o = {code: contract, name:name, price: null, rate: null, isUp: null};
                this.foreignBrief.push(o);
                this.total[contract] = o;
            }
        }
        for (let {contract,name} of Contracts.stockArray) {
            if(!!contract){
                let o = {code: contract, name:name, price: null, rate: null, isUp: null};
                this.stockBrief.push(o);
                this.total[contract] = o;
            }
        }

        for (let {contract} of Contracts.selfArray) {
            this.selfBrief.push(this.total[contract]);
        }

        this.strap = Contracts.quoteList.join(',');
        this.initial = true;
    },

    start(callback) {
        if (!callback)
            return console.error('缺少回调字符串');

        if (this.callbackList.length > 0) {
            if (this.callbackList.includes(callback))
                return;
            this.callbackList.push(callback);
        } else {
            this.callbackList.push(callback);
            this.inquiryAll();
        }
    },

    end(callback) {
        if(!callback)
            return;

        this.callbackList.remove(callback);
        if (this.callbackList.length === 0) {
            clearTimeout(this.plan);
            this.plan = null;
        }
    },

    _callback(res) {
        for (let [name, isUp, price, prev] of res) {
            this.total[name].price = price;
            this.total[name].isUp = isUp > 0;
            this.total[name].rate = (()=>{
                if(isUp > 0){
                    return `+${(((price - prev) / prev) * 100).toFixed(2)}%`
                }else {
                    return `-${(((prev - price) / price) * 100).toFixed(2)}%`
                }
            })();
            this.total[name].isOpen = Rest.isOpening(Contracts.total[name]);
        }
        if(this.callbackList.length > 0){
            for(let v of this.callbackList){
                Schedule.dispatchEvent({event: v})
            }
            this.plan = setTimeout(()=>this.inquiryAll(),this.interval);
        }
    },

    async inquiryAll() {
        try {
            const res = await jsonp({
                url: '/quote.jsp',
                type: 'POST',
                data: {
                    callback: '?',
                    code: this.strap,
                    _: new Date().getTime(),
                    simple: true
                }
            });
            this._callback(res);
        } catch (err) {
            if (err === null) {
                setTimeout(() => {
                    this.inquiryAll();
                }, 4000)
            } else {
                console.warn(err);
            }
        }
    },
    updateSelf(){
        this.selfBrief = [];
        for (let {contract} of Contracts.selfArray) {
            this.selfBrief.push(this.total[contract]);
        }

    }
}