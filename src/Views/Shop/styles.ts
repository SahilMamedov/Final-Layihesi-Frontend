import styled from "styled-components";
import { CaretDown, CaretUp } from "phosphor-react";
import Box from "@mui/joy/Box";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  background-color: #f5f5f5;
  padding: 50px 40px;
  display: flex;
  position: relative;
`;

export const SideBar = styled.div`
  width: 400px;
  border: 1px solid #f0f0f0;
  color: white;
  background-color: white;
  border-radius: 10px;
  padding-bottom: 30px;
`;
export const Line = styled.span`
  border: 1px solid #f0f0f0;
  margin: 10px 0px;
  display: flex;
  width: 380px;
`;
export const SideBarBox = styled.div`
  padding-left: 20px;
`;

export const SideBarTitle = styled.h1`
  color: ${({ theme }) => theme.color.CharlestonGreen};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 45px;
`;

export const Title = styled.h2`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  color: ${({ theme }) => theme.color.CharlestonGreen};
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
export const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  color: blueviolet;
`;

export const OpenIcon = styled(CaretDown)`
  font-size: 20px;
  padding-right: 20px;
`;

export const CloseIcon = styled(CaretUp)`
  font-size: 20px;
  padding-right: 20px;
`;

export const Goodsbox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const WrapperCard = styled.div`
  margin-left: 30px;
  margin-top: 30px;
`;

export const StyledBox = styled(Box)`
  color: black;
`;
export const StyledNavlink = styled(NavLink)`
  text-decoration: none;
`;

export const Loading = styled.div`
  position: absolute;
  display: flex;
  top: 100px;
  width: 100%;
  justify-content: center;
`;
