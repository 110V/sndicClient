import *as React from "react";
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
    return (
    <Container>
        <Title src="/assets/images/title.png" />
        <SearchBar onSearch={() => { alert("click") }} />
    </Container>);
}

export default HomePage;