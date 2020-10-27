import *as React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar/SearchBar";


const Container = styled.div`
    display: grid;
    margin: 0 auto;
    height:100vh;
    justify-content: center;
    align-content: center;
`

const Title = styled.img`
    margin:0 auto;
    width: 30vw;
    min-width : 300px;
    max-width : 500px;
    padding-bottom:50px;
`



const HomePage: React.FC = () => {
    const history = useHistory();
    return (
    <Container>
        <Title src="/assets/images/title.png" />
        <SearchBar onSearch={(word) => { history.push("/result/"+word) }} />
    </Container>);
}

export default HomePage;