import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform} from 'react-native';
import {Card, Layout, ButtonGroup, Button, Text} from '@ui-kitten/components';
import {primary, btnBackground, text_dark} from '../utils/colors'
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const [formToggle, setFormToggle] = useState(true);

  return (
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.container}
      >
        <Layout style={styles.layout}>
          <Image
            style={styles.backgroundImg}
            source={require('../assets/backgrounds/LoginBG.png')}
          />
          <Card style={styles.cardContainer}>
              <ButtonGroup
                style={styles.toggleGroup}
                selectedIndex={formToggle ? 0 : 1}>
                <Button style={formToggle ? styles.toggle2 : styles.toggle1} onPress={() => setFormToggle(true)}>Log In</Button>
                <Button style={formToggle ? styles.toggle1 : styles.toggle2} onPress={() => setFormToggle(false)}>Sign Up</Button>
              </ButtonGroup>
              {formToggle ? (
                <Card style={styles.card}>
                  <Text category="h4" style={styles.header}>Log In</Text>
                  <LoginForm setFormToggle={setFormToggle} />
                </Card>
              ) : (
                <Card style={styles.card}>
                  <Text category="h4" style={styles.header}>Sign Up</Text>
                  <SignupForm setFormToggle={setFormToggle} />
                </Card>
              )}
          </Card>
        </Layout>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImg: {
    position: 'absolute',
    top: 0,
  },
  cardContainer: {
    top: '40%',
    width: '100%',
    height: '100%',
    backgroundColor: primary,
    borderColor: primary,
  },
  card: {
    backgroundColor: primary,
    borderColor: primary,
  },
  toggleGroup: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggle1: {
    width: 100,
    backgroundColor: btnBackground,
    borderColor: btnBackground,
  },
  toggle2: {
    width: 100,
    backgroundColor: "#60715B",
    borderColor: "#60715B",
    color: text_dark,
  },
  header: {
    textAlign: 'center',
  }
});

export default Login;