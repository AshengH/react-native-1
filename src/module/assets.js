import req from '../lib/req'
import {Assets, Schedule} from "./index";

export default {
    USD: {
        money: 0
    },

    BTC: {
        money: 0
    },

    ETH: {
        money: 0
    },

    USDT: {
        money: 0
    },
    currency: [
        'USD',
        'BTC',
        'ETH',
        'USDT'
    ],
    cryptos:'ETH,BTC,USDT',
    userId: null,
    username: null,
    loginIp: null,
    initial: false,
    withdrawPW: null,
    money: 0,
    game: 0,


    async update() {
        try {
            let result = await req({
                url: '/mine/index.htm',
                type: 'GET'
            });
            if (!this.initial) this.initial = !this.initial;
            if (!!result.asset) {
                this.money = result.asset.money;
                this.game = result.asset.game;
            }
            if (!!result.user) {
                let {id, loginIp, username, withdrawPw} = result.user;
                this.userId = id;
                this.loginIp = loginIp;
                this.username = username;
                this.withdrawPW = withdrawPw;
            }
            result = null;
            Schedule.dispatchEvent({event: 'updateAssets'})
        } catch (err) {

        }
    },
    reset() {
        for (let o of this.currency) {
            this[o].money = 0
        }
        this.userId = null;
        this.username = null;
        this.loginIp = null;
        this.withdrawPW = null;
        Schedule.dispatchEvent({event: 'updateAssets'})
    }
}