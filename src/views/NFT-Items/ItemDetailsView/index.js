import {useRouter} from "next/router";
import PageContainer from "../../../components/PageContainer";
import {Col, Image, Modal, Row} from "antd";
import styled from "styled-components";
import moment from "moment";
import {useEffect, useState} from "react";
import itemsApi from "../../../service/itemsApi";
import {getDateBeforeToday, getLocalStorageObject} from "../../../utils";
import {toast} from "react-hot-toast";
import useItemsApi from "../../../hooks/useItemsApi";


const Container = styled.div`
  width: 100%;
  background: #fff;
  padding: 10px;
`
const ItemContainer = styled.div`
  width: 100%;
  background: #efefef;
  min-height: 300px;
  padding: 15px;
  border-radius: 15px;
`
const ItemName = styled.h1`
  font-size: 30px;
  font-weight: 600;
`
const ItemBadge = styled.div`
  height: 50px;
  font-size: 16px;
  margin-bottom: 20px;
`
const ItemBadgeTitle = styled.div`
  color: rgb(118, 118, 118);
  margin-bottom: 3px;
`
const ItemBadgeContent = styled.div`
  font-weight: 600;
  width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;;
`
const ItemDescription = styled.div`
  width: 100%;
  font-size: 16px;
  padding-right: 20px;
  margin: 15px 0;
`
const ItemFooter = styled(Row)`
  width: 100%;
  padding: 10px 20px;
  background: #fff;
  border-radius: 15px;
  align-items: center;
  margin-top: 20px;
`
const PricePanel = styled.div`
  width: 100%;
  font-weight bold;
  font-size: 22px;
`
const CenterItemCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ActionButton = styled.button`
  border: none;
  outline: none;
  background: #1890ff;
  cursor: pointer;
  padding: 14px 30px 15px;
  height: 50px;
  color: #fff;
  border-radius: 15px;
  float: right;
  font-weight: 600;
  font-size: 16px;
  margin: 0 10px;
`
const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 400px;
`

const ItemHistory = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 10px;
`
const HistoryTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
`
const HistoryBadge = styled.div`
  width: 100%;
  height: 90px;
  padding: 15px;
  border-radius: 35px;
  background: #efefef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const HistoryContent = styled.div`
  padding: 10px;
  font-size: 16px;

  > div:nth-child(1) {
    font-weight: bold;
    font-size: 20px;
  }

`
const HistoryTime = styled.div`
  font-size: 13px;
  padding-right: 10px;
`

const TimeIcon = styled.i`
  font-size: 1rem;
  margin-right: 10px;
  color: #949496;
`

const FlexContainer = styled.div`
  display: flex;
