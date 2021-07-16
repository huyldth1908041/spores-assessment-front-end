import styled from "styled-components"
import Image from "next/image";

const Container = styled.div`
  display: flex;
  align-items: center;
`
const UserImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
`
const UserName = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  font-weight: 600;
`
export default function UserToggle({user}) {
    return (
        <Container>
            <UserImg>
                <Image
                    src={user.avatar}
                    width={40}
                    height={40}
                    alt="user avatar"
                />
            </UserImg>
            <UserName>
                {user.name}
            </UserName>
        </Container>
    )
}