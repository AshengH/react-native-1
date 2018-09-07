import {getCurrentlyLanguage} from "../lang";
import req from './../lib/req'
import { Schedule } from ".";

export default {
    enRule:null,
    zh_hansRule:null,


    async getRule(defaultLang){
        let result = null;
        try{

            let currentLang = defaultLang || getCurrentlyLanguage().value;

            if (currentLang === 'zh_cn' && this.zh_hansRule) {
                result = this.zh_hansRule
            }else if(currentLang === 'en' && this.enRule){
                result = this.enRule
            }else{
                let rule = await  req({
                    url: `/src/rule/${currentLang}/tradeRule.json`,
                    file:true
                });

                if (currentLang === 'zh_cn') {
                    this.zh_hansRule = rule;
                    result = this.zh_hansRule
                }else{
                    this.enRule = rule;
                    result = this.enRule
                }
            }
        }catch(err){
            result = null;
            console.warn(err);
        }
        return new Promise((resolve,reject)=>{
            if(!result){
                reject('no language file')
            }else{
                resolve(result)
            }
        })
    },
    async getInfo (value){
        try {
            
        } catch (err) {
            console.log(err['errorMsg']);
            return 'error'
        }
    }
}

