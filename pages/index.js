import {useThemeState} from "../state/theme";
import {Col, Row} from "antd";
import StatusCard from "../components/StatusCard";
import {listStatusCards} from "../components/StatusCard/config";
import {DashBoardChart} from "../components/Chart";
import styled from "styled-components"

const chartOptions = {
    series: [{
        name: 'Online Customers',
        data: [40,70,20,90,36,80,30,91,60]
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
const ChartCard = styled.div`
  width: 100%;
  height: 92%;
  border-radius: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 10px;
`
export default function Home() {
    const isDarkMode = useThemeState()
    return (
        <Row gutter={16}>
            <Col  xs={24} sm={24} md={24} lg={12} xl={12}>
                <Row gutter={16}>
                    {
                        listStatusCards.map(item => {
                            const {icon, title, count} = item
                            return (
                                <Col  xs={24} sm={24} md={24} lg={24} xl={12} key={title}>
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
    )
}
