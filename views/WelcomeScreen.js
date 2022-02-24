import React, {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

// Lottie animation
import LottieView from 'lottie-react-native';
import {Layout} from '@ui-kitten/components';

// Import from files
import colors from '../utils/colors';
import {getToken} from '../hooks/CommonFunction';
import {AppButton} from '../components/elements/AppButton';
import {MainContext} from '../contexts/MainContext';
import {getUserByToken} from '../hooks/ApiHooks';

const WelcomeScreen = ({navigation}) => {
  const animation = React.createRef(); // animation
  const {setIsLoggedIn, setUser, setFormToggle} = useContext(MainContext);

  const checkToken = async () => {
    const userToken = await getToken();
    // console.log('token value in async storage', userToken);
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken();
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
    animation.current?.play();
  }, []);

  return (
    <Layout style={styles.inner}>
      <LottieView
        ref={animation}
        source={require('../assets/brand/animation.json')}
        loop={false}
      />
      <Layout style={styles.btnContainter}>
        <AppButton
          title="Continue"
          onPress={() => {
            setFormToggle(false);
            navigation.navigate('Login');
          }}
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnContainter: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginBottom: '20%',
  },
  inner: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

WelcomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default WelcomeScreen;
