import React from 'react';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

interface NavigationProps{
  title: string,
}

const BackAction = ({handlePress}: any) => (
  <TopNavigationAction
    onPress={handlePress}
    icon={<Icon name='arrow-back'/>} 
  />
);

export default (props: NavigationProps) => {
  const navigation = useNavigation()
  return (
    <TopNavigation
    accessoryLeft={<BackAction handlePress={()=> navigation.goBack()}/>}
    title={props.title}
  />
  )
}