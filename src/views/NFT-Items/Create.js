import styled from "styled-components";
import {Col, Form, Image, Input, InputNumber, Row, Upload, Select} from "antd";
import useForm from "antd/lib/form/hooks/useForm";
import {useState} from "react";


const Container = styled.div`
  width: 100%;
  font-family: Roboto, sans-serif;
`
const FormTitle = styled.h1`
  font-size: 30px;
  font-weight: 600;
`
const StyledCol = styled(Col)`
  padding: 0 20px !important;
  margin-bottom: 50px;
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
  >div.ant-select-selector {
    border: 1px solid #111;
    border-radius: 15px !important;
    outline: none;
    height: 50px !important;
    padding: 10px 20px !important;
    font-weight: 600;
  }
`
//TODO: Separate file
const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
};


const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
const CreateItemView = () => {
    const {form} = useForm();
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const onFinish = (values) => {
        console.log(values)
    }
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo)
    }
    const handleChooseFile = ({file}) => {
        if (ALLOWED_TYPES.includes(file.type)) {
            setFile(file);
            getBase64(file, setImage);
        } else {
            console.error({message: 'File Type is not allowed'});
        }
    }
    return (
        <Container>
            <FormTitle>Create new item</FormTitle>
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
                                <UploadButton>
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

                    <StyledCol xl={12}>
                        <Form.Item
                            name="Price"
                            rules={[
                                {required: true, message: "Price is required"},
                                {type: "number", min: 0, message: "Price must be larger than 0"}
                            ]}
                        >
                            <StyledInputNumber type="text" placeholder="Price"/>
                        </Form.Item>
                    </StyledCol>
                    <StyledCol xl={12}>
                        <Form.Item
                            name="Currency"
                            rules={[{required: true, message: "Currency is required"}]}
                        >
                            <StyledSelect defaultValue="weth">
                                <Select.Option value="weth">WETH</Select.Option>
                                <Select.Option value="usdc">USDC</Select.Option>
                            </StyledSelect>
                        </Form.Item>
                    </StyledCol>
                </Row>
                <Form.Item>
                    <SubmitButton type="submit">Create</SubmitButton>
                </Form.Item>
            </Form>
        </Container>

    )
}
export default CreateItemView;