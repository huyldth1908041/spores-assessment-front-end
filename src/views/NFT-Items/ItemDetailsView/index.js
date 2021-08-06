import {useRouter} from "next/router";
import PageContainer from "../../../components/PageContainer";
import {Col, Image, Row} from "antd";
import styled from "styled-components";
import moment from "moment";
import {useEffect, useState} from "react";
import itemsApi from "../../../service/itemsApi";
import {getLocalStorageObject} from "../../../utils";
import {toast} from "react-hot-toast";

const mockData = {
    "id": 1,
    "name": "Floating Stars",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    "price": 20.2,
    "currency": "WETH",
    "owner": "luuhuyulei@gmail.com",
    "creator": "luuhuyulei@gmail.com",
    "metadata": "localhost:8080/items/1",
    "status": "Pending",
    "type": "auction",
    "image": "https://firebasestorage.googleapis.com/v0/b/spores-internship.appspot.com/o/images%2F1.gif?alt=media&token=0c5f7b8f-cd73-4e03-868c-58305d4b6022",
    "created_at": "2021-08-03T10:03:20.561272+07:00",
    "updated_at": "2021-08-03T10:03:20.572287+07:00"
}

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
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

const ItemDetailsView = () => {
    const router = useRouter()
    const {id} = router.query
    const [item, setItem] = useState({})
    const [isOwner, setIsOwner] = useState(false)
    useEffect(() => {o
        const tokenData = getLocalStorageObject("token")
        if (!id) {
            return
        }
        itemsApi.getItemById(tokenData.token, id).then(res => {
            setItem(res.data)
            setIsOwner(res.data.owner === tokenData.email)
        }).catch(err => {
            setItem({})
            toast.error("Fetch Item failed: " + err.message)
        })
    }, [id])
    return (
        <PageContainer>
            {
                item.name ? (
                    <Wrapper>
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
                                            <>
                                                <ActionButton>Delete</ActionButton>
                                                <ActionButton>Edit</ActionButton>
                                            </>
                                        ) : (
                                            <ActionButton>Buy</ActionButton>
                                        )}
                                    </Col>
                                </ItemFooter>
                            </Col>
                        </Row>
                    </Wrapper>
                ) : (
                    <CenterDiv>404 Not Found</CenterDiv>
                )
            }

        </PageContainer>
    )
}
export default ItemDetailsView