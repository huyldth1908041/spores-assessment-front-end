import styled from "styled-components";
import Link from "next/link";
import {Image} from "antd";

const StyledH1 = styled.h1`
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 20px;
`

const StyledLink = styled.a`
  display: inline-block;
  width: 100%;
  text-align: center;
  color: #111;
  font-family: Roboto, sans-serif;
  font-size: 16px;
`

export const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: image => (
            <Image src={image} width={100} height={100}/>
        ),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
];

export const hotAuctionsColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: image => (
            <Image src={image} width={100} height={100}/>
        ),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
]
export const TableTitle = ({text}) => {

    return <StyledH1>{text}</StyledH1>
}


export const TableFooter = ({text, href}) => {
    return <Link href={href}>
        <StyledLink>{text}</StyledLink>
    </Link>
}
