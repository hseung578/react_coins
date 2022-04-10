import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "./../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Toggle = styled.button`
  position: absolute;
  top: 4vh;
  left: 95%;
  width: 50px;
  height: 50px;
  transform: translateX(-50%);
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.cardBgColor};
  border: 1px solid darkgrey;
  border-radius: 25px;
  font-size: 30px;
  padding: 0px;
  color: transparent;
  text-shadow: 0 0 0 ${(props) => props.theme.textColor};
  &:hover {
    color: yellow;
    background-color: ${(props) => props.theme.textColor};
  }
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid darkgrey;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [isDark, setDark] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDark((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>코인</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>코인</Title>
        <Toggle onClick={toggleDarkAtom}>{isDark ? "🌞" : "🌛"}</Toggle>
      </Header>
      {isLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
