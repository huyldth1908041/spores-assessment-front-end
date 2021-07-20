import PageHeader from "../../components/PageHeader";
import styled from "styled-components";
import PageContainer from "../../components/PageContainer";
import SearchBar from "../../components/SearchBar";
import {useState} from "react";
import Table from "../../components/Table"
import {listNFTItems, NFTItemsFields} from "./config";
import AssetCard from "../../components/AssetCard";
import {Col, Row} from "antd";
const TopHeader = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ListTypeIcon = styled.i`
  font-size: 2rem;
  color: #111;
  font-weight: 600;
  cursor: pointer;
`

const TopHeaderRight = styled.div`
  margin-right: 20px;
`

const ListItemContainer = styled.div`
  width: 100%;
  padding: 10px;
  margin-top: 30px;
`
const StyledCol = styled(Col)`
  margin-bottom: 10px;
`
const ListItemView = () => {
    const [isTableView, setIsTableView] = useState(true)
    const toggleListType = () => {
        setIsTableView(!isTableView)
    }
    const handleSearch = query => {
        console.log(query)
    }
    const onRowSelectionChange = (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
    return <PageContainer>
        <PageHeader title="List Item"/>
        <TopHeader>
            <SearchBar placeholderText="Search items..." onSearch={handleSearch}/>
            <TopHeaderRight>
                <ListTypeIcon
                    className={isTableView ? "bx bx-table" : "bx bx-list-ul"}
                    onClick={toggleListType}
                    title={isTableView ? "Table View" : "List View"}
                />
            </TopHeaderRight>
        </TopHeader>
        <ListItemContainer>
            {
                isTableView ? (
                    <Table
                        data={listNFTItems}
                        columns={NFTItemsFields}
                        selectionType="checkbox"
                        width="100%"
                        onRowSelectionChange={onRowSelectionChange}
                        pagination={["bottomRight"]}
                    />
                ) : (
                    <Row gutter={24}>
                        {listNFTItems.map(item => {
                            return (
                                <StyledCol key={item.key} span={6}>
                                    <AssetCard asset={item}/>
                                </StyledCol>
                            )
                        })}
                    </Row>

                )
            }
        </ListItemContainer>
    </PageContainer>
}
export default ListItemView