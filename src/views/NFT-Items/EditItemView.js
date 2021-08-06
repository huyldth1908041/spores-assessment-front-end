import {useRouter} from "next/router";
import useForm from "antd/lib/form/hooks/useForm";
import {useEffect, useState} from "react";
import useItemsApi from "../../hooks/useItemsApi";
import {toast} from "react-hot-toast";
import {ALLOWED_TYPES} from "./config";
import {getBase64, getLocalStorageObject} from "../../utils";
import Fire from "../../service/fire";
import moment from "moment";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";
import {Col, DatePicker, Form, Image, Input, InputNumber, Radio, Row, Select, Upload} from "antd";
import styled from "styled-components";
import itemsApi from "../../service/itemsApi";
import useToken from "../../hooks/useToken";

const {RangePicker} = DatePicker

const StyledCol = styled(Col)`
  padding: 0 20px !important;
  margin-bottom: 30px;
`

const StyledTextInput = styled(Input)`
  border: 1px solid #111;
  border-radius: 15px;
  outline: none;
  height: 50px;
  padding: 0 20px;
  font-weight: 600;

`
const StyledTextArea = styled(Input.TextArea)`
  border: 1px solid #111;
  border-radius: 15px;
  padding: 10px 20px;
  font-weight: 600;
  height: 500px;
`
const UploadButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  font-weight: 600;
  font-size: 16px;
`
const UploadHelper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #999;

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
const PreviewUploadFile = styled(Image)`
  position: relative;
  top: -15px;
`
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
const StyledSelect = styled(Select)`
  > div.ant-select-selector {
    border: 1px solid #111;
    border-radius: 15px !important;
    outline: none;
    height: 50px !important;
    padding: 10px 20px !important;
    font-weight: 600;
  }
`
const TokenSymbol = styled(Image)`
  width: 17px;
  height: 17px;
  margin-right: 10px;
  padding-top: 2px;
`
const ItemTypeContainer = styled.div`
  width: 100%;
  padding: 10px;
`
const FormTitle = styled.h1`
  font-weight: bold;
  font-size: 28px;
`

const StyledRadioButton = styled(Radio.Button)`
  margin-right: 10px;
  width: 220px;
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
const StyledRangePicker = styled(RangePicker)`
  width: 100%;
  height: 50px;
  border-radius: 10px;
`

const CenterDiv = styled.div`
  display: flex;
  width: 100%;
  min-height: 400px;
  justify-content: center;
  align-items: center;
`

const EditItemView = () => {
    const [form] = useForm();
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const [uploadedImgUrl, setUploadedImgUrl] = useState()
    const [pricingType, setPricingType] = useState("fixed")
    const {updateItem} = useItemsApi()
    const [isExec, setIsExec] = useState(false)
    const router = useRouter()
    const {id} = router.query
    const [isOwner, setIsOwner] = useState(true)
    const [notFound, setNotFound] = useState(false)
    useEffect(() => {
        if(!id) {
            return
        }
        const tokenData = getLocalStorageObject("token")
        itemsApi.getItemById(tokenData.token, id).then(res => {
            const currentItem = res.data
            setFile(currentItem.image)
            setImage(currentItem.image)
            setUploadedImgUrl({...uploadedImgUrl, imgUrl: currentItem.image})
            setPricingType(currentItem.type)
            setIsOwner(currentItem.owner === tokenData.email)
            form.setFieldsValue({
                currency: currentItem.currency,
                name: currentItem.name,
                price: currentItem.price,
                description: currentItem.description,
                image: currentItem.image,
                type: currentItem.type,
            })
        }).catch(err => {
            setNotFound(true)
            toast.error(err.message)
        })
    }, [router])
    const onFinish = async (values) => {
        console.log(values)
        const updateItemPromise = new Promise(async (resolve, reject) => {
            try {
                setIsExec(true)
                if (!file) {
                    reject('Please choose item image')
                }
                if (!uploadedImgUrl) {
                    reject("Uploading your image please try again!")
                }
                console.log(uploadedImgUrl)
                const data = {
                    currency: values.currency,
                    name: values.name,
                    price: values.price,
                    description: values.description,
                    image: uploadedImgUrl.imgUrl,
                    type: pricingType,
                }
                if (pricingType === "auction") {
                    data.create_auction_input = {
                        initial_price: values.price,
                        end_at: values.auctionTime[1].valueOf()
                    }
                }
                const res = await updateItem(id, data)
                //reset form values
                form.resetFields()
                setImage("");
                resolve(res)
                await router.push(`/nft-items/${id}`)
            } catch (err) {
                reject(err.message)
            } finally {
                setIsExec(false)
            }
        });

        await toast.promise(updateItemPromise, {
            loading: 'Updating items...',
            success: (res) => `Updated item success !`,
            error: (err) => `Update item failed: ${err.toString()} !`
        });

    }

    const onFinishFailed = (errorInfo) => {
        toast.error('Please check form value then try again!');
    }
    const handleChooseFile = ({file}) => {
        if (ALLOWED_TYPES.includes(file.type)) {
            setFile(file);
            getBase64(file, setImage);
            //upload to fire base then get upload url
            Fire.create.uploadImage(file, () => {
                toast.error("upload to firebase failed")
            }, setUploadedImgUrl);
        } else {
            toast.error('File type not support !');
        }
    }
    const handleChangePricingType = e => {
        setPricingType(e.target.value)
    }

    function disabledDate(current) {
        // Can not select days before today
        return current && current < moment().startOf('day');
    }

    return (
        <PageContainer>
            {
                !notFound ? isOwner ?(
                    <>
                        <PageHeader title="Edit Item"/>
                        <Form
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            form={form}
                            name="editItem"
                        >
                            <Row gutter={16}>
                                <StyledCol xl={24}>
                                    <Form.Item
                                        name="name"
                                        rules={[{required: true, message: "Name is required"}]}
                                    >
                                        <StyledTextInput type="text" placeholder="Name" />
                                    </Form.Item>
                                </StyledCol>

                                <StyledCol xs={12}>
                                    <Form.Item
                                        name="description"
                                        rules={[{required: true, message: "Description is required"}]}
                                    >
                                        <StyledTextArea placeholder="Description" rows={6}/>
                                    </Form.Item>
                                </StyledCol>

                                <StyledCol xs={7}>
                                    <Upload.Dragger
                                        accept={ALLOWED_TYPES.join(', ')}
                                        showUploadList={false}
                                        customRequest={handleChooseFile}
                                        height={150}
                                        style={{borderRadius: "15px", overflow: "hidden"}}
                                    >
                                        {image ? (
                                            <PreviewUploadFile src={image} preview={false}/>
                                        ) : (
                                            <UploadButton type="button">
                                                Upload File
                                            </UploadButton>
                                        )}
                                    </Upload.Dragger>
                                </StyledCol>
                                <StyledCol xs={5}>
                                    <UploadHelper>
                                        <p> PNG, GIF, WEBP, MP4 or MP3. Max 30mb.</p>
                                    </UploadHelper>
                                </StyledCol>
                                <StyledCol span={24}>
                                    <ItemTypeContainer>
                                        <FormTitle>Chose sale type</FormTitle>
                                        <Radio.Group
                                            defaultValue="fixed"
                                            buttonStyle="solid"
                                            onChange={handleChangePricingType}
                                        >
                                            <StyledRadioButton value="fixed">Fixed price</StyledRadioButton>
                                            <StyledRadioButton value="auction">Unlimited auction</StyledRadioButton>
                                        </Radio.Group>
                                    </ItemTypeContainer>
                                </StyledCol>
                                <StyledCol span={24}>
                                    <FormTitle>{pricingType === "fixed" ? "Pricing" : "Initial pricing"}</FormTitle>
                                </StyledCol>
                                <StyledCol xl={12}>
                                    <Form.Item
                                        name="price"
                                        rules={[
                                            {required: true, message: "Price is required"},
                                            {type: "number", min: 0, message: "Price must be larger than 0"}
                                        ]}
                                    >
                                        <StyledInputNumber
                                            type="text"
                                            placeholder={pricingType === "fixed" ? "Price" : "Min Price"}/>
                                    </Form.Item>
                                </StyledCol>
                                <StyledCol xl={12}>

                                    <Form.Item
                                        name="currency"
                                        rules={[{required: true, message: "Currency is required"}]}
                                        initialValue="WETH"
                                    >
                                        <StyledSelect>
                                            <Select.Option value="WETH">
                                                <TokenSymbol src="/images/weth-icon.svg" preview={false}/>
                                                WETH
                                            </Select.Option>
                                            <Select.Option value="USDC">
                                                <TokenSymbol src="/images/usdc-icon.svg" preview={false}/>
                                                USDC
                                            </Select.Option>
                                        </StyledSelect>
                                    </Form.Item>
                                </StyledCol>

                                {pricingType === "auction" && (
                                    <StyledCol xl={12}>
                                        <FormTitle>Auction Time</FormTitle>
                                        <Form.Item
                                            name="auctionTime"
                                            rules={[{required: true, message: "Auction time is required"}]}
                                        >
                                            <StyledRangePicker
                                                disabledDate={disabledDate}
                                            />
                                        </Form.Item>
                                    </StyledCol>
                                )}
                            </Row>
                            <Form.Item>
                                <SubmitButton type="submit" disable={isExec}>
                                    {isExec ? "Saving..." : "Update"}
                                </SubmitButton>
                            </Form.Item>
                        </Form>
                    </>
                ) : (
                    <CenterDiv>
                        <p>You do not have permission to edit this Item</p>
                    </CenterDiv>
                ) : (
                    <CenterDiv>
                        <p>404 Not Found</p>
                    </CenterDiv>
                )
            }
        </PageContainer>

    )
}
export default EditItemView