import { useOutletContext } from "react-router";
import { fetchCoinTickers } from "../api";
import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  } 
  100%{
    opacity: 1;
  }
`;

const PriceContainer = styled.div`
  height: 80px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, auto));
  gap: 40px;
  padding: 0px 10px;
  margin-bottom: 40px;
`;

interface Seond {
  second: string;
}

const PriceItem = styled.div<Seond>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.accentColor};
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.accentColor};

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  animation: ${animation} ${(props) => props.second} linear;
`;

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      percent_change_1h?: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface IItemProps {
  isNegative: number;
}
const Item = styled.span<IItemProps>`
  color: ${(props) => (props.isNegative === -1 ? "#ff4949" : "#27bc47")};
`;

function Price() {
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, data } = useQuery<PriceData>(["tickers", coinId], () =>
    fetchCoinTickers(coinId!)
  );

  return (
    <div>
      {isLoading ? (
        "Loading price ..."
      ) : (
        <>
          <PriceContainer>
            <PriceItem second="0.5s">
              <span>1h%:</span>
              <Item
                isNegative={Math.sign(
                  Number(data?.quotes.USD.percent_change_1h)
                )}
              >
                {data?.quotes.USD.percent_change_1h}%
              </Item>
            </PriceItem>
            <PriceItem second="0.5s">
              <span>24h%:</span>
              <Item
                isNegative={Math.sign(
                  Number(data?.quotes.USD.percent_change_24h)
                )}
              >
                {data?.quotes.USD.percent_change_24h}%
              </Item>
            </PriceItem>
            <PriceItem second="0.5s">
              <span>7d%:</span>
              <Item
                isNegative={Math.sign(
                  Number(data?.quotes.USD.percent_change_7d)
                )}
              >
                {data?.quotes.USD.percent_change_7d}%
              </Item>
            </PriceItem>
          </PriceContainer>
          <PriceContainer>
            <PriceItem second="1s">
              <span>Volum(24h):</span>
              <Item isNegative={Math.sign(Number(data?.quotes.USD.volume_24h))}>
                $
                {data?.quotes.USD.volume_24h.toLocaleString(undefined, {
                  maximumFractionDigits: 3,
                })}
              </Item>
            </PriceItem>
            <PriceItem second="1s">
              <span>Market_Cap:</span>
              <Item isNegative={Math.sign(Number(data?.quotes.USD.market_cap))}>
                ${data?.quotes.USD.market_cap.toLocaleString("ko-KR")}
              </Item>
            </PriceItem>
          </PriceContainer>
        </>
      )}
    </div>
  );
}

export default Price;
