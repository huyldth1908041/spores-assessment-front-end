import styled from "styled-components";

const PageTitle = styled.h1`
  font-size: 30px;
  font-weight: 600;
`

const PageHeader = ({title}) => {
    return <PageTitle>{title}</PageTitle>
}
export default PageHeader;