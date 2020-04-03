import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements'

export default class Contact extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Diagnostico',
    headerTransparent: false,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#0F4C81',
    },
    headerRight: () =>(
    <View style={{flexDirection: 'row'}}>
      <Icon
        reverse
        name='location-arrow'
        type='font-awesome'
        color='#0F4C81'
        onPress={()=>{ navigation.navigate('Locate'); }}  />
    </View>  ),
  });
  
      handleBackPress = () => {
      this.props.navigation.goBack();
    }
  
    render() {
      var tex ='< Atrás';
      return (
        <View style={styles.Container_screen_1}>
          <View style={styles.Container_principal}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{width: '100%', height: '50%', backgroundColor:'#0F4C81'}}>
                <Text style={{textAlign:"center", color: "#fff"}}>Foto del doctor</Text>
              </View>
              <View style={{width: '100%', height: '50%'}}>
                <Text style={styles.title_paragraph}>
                Contacto
                </Text>
                <Text style={styles.paragraph}>
                  Celular: 00000000000
                </Text>
                <Text style={styles.paragraph}>
                  Dirección: Direccion del doctor
                </Text>
              </View>
            </View>
          </View>
  
          <View style={styles.Container_next_prev}>
            <View style={styles.fixToText}>
              <TouchableOpacity
                style={styles.button_prev}
                onPress={this.handleBackPress} 
              >
                <Text style={{color:"#0F4C81"}}> {tex} </Text>
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
      backgroundColor: '#0F4C81',
      width: "50%",
      padding: 10
    },
  
  });