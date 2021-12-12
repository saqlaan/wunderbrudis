import React, { useCallback } from 'react';
import { View, Image } from 'react-native';
import { Button, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { onLogoutUser } from '../../store/actions/auth';
import { getToken } from '../../store/selectors';

export default ({ navigation } : any): React.ReactElement => {
  const dispatch = useDispatch()

  const styles = useStyleSheet(themedStyles);

  const onLogout = useCallback(()=> {
    dispatch(onLogoutUser())
  }, [])

  const token = useSelector(getToken)
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerImage}
          source={require('../../../assets/images/hero-login.png')}
          resizeMode='contain'
        />
        <Text style={styles.loginText} category={'p1'}>Login successful</Text>
        <Button style={styles.button} appearance='filled' onPress={onLogout}>
          Logout now
        </Button>
        <Text>{token}</Text>
      </View>
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
  loginText: {
    marginBottom: 10,
    textAlign: 'center'
  },
});

