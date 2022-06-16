import React, {useCallback, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';
import { DataTable } from 'react-native-paper';
import RadioButtonRN from 'radio-buttons-react-native';
import axios from 'axios'
import {useNavigation} from '@react-navigation/core';


const Home = () => {
  const navigation = useNavigation();

  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const {following, trending} = useData();
  const [products, setProducts] = useState(following);
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const baseUrl = 'http://localhost:8001';

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);




 React.useEffect(() => {
   fetchUser()
  }, []);


  const fetchUser = async () => {
    const url = `http://localhost:8001/api/users/getVoters`;
    try{
      const response = await axios.get(url);
      console.log(response.data);
    }
    catch(e){
console.error('e',e)
    }
    
  };

         


  const handleProducts = useCallback(
    (tab: number) => {
      setTab(tab);
      setProducts(tab === 0 ? following : trending);
    },
    [following, trending, setTab, setProducts],
  );

  return (
    <Block>
      {/* search input */}
      <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder={t('common.search')} />
      
      </Block>

      <Button
      onPress={() => navigation.navigate('Voter')}
      margin={sizes.base} gradient={gradients.info} marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            Add Voter
          </Text>
        </Button>
      {/* toggle products list */}
     
      {/* products list */}
      

      <DataTable>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric>Mobile</DataTable.Title>
        <DataTable.Title numeric>Remarks</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>Mobile</DataTable.Cell>
        <DataTable.Cell numeric>15909876545677</DataTable.Cell>
        <DataTable.Cell numeric>6.0</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Remarks</DataTable.Cell>
        <DataTable.Cell numeric>yesss</DataTable.Cell>
        <DataTable.Cell numeric>8.0</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable>

    </Block>
  );
};

export default Home;
