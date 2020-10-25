import *as React from 'react';
import styled from 'styled-components';

interface Props{
    previewText:string;
    children?: any;
    openHeight?: string;
}

const Container = styled.div<{height?:string}>`
    background-color:white;
    min-width:400px;
    height: ${(props) => props.height || "50px"};
    width:40vw;
    border-radius:30px;
    display:grid;
    align-content:center;
    transition: height 0.5s;
    cursor: pointer;
`

const InnerText = styled.pre<{opened:boolean}>`
    font-size:15px;
    padding:30px;
    width:auto;
    text-align:justify;
    font-family: 'Noto Sans KR', sans-serif;
    margin-right:30px;
    overflow-y: ${(props) => props.opened?"scroll":"visible"};
`


const ResultElement:React.FC<Props> = (props)=>{
    const [opened,setOpened] = React.useState(false);
    
    return (
    <Container onClick ={()=>{setOpened(!opened)}} height = {opened?(props.openHeight?props.openHeight:"500px"):"40px"}>
        <InnerText opened={opened}>
            {opened?props.children:props.previewText}
        </InnerText>
    </Container>);
}

export default ResultElement;