import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import Toolbar from './Toolbar'


export default class Home extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Diagnostico',
    headerTransparent: false,
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#99ebff',
    },
    headerRight: () =>( <Toolbar status={navigation} />),
  });
  
    gotoNextActivity = () => {
      this.props.navigation.navigate('Introduction');
    }
  
    render() {
      return (
        <View style={styles.Container_screen_1}>
          
          <View style={styles.Container_principal}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{width: '100%', height: '50%'}}>
                <Image style={styles.logo} source={require('../assets/iconoDoctor2.jpg')} />
              </View>
              <View style={{width: '100%', height: '50%'}}>
                <Text style={styles.title_paragraph}>
                ¡Bienvenido!
                </Text>
                <Text style={styles.paragraph}>
                  Está a punto de realizar un chequeo médico breve (3 min), seguro y anónimo. Sus respuestas serán analizadas cuidadosamente y se le dirá las posibles causas de sus síntomas.
                </Text>
              </View>
            </View>
          </View>
  
          <View style={styles.Container_next_prev}>
            <View style={{flexDirection: 'row-reverse'}}>
              <TouchableOpacity
                style={styles.button_next}
                onPress={this.gotoNextActivity}>
                <Text style={{color:"#000", fontWeight: 'bold'}}> Siguiente </Text>
              </TouchableOpacity>
            </View>
          </View>  
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({

    Container_screen_1: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    title_paragraph: {
      marginLeft: 20,
      fontSize: 20,
      marginTop:10,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    paragraph: {
      marginLeft: 20,
      marginRight: 20,
      marginTop:5,
      fontSize: 17,
      textAlign: 'left',
    },
    logo: {
      height: '100%',
      width: '100%',
      top:0, left:0,
      position: 'absolute'
    },
  
    Container_principal:{
      width: '90%',
      height: '80%',
      position: 'absolute', 
      top: '5%',
      marginLeft: '5%',
      backgroundColor: '#fff'
    },  
    Container_next_prev:{
      width: '100%',
      height: '10%',
      position: 'absolute', 
      left: 0, right: 0, bottom: 0,
      padding: 14,
      marginBottom: 10,
    },
    button_next: {
      alignItems: 'center',
      backgroundColor: '#99ebff',
      width: "50%",
      padding: 10
    },
  
  });