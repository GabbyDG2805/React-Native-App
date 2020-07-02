import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PostsComponent from '../components/PostsComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../config';

let postsRef = db.ref('/Posts');

export default class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    postsRef.on('value', snapshot => {
      let data = snapshot.val();
      let posts = Object.values(data);
      this.setState({ posts });
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.posts.length > 0 ? (
          <PostsComponent posts={this.state.posts} />
        ) : (
          <Text>No items</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'column',
  }
});