import *as React from 'react';
import styled from 'styled-components';
import { InputType } from 'zlib';
import SearchButton from './SearchButton';

interface Props{
    onSearch?:(word:string)=>void,
    onTextChange?:(str:React.ChangeEvent<HTMLInputElement>)=>void, 
    word?:string,
}


const Bar = styled.div`
    background-color: #FFF7F3;
    width:40vw;
    height:50px;
    min-width : 300px;
    max-width : 600px;
    margin:0 auto;
    margin-bottom: 30px;
    display: grid;
    grid-auto-flow: column;
    grid-gap:0;
    grid-template-columns: 1fr min-content 5px;
    border-radius:50px;
`
const Input = styled.input`
    font-size: 20px;
    height:100%;
    padding-left:20px;
    background-color: transparent;
    border: none;
`

const SearchBar:React.FC<Props> = (props:Props)=>{
    return (
    <Bar>
        <Input value={props.word} onChange={props.onTextChange}/>
        <SearchButton />
    </Bar>)
}

export default SearchBar;