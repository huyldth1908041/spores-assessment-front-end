import Image from "next/image"
import styled from "styled-components";

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`
export default function Logo({collapsed}) {
    return (
        <LogoContainer>
            {collapsed ? (
                <Image
                    src="/images/logo-mark.png" // Route of the image file
                    height={40} // Desired size with correct aspect ratio
                    width={40} // Desired size with correct aspect ratio
                    alt="Company Logo"
                />) : (
                <Image
                    src="/images/main-logo-black.png" // Route of the image file
                    height={100} // Desired size with correct aspect ratio
                    width={200} // Desired size with correct aspect ratio
                    alt="Company Logo"
                />)}
        </LogoContainer>
    )
}