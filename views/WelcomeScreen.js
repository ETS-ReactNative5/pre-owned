import React, {useContext, useEffect} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {getUserByToken} from '../hooks/ApiHooks';
import {ButtonLarge} from '../components/elements/AppButton';

function WelcomeScreen({navigation}) {
  const {setIsLoggedIn, setUser, setFormToggle} = useContext(MainContext);

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // console.log('token value in async storage', userToken);
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken(userToken);
      // console.log('chekToken', userData);
      // console.log('token', userToken);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/backgrounds/OnBoarding.png')}
    >
      <ButtonLarge
        title="Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <ButtonLarge
        title="Create an account"
        onPress={() => {
          setFormToggle(false);
          navigation.navigate('Login');
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

WelcomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default WelcomeScreen;
