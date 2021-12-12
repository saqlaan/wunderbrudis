import React from 'react';
import {
  Input,
  StyleService,
  Text,
  useStyleSheet,
  InputProps
} from '@ui-kitten/components';

interface CIProps extends InputProps {
  error?: any,
}
export default ({...inputProps}: CIProps): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <>
      <Input {...inputProps}/>
      { inputProps.error && 
        <Text
          style={styles.errorText}
          category={'p2'}>
          {inputProps.error}
        </Text>
      }
    </>
  ) 
}

const themedStyles = StyleService.create({
  errorText: {
    textAlign: 'right',
    color: 'color-danger-700',
    fontSize: 11,
    paddingTop: 3,
  }
})