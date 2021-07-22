import {Form, Image, Input} from "antd";
import styled from "styled-components";
import Link from "next/link";

const CenterItemContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto, sans-serif;
  background: #FFF5EB;

`
const FormWrapper = styled.div`
  padding: 10px;
  width: 370px;
`
const StyledInput = styled(Input)`
  height: 50px;
  border-radius: 40px;
`
const InputIcon = styled.i`
  font-size: 1.5rem;
  color: #111;
`
const FormTitle = styled.h1`
  font-weight: 600;
  font-size: 30px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
`
const StyledButton = styled.button`
  width: 100%;
  display: inline-block;
  border-radius: 40px;
  height: 50px;
  border: none;
  outline: none;
  cursor: pointer;
  background: #fbceb5;
  font-weight: 400;
  margin:10px 0;
  text-transform: uppercase;
`
const Logo = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`
const AuthenticationForm = ({formFields, onFinish, onFinishError, submitText, formName, formTitle, redirectUrl, redirectText}) => {
    const handleFinish = (values) => {
       onFinish(values)
    }
    const handleFinishFail = (errors) => {
        onFinishError(errors)
    }

    return (
        <CenterItemContainer>
            <FormWrapper>
                <Logo>
                    <Image
                        src="/images/logo-mark.png"
                        preview={false}
                    />
                </Logo>
                <FormTitle>{formTitle}</FormTitle>
                <Form
                    name={formName}
                    onFinish={handleFinish}
                    onFinishFailed={handleFinishFail}
                >
                    {formFields.map(item => {
                        return (
                            <Form.Item
                                key={item.name}
                                name={item.name}
                                rules={item.rules && item.rules}
                            >
                                <StyledInput
                                    prefix={item.prefix && <InputIcon className={item.prefix}/>}
                                    placeholder={item.placeholder || ""}
                                    type={item.inputType}
                                />
                            </Form.Item>
                        )
                    })}
                    <Form.Item>
                        <StyledButton type="submit">
                            {submitText}
                        </StyledButton>
                        <Link href={redirectUrl}>
                            <a>{redirectText}</a>
                        </Link>
                    </Form.Item>
                </Form>
            </FormWrapper>
        </CenterItemContainer>
    )
}
export default AuthenticationForm