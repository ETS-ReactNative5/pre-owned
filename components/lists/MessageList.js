// import from React
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import PropTypes from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';

// Import from UI Kitten Library
import {
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  List,
  Modal,
  Text,
} from '@ui-kitten/components';

// Import from files
import {AppButton, FormButton} from '../elements/AppButton';
import {useMessage} from '../../hooks/MediaHooks';
import {getUserById} from '../../hooks/ApiHooks';
import {MainContext} from '../../contexts/MainContext';
import FormInput from '../formComponents/FormInput';
import {getToken} from '../../hooks/CommonFunction';
import ListDetail from './ListDetail';
import {colors} from '../../utils';
import DeleteAction from '../elements/DeleteAction';

const MessageList = ({fileId, showMessages = false}) => {
  const {deleteMessage, postMessage, getMessagesByFileId} = useMessage(
    fileId,
    showMessages
  );

  const {updateMessage, setUpdateMessage, update, setUpdate} =
    useContext(MainContext);
  // const [senderName, setSenderName] = useState('');
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [avatar, setAvatar] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );
  // display messages from latest to oldest
  messages.sort((a, b) => a.timeAdded < b.timeAdded);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      message: '',
    },
    mode: 'onBlur',
  });

  const reset = () => {
    setValue('message', '');
  };
  // function delete a message
  const handleDelete = () => {
    Alert.alert('Delete Message', 'Confirm delete action?', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: async (data) => {
          try {
            const token = await getToken();
            const response = await deleteMessage(data.comment_id, token);
            console.log(response);
            // update the list after deletion
            response && setUpdate(update + 1);
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  };
  // get msg
  const fetchMessage = async () => {
    try {
      const msgData = await getMessagesByFileId(fileId);
      for (const message of msgData) {
        const sender = await getUserById(message.user_id);
        message['username'] = sender.username;
      }
      setMessages(msgData);
    } catch (e) {
      console.error('get msg error', e.message);
    }
  };
  useEffect(() => {
    let isMounted = true; // fix memory leaks warning
    if (isMounted) {
      fetchMessage();
    } else {
      return (isMounted = false);
    }
  }, [messages]);
  // send Message
  const sendMessage = async (data) => {
    try {
      const token = await getToken();
      const response = await postMessage(
        {file_id: fileId, comment: data.message},
        token
      );
      response &&
        Alert.alert('Success', 'Message Sent', [
          {
            text: 'OK',
            onPress: () => {
              reset();
              setUpdateMessage(updateMessage + 1);
            },
          },
        ]);
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  return (
    <Layout style={styles.container}>
      <Layout style={{height: 150}}>
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <FormInput
              style={styles.commentBox}
              // iconName="text-outline"
              name="Add Message"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              textEntry={false}
              multiline={true}
              textStyle={{minHeight: 72}}
            />
          )}
          name="message"
        />
        {errors.message && (
          <Text status="danger">
            {errors.message && errors.message.message}{' '}
          </Text>
        )}
        <FormButton
          style={styles.sendBtn}
          text="Send"
          handleSubmit={handleSubmit}
          onSubmit={sendMessage}
        />
      </Layout>
      <Button
        onPress={() => setVisible(true)}
        appearance="ghost"
        style={styles.messageBtn}
      >
        Total messages {messages.length}
      </Button>
      <Modal
        style={{top: '10%'}}
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <AppButton
          appBtnStyle={styles.returnBtn}
          onPress={() => setVisible(false)}
          accessoryLeft={<Icon name="corner-up-left-outline" />}
        />
        <Card style={styles.messagesContainer}>
          <Text style={{alignSelf: 'center'}}>All Messages</Text>
          <List
            data={messages}
            contentContainerStyle={styles.container}
            horizontal={false}
            ItemSeparatorComponent={Divider}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <ListDetail
                showMessages={true}
                description={item.comment}
                title={item.username}
                timeAdded={item.time_added}
                image={{uri: avatar}}
                renderRightActions={() => (
                  <DeleteAction onPress={handleDelete} />
                )}
                ItemSeparatorComponent={Divider}
              />
            )}
          />
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.primary,
  },
  container: {
    fontSize: 16,
    fontFamily: 'Karla_700Bold',
  },
  commentBox: {
    padding: 10,
    borderColor: colors.stroke,
  },
  sendBtn: {
    width: 100,
    height: 50,
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  messageBtn: {
    width: '45%',
    alignSelf: 'center',
    marginTop: '-10%',
    marginBottom: 20,
  },
  returnBtn: {
    zIndex: 1,
    width: 40,
    height: 10,
    position: 'absolute',
    marginTop: -10,
    alignSelf: 'flex-start',
  },
  messagesContainer: {
    top: 0,
    // flex: 1,
    height: 700,
    backgroundColor: colors.container,
  },
});

// MessageList.propTypes = {
//   fileId: PropTypes.object,
//   showMessages: PropTypes.bool,
// };

export default MessageList;
