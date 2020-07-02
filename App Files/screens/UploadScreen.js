import React from 'react';
import { Button, Image, View, Text, TouchableHighlight, StyleSheet, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';
import * as Permissions from 'expo-permissions';
import '@firebase/firestore';
import { db } from '../config';

export default class UploadPost extends React.Component {
  state = {
    Title: '',
    Restaurant: '',
    Dish: '',
    Image: null,
    Stars: 0,
    Comment: '',
  };
  onChangeTitle = Title => {
    this.setState({ Title });
  };
  onChangeRestaurant = Restaurant => {
    this.setState({ Restaurant });
  };
  onChangeDish = Dish => {
    this.setState({ Dish });
  };
  onStarRatingPress(rating) {
    this.setState({
      Stars: rating
    });
  }
  onChangeComment = Comment => {
    this.setState({ Comment });
  };

  handleSubmit = () => {
    db.ref('/Posts').push({Title: this.state.Title, Restaurant: this.state.Restaurant, Dish: this.state.Dish, Image: this.state.image, Stars: this.state.Stars, Comment: this.state.Comment});
    Alert.alert('Post saved successfully');
    console.log(this.state);
  };

  render() {
    let { image } = this.state;
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>Title</Text>
        <TextInput style={styles.itemInput} value={this.state.Title} onChangeText={Title => this.onChangeTitle(Title)} />
        <Text style={styles.title}>Restaurant</Text>
        <TextInput style={styles.itemInput} value={this.state.Restaurant} onChangeText={Restaurant => this.onChangeRestaurant(Restaurant)} />
        <Text style={styles.title}>Dish</Text>
        <TextInput style={styles.itemInput} value={this.state.Dish} onChangeText={Dish => this.onChangeDish(Dish)} />
        <Text style={styles.title}>Image</Text>
        {image && <Image source={{ uri: image }} style={{ width: 300, height: 300, alignSelf: 'center', paddingBottom: 10 }} />}
        <Ionicons name="ios-add-circle" color= '#32CD32' size= '50' style={{ textAlign: 'center'}} onPress={this._pickImage} />
        <Text style={styles.title}>Rating</Text>
        <StarRating
        disabled={false}
        maxStars={5}
        fullStarColor={'#32CD32'}
        rating={this.state.Stars}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
        <Text style={styles.title}>Comments</Text>
        <TextInput style={styles.itemInput} value={this.state.Comment} onChangeText={Comment => this.onChangeComment(Comment)} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
        <Text style={styles.buttonText}>Upload</Text>
        </TouchableHighlight>
      </KeyboardAwareScrollView>
    );
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
   // if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, you must grant camera roll permissions in order to do this.');
      }
   // }
    // if (Constants.platform.android) {
    //   const { statusA } = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    //   if (statusA !== PermissionsAndroid.RESULTS.GRANTED) {
    //     alert('Sorry, you must grant camera roll permissions in order to do this.');
    //   }
    // }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        base64: true,
        quality: 1,
      });
      if (!result.cancelled) {
        let selectedimage = `data:image/jpg;base64,${result.base64}`
        this.setState({ image: selectedimage });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 30,
    flexDirection: 'column',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 22,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    color: 'black',
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#32CD32',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});