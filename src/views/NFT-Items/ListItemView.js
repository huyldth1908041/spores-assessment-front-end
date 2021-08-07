import PageHeader from "../../components/PageHeader";
import styled from "styled-components";
import PageContainer from "../../components/PageContainer";
import SearchBar from "../../components/SearchBar";
import {useEffect, useState} from "react";
import Table from "../../components/Table"
import {NFTItemsFields} from "./config";
import AssetCard from "../../components/AssetCard";
import {Col, Pagination, Row, Radio} from "antd";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import useItemsApi from "../../hooks/useItemsApi";

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

const StyledRadioButton = styled(Radio.Button)`
  margin-right: 10px;
  width: 150px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px !important;
  border: 1px solid #111;
  border-radius: 15px !important;

  &.ant-radio-button-wrapper-checked {
    //  border-left: none !important;
    background-image: linear-gradient(to right, #349eff, #62b4ff) !important;
  }

  &:hover {
    color: black;
  }

  &:not(:first-child)::before {
    display: none;
  }

  &:first-child {
    border: 1px solid #111;
  }
`
const ListItemView = () => {
    const [isTableView, setIsTableView] = useState(true)
    const [totalItems, setTotalItems] = useState(1)
    const [listItems, setListItems] = useState([]);
    const [itemType, setItemType] = useState("public")
    const router = useRouter()
    const {getPrivateItems, getPublicItems} = useItemsApi()
    const onChange = async (page, pageSize) => {
        await router.push(`/nft-items?limit=${pageSize}&page=${page}`)
    }

    useEffect(() => {
        const params = router.query.limit ? router.query : {limit: 8, page: 1}
        if (itemType === "private") {
            getPrivateItems(params).then(res => {
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
        } else {
            getPublicItems(params).then(res => {
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
        }
    }, [router, getPublicItems, itemType])
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
            <Radio.Group defaultValue={itemType} buttonStyle="solid" onChange={(e) => setItemType(e.target.value)}>
                <StyledRadioButton value="public">Public Items</StyledRadioButton>
                <StyledRadioButton value="private">Private Items</StyledRadioButton>
            </Radio.Group>
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