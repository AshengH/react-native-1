import req from '../lib/req';
import {Schedule} from "./index";

export default {
    total:{},
    initial:false,
    async init(){
        if(this.initial) return;
        try{
            let result = await req({
                url:'/trade/scheme.htm',
                data:{
                    schemeSort:0,
                    tradeType:1,
                    beginTime:'',
                    _:new Date().getTime()
                }
            });
            if(!!result && result.tradeList.length > 0){
                for(let o of result.tradeList){
                    this.total[o.contCode] = o;
                }
                this.initial = true;
            }
            result = null;
            Schedule.dispatchEvent({event:'SchemeInitial'})
        }catch (err){
            console.warn(err);
        }
    }
}