import *as React from "react";
import styled from "styled-components";

const ImgContainer = styled.div`
    box-sizing: border-box;
    box-sizing: content-box;
    height:50px;
    width:50px;
    cursor: pointer;
`

const Img = styled.img`
    padding:8px;
    padding-bottom:10px;
    box-sizing:border-box;
    height:100%;
    width:auto;
`

interface Props{
    onClick?:()=>void,
}

const SearchButton:React.FC<Props> = (props:Props)=>(
    <ImgContainer onClick = {props.onClick}  >
        <Img src='/assets/images/searchIco.svg' />
    </ImgContainer>
);


export default SearchButton;