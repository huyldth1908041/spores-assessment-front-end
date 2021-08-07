import {useRouter} from "next/router";
import PageContainer from "../../../components/PageContainer";
import {Col, Form, Image, Input, InputNumber, Modal, Row, Tabs} from "antd";
import styled from "styled-components";
import moment from "moment";
import {useEffect, useState} from "react";
import itemsApi from "../../../service/itemsApi";
import {getDateAfterToday, getDateBeforeToday, getLocalStorageObject} from "../../../utils";
import {toast} from "react-hot-toast";
import useItemsApi from "../../../hooks/useItemsApi";
import useForm from "antd/lib/form/hooks/useForm";
import useAuctionApi from "../../../hooks/useAuctionApi";

const {TabPane} = Tabs;

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
  div:nth-child(3) {
    font-weight: normal;
    font-size: 14px;
    margin-top: 20px;
  }
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
  justify-content: center;
`
// const StyledTabs = styled(Tabs)`
//   margin-top: 50px;
//   padding-left: 10px;
//
//   div.ant-tabs-tab {
//     font-size: 16px;
//   }
// `
const StyledInputNumber = styled(InputNumber)`
  border: 1px solid #111;
  border-radius: 15px;
  outline: none;
  height: 50px;
  padding: 10px 20px;
  font-weight: 600;
  width: 100%;

  .ant-input-number-handler-wrap {
    display: none;
  }

`

const SubmitButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-image: linear-gradient(to right, #349eff, #62b4ff);
  padding: 15px 30px;
  border-radius: 15px;
  margin: 0 auto;
  display: block;
  width: fit-content;
  color: #fff;
  font-size: 16px;
`


const ItemDetailsView = () => {
    const router = useRouter()
    const {id} = router.query
    const [itemData, setItemData] = useState({auction: null, item: null})
    const [itemTransactions, setItemsTransactions] = useState([])
    const [isOwner, setIsOwner] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showBidForm, setShowBidForm] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const {buyItem, deleteItem, putItemOnMarket} = useItemsApi()
    const {bidAnItem} = useAuctionApi()
    const [form] = useForm()

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
            setShowConfirmDelete(false)
        }
    };

    const handleCancel = () => {
        setShowConfirmDelete(false);
    };

    const fetchItem = (id) => {
        const tokenData = getLocalStorageObject("token")
        itemsApi.getItemById(tokenData.token, id).then(res => {
            setItemData({...itemData, auction: res.data.auction, item: res.data.item})
            setIsOwner(res.data.item.owner === tokenData.email)
        }).catch(err => {
            setItemData({auction: null, item: null})
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
        if (!id) {
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
            success: (res) => `Bought Items success`,
            error: (err) => `Bought item failed: ${err.toString()} !`
        });
        //re fetch item data
        fetchItem(id)
        fetchTransactions(id)
    }

    const handlePutOnMarket = async () => {
        const putItemOnMarketPromise = new Promise(async (resolve, reject) => {
            try {
                const res = await putItemOnMarket(id)
                resolve(res)
            } catch (err) {
                reject(err.message)
            }
        })

        await toast.promise(putItemOnMarketPromise, {
            loading: 'Putting item on market...',
            success: (res) => `Put item on market sucess !`,
            error: (err) => `Put item on market failed: ${err.toString()} !`
        });
        //re fetch item data
        fetchItem(id)
        fetchTransactions(id)
    }

    const handleBidItem = () => {
        form.submit()
    }
    const handleFinishFail = (err) => {
        toast.error("Check Form value then try again")
    }
    const handleFinish = async (values) => {
        const bidItemPromise = new Promise(async (resolve, reject) => {
            try {
                if (!itemData.auction.id) {
                    reject("Item is not on auction")
                    return
                }

                if (values.bidValue <= itemData.auction.final_price) {
                    reject("Please a bid bigger price than current price")
                    return
                }
                const res = await bidAnItem(itemData.auction.id, values.bidValue)
                resolve(res)
                //update and reset
                fetchItem(id)
                fetchTransactions(id)
                form.resetFields()
                setShowBidForm(false)
            } catch (err) {
                reject(err.message)
            }
        })
        await toast.promise(bidItemPromise, {
            loading: 'Bidding new items...',
            success: (res) => `Bid item success !`,
            error: (err) => `Bid item failed: ${err.toString()} !`
        });
    }
    return (
        <PageContainer>
            {
                itemData.item ? (
                    <Container>
                        <ItemContainer>
                            <Row gutter={24}>
                                <CenterItemCol span={12}>
                                    <Image
                                        src={itemData.item.image}
                                        alt={itemData.item.name}
                                        width="100%"
                                        height="430px"
                                    />
                                </CenterItemCol>
                                <Col span={12}>
                                    <Row>
                                        <Col span={24}>
                                            <ItemName>{itemData.item.name}</ItemName>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <ItemBadge>
                                                <ItemBadgeTitle>Status</ItemBadgeTitle>
                                                <ItemBadgeContent>{itemData.item.status}</ItemBadgeContent>
                                            </ItemBadge>
                                        </Col>

                                        <Col span={12}>
                                            <ItemBadge>
                                                <ItemBadge>
                                                    <ItemBadgeTitle>Created</ItemBadgeTitle>
                                                    <ItemBadgeContent>{moment(itemData.item.created_at).format("DD MMM YYYY")}</ItemBadgeContent>
                                                </ItemBadge>
                                            </ItemBadge>
                                        </Col>

                                        <Col span={12}>
                                            <ItemBadge>
                                                <ItemBadge>
                                                    <ItemBadgeTitle>Creator</ItemBadgeTitle>
                                                    <ItemBadgeContent>{itemData.item.creator}</ItemBadgeContent>
                                                </ItemBadge>
                                            </ItemBadge>
                                        </Col>

                                        <Col span={12}>
                                            <ItemBadge>
                                                <ItemBadge>
                                                    <ItemBadgeTitle>Owner</ItemBadgeTitle>
                                                    <ItemBadgeContent>{itemData.item.owner}</ItemBadgeContent>
                                                </ItemBadge>
                                            </ItemBadge>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <ItemDescription>
                                                {itemData.item.description}
                                            </ItemDescription>
                                        </Col>
                                    </Row>
                                    <ItemFooter>
                                        <Col span={8}>
                                            <PricePanel>
                                                {itemData.item.type === "Auction" ? (
                                                    <>
                                                        <h1>Highest Bid</h1>
                                                        <div>{itemData.auction.final_price} {itemData.item.currency}</div>
                                                        <div>Auction end in {getDateAfterToday(moment(itemData.auction.end_at))} days</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h1>Price</h1>
                                                        <div>{itemData.item.price} {itemData.item.currency}</div>
                                                    </>
                                                )}
                                            </PricePanel>
                                        </Col>
                                        <Col span={16}>
                                            {isOwner ? (
                                                <FlexContainer>
                                                    {
                                                        itemData.item.status === "Private" && (
                                                            <ActionButton onClick={handlePutOnMarket}>
                                                                Public
                                                            </ActionButton>
                                                        )
                                                    }
                                                    <ActionButton onClick={() => setShowConfirmDelete(true)}
                                                                  title="Delete">
                                                        <i className='bx bx-trash'/>
                                                    </ActionButton>
                                                    <Modal
                                                        title="Delete confirmation"
                                                        visible={showConfirmDelete}
                                                        onOk={handleOk}
                                                        confirmLoading={confirmLoading}
                                                        onCancel={handleCancel}
                                                    >
                                                        <p>Do you really want to delete this items</p>
                                                    </Modal>
                                                    <ActionButton
                                                        onClick={() => {
                                                            router.push(`/nft-items/edit/${id}`)
                                                        }}
                                                        title="Edit"
                                                    >
                                                        <i className='bx bx-edit-alt'/>
                                                    </ActionButton>
                                                </FlexContainer>
                                            ) : (
                                                <FlexContainer>
                                                    {
                                                        itemData.item.type === "Auction" ? (
                                                            <>
                                                                <ActionButton onClick={() => {
                                                                    setShowBidForm(true)
                                                                }}>Bid Now</ActionButton>
                                                                <Modal
                                                                    title="Bid Item"
                                                                    visible={showBidForm}
                                                                    onOk={handleBidItem}
                                                                    confirmLoading={confirmLoading}
                                                                    onCancel={() => setShowBidForm(false)}
                                                                >
                                                                    <Form
                                                                        name="bidForm"
                                                                        onFinish={handleFinish}
                                                                        onFinishFailed={handleFinishFail}
                                                                        form={form}
                                                                    >
                                                                        <Form.Item
                                                                            name="bidValue"
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: "Bid value is required"
                                                                                },
                                                                                {
                                                                                    type: "number",
                                                                                    min: 0,
                                                                                    message: "Bid Price must be larger than 0"
                                                                                }
                                                                            ]}
                                                                        >
                                                                            <StyledInputNumber placeholder="Bid value"/>
                                                                        </Form.Item>
                                                                        {/*<Form.Item>*/}
                                                                        {/*    <SubmitButton type="submit">*/}
                                                                        {/*        Bid Now*/}
                                                                        {/*    </SubmitButton>*/}
                                                                        {/*</Form.Item>*/}
                                                                    </Form>
                                                                </Modal>
                                                            </>
                                                        ) : (
                                                            <ActionButton onClick={handleBuyItem}>Buy Now</ActionButton>
                                                        )

                                                    }
                                                </FlexContainer>
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
                                                            {
                                                                itemData.item.t === 'Auction' ? (
                                                                    `Buy for ${tx.price} ${itemData.item.currency}`
                                                                ) : (
                                                                    `Bid for ${tx.price} ${itemData.item.currency}`
                                                                )
                                                            }
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
                                                by {itemData.item.creator}
                                            </div>
                                        </HistoryContent>
                                        <HistoryTime>
                                            <TimeIcon className='bx bxs-calendar'/>
                                            {getDateBeforeToday(moment(itemData.item.created_at))} days ago
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