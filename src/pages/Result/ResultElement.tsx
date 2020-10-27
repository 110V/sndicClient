import *as React from 'react';
import styled from 'styled-components';

interface Props{
    previewText:string;
    children?: any;
    openHeight?: string;
}

const Container = styled.div<{height?:string}>`
    background-color:white;
    min-width:500px;
    height: ${(props) => props.height || "80px"};
    width:40vw;
    border-radius:30px;
    display:grid;
    align-content:center;
    transition: height 0.5s;
    cursor: pointer;
    overflow:hidden;
    padding-left:30px;
`

const InnerText = styled.pre<{opened:boolean}>`
    font-size:15px;
    margin-right:30px;
    text-overflow: ellipsis;
    width:auto;
    height:95%;
    text-align:justify;
    align-items:center;
    font-family: 'Noto Sans KR', sans-serif;
    overflow-y: ${(props) => props.opened?"scroll":"hidden"};
    overflow-x: hidden;
`


const ResultElement:React.FC<Props> = (props)=>{
    const [opened,setOpened] = React.useState(false);
    
    return (
    <Container onClick ={()=>{setOpened(!opened)}} height = {opened?(props.openHeight?props.openHeight:"500px"):"50px"}>
        <InnerText opened={opened}>
            {opened?props.children:props.previewText}
        </InnerText>
    </Container>);
}

export default ResultElement;