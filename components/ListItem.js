import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Layout, Text } from '@ui-kitten/components';


const SecondhandItemHorizontal = (props) => {
  return (
       <TouchableOpacity>
       <Image
       source={{uri: props.singleItem.thumbnails.w160}}
       style={styles.imageHorizontal} />
           <Layout style={styles.textBoxHorizontal}>
                <Text style={styles.title}>{props.singleItem.title}</Text>
                <Text style={styles.price}>{props.singleItem.price}</Text>
            </Layout>
       </TouchableOpacity>
  );
};

const SecondhandItemVertical = (props) => {
  return (
       <TouchableOpacity>
       <Image
       source={{uri: props.singleItem.thumbnails.w160}}
       style={styles.imageVertical} />
           <Layout style={styles.textBoxVertical}>
                <Text style={styles.title}>{props.singleItem.title}</Text>
                <Text style={styles.price}>{props.singleItem.price}</Text>
            </Layout>
       </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageHorizontal: {
    width: 280,
    height: 180,
    borderRadius: 10,
    marginEnd: 10,
    marginBottom: 15,
    overlayColor: 'black',
  },

  imageVertical: {
    width: 350,
    height: 220,
    borderRadius: 10,
    marginEnd: 10,
    marginBottom: 15,
  },

  textBoxHorizontal: {
    flex: 1,
    position: 'absolute',
    backgroundColor: null,
    top: 100,
    margin: 15,
  },

  textBoxVertical: {
    flex: 1,
    position: 'absolute',
    backgroundColor: null,
    top: 140,
    margin: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
  },

  price: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
});

SecondhandItemHorizontal.propTypes = {
  singleItem: PropTypes.object.isRequired,
};

SecondhandItemVertical.propTypes = {
  singleItem: PropTypes.object.isRequired,
};

export {SecondhandItemHorizontal, SecondhandItemVertical} ;
