import *as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps } from 'react-router-dom';
import {newStemmer} from "snowball-stemmers";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar/SearchBar";
import DicRequester from "../../requester/DicRequester";
import AnalyzedText from "../../textAnalyzer/AnalyzedText";
import TextAnalyzer from "../../textAnalyzer/TextAnalyzer";
import HighlightedText from "./HighLightedText";
import ResultElement from "./ResultElement";
import { useHistory } from "react-router-dom";

interface ElementValues
{
    preview:string;
    inner:string;
}

interface MatchParams {
    word: string;
}

const Container = styled.div`
    display:grid;
    grid-template-rows:30px;
    justify-content: center;
    grid-row-gap:20px;
`



const ResultPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
    const stemmer = newStemmer("english");;
    const currentWord = React.useRef<string>(match.params.word);
    const history = useHistory();
    const dicRequester = new DicRequester("https://sndic.herokuapp.com");

    const [meanings,setMeanings] = useState<{word:string,meaning:string}[]>([]);
    const [analyzedTexts,setAnalyzedTexts] = useState<AnalyzedText[]>();

    const getMeanings = async()=>{
        try {
            let stem: string = stemmer.stem(currentWord.current);
            let meaning1 = await dicRequester.getMeaning(stem);
            let meaning2 = await dicRequester.getMeaning(currentWord.current);
            if (meaning1.word == meaning2.word) {
                setMeanings([meaning1]);
            } else {
                setMeanings([meaning1, meaning2]);
            }
        }
        catch(e) {
            console.log(e);
            setMeanings([{word:"검색 결과가 없습니다.",meaning:"다른 검색어로 시도해주세요."}]);
        }

    }
    const getAnalzeTexts = async()=>{
        try{
            let stem: string = stemmer.stem(currentWord.current);
            let texts: string[] = await dicRequester.getTextsContainWord(stem);
            let analyzedTexts = texts.map((text) => { return TextAnalyzer.fromStem(text, stem) });
            setAnalyzedTexts(analyzedTexts);
        }
        catch(e) {
            console.log(e);
            setAnalyzedTexts([new AnalyzedText(["검색결과 없음."],[0])]);
        }
    }

    const searchNewWord = (word:string)=>{
        currentWord.current = word;
        history.push("/result/"+ word);
    }

    const onPageChanged = ()=>{
        setMeanings([]);
        setAnalyzedTexts([]);
        getMeanings();
        getAnalzeTexts();
    }

    useEffect(()=>{
        history.listen(onPageChanged);
        onPageChanged();
    },[]);
    

    return (
        <Container>
            <div />
            <SearchBar word={currentWord.current} onSearch={searchNewWord}/>
            {meanings?.map((meaning)=>(
                <ResultElement openHeight={"200px"} previewText={meaning.word+" 의 뜻 보기"}>
                    {meaning.meaning}
                </ResultElement>
            ))}

            {analyzedTexts?.map(adtext => (<ResultElement previewText={adtext.sentences[adtext.indexes[0]].replace("\n"," ")}>
                <HighlightedText sentences={adtext.sentences} indexs={adtext.indexes} />
            </ResultElement>))}
        </Container>
    );
}

export default ResultPage;