import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';

export default class PostsComponent extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  };

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.posts.map((post, index) => {
          return (
            <View key={index}>
              <Text style={styles.Title}>{post.Title}</Text>
              <Text style={styles.Restaurant}>{post.Restaurant}</Text>
              <Text style={styles.Dish}>{post.Dish}</Text>
              <Image style={styles.itemimg} source={{uri: post.Image}}/>
              <StarRating fullStarColor={'#32CD32'} disabled={true} rating={post.Stars}/>
              <Text style={styles.Comment}>{post.Comment}</Text>
            </View>
          );
        }).reverse()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  Title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  Restaurant: {
    fontSize: 24,
    textAlign: 'center'
  },
  Dish: {
    fontSize: 24,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  itemimg: {
      width: 300,
      height: 300,
      alignSelf: 'center'
  },
  Comment: {
    fontSize: 20,
  },
});