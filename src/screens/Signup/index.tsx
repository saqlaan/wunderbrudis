import React, { useCallback } from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  CheckBox,
  Spinner,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { Formik } from "formik";

import { KeyboardAvoidingView } from "../../components/CKeyboardAvoidingView";
import CInput from "../../components/CustomInput";
import { signupValidationSchema } from "../../utils/validations";
import { NAVIGATION_STACKS } from "../../utils/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import CTopNavigation from "../../components/CTopNavigation";
import { useDispatch, useSelector } from "react-redux";
import { onCreateAccount } from "../../store/actions/register";
import { getIsSignupError, getIsSignupLoading, getIsUserCreated } from "../../store/selectors";

const initialValues = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

export default ({ navigation }: any): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch();

  const isSignuploading = useSelector(getIsSignupLoading)
  const loginError = useSelector(getIsSignupError)
  const isUserCreated = useSelector(getIsUserCreated)

  const renderCheckboxLabel = React.useCallback(
    (evaProps) => (
      <Text {...evaProps} style={styles.termsCheckBoxText}>
        I accept the general terms and conditions
      </Text>
    ),
    []
  );

  const handleFormSubmit = useCallback((values: any, {resetForm})=>{
    dispatch(onCreateAccount(values))
    resetForm()
  }, [])

  const LoadingIndicator = (props) => (
    <View>
      <Spinner size='small' status={'basic'}/>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <CTopNavigation title={'Signup'} />
      <KeyboardAvoidingView style={styles.container}>
        <Formik
          validationSchema={signupValidationSchema}
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            setFieldValue,
            resetForm,
          }) => (
            <>
              <ScrollView style={[styles.container, styles.formContainer]}>
                <Text category="h3">Create an account</Text>
                <CInput
                  style={styles.formInput}
                  placeholder="Username"
                  autoCapitalize="none"
                  value={values.username}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  error={errors.username && touched.username && errors.username}
                />
                <CInput
                  style={styles.formInput}
                  placeholder="First name"
                  autoCapitalize="none"
                  value={values.firstname}
                  onChangeText={handleChange("firstname")}
                  onBlur={handleBlur("firstname")}
                  error={
                    errors.firstname && touched.firstname && errors.firstname
                  }
                />
                <CInput
                  style={styles.formInput}
                  placeholder="Last name"
                  autoCapitalize="none"
                  value={values.lastname}
                  onChangeText={handleChange("lastname")}
                  onBlur={handleBlur("lastname")}
                  error={errors.lastname && touched.lastname && errors.lastname}
                />
                <CInput
                  style={styles.formInput}
                  placeholder="Email"
                  value={values.email}
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={errors.email && touched.email && errors.email}
                />
                <CInput
                  style={styles.formInput}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={errors.password && touched.password && errors.password}
                />
                <CInput
                  style={styles.formInput}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  error={
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword
                  }
                />
                <CheckBox
                  style={styles.termsCheckBox}
                  checked={values.termsAccepted}
                  onBlur={handleBlur("termsAccepted")}
                  onChange={(value: boolean) =>
                    setFieldValue("termsAccepted", value, true)
                  }
                >
                  {renderCheckboxLabel}
                </CheckBox>
                {
                  (loginError) && 
                  <View style={styles.errorWrapper}>
                    <Text style={styles.errorMsg} status='danger' category={'p2'}>{'Error! Something went wrong'}</Text>
                  </View>
                }
                {
                  (isUserCreated) && 
                  <View style={styles.errorWrapper}>
                    <Text style={styles.errorMsg} status='primary' category={'p2'}>{'Success! Account created'}</Text>
                  </View>
                }
              </ScrollView>
              <View>
                <Button
                  style={styles.signUpButton}
                  size="large"
                  onPress={handleSubmit}
                  disabled={!isValid}
                  children={isSignuploading?(LoadingIndicator):<View><Text style={styles.customLoginText} category={'p1'}>Register</Text></View>}
                />
                <Button
                  appearance={"outline"}
                  style={[styles.signUpButton, styles.loginButton]}
                  size="large"
                  onPress={() => navigation.navigate(NAVIGATION_STACKS.LOGIN)}
                >
                  Login
                </Button>
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
    flex: 1,
    paddingTop: 20,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  evaButton: {
    maxWidth: 72,
    paddingHorizontal: 0,
  },
  signInLabel: {
    flex: 1,
  },
  signInButton: {
    flexDirection: "row-reverse",
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginBottom: 10,
    marginHorizontal: 16,
  },
  loginButton: {},
  formInput: {
    marginTop: 16,
    backgroundColor: "#fff",
  },
  termsCheckBox: {
    marginTop: 20,
  },
  termsCheckBoxText: {
    fontSize: 11,
    lineHeight: 14,
    color: "text-hint-color",
    marginLeft: 10,
  },
  errorMsg: {
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
  }
});
