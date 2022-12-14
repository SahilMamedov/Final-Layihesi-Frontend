import { Container, Flex, Justify, PlaceOrder, PrdouctName, PrdouctPrice, StyledTextarea, StyledTextField, SubTitle, Total, TotalPrice } from "./styles";
import { BillingDetails, OrderDetails, Title } from "./styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from "@mui/material/Box";
import PaymentForm from "./PaymentForm";
import { useAppDispatch, useAppSelector } from "Redux/hooks/hooks";
import { useStartSaleMutation } from "services/saleServices";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useGetAllBasketQuery } from "services/basketServices";
import { addItem } from "Redux/slices/basketSlice";
import {useTranslation} from "react-i18next"
import CircularProgress from "@mui/material/CircularProgress";
import { IsLoading } from "Views/Auth/Profile/styles";
const theme = createTheme();


export const Checkout = () =>  {
  const {t}=useTranslation()
  const dispatch = useAppDispatch();
  const navigate=useNavigate()
  const {basket} = useAppSelector((state)=>state.basket)

  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const [postSaleData,{isSuccess:succesSale,isLoading}]= useStartSaleMutation()

  const {data,isSuccess,refetch:fetchBasket}=useGetAllBasketQuery()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);

  data.set("Cash",value==="cash"?"true":"false")

  postSaleData(data)

  };

  if(succesSale){
      fetchBasket()
        if(isSuccess){
          dispatch(addItem(data?.basketItems))
          swal(
            `${t('OrderSuccessfully')}`,
            `${t('ThankYouChoosing')}`,
            "success"
          );
          navigate("/category/shop");
        }
  }

 



  return (
    <ThemeProvider theme={theme}>
    <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
   <Container>
     
    <BillingDetails>
      <Title>
      BILLING DETAILS
      </Title>
   
            <Flex>
            <StyledTextField
              width="350px"
              required
              id="firstname"
              label={t('FirstName')}
              name="firstname"
              autoComplete="firstname"
              autoFocus
            />
            <StyledTextField
              width="350px"
              required
              id="lastname"
              label={t('LastName')}
              name="lastname"
              autoComplete="lastname"
              autoFocus
            />
            </Flex>
            <StyledTextField
              width="720px"
              required
              id="city"
              label={t('City')}
              name="city"
              autoComplete="city"
              autoFocus
            />
            <StyledTextField
              width="720px"
              required
              id="address"
              label={t('StreetAddress')}
              name="address"
              autoComplete="address"
              autoFocus
            />
             <StyledTextField
              width="720px"
              required
              id="apartment"
              label={t('ApartmentEntrance')}
              name="apartment"
              autoComplete="apartment"
              autoFocus
            />
             <Flex>
            <StyledTextField
              width="350px"
              required
              id="mobile"
              label={t('Phone')}
              name="mobile"
              defaultValue='+994'
              type='tel'
              autoComplete="mobile"
              autoFocus
            />
         
            <StyledTextField
              width="350px"
              required
              id="email"
              type='email'
              label={t('Email')}
              name="email"
              autoComplete="email"
              autoFocus
            />
            </Flex>
            <StyledTextarea
             placeholder={t('OrderNote')}
             required
             id="note"
             name="note"
             variant="default"
             withAsterisk
            />
     
    </BillingDetails>
    <OrderDetails>
    <Title>{t('YourOrders')}</Title>
    <SubTitle>
      <span>{t('Product')}</span>
      <span>{t('SubTotal')}</span>
    </SubTitle>
    <>
    {basket.basketItems.length !== 0 && 
    basket.basketItems.map((item)=> 
    <div key={item.id}>
      <Justify>
    <PrdouctName>
    {`${item.product?.name} x ${item.count}`}  
    </PrdouctName>
    <PrdouctPrice>
      ${item.price.toFixed(2)}
    </PrdouctPrice>
    </Justify>
    </div>
    )}
    <Justify>
    <Total>
      Total
    </Total>
    <TotalPrice>
      ${basket.total.toFixed(2)}
    </TotalPrice>
    </Justify>
    </>
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="cash" control={<Radio />} label={t('CashOnDelivery')} />
        <FormControlLabel value="card" control={<Radio />} label={t('PaymentByCard')} />
        <>
       {value==="card" ? <PaymentForm/>:""}
        </>
      </RadioGroup>
    </FormControl>
    <PlaceOrder>
    {isLoading?
      <IsLoading >
      <CircularProgress
        color="primary"
        size='35px'
/>
      </IsLoading>:`${t('PlaceOrder')}`}

      
      </PlaceOrder>
    </OrderDetails>
   
   </Container>
   </Box>
    </ThemeProvider>
  );
}