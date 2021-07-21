import styled from "styled-components";
import {Col, Form, Image, Input, InputNumber, Row, Upload, Select, Radio, DatePicker} from "antd";
import useForm from "antd/lib/form/hooks/useForm";
import {useState} from "react";
import {getBase64} from "../../utils";
import {toast} from "react-hot-toast";
import PageHeader from "../../components/PageHeader";
import PageContainer from "../../components/PageContainer";
import moment from "moment";
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
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
const CreateItemView = () => {
    const {form} = useForm();
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const [pricingType, setPricingType] = useState("fixed")
    const onFinish = (values) => {
        if(!file) {
            toast.error("Please pick asset image")
            return
        }
        console.log(file)
        console.log(values)
    }
    const onFinishFailed = (errorInfo) => {
        toast.error('Please check form value then try again!');
    }
    const handleChooseFile = ({file}) => {
        if (ALLOWED_TYPES.includes(file.type)) {
            setFile(file);
            getBase64(file, setImage);
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
            <PageHeader title="Create new Item"/>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}>
                <Row gutter={16}>
                    <StyledCol xl={12}>
                        <Form.Item
                            name="name"
                            rules={[{required: true, message: "Name is required"}]}
                        >
                            <StyledTextInput type="text" placeholder="Name"/>
                        </Form.Item>
                    </StyledCol>
                    <StyledCol xl={12}>
                        <Form.Item name="metadataUrl">
                            <StyledTextInput type="text" placeholder="Metadata Url"/>
                        </Form.Item>
                    </StyledCol>
                    <StyledCol xs={12}>
                        <Form.Item
                            name="Description"
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
                            name="Price"
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
                            name="Currency"
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
                    <SubmitButton type="submit">Create</SubmitButton>
                </Form.Item>
            </Form>
        </PageContainer>

    )
}
export default CreateItemView;