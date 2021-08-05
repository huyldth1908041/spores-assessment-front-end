import {Badge, Image} from "antd";
import moment from "moment";
import styled from "styled-components";
import Link from "next/link"

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
        title: 'Creator',
        dataIndex: 'creator',
        key: 'creator',
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
                <Link href={"/nft-items/".concat(record.key)}>
                    <a title="Details"><ActionIcon className="bx bx-info-circle"/></a>
                </Link>
             </span>
        ),
    },
];
export const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
