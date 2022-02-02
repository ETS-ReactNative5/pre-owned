import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Card, Layout, ButtonGroup, Button, Text} from '@ui-kitten/components';
import {primary, btnBackground, text_dark} from '../utils/colors'
import SignupForm from '../components/SignupForm';

const Login = () => {
  const [formToggle, setFormToggle] = useState(true);

  return (
    <Layout>
      <Image
        style={styles.background}
        source={require('../assets/backgrounds/LoginBG.png')}
      />
      <Card style={styles.container}>
          <ButtonGroup
            style={styles.toggleGroup}
            selectedIndex={formToggle ? 0 : 1}>
            <Button style={formToggle ? styles.toggle2 : styles.toggle1} onPress={() => setFormToggle(true)}>Log In</Button>
            <Button style={formToggle ? styles.toggle1 : styles.toggle2} onPress={() => setFormToggle(false)}>Sign Up</Button>
          </ButtonGroup>
          {formToggle ? (
            <Card style={styles.card}>
              <Text category="h4" style={styles.header}>Log In</Text>
            </Card>
          ) : (
            <Card style={styles.card}>
              <Text category="h4" style={styles.header}>Sign Up</Text>
              <SignupForm setFormToggle={setFormToggle} />
            </Card>
          )}
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute'
  },
  container: {
    width: '100%',
    height: '100%',
    marginTop: '80%',
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
    borderRadius: 70,
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
