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

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.opacity = new Animated.Value(0)
    this.size = new Animated.Value(2)
    this.rotationValue = new Animated.Value(0)
    };

    componentDidMount(){
      Animated.loop(
      Animated.timing(this.rotationValue,{
        toValue:1,
        duration:6000
      })).start()
      Animated.timing(this.opacity,{
        toValue:1,
        duration:2000}).start()
      Animated.timing(this.size,{
        toValue:100,
        duration:10000
      }).start()
    }

  

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center',justifyContent:'center'}}>
          <View>
            <Animated.Text style={{
              fontSize:this.size,
              opacity:this.opacity,
             
            }}> {'Demo'}</Animated.Text>
          </View>
      </View>
    );
  }
}
