import {Col, Row} from "antd";
import styled from "styled-components"
import {chartOptions, columns, dataSource, listStatusCards, TableFooter, TableTitle} from "./config";
import StatusCard from "../../components/StatusCard";
import {DashBoardChart} from "../../components/Chart";
import Table from  "../../components/Table"

const ChartCard = styled.div`
  width: 100%;
  height: 92%;
  border-radius: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 10px;
`
const TableCard = styled.div`
  width: 100%;
  border-radius: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 10px;
`

export default function DashBoardView() {
    return (
        <div>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Row gutter={16}>
                        {
                            listStatusCards.map(item => {
                                const {icon, title, count} = item
                                return (
                                    <Col xs={24} sm={24} md={24} lg={24} xl={12} key={title}>
                                        <StatusCard icon={icon} title={title} count={count}/>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <ChartCard>
                        <DashBoardChart chartOptions={chartOptions}/>
                    </ChartCard>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <TableCard>
                        <Table
                            data={dataSource}
                            columns={columns}
                            // selectionType="checkbox"
                            width="100%"
                            // onRowSelectionChange={onRowSelectionChange}
                            renderFooter={() => <TableFooter text="View all" href="/orders"/>}
                            renderTitle={() => <TableTitle text="Order"/>}
                        />
                    </TableCard>
                </Col>
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                    <TableCard>
                        <Table
                            data={dataSource}
                            columns={columns}
                            width="100%"
                            renderFooter={() => <TableFooter text="View all" href="/order"/>}
                            renderTitle={() => <TableTitle text="Customer"/>}
                        />
                    </TableCard>
                </Col>
            </Row>
        </div>
    )
}
