import React, {useCallback, useEffect, useState,Fragment} from 'react';
import {Linking, Platform,View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Picker} from '@react-native-picker/picker';
import RadioButtonRN from 'radio-buttons-react-native';



import styles from './styles'



const CELL_COUNT = 13;
const BLOCK_CELL_COUNT = 6;

const data = [
  {
    label: 'Rukan'
   },
   {
    label: 'Umeedwar Rukniat'
   },
   {
    label: 'Member'
   }
  ];
  const data2 = [
    {
      label: 'Male'
     },
     {
      label: 'Female'
     },
    
    ];
  
const isAndroid = Platform.OS === 'android';

interface IRegistration {
  name: string;
  email: string;
  password: string;

  mobile :string;
  whatsapp:string;
  same:string;
  cnic:string;
  role:string;
  block_code:string;
  gender:string;
  district:string;
  tehsil:string;
  city:string;
  area:string;
  block_number:string;

     na:string;
    pp:string;
    qualification:string;
    occupation:string;
    martial_status:string;
    relation:string

}
interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;
  agreed: boolean;
}

const Register = () => {


  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const {isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    email: false,
    password: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: '',
    email: '',
   password:'',
    mobile:'',
    whatsapp:'',
    same:'',
    cnic:'',
    role:'',
    block_code:'',
    gender:'',
    district:'lahore',
    tehsil:'Model Town',
    city:'Lahore',
    area:'',
    block_number:'',
    na:'',
    pp:'',
    qualification:'',
    occupation:'',
    martial_status:'',
    relation:''

  });
  const {assets, colors, gradients, sizes} = useTheme();

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );

  const handleSignUp = useCallback(() => {
    // if (!Object.values(isValid).includes(false)) {
      /** send/save registratin data */
      console.log('handleSignUp', registration);
    // }
  }, [isValid, registration]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      // agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);






  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0}}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.background}
            height={sizes.height * 0.2}>
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p white marginLeft={sizes.s}>
                {t('common.goBack')}
              </Text>
            </Button>

            <Text h4 center white marginBottom={sizes.md}>
              {t('register.title')}
            </Text>
          </Image>
        </Block>
        {/* register form */}
        <Block
          keyboard
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.03 - sizes.l)}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="0%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              {/* <Text p semibold center>
                {t('register.subtitle')}
              </Text> */}
              {/* social buttons */}
              {/* <Block row center justify="space-evenly" marginVertical={sizes.m}>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.facebook}
                    height={sizes.m}
                    width={sizes.m}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.apple}
                    height={sizes.m}
                    width={sizes.m}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.google}
                    height={sizes.m}
                    width={sizes.m}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
              </Block> */}
            
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.name')}
                  placeholder={t('common.namePlaceholder')}
                    success={Boolean(registration.name && isValid.name)}
                  danger={Boolean(registration.name && !isValid.name)}
                  onChangeText={(value) => handleChange({name: value})}
                />
                <Input
                  autoCapitalize="none"
                   marginBottom={sizes.m}
                  label={t('common.mobile')}
                  placeholder={t('common.namePlaceholder')}
                  // success={Boolean(registration.mobile && isValid.mobile)}
                  // danger={Boolean(registration.mobile && !isValid.mobile)}
                  onChangeText={(value) => handleChange({mobile: value})}
                />

                <Input
                   autoCapitalize="none"
                   marginBottom={sizes.m}
                  label={t('common.whatsapp')}
                  placeholder={t('common.namePlaceholder')}
                  // success={Boolean(registration.name && isValid.name)}
                  // danger={Boolean(registration.name && !isValid.name)}
                  onChangeText={(value) => handleChange({whatsapp: value})}
                />


       <Text h5 >{t('common.cnic')}</Text>
      <CodeField 
        ref={ref}
        {...props} 
        value={registration.cnic}
        onChangeText={(value) => handleChange({cnic: value})}
        cellCount={CELL_COUNT} 
        rootStyle={styles.codeFieldRoot}  
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Fragment key={index}>
            <Text
              key={`value-${index}`}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
            {index === 4 || index === 11 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}  
      /> 


 
      <Text h5 style={{fontWeight: "bold",color:'red',fontSize:12,marginTop:sizes.m}}>{t('common.block_code')}</Text>

      <CodeField 
        ref={ref}
        {...props} 
        value={registration.block_code}

        onChangeText={(value) => handleChange({block_code: value})}

        cellCount={BLOCK_CELL_COUNT} 
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Fragment key={index}>
            <Text
              key={`value-${index}`}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
            
          </Fragment>
        )} 
      /> 

