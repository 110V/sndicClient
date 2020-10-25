import *as React from "react";
import { RouteComponentProps } from 'react-router-dom';
import styled from "styled-components";
import SearchBar from "../../components/SearchBar/SearchBar";
import ResultElement from "./ResultElement";

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
    const getTextNumbers = ()=>{
        fetch('http://sgb03.iptime.org:3000/word/' + match.params.word)
        .then(function (response) {
           return response.json();
        })
        .then(function (myJson) {
           alert(myJson);
        });
    }

    

    React.useEffect(()=>{
        getTextNumbers();
    },[]);

    return (
        <Container>
            <div />
            <SearchBar />
            <ResultElement openHeight={"200px"} previewText={"hello 의 뜻 보기"}>
                {"test"}
            </ResultElement>
        </Container>
    );
}

export default ResultPage;