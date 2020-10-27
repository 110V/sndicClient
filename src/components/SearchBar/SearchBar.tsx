import *as React from 'react';
import styled from 'styled-components';
import { InputType } from 'zlib';
import SearchButton from './SearchButton';

interface Props {
    onSearch?: (word: string) => void,
    onTextChange?: (str: string) => void,
    word?: string,
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

const SearchBar: React.FC<Props> = (props: Props) => {
    const [inputValue,SetInputValue] = React.useState<string>("");

    const callOnSearch = () => {
        if (props.onSearch && inputValue != "")
            props.onSearch(inputValue);
    }

    const callOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetInputValue(e.target.value);
        if (props.onTextChange)
            props.onTextChange(inputValue);
    }

    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            callOnSearch();
        }
    }

    React.useEffect(()=>{
        SetInputValue(props.word?props.word:"");
    },[])

    return (
        <Bar>
            <Input onKeyUp={onKeyUp} value={inputValue} onChange={callOnChange} />
            <SearchButton onClick={callOnSearch} />
        </Bar>)
}

export default SearchBar;