import React, {useState} from 'react';
import {Switch, View, StyleSheet, Text, StatusBar} from 'react-native';
import Advanced from './src/examples/Advanced';
import Simple from './src/examples/Simple';

export default function App() {
  const [showAdvanced, setShowAdvanced] = useState(true);

  return (
    <View style={{flex: 1,justifyContent:'center',backgroundColor:"lightblue"}}>
      <StatusBar translucent backgroundColor={'lightblue'} barStyle={'dark-content'}/>
      {showAdvanced ? <Advanced /> : <Simple />}
      <View style={{ alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              alignSelf: 'center',
              marginHorizontal:10,
              color:'#000'
            }}>
            Show advanced example
          </Text>
          <Switch value={showAdvanced} onValueChange={setShowAdvanced} trackColor={'#000'} thumbColor={'#000'}/>
        </View>
      </View>
    </View>
  );
}