`
const ItemDetailsView = () => {
    const router = useRouter()
    const {id} = router.query
    const [item, setItem] = useState({})
    const [itemTransactions, setItemsTransactions] = useState([])
    const [isOwner, setIsOwner] = useState(false)
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const {buyItem} = useItemsApi()
    const {deleteItem} = useItemsApi()
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        try {
            setConfirmLoading(true)
            const res = await deleteItem(id)
            if (res.status === true) {
                toast.success("Delete item success")
                await router.push("/nft-items")
            }
        } catch (err) {
            toast.error(err.message)
        } finally {
            setConfirmLoading(false)
            setVisible(false)
        }
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const fetchItem = (id) => {
        const tokenData = getLocalStorageObject("token")
        itemsApi.getItemById(tokenData.token, id).then(res => {
            setItem(res.data)
            setIsOwner(res.data.owner === tokenData.email)
        }).catch(err => {
            setItem({})
            toast.error("Fetch Item failed: " + err.message)
        })
    }

    const fetchTransactions = (id) => {
        const tokenData = getLocalStorageObject("token")
        itemsApi.getItemTransactions(tokenData.token, id).then(res => {
            setItemsTransactions(res.data.transactions)
        }).catch(err => {
            setItemsTransactions([])
            toast.error("Fetch item transactions failed: " + err.message)
        })
    }
    useEffect(() => {
        if(!id) {
            return
        }
        fetchItem(id)
        fetchTransactions(id)

    }, [id])

    const handleBuyItem = async () => {
        const buyItemPromise = new Promise(async (resolve, reject) => {
            try {
                const buyResult = await buyItem(id)
                resolve(buyResult.data)
            } catch (err) {
                reject(err.message)
            }
        })

        await toast.promise(buyItemPromise, {
            loading: 'Buying items...',
            success: (res) => `Bought Items success with ${res.price} ${item.currency}`,
            error: (err) => `Bought item failed: ${err.toString()} !`
        });
        //re fetch item data
        fetchItem(id)
        fetchTransactions(id)
    }
    return (
        <PageContainer>
            {
                item.name ? (
                    <Container>
                        <ItemContainer>
                            <Row gutter={24}>
                                <CenterItemCol span={12}>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width="100%"
                                        height="430px"
                                    />
                                </CenterItemCol>
                                <Col span={12}>
                                    <Row>
                                        <Col span={24}>
                                            <ItemName>{item.name}</ItemName>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <ItemBadge>
                                                <ItemBadgeTitle>Status</ItemBadgeTitle>
                                                <ItemBadgeContent>{item.status}</ItemBadgeContent>
                                            </ItemBadge>
                                        </Col>

                                        <Col span={12}>
                                            <ItemBadge>
                                                <ItemBadge>
                                                    <ItemBadgeTitle>Created</ItemBadgeTitle>
                                                    <ItemBadgeContent>{moment(item.created_at).format("DD MMM YYYY")}</ItemBadgeContent>
                                                </ItemBadge>
                                            </ItemBadge>
                                        </Col>

                                        <Col span={12}>
                                            <ItemBadge>
                                                <ItemBadge>
                                                    <ItemBadgeTitle>Creator</ItemBadgeTitle>
                                                    <ItemBadgeContent>{item.creator}</ItemBadgeContent>
                                                </ItemBadge>
                                            </ItemBadge>
                                        </Col>

                                        <Col span={12}>
                                            <ItemBadge>
                                                <ItemBadge>
                                                    <ItemBadgeTitle>Owner</ItemBadgeTitle>
                                                    <ItemBadgeContent>{item.owner}</ItemBadgeContent>
                                                </ItemBadge>
                                            </ItemBadge>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <ItemDescription>
                                                {item.description}
                                            </ItemDescription>
                                        </Col>
                                    </Row>
                                    <ItemFooter>
                                        <Col span={12}>
                                            <PricePanel>
                                                <h1>Price</h1>
                                                <div>{item.price} {item.currency}</div>
                                            </PricePanel>
                                        </Col>
                                        <Col span={12}>
                                            {isOwner ? (
                                                <FlexContainer>
                                                    <ActionButton onClick={() => showModal()}>Delete</ActionButton>
                                                    <Modal
                                                        title="Delete confirmation"
                                                        visible={visible}
                                                        onOk={handleOk}
                                                        confirmLoading={confirmLoading}
                                                        onCancel={handleCancel}
                                                    >
                                                        <p>Do you really want to delete this items</p>
                                                    </Modal>
                                                    <ActionButton onClick={() => {
                                                        router.push(`/nft-items/edit/${id}`)
                                                    }}>Edit</ActionButton>
                                                </FlexContainer>
                                            ) : (
                                                <ActionButton onClick={handleBuyItem}>Buy</ActionButton>
                                            )}
                                        </Col>
                                    </ItemFooter>
                                </Col>
                            </Row>
                        </ItemContainer>
                        <ItemHistory>
                            <HistoryTitle>History</HistoryTitle>
                            <Row gutter={24}>
                                {
                                    itemTransactions.map(tx => {
                                        return (
                                            <Col span={12} key={tx.tx_hash}>
                                                <HistoryBadge>
                                                    <HistoryContent>
                                                        <div>
                                                            Buy for {tx.price}
                                                        </div>
                                                        <div>
                                                            by {tx.buyer}
                                                        </div>
                                                    </HistoryContent>
                                                    <HistoryTime>
                                                        <TimeIcon className='bx bxs-calendar'/>
                                                        {getDateBeforeToday(moment(tx.created_at))} days ago
                                                    </HistoryTime>
                                                </HistoryBadge>
                                            </Col>
                                        )
                                    })
                                }
                                <Col span={12}>
                                    <HistoryBadge>
                                        <HistoryContent>
                                            <div>
                                                Created
                                            </div>
                                            <div>
                                                by {item.creator}
                                            </div>
                                        </HistoryContent>
                                        <HistoryTime>
                                            <TimeIcon className='bx bxs-calendar'/>
                                            {getDateBeforeToday(moment(item.created_at))} days ago
                                        </HistoryTime>
                                    </HistoryBadge>
                                </Col>
                            </Row>
                        </ItemHistory>
                    </Container>
                ) : (
                    <CenterDiv>404 Not Found</CenterDiv>
                )
            }

        </PageContainer>
    )
}
export default ItemDetailsView