import jsonp from '../lib/jsonp';

import {
    Contracts,
    Schedule
} from "./index";

export default {
    initial: false,
    total: {},
    code: null,
    plan: null,
    callback: null,
    interval:1000,
    init() {
        for (let {contract} of Contracts.totalArray) {
            this.total[contract] = null;
        }
        this.initial = true;
    },
    start(callback, code) {
        if (!this.code) {
            if (!code) return;
            this.code = code;
        }

        if (!callback)
            return console.error('缺少回调字符串');
        this.callback = callback;
        this.inquiry();

    },
    end() {
        this.code = null;
        this.callback = null;
        clearTimeout(this.plan)

    },
    switch(code) {
        this.code = code;
    },
    _callback(res) {
        const q = res.split(',');
        const [contract] = q;
        const obj = {
            item:Contracts.total[contract].code,
            code:contract,
            time:q[q.length-1],
            timestamp:q[q.length-1],
            price:parseFloat(q[9]),
            volume:parseInt(q[12]),
            lastVolume:parseInt(q[12]),
            wt_sell_price:parseFloat(q[1]),
            wt_sell_volume: parseInt(q[2]),
            wt_buy_price: parseFloat(q[3]),
            wt_buy_volume: parseInt(q[4]),
            close: parseFloat(q[5]),
            open: parseFloat(q[6]),
            max: parseFloat(q[7]),
            min: parseFloat(q[8]),
            settle_price: parseFloat(q[11]),
            settle_price_yes: parseFloat(q[16]),
            amount: parseFloat(q[13]),
            hold_volume: parseInt(q[14]),
            hold_yes: parseInt(q[15]),
            high_limit: parseFloat(q[17]),
            low_limit: parseFloat(q[18])
        };
        this.total[contract] = obj;
        if(this.callback !== null){
            Schedule.dispatchEvent({event:this.callback,eventData:obj});
            this.plan = setTimeout(()=>this.inquiry(),this.interval);
        }
    },
    async inquiry() {
        try {
            const res = await jsonp({
                url: '/quote.jsp',
                type: 'POST',
                data: {
                    callback: '?',
                    code: this.code,
                    _: new Date().getTime(),
                }
            });
            this._callback(res);
        } catch (err) {
            if (err === null) {
                setTimeout(() => {
                    this.inquiry()
                }, 4000)
            } else {
                console.warn(err)
            }

        }
    }
}