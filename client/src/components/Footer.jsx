import { Facebook,Instagram,MailOutline,Phone,Pinterest,Room,Twitter,} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
  font-size: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const Image2 = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 10px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo><Image src="https://i.etsystatic.com/13434992/r/il/3bf90f/3219303725/il_1588xN.3219303725_kovf.jpg"/> PČELICA CAJA <Image2 src="https://i.etsystatic.com/13434992/r/il/3bf90f/3219303725/il_1588xN.3219303725_kovf.jpg"/></Logo>
        <Desc>
          Dobrodosli u prodavnicu kompletnog pcelarskog seta: od opreme do 
          najfinijih pcelarskih prirodnih proizvoda: med, polen... Zajedno za organizacijom
          ,,Sacuvajmo pcele'', imamo cilj da se ovi vredni insekti sacuvaju od raznih otrova koje
          pustaju u vazduh.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>

      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px", color:"black"}}/> Novi Sad, Srbija
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px", color:"orange"}}/>+381631040899
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px", color:"darkyellow"}} />sofijadangubic8@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
