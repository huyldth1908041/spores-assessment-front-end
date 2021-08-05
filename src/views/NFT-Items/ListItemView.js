import PageHeader from "../../components/PageHeader";
import styled from "styled-components";
import PageContainer from "../../components/PageContainer";
import SearchBar from "../../components/SearchBar";
import {useEffect, useState} from "react";
import Table from "../../components/Table"
import {NFTItemsFields} from "./config";
import AssetCard from "../../components/AssetCard";
import {Col, Pagination, Row} from "antd";
import {toast} from "react-hot-toast";
import {getLocalStorageObject} from "../../utils";
import itemsApi from "../../service/itemsApi";
import {useRouter} from "next/router";

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
const PaginationContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`
const ListItemView = () => {
    const [isTableView, setIsTableView] = useState(true)
    const [totalItems, setTotalItems] = useState(1)
    const [listItems, setListItems] = useState([]);
    const router = useRouter()
    const onChange = async (page, pageSize) => {
        await router.push(`/nft-items?limit=${pageSize}&page=${page}`)
    }
    useEffect(() => {
        const tokenData = getLocalStorageObject("token")
        const params = router.query.limit ? router.query : {limit: 8, page: 1}
        itemsApi.getListItems(tokenData.token, params).then(res => {
            const list = res.data.items.map(item => {
                const newItem = {
                    ...item,
                    key: item.id,
                }
                delete item.id
                return newItem;
            })
            setListItems(list)
            setTotalItems(res.data.totalRows)
        }).catch(err => {
            toast.error(err.message)
        })
    }, [router])
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
                    className={isTableView ? "bx bx-list-ul" : "bx bx-table"}
                    onClick={toggleListType}
                    title={isTableView ? "List View" : "Table View"}
                />
            </TopHeaderRight>
        </TopHeader>
        <ListItemContainer>
            {
                isTableView ? (
                    <Table
                        data={listItems}
                        columns={NFTItemsFields}
                        selectionType="checkbox"
                        width="100%"
                        onRowSelectionChange={onRowSelectionChange}
                    />
                ) : (
                    <Row gutter={24}>
                        {listItems.map(item => {
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
        <PaginationContainer>
            <Pagination onChange={onChange} total={totalItems} pageSize={8} defaultCurrent={router.query.page || 1}/>
        </PaginationContainer>
    </PageContainer>
}
export default ListItemView