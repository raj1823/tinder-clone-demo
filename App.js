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

    this.position = new Animated.ValueXY();
    this.fadingValue = new Animated.Value(0)
    this.fontValue= new Animated.Value(10)
    this.rotationValue = new Animated.Value(0)
    this.state = {
      currentIndex: 0,
    };
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState.dx);
        this.position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: {x: SCREEN_WIDTH + 300, y: gestureState.dy},
          }).start(() => {
            this.setState({currentIndex: this.state.currentIndex + 1}, () => {
              this.position.setValue({x: 0, y: 0});
            });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: {x: -SCREEN_WIDTH - 300, y: gestureState.dy},
          }).start(() => {
            this.setState({currentIndex: this.state.currentIndex + 1}, () => {
              this.position.setValue({x: 0, y: 0});
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: {x: 0, y: 0},
            friction: 2,
          }).start();
        }
      },
    });

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-20deg', '0deg', '10deg'],
    });
    this.rotateElement =  this.rotationValue.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg','7200deg']
    })

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate,
        },
        ...this.position.getTranslateTransform(),
      ],
    };

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp',
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp',
    });
  }

  componentDidMount(){

    Animated.timing(this.fadingValue,{
      toValue:1,
      duration:5000
    }).start()
    Animated.timing(this.fontValue,{
      toValue: 80,
      duration:5000
    }).start()
    Animated.timing(this.rotationValue,{
      toValue:1,
      duration:5000
    }).start()
  }



  renderUsers = () => {
    return Users.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null;
      } else if (i == this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id}
            style={[
              this.rotateAndTranslate,
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: 'absolute',
              },
            ]}>
            <Animated.View
              style={{
                opacity: 1,
                transform: [{rotate: this.position.x.interpolate({
                    inputRange:[-SCREEN_WIDTH/4, 0 , SCREEN_WIDTH/4],
                    outputRange:['-180deg','0deg','180deg'],
                    extrapolate:'clamp'
                })}],
                position: 'absolute',
                top: 50,
                left: 40,
                zIndex: 1000,
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'green',
                  color: 'green',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}>
                LIKE
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: this.dislikeOpacity,
                transform: [{rotate: '30deg'}],
                position: 'absolute',
                top: 50,
                right: 40,
                zIndex: 1000,
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  color: 'red',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}>
                DISLIKE
              </Text>
            </Animated.View>

            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 20,
              }}
              source={item.uri}
            />
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={item.id}
            style={[
              {
                opacity: this.nextCardOpacity,
                transform: [{scale: this.nextCardScale}],
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: 'absolute',
              },
            ]}>
            <Animated.View
              style={{
                opacity: 0,
                transform: [{rotate: '-30deg'}],
                position: 'absolute',
                top: 50,
                left: 40,
                zIndex: 1000,
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'green',
                  color: 'green',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}>
                LIKE
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: 0,
                transform: [{rotate: '30deg'}],
                position: 'absolute',
                top: 50,
                right: 40,
                zIndex: 1,
                backgroundColor: 'yellow',
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  color: 'red',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}>
                NOPE
              </Text>
            </Animated.View>

            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 20,
              }}
              source={item.uri}
            />
          </Animated.View>
        );
      }
    }).reverse();
  };


  render() {
    return (
      <View style={{flex: 1, alignItems: 'center',justifyContent:'center'}}>
        {/* {this.renderUsers()} */}
       <Animated.View
        {...this.PanResponder.panHandlers}

         style={[{
           opacity:this.fadingValue,
          //  height:100,
          //  width:100,
          //  backgroundColor:'red'
         },{transform:[
           {
             rotate: this.rotateElement
           }
         ]}]}
       >

        <Animated.Text style={{fontSize:this.fontValue, fontWeight:'600'}}>Raj</Animated.Text>
        </Animated.View>
      </View>
    );
  }
}
