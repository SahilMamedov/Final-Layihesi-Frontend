import Slider from "react-slick";

import { FC } from "react";
import { IGoods } from "types";
import { Goods } from "../../ProductCard";
import { StyledContainer } from "./styles";
import { StyledNavlink } from "Views/Category/styles";
import * as React from "react";

interface Props {
  data?: IGoods[];
}
export const TrendingSlider: FC<Props> = ({ data }) => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    
  };
  return (
    <StyledContainer>
      <Slider {...settings}>
        {data?.map((item) => (
          <StyledNavlink key={item.id} to={`/productdetail/${item.id}`}>
            <Goods {...item} />
          </StyledNavlink>
        ))}
      </Slider>
    </StyledContainer>
  );
};
