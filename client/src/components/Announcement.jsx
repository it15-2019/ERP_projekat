import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  margin: 0%;
  color: black;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Super ponuda! Besplatna dostava za porudžbine preko 3000 RSD</Container>;
};

export default Announcement;
