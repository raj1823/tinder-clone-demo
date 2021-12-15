import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder,
} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.fadingValue = new Animated.Value(0);
    this.fontValue = new Animated.Value(10);
    this.rotationValue = new Animated.Value(0);
    this.topValue = new Animated.Value(0);
    this.leftValue = new Animated.Value(0);
    this.state = {
      currentIndex: 0,
    };

    this.rotateElement = this.rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '3600deg'],
    });
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.fadingValue, {
        toValue: 1,
        duration: 5000,
      }),
    ).start();
    Animated.loop(
      Animated.timing(this.fontValue, {
        toValue: 80,
        duration: 5000,
      }),
    ).start();
    Animated.loop(
      Animated.timing(this.rotationValue, {
        toValue: 1,
        duration: 5000,
      }),
    ).start();
    Animated.loop(
      Animated.timing(this.topValue, {
        toValue: Dimensions.get('window').height - 100,
        duration: 5000,
      }),
    ).start();
    Animated.loop(
      Animated.timing(this.leftValue, {
        toValue: Dimensions.get('window').width - 100,
        duration: 5000,
      }),
    ).start();
    // Animated.loop(
    // Animated.timing(this.rotationValue, {
    //   toValue: 1,
    //   duration: 500,
    // })).start()
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'powderblue',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={[
            {
              opacity: this.fadingValue,
              position: 'absolute',
              top: this.topValue,
              left: this.leftValue,
              // zIndex: 1000,
            },
            {
              transform: [
                {
                  rotate: this.rotateElement,
                },
              ],
            },
          ]}>
          <Animated.Text
            style={{
              fontSize: this.fontValue,
              fontWeight: '600',
              color: 'red',
              fontFamily: 'Cochin',
            }}>
            {'task1'}
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[
            {
              opacity: this.fadingValue,
              position: 'absolute',
              top: this.topValue,
              right: this.leftValue,
              // zIndex: 1000,
            },
            {
              transform: [
                {
                  rotate: this.rotateElement,
                },
              ],
            },
          ]}>
          <Animated.Text
            style={{
              fontSize: this.fontValue,
              fontWeight: '600',
              color: 'red',
              fontFamily: 'Cochin',
            }}>
            {'task2'}
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[
            {
              opacity: this.fadingValue,
              position: 'absolute',
              bottom: this.topValue,
              left: this.leftValue,
              // zIndex: 1000,
            },
            {
              transform: [
                {
                  rotate: this.rotateElement,
                },
              ],
            },
          ]}>
          <Animated.Text
            style={{
              fontSize: this.fontValue,
              fontWeight: '600',
              color: 'red',
              fontFamily: 'Cochin',
            }}>
            {'task3'}
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[
            {
              opacity: this.fadingValue,
              position: 'absolute',
              bottom: this.topValue,
              right: this.leftValue,
              // zIndex: 1000,
            },
            {
              transform: [
                {
                  rotate: this.rotateElement,
                },
              ],
            },
          ]}>
          <Animated.Text
            style={{
              fontSize: this.fontValue,
              fontWeight: '600',
              color: 'red',
              fontFamily: 'Cochin',
            }}>
            {'Raj'}
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }
}
