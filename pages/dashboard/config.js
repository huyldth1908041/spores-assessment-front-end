import styled from "styled-components";
import Link from "next/link";
export const chartOptions = {
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
export const dataSource = [
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

export const columns = [
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



const StyledH1 = styled.h1`
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 20px;
`

export const TableTitle = ({text}) => {
    return <StyledH1>{text}</StyledH1>
}

const StyledLink = styled.a`
  display: inline-block;
  width: 100%;
  text-align: center;
  color: #111;
  font-family: Roboto, sans-serif;
  font-size: 16px;
`
export const TableFooter = ({text, href}) => {
    return <Link href={href}>
        <StyledLink>{text}</StyledLink>
    </Link>
}