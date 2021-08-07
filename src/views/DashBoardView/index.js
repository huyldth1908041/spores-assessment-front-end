import {Col, Row} from "antd";
import styled from "styled-components"
import {
    columns,
    hotAuctionsColumns,
    TableFooter,
    TableTitle
} from "./config";
import StatusCard from "../../components/StatusCard";
import Table from  "../../components/Table"
import {useEffect, useState} from "react";
import useMarketApi from "../../hooks/useMarketApi";
import {toast} from "react-hot-toast";

const TableCard = styled.div`
  width: 100%;
  border-radius: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 10px;
`

export default function DashBoardView() {
    const [hotAuctionData, setHotAuctionData] = useState([])
    const [hotItems, setHotItems] = useState([])
    const [newestItems, setNewestItems] = useState([])
    const [revenue, setRevenue] = useState(0)
    const [userCount, setUserCount] = useState(0)
    const {getTotalRevenue, getHotAuctions, getHotItems,getNewestItems, getUsersCount} = useMarketApi()
    useEffect(() => {
        getHotAuctions().then(res => {
            const newRes = res?.data?.map(item => {
                return {
                    key: item.id,
                    name: item.name,
                    price: item.price + " " + item.currency,
                    image: item.image
                }
            })
            setHotAuctionData(newRes)
        }).catch(err => {
            toast.error(err.message)
        })

        getHotItems().then(res => {
            const newRes = res?.data?.map(item => {
                return {
                    key: item.id,
                    name: item.name,
                    price: item.price + " " + item.currency,
                    image: item.image
                }
            })
            setHotItems(newRes)
        }).catch(err => {
            toast.error(err.message)
        })

        getNewestItems().then(res => {
            const newRes = res?.data?.map(item => {
                return {
                    key: item.id,
                    name: item.name,
                    price: item.price + " " + item.currency,
                    image: item.image
                }
            })
            setNewestItems(newRes)
        }).catch(err => {
            toast.error(err.message)
        })

        getTotalRevenue().then(res => {
            setRevenue(res.data)
        }).catch(err => {
            toast.error(err.message)
        })

        getUsersCount().then(res => {
            setUserCount(res.data)
        }).catch(err => {
            toast.error(err.message)
        })

    }, [])
    return (
        <div>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <StatusCard icon="bx bx-dollar-circle" title="Total Revenue" count={revenue}/>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <StatusCard icon="bx bx-cart" title="Daily Users" count={userCount}/>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <TableCard>
                        <Table
                            data={hotAuctionData}
                            columns={hotAuctionsColumns}
                            // selectionType="checkbox"
                            width="100%"
                            // onRowSelectionChange={onRowSelectionChange}
                            renderTitle={() => <TableTitle text="Hot Auctions"/>}
                        />
                    </TableCard>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <TableCard>
                        <Table
                            data={hotItems}
                            columns={columns}
                            // selectionType="checkbox"
                            width="100%"
                            // onRowSelectionChange={onRowSelectionChange}
                            renderFooter={() => <TableFooter text="View all" href="/nft-items"/>}
                            renderTitle={() => <TableTitle text="Hot Items"/>}
                        />
                    </TableCard>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <TableCard>
                        <Table
                            data={newestItems}
                            columns={columns}
                            width="100%"
                            renderFooter={() => <TableFooter text="View all" href="/nft-items"/>}
                            renderTitle={() => <TableTitle text="Newest Items"/>}
                        />
                    </TableCard>
                </Col>
            </Row>
        </div>
    )
}
