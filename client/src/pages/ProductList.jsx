import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { BackspaceOutlined } from "@material-ui/icons";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Button = styled.button`
  border: none;
  cursor: pointer;
  background: none;
  margin-right: -10px;
`;

const ProductList = () => {
  const location = useLocation();
  const history = useHistory();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;

    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    
    setFilters({});
    history.push('/products/' + cat);
  }

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          {cat == "OPREMA" ? 
          <>
            <FilterText>Filter Products:</FilterText>
            <Select name="color" onChange={handleFilters}>
              <Option disabled defaultChecked>COLOR</Option>
              <Option>black</Option>
              <Option>white</Option>
              <Option>yellow</Option>
              <Option>blue</Option>
              <Option>red</Option>
            </Select>
            <Select name="type" onChange={handleFilters}>
              <Option disabled defaultChecked>TYPE</Option>
              <Option>Viljuska</Option>
              <Option>Kombinezon</Option>
              <Option>Cesalj</Option>
            </Select>
          </>
          :
          <>
            <FilterText>Filter Products:</FilterText>
            <Select name="color" onChange={handleFilters}>
              <Option disabled defaultChecked>YEAR</Option>
              <Option >2019</Option>
              <Option>2020</Option>
              <Option>2021</Option>
              <Option>2022</Option>
              <Option>2023</Option>
            </Select>
            <Select name="size" onChange={handleFilters}>
              <Option disabled defaultChecked>TYPE</Option>
              <Option>SUNCOKRET</Option>
              <Option>LIVADSKI</Option>
              <Option>BADEM</Option>
              <Option>POLEN</Option>
            </Select>
          </>
          }
          <Button onClick={handleClick}><BackspaceOutlined/></Button>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Lowest to highest price</Option>
            <Option value="desc">Highest to lowest price</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Footer/>
    </Container>
  );
};

export default ProductList;
