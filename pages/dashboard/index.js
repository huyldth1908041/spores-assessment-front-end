import {Col, Row} from "antd";
import {listStatusCards} from "../../components/StatusCard/config";
import {DashBoardChart} from "../../components/Chart";
import Table from "../../components/Table";
import styled from "styled-components"
import StatusCard from "../../components/StatusCard";
import Link from "next/link";

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

const chartOptions = {
    series: [{
        name: 'Online Customers',
        data: [40, 70, 20, 90, 36, 80, 30, 91, 60]
    }, {
        name: 'Store Customers',
        data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}
//hard code for demo purpose
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];


const TableTitle = ({text}) => {

    return <StyledH1>{text}</StyledH1>
}


const TableFooter = ({text, href}) => {
    return <Link href={href}>
        <StyledLink>{text}</StyledLink>
    </Link>
}

const onRowSelectionChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
}

export default function Dashboard() {
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
