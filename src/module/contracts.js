import req from '../lib/req';
import {
    Schedule,
    Data, Quotes, Contracts
} from "./index";
import { HAS_CRYPTO } from '../config';
import {AsyncStorage} from "react-native";
import JsonUtils from "../common/jsonUtils";

export default {
    initial: false,
    quoteList: [],
    digital: {},
    digitalArray:[],
    foreign: {},
    foreignArray:[],
    domestic: {},
    domesticArray: [],
    stock: {},
    stockArray: [],
    total:{},
    totalArray:[],
    selfArray:[],
    // hot: ['CL', 'GC', 'IF', 'IH', 'IC', 'HSI', 'MHI'],
    hot: ['CL', 'IF', 'HSI', 'DAX'],
    new: ['SC','NK'],

    async init() {
        try {
            const res = await req({});
            let {digitalCommds, foreignCommds, contracts, stockIndexCommds, domesticCommds} = res;
            for (let e of digitalCommds) {
                this.digital[e.code] = e;
                this.digitalArray.push(e);
            }

            for (let e of foreignCommds) {
                this.foreign[e.code] = e;
                this.foreignArray.push(e);
            }

            for (let e of stockIndexCommds) {
                this.stock[e.code] = e;
                this.stockArray.push(e);
            }

            for (let e of domesticCommds) {
                this.domestic[e.code] = e;
                this.domesticArray.push(e);
            }



            // this.totalArray = this.digitalArray.concat(this.foreignArray);
            this.totalArray = [].concat(this.domesticArray, this.foreignArray, this.stockArray, digitalCommds);
            this.quoteList = JSON.parse(contracts);
            for (let [code, obj] of Object.entries(this.digital)) {
                let c = this.quoteList.find((c) => {
                    return c.startsWith(code);
                });
                if(!!c){
                    obj.contract = c;
                    this.total[c] = obj;
                }
            }
            for (let [code, obj] of Object.entries(this.foreign)) {
                let c = this.quoteList.find((c) => {
                    return c.startsWith(code);
                });
                if(!!c){
                    obj.contract = c;
                    this.total[c] = obj;
                }
            }
            for (let [code, obj] of Object.entries(this.stock)) {
                let c = this.quoteList.find((c) => {
                    return c.startsWith(code);
                });
                if (!!c) {
                    obj.contract = c;
                    this.total[c] = obj;
                }
            }
            for (let [code, obj] of Object.entries(this.domestic)) {
                let c = this.quoteList.find((c) => {
                    return c.startsWith(code);
                });
                if (!!c) {
                    obj.contract = c;
                    this.total[c] = obj;
                }
            }
            // this.quoteList = [].concat(this.digitalArray.map(c => c.contract), this.foreignArray.map(c => c.contract));
            this.quoteList = this.totalArray.map((c) => c.contract);

            await this.updateSelf(true);

            Data.init();
            Quotes.init();
            this.initial = true;
            Schedule.dispatchEvent({event:'contractsInitial',eventData:true})
        } catch (err) {
            console.warn(err);
            if (err.code !== undefined) {
                setTimeout(() => this.init(), 500)
            }
        }

    },
    isHot(contract) {
        let code = Contracts.total[contract].code;
        return this.hot.includes(code);
    },
    isNew(contract) {
        let code = Contracts.total[contract].code;
        return this.new.includes(code);
    },

    getContract(component) {
        if (this.initial) {
            let o = component.props.location.state.contract;
            if (!o) {
                [o] = Contracts.foreignArray;
                o = o.contract;
                component.props.location.state.contract = o;
            }
            return o;
        } else {
            return false;
        }
    },

    async updateSelf(init){

        // let aryStr = await AsyncStorage.getItem('self');
        // let ary = JsonUtils.stringToJson(aryStr) || [];
        //todo 先检查是否存在，如果存在就移除，如果不存在就添加
        // console.log(ary,'打印数组');
        // ary.includes(code) ? ary.remove(code) :  ary.push(code);
        // let newAryStr = JsonUtils.jsonToString(ary);
        // // this.setState({active: !this.state.active});
        // // let Ary = ary;
        // AsyncStorage.setItem('self', newAryStr);
        // this.setState({
        //     active: !this.state.active
        // })


        if (AsyncStorage.getItem('self') !== null) {
            let aryStr = await AsyncStorage.getItem('self');
            let ary = JsonUtils.stringToJson(aryStr) || [];
            this.selfArray=[];
            for (let item of this.totalArray) {
                let code = item.contract;
                if (ary.includes(code)) {
                    this.selfArray.push(item)
                }
            }
            if(!init){
                Data.updateSelf()
            }
        }
    }

}