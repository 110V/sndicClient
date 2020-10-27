export default class DicRequester {
    //객체 정보
    private address:string;
  
    constructor(address:string) {
        this.address = address
    }

    public getTextNumsContainWord(word:string) {
        let promise:Promise<number[]> = new Promise((resolve, reject)=>{
            fetch(this.address + "/word/" + word)
            .then((response)=>{
               return response.json();
            })
            .then((myJson)=>{
               resolve(myJson);
            }).catch(()=>{
                reject("Faild");
            });
        });
        return promise;
    }

    public getTextFormTextNum(num:number) {
        let promise:Promise<string> = new Promise((resolve, reject)=>{
            fetch(this.address + "/text/" + num)
            .then((response)=>{
               return response.text();
            })
            .then((text)=>{
                if(text.startsWith("TypeError")){
                    reject("Text Not Found");
                }
               resolve(text);
            }).catch(()=>{
                reject("Faild");
            });
        });
        return promise;
    }

    public getTextsFromTextNums(nums:number[]) {
        
        let promise:Promise<string[]> = new Promise(async(resolve, reject)=>{
            let texts:string[] = [];
            for(let i = 0;i<nums.length;i++){
                try{
                    texts[i] = await this.getTextFormTextNum(nums[i]); 
                }
                catch{
                    reject("Faild");
                }
            }
            resolve(texts);
        });
        return promise;
    }

    public getTextsContainWord(word:string) {
        let promise:Promise<string[]> = new Promise(async(resolve, reject)=>{
            try{
                let textNums: number[] = await this.getTextNumsContainWord(word);
                let texts: string[] = await this.getTextsFromTextNums(textNums);
                resolve(texts);
            }
            catch{
                reject("Faild");
            }
        });

        return promise;
    }

    public getMeaning(word:string) {
        let promise:Promise<{word:string,meaning:string}> = new Promise((resolve, reject)=>{
            fetch(this.address + "/dic/" + word)
            .then((response)=>{
               return response.json();
            })
            .then((myJson)=>{
               resolve({word:myJson.word.toString(),meaning:myJson.meaning.toString()});
            }).catch(()=>{
                reject("Faild");
            });
        });
        return promise;
    }
}