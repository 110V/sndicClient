import {algorithms, newStemmer} from "snowball-stemmers";
import AnalyzedText from "./AnalyzedText";

export default class TextAnalyzer {
    private static matchSentence:RegExp = /([^\.\!\?]*[\.\!\?])|([①-⑤][^①-⑤]+)/g;
    private static answer:RegExp = /^[①-⑤][^①-⑤]+/;
    private static stemmer = newStemmer("english");
    //나중에 정규식으로 변경
    public static fromStem(text: string, stem: string) {
        let indexes: number[] = [];
        let sentences = Array.from(text.matchAll(this.matchSentence)).map((result) => { return result[0] });
        for (let i = 0; i < sentences.length; i++) {
            const splitedSentence = sentences[i].replace("\n","").toLowerCase().split(" ");
            if(this.answer.test(sentences[i])){
                sentences[i] = "\r"+sentences[i].replace("\r","");
            }
            for(let j =0;j<splitedSentence.length;j++)
            {
                if (this.stemmer.stem(splitedSentence[j].trim()).includes(stem)) {
                    indexes.push(i);
                    break;
                }
            }

        }
        if(indexes.length == 0)
        {
            console.log("make없음"+text);
        }
        
        return new AnalyzedText(sentences,indexes);
    }
}

