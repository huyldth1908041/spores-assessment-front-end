import {Badge, Image} from "antd";
import moment from "moment";
import styled from "styled-components";

const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 11px;
  color: #fff;
  background-color: ${props => props.status === "pending" ? "#349eff" : "#019707"};
  border-radius: 10px;
  box-shadow: var(--box-shadow);
`
const ActionIcon = styled.i`
  font-size: 2rem;
  margin-right: 10px;
`
export const listNFTItems = [
    {
        key: '1',
        name: 'Outer Space',
        image: "https://i.pinimg.com/originals/33/8c/d9/338cd9414b5d71a402475eed025de609.gif",
        price: '2.99',
        currency: 'WETH',
        owner: "Huy",
        createdAt: moment("2021-07-20").format('MM DD YYYY, hh:mm:ss'),
        status: "pending",
        creator: "Luu Huy"
    },

    {
        key: '2',
        name: 'Outer Space',
        image: "https://i.pinimg.com/originals/33/8c/d9/338cd9414b5d71a402475eed025de609.gif",
        price: '2.99',
        currency: 'WETH',
        owner: "Huy",
        createdAt: moment("2021-07-20").format('MM DD YYYY, hh:mm:ss'),
        status: "pending",
        creator: "Luu Huy"
    },
    {
        key: '3',
        name: 'Outer Space',
        image: "https://i.pinimg.com/originals/33/8c/d9/338cd9414b5d71a402475eed025de609.gif",
        price: '2.99',
        currency: 'WETH',
        owner: "Huy",
        createdAt: moment("2021-07-20").format('MM DD YYYY, hh:mm:ss'),
        status: "pending",
        creator: "Luu Huy"
    },
    {
        key: '4',
        name: 'Outer Space',
        image: "https://i.pinimg.com/originals/33/8c/d9/338cd9414b5d71a402475eed025de609.gif",
        price: '2.99',
        currency: 'WETH',
        owner: "Huy",
        createdAt: moment("2021-07-20").format('MM DD YYYY, hh:mm:ss'),
        status: "pending",
        creator: "Luu Huy"
    },
    {
        key: '5',
        name: 'Outer Space',
        image: "https://i.pinimg.com/originals/33/8c/d9/338cd9414b5d71a402475eed025de609.gif",
        price: '2.99',
        currency: 'WETH',
        owner: "Huy",
        createdAt: moment("2021-07-20").format('MM DD YYYY, hh:mm:ss'),
        status: "success",
        creator: "Luu Huy"
    },
    {
        key: '6',
        name: 'Outer Space',
        image: "https://i.pinimg.com/originals/33/8c/d9/338cd9414b5d71a402475eed025de609.gif",
        price: '2.99',
        currency: 'WETH',
        owner: "Huy",
        createdAt: moment("2021-07-20").format('MM DD YYYY, hh:mm:ss'),
        status: "success",
        creator: "Luu Huy"
    },
    {
        key: '7',
        name: 'Outer Space',
        image: "https://i.pinimg.com/originals/33/8c/d9/338cd9414b5d71a402475eed025de609.gif",
        price: '2.99',
        currency: 'WETH',
        owner: "Huy",
        createdAt: moment("2021-07-20").format('MM DD YYYY, hh:mm:ss'),
        status: "success",
        creator: "Luu Huy"
    },
    {
        key: '8',
        name: 'Outer Space',
        image: "https://i.pinimg.com/originals/33/8c/d9/338cd9414b5d71a402475eed025de609.gif",
        price: '2.99',
        currency: 'WETH',
        owner: "Huy",
        createdAt: moment("2021-07-20").format('MM DD YYYY, hh:mm:ss'),
        status: "success",
        creator: "Luu Huy"
    },
]

export const NFTItemsFields = [
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
    {
        title: 'Currency',
        dataIndex: 'currency',
        key: 'currency',
    },

    {
        title: 'Owner',
        dataIndex: 'owner',
        key: 'Creator',
    },

    {
        title: 'Creator',
        dataIndex: 'creator',
        key: 'creator',
    },
    {
        title: 'Create time',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },

    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => (
            <StatusBadge status={status}>
                {status}
            </StatusBadge>
        ),
    },

    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
            <span>
                <a title="Details"><ActionIcon className="bx bx-info-circle"/></a>
                <a title="Delete"><ActionIcon className="bx bx-trash"/></a>
             </span>
        ),
    },
];
