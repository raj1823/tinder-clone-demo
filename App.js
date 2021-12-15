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

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';
const Users = [
  {id: '1', uri: require('./assets/1.jpg')},
  {id: '2', uri: require('./assets/2.jpg')},
  {id: '3', uri: require('./assets/3.jpg')},
  {id: '4', uri: require('./assets/4.jpg')},
  {id: '5', uri: require('./assets/5.jpg')},
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.fadingValue = new Animated.Value(0);
    this.fontValue = new Animated.Value(10);
    this.rotationValue = new Animated.Value(0);
    this.state = {
      currentIndex: 0,
    };

    this.rotateElement = this.rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '7200deg'],
    });
  }

  componentDidMount() {
    Animated.timing(this.fadingValue, {
      toValue: 1,
      duration: 5000,
    }).start();
    Animated.timing(this.fontValue, {
      toValue: 80,
      duration: 5000,
    }).start();
    Animated.timing(this.rotationValue, {
      toValue: 1,
      duration: 5000,
    }).start();
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.View
          style={[
            {
              opacity: this.fadingValue,
            },
            {
              transform: [
                {
                  rotate: this.rotateElement,
                },
              ],
            },
          ]}>
          <Animated.Text style={{fontSize: this.fontValue, fontWeight: '600'}}>
            Raj
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }
}
