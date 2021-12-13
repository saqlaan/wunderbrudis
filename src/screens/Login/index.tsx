import React, { ReactElement, useCallback } from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import { Button, Layout, StyleService, Text, useStyleSheet, Icon, Spinner } from '@ui-kitten/components';
import { ErrorMessage, Formik } from 'formik'

import { KeyboardAvoidingView } from '../../components/CKeyboardAvoidingView';
import CInput from '../../components/CustomInput'
import { loginValidationSchema } from '../../utils/validations';
import { NAVIGATION_STACKS } from '../../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { onLoginStart } from '../../store/actions/login';
import { getIsLoginLoading, getLoginErrorObj, getLoginServerErrorList, getServerErrorList } from '../../store/selectors';

const initialValues = {
  email: '',
  password: '',
}

export default ({ navigation } : any): React.ReactElement => {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const styles = useStyleSheet(themedStyles);
  
  const isLoginLoading = useSelector(getIsLoginLoading)
  const loginError = useSelector(getLoginErrorObj)
  const loginErrorList = useSelector(getLoginServerErrorList)

  const dispatch = useDispatch()

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const handleFormSubmit = useCallback((values: any, {resetForm})=>{
    dispatch(onLoginStart(values))
    resetForm()
  }, [])

  const getErrorMessage = useCallback(() => {
    const errorsList = []
    if(loginError.errors) {
      Object.values(loginError.errors).forEach((errorList: any) => errorList.forEach((value: any) => {
        errorList.push(value)
      }))
      return ''
      // return error.error
    }else if(loginError.message){
      return errorsList.push(ErrorMessage)
    }
  }, [loginError])

  const LoadingIndicator = (props) => (
    <View>
      <Spinner size='small' status={'basic'}/>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerImage}
          source={require('../../../assets/images/hero-login.png')}
          resizeMode='contain'
        />
      </View>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid,  }) => (
          <>
            <Layout
              style={styles.formContainer}
              level='1'>
              <View style={styles.loginWrapper}>
                <Text style={styles.loginText} category={'h3'}>Login</Text>
                <Text style={styles.loginText} category={'p1'}>Welcome back, log in here</Text>
              </View>
              <CInput
                placeholder='Email'
                accessoryRight={<Icon name={'person'}/>}
                autoCapitalize='none'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={
                  errors.email &&
                  touched.email &&
                  errors.email
                }
                style={styles.formInput}
              />
              <CInput
                style={[styles.formInput, styles.passwordInput]}
                placeholder='Password'
                autoCapitalize='none'
                accessoryRight={renderPasswordIcon}
                value={values.password}
                secureTextEntry={!passwordVisible}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={
                  errors.password &&
                  touched.password &&
                  errors.password
                }
              />
              {
                (loginError) && 
                <View style={styles.errorWrapper}>
                  {loginErrorList.map((value, index) => (
                      <Text key={index} style={styles.errorMsg} status='danger' category={'p2'}>{value}</Text>
                  ))}
                  
                </View>
              }
            </Layout>
            <View style={styles.buttonsWrapper}>
              <Button
                style={styles.signInButton}
                onPressIn={!isLoginLoading? handleSubmit: null}
                disabled={!isValid}
                children={isLoginLoading?(LoadingIndicator):<View><Text style={styles.customLoginText} category={'p1'}>Login</Text></View>}
              />
              <Button
                style={styles.signUpButton}
                appearance='ghost'
                status='basic'
                children={<Text category={'h2'}>Don't have an account? Create</Text>}
                onPress={()=> navigation.navigate(NAVIGATION_STACKS.SIGNUP)}/>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 250,
  },
  loginWrapper: {
    marginBottom: 10
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  loginText: {
    marginBottom: 10,
  },
  formInput: {
    marginTop: 16,
    backgroundColor: "#fff",
  },
  errorMsg: {
    marginBottom: 5,
    textTransform: 'lowercase'
  },
  errorWrapper: {
    backgroundColor: 'background-basic-color-2',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 20,
    paddingHorizontal: 15
  },
  customLoginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'background-basic-color-1'
  },
  buttonsWrapper: {
    marginTop: 20,
  }
});