<Text h5 style={{fontWeight: "bold",color:'red',fontSize:12,marginTop:sizes.m}}>{t('common.district')}</Text>

<View
  style={{
  borderWidth: 1,
  borderRadius: 10,marginTop:8
}}>
          <Picker
          style={{borderWidth:2}}
          
            selectedValue={registration?.district}
            // onValueChange={(value) => handleChange({name: value})}
            >
            <Picker.Item label="Lahore" value="lahore" />
          </Picker>

</View>


<Text h5 style={{fontWeight: "bold",color:'red',fontSize:12,marginTop:sizes.m}}>{t('common.city')}</Text>


<View
  style={{
  borderWidth: 1,
  borderRadius: 10,marginTop:8
}}>
<Picker
  selectedValue={registration?.city}
  // onValueChange={(value) => handleChange({name: value})}
  >
  <Picker.Item label="Lahore" value="lahore" />
</Picker>
</View>



<Text h5 style={{fontWeight: "bold",color:'red',fontSize:12,marginTop:sizes.m}}>{t('common.tehsil')}</Text>

<View
  style={{
  borderWidth: 1,
  borderRadius: 10,marginTop:8
}}>

          <Picker
            selectedValue={registration.tehsil}
            // onValueChange={(value) => handleChange({name: value})}
            >
            <Picker.Item label="Model Town" value="modeltown" />
          </Picker>

</View>

<Text h5 style={{fontSize: 60,
    marginTop:sizes.m}}>{t('common.area')}</Text>

<View
  style={{
  borderWidth: 1,
  borderRadius: 10,marginTop:8
}}>

<Picker
  selectedValue={registration.area}
  onValueChange={(value) => handleChange({area: value})}>
  <Picker.Item label="Lahore" value="lahore" />
</Picker>
</View>

 <Input
                  autoCapitalize="none"
                   marginBottom={sizes.m}
                   marginTop={sizes.m}
                  label={t('common.block_number')}
                  placeholder={t('common.namePlaceholder')}
                  // success={Boolean(registration.name && isValid.name)}
                  // danger={Boolean(registration.name && !isValid.name)}
                  onChangeText={(value) => handleChange({block_number: value})}
                />
 
 <Input
                  autoCapitalize="none"
                   marginBottom={sizes.m}
                  label={t('common.na')}
                  placeholder={t('common.namePlaceholder')}
                  // success={Boolean(registration.name && isValid.name)}
                  // danger={Boolean(registration.name && !isValid.name)}
                  onChangeText={(value) => handleChange({na: value})}
                />
 <Input
                  autoCapitalize="none"
                   marginBottom={sizes.m}
                  label={t('common.pp')}
                  placeholder={t('common.namePlaceholder')}
                  // success={Boolean(registration.name && isValid.name)}
                  // danger={Boolean(registration.name && !isValid.name)}
                  onChangeText={(value) => handleChange({pp: value})}
                />
 <Input
                  autoCapitalize="none"
                   marginBottom={sizes.m}
                  label={t('common.qualification')}
                  placeholder={t('common.namePlaceholder')}
                  success={Boolean(registration.name && isValid.name)}
                  danger={Boolean(registration.name && !isValid.name)}
                  onChangeText={(value) => handleChange({qualification: value})}
                />
 <Input
                  autoCapitalize="none"
                   marginBottom={sizes.m}
                  label={t('common.occupation')}
                  placeholder={t('common.namePlaceholder')}
                  success={Boolean(registration.name && isValid.name)}
                  danger={Boolean(registration.name && !isValid.name)}
                  onChangeText={(value) => handleChange({occupation: value})}
                />
 
 <Text h5 style={{fontSize: 60,
    marginTop:sizes.m}}>{t('common.martial_status')}</Text>
<RadioButtonRN
  data={data2}
  selectedBtn={(e) => {handleChange({martial_status: e.label})}}
/>

<Text h5 style={{fontSize: 60,
    marginTop:sizes.m}}>{t('common.relation')}</Text>
<RadioButtonRN
  data={data}
  selectedBtn={(e) => {handleChange({relation: e.label})}}
/>
              
              </Block>
              {/* checkbox terms */}
          
               <Button
                onPress={handleSignUp}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                // disabled={Object.values(isValid).includes(false)}
                >
                <Text bold white transform="uppercase">
                  {t('common.signup')}
                </Text>
              </Button>
              <Button
                primary
                outlined
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                onPress={() => navigation.navigate('Pro')}>
                <Text bold primary transform="uppercase">
                  {t('common.signin')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Register;
