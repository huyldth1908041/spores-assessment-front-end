import styled from "styled-components";
import {Image} from "antd";

const Container = styled.div`
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  background: rgb(246, 246, 246);
  width: 264px;
  height: 391px;
  border-radius: 30px;
  padding: 10px;
  margin-bottom: 10px;
  &:hover {
    box-shadow: rgb(14 30 37 / 12%) 0px 0px 16px 0px,rgb(14 30 37 / 32%) 0px 2px 16px 0px;
  }
`
const CardImg = styled(Image)`
  width: 244px;
  height: 244px;
  border-radius: 10px;
`
const CardTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  text-align: center;
`
const CardContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  padding: 15px 10px;
  margin-top: 10px;
`
const PricePanel = styled.div`
  width: 100%;

  > p:nth-child(1) {
    color: #999;
    font-weight: bold;
    margin-bottom: 5px;
  }

  > p:nth-child(2) {
    margin-bottom: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const AssetCard = ({asset}) => {
    return (
        <Container>
            <CardImg
                src={asset.image}
                preview={false}
            />
            <CardTitle>
                {asset.name}
            </CardTitle>
            <CardContent>
                <PricePanel>
                    <p>Price</p>
                    <p>{asset.price} {asset.currency}</p>
                </PricePanel>
            </CardContent>
        </Container>
    )
}

export default AssetCard