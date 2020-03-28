import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import * as firebase from 'firebase';

export default class App extends React.Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyA6jPFmVep3jaLMAfxuUXhV0FM21NEUxzM",
      authDomain: "one-time-password-79ff5.firebaseapp.com",
      databaseURL: "https://one-time-password-79ff5.firebaseio.com",
      projectId: "one-time-password-79ff5",
      storageBucket: "one-time-password-79ff5.appspot.com",
      messagingSenderId: "939708193860"
    });
  }
  
  chooseImage = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    console.log(status);
    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync();
      console.log('result', result);

      if(!result.cancelled) {
        uploadImageAsync(result.uri)
          .then(() => {
            Alert.alert('başarılıs')
          })
          .catch(err => {
            console.log(err);
            
          });
      }
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button title="Seç" onPress={this.chooseImage} />
      </View>
    );
  }
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child('images/image1');
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
