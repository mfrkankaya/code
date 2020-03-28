import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  PanResponder,
  Animated,
  View
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


// Movies Props Datası
// movies: [
//   {
//     name: 'Rio',
//     screen: 'https://placekitten.com/601/900',
//     poster: 'https://placekitten.com/300/200'
//   },
//   {
//     name: 'Goonies',
//     screen: 'https://placekitten.com/600/901',
//     poster: 'https://placekitten.com/301/201'
//   },
//   {
//     name: 'Alien',
//     screen: 'https://placekitten.com/599/900',
//     poster: 'https://placekitten.com/302/202'
//   }   
// ]

export default class MoviesCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: new Animated.Value(0),
      page: 0
    }
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt,gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 7,
      onMoveShouldSetPanResponderCapture: (evt,gestureState) => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: Animated.event([null, { dx: this.state.translate }]),
      onPanResponderRelease: this.endGesture,
      onPanResponderTerminate: (evt, gestureState) => {
        console.log('Terminate');
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true

    });
  }

  endGesture = (evt, gestureState) => {
    console.log('Baaaayss');
    let toValue = 0;
    if ((Math.abs(gestureState.dx) / SCREEN_WIDTH) > 0.2) {
      if (gestureState.dx < 0)
        toValue = -SCREEN_WIDTH
      else
        toValue = SCREEN_WIDTH
    }
   
    Animated.timing(this.state.translate, {
      toValue,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      this.state.translate.setValue(0);
      if (toValue < 0) {
        this.nextPage();
      } else if (toValue > 0) {
        this.prevPage();
      }
    });
  }

  nextPage = () => {
    let page = this.state.page + 1;
    if (page >= this.props.movies.length)
      page = 0;
    this.setState({ page });
  }

  prevPage = () => {
    let page = this.state.page - 1;
    if (page < 0)
      page = this.props.movies.length - 1;
    this.setState({ page });
  }

  posterTranslate = (index) => {
    const factor = 2;
    if (index === this.state.page)
      return this.translateX(Animated.divide(this.state. translate, factor));
    if (index === this.state.page + 1)
      return this.translateX(Animated.divide(Animated.add(this.state.translate, SCREEN_WIDTH), factor))
    if (index === this.state.page - 1)
      return this.translateX(Animated.divide(Animated.add(this.state.translate, -SCREEN_WIDTH), factor))
  }

  translateX = (animation) => ({ transform: [{ translateX: animation }] });

  render() {
    const transformX = { transform: [{ translateX: this.state.translate }] };
    return (
      <Animated.View {...this.panResponder.panHandlers} style={[styles.slider, { width: (this.props.movies.length + 2) * SCREEN_WIDTH, left: (this.state.page + 1) * -SCREEN_WIDTH }, transformX]}>
        <Image source={{ uri: this.props.movies[this.props.movies.length - 1].screen }} style={styles.image}/>
        {this.props.movies.map((image, k) => {
          return (
            <View key={k} style={styles.slide}>
              <Image source={{ uri: image.screen }} style={styles.image}/>
              <Animated.Image source={{ uri: image.poster }} style={[styles.poster, this.posterTranslate(k)]}/>
              <Animated.Text style={[styles.title, this.posterTranslate(k)]}>{image.name}</Animated.Text>
            </View>
          );
        })}
        <Image source={{ uri: this.props.movies[0].screen }} style={[styles.image]}/>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  slider: {
    flexDirection: 'row',
    height: 390,
    backgroundColor: '#222'
  },
  image: {
    width: SCREEN_WIDTH,
    height: 300
  },
  slide: {
    width: SCREEN_WIDTH,
    height: 390,
    position: 'relative'
  },
  poster: {
    position: 'absolute',
    top: 150,
    left: 25,
    height: 220,
    width: 150
  },
  title: {
    top: 20,
    left: 200,
    color: '#fff',
    fontSize: 18
  }
});