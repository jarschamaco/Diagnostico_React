import React, {Component} from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Icon  } from 'react-native-elements'

export default class Toolbar extends Component {
  
    render() {
        
      return (
        <View>
        
          <StatusBar
            backgroundColor="#rgba(102, 224, 255, 0.8)"
            barStyle="dark-content"
          />
          <View style={{flexDirection: 'row', margin:10, alignItems: 'center',}}>
            <StatusBar
              backgroundColor="#rgba(102, 224, 255, 0.8)"
              barStyle="dark-content"
            />
            <View style={{margin:15, alignItems: 'center',}}>
              <Icon
                size={30}
                name='location-arrow'
                type='font-awesome'
                color='#000'
                onPress={()=>{ this.props.status.navigate('Locate'); }}  />
            </View> 
            <View style={{ margin:15, alignItems: 'center',}}>
              <Icon
                size={30}
                name='address-card'
                type='font-awesome'
                color='#000'
                onPress={()=>{ this.props.status.navigate('Contact'); }}  />
            </View> 
          </View>
         
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({

    Container_screen_1: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: '#fff'
    },
  
  });