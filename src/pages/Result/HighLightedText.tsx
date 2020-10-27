import *as React from 'react';
import styled from 'styled-components';

interface Props {
    sentences: string[];
    indexs: number[];
}

const HighLightLine = styled.span<{ highLighted?: boolean }>`
    font-size:15px;
    text-align:justify;
    font-family: 'Noto Sans KR', sans-serif;
    background-color:  ${(props) => props.highLighted ? "yellow" : "none"};
`


const HightLightedText: React.FC<Props> = (props) => {
    const [opened, setOpened] = React.useState(false);

    return (
        <div>
            {props.sentences.map((sentence, i) => (
                <HighLightLine highLighted={props.indexs.includes(i)}>
                    { sentence.split("\r").map((node, i) => (<span>{i != 0 ? (<br />) : null}<span>{node.trim()}</span> </span>))}
                </HighLightLine>))}
        </div>)
}

export default HightLightedText;