import req from "../lib/req";
export default
 {
    homeNotices:{
        content:[],
        time:Date.now(),
        async get(){
            try{
                if(this.content.length === 0 || Date.now() - this.time > 3600000){
                    let result = await req({
                        url: '/index.htm',
                        type: "GET",
                        data: {action: 'carousel'}
                    });
                    this.time = Date.now();
                    this.content= result.notices;
                }
            }catch (err){
                this.content = null;
            }
            return new Promise((resolve,reject)=>{
                if (!!this.content) {
                    resolve(this.content);
                } else{
                    reject(null);
                }
            })
        }
    }
 }