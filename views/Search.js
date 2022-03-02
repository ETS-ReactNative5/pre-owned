// Import from react & library
import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native-gesture-handler';

// Import from UI Kitten library
import {
  Card,
  Icon,
  Input,
  Layout,
  ListItem,
  Modal,
  Text,
} from '@ui-kitten/components';

// Import from files
import {useMedia} from '../hooks/MediaHooks';
import colors from '../utils/colors';
import {FilterIcon, SearchIcon} from '../components/elements/Icons';
import {GalleryItemVertical} from '../components/lists/GalleryItem';
import ModalCheckBox from '../components/elements/CheckBox';
import {AppButton} from '../components/elements/AppButton';

const Search = ({navigation}) => {
  const {mediaArray, home, electronics, clothing, sports, gaming, others} =
    useMedia();
  const [filteredData, setFilteredData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [itemPosition, setItemPosition] = useState();
  const [search, setSearch] = useState('');
  const [isChecked, setIsChecked] = useState(0);
  const [data, setData] = useState([]);

  const getData = () => {
    // Storing category values to data depending upon which check-box is clicked
    itemPosition === 0
      ? setData(home)
      : itemPosition === 1
      ? setData(electronics)
      : itemPosition === 2
      ? setData(clothing)
      : itemPosition === 3
      ? setData(sports)
      : itemPosition === 4
      ? setData(gaming)
      : itemPosition === 5
      ? setData(others)
      : setData(null);
  };

  // update filtered list
  const searchProduct = (textToSearch) => {
    setSearch(textToSearch);
    try {
      if (textToSearch === '') {
        setFilteredData([]);
      } else {
        const newData = mediaArray.filter((i) =>
          i.title.toLowerCase().includes(textToSearch.toLowerCase())
        );
        setFilteredData(newData);
      }
    } catch (e) {
      console.log('Cant set filtered data', e);
    }
  };

  // Clearing filter and search
  const reset = () => {
    setVisible(false);
    setItemPosition(null);
    setData(null);
    setSearch('');
  };

  // Setting search to empty string when filter check-box is clicked
  useEffect(() => {
    setSearch('');
  }, [isChecked]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background,
      }}
    >
      <ListItem
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: colors.background,
        }}
      >
        <Input
          value={search}
          placeholder="Search..."
          style={styles.searchField}
          accessoryLeft={SearchIcon}
          onChangeText={(text) => searchProduct(text)}
        />
        <ListItem
          accessoryRight={FilterIcon}
          onPress={() => setVisible(true)}
          style={{flex: 1, backgroundColor: null}}
        />

        <Layout style={styles.modalContainer}>
          <Modal
            visible={visible}
            backdropStyle={styles.modalBackdrop}
            onBackdropPress={() => setVisible(false)}
          >
            <Card
              disabled={true}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 15,
                backgroundColor: colors.primary,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Karla_700Bold',
                  alignSelf: 'center',
                  marginBottom: 20,
                  fontSize: 22,
                }}
              >
                Categories
              </Text>
              <ModalCheckBox
                setItemPosition={setItemPosition}
                setIsChecked={setIsChecked}
                isChecked={isChecked}
              />
              <Layout
                style={{flexDirection: 'row', backgroundColor: 'transparent'}}
              >
                <AppButton
                  title="Apply Filter"
                  appBtnStyle={{
                    marginTop: '5%',
                    width: 185,
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    setVisible(false);
                    getData();
                  }}
                />
              </Layout>
            </Card>
          </Modal>
        </Layout>
      </ListItem>
      <AppButton
        title="Filter"
        accessoryRight={<Icon name="close" />}
        appBtnStyle={{
          marginTop: '-2%',
          width: '30%',
          height: '5%',
          alignSelf: 'flex-end',
          paddingVertical: '2%',
        }}
        onPress={reset}
      />
      <ScrollView
        style={styles.searchImageContainer}
        contentContainerStyle={{alignItems: 'center'}}
      >
        {search !== '' ? (
          filteredData.map((item) => (
            <GalleryItemVertical
              navigation={navigation}
              singleItem={item}
              key={item.file_id}
              displayText={true}
            />
          ))
        ) : data !== null ? (
          data.map((item) => (
            <GalleryItemVertical
              navigation={navigation}
              singleItem={item}
              key={item.file_id}
              displayText={true}
            />
          ))
        ) : (
          <Text>Search</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchImageContainer: {
    flex: 1,
    width: '100%',
    marginTop: '5%',
    backgroundColor: colors.background,
  },
  searchField: {
    flex: 10,
    borderRadius: 15,
    margin: '2%',
  },
  modalContainer: {
    minHeight: '10%',
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

Search.propTypes = {
  navigation: PropTypes.object,
};

export default Search;
