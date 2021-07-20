import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  font-family: Roboto, sans-serif;
`
const PageContainer = ({children}) => {
    return <Container>
        {children}
    </Container>
}
export default PageContainer