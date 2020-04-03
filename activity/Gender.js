import React, {Component} from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import Toolbar from './Toolbar';

export default class Gender extends Component {

  constructor(){
    super()
    this.state = {gender: null}
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Diagnostico',
    headerTransparent: false,  
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#99ebff',
    },
    headerRight: () =>( <Toolbar status={navigation} />),
  });
  
    gotoNextActivity(gender_){
      this.setState({gender: gender_});
      this.props.navigation.navigate('Symptoms', {gender: gender_});
    }
    
    handleBackPress = () => {
      this.props.navigation.goBack();
    } 
  
    render() {
      var tex = "< Atrás"
      return (
        
        <View style={styles.Container_screen_1}>
          
          <View style={[styles.Container_principal,{justifyContent: 'center'}]}>
            <Text style={styles.title_center}>Seleccione una opción</Text>
            
            <TouchableOpacity
              style={[styles.button_gender,{marginTop:10}]}
              onPress={() => this.gotoNextActivity("oldmen")} 
            >
            <View style={{ flexDirection: 'row'}}>
                <Icon
                  name= 'male'
                  type= 'font-awesome'
                  size= {60}
                  color = 'black'
                />
                <Text style={styles.text_button_gender}>Adultos</Text>
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.button_gender}
            onPress={() => this.gotoNextActivity("boy")} 
            >
            <View style={{ flexDirection: 'row'}}>
                <Icon
                  name= 'child'
                  type= 'font-awesome'
                  size= {60}
                  color = 'black'
                />
                <Text style={styles.text_button_gender}>Niños mayores de 3 años</Text>
            </View>
          </TouchableOpacity>
  
          </View>
  
  
          <View style={styles.Container_next_prev}>
            <View style={styles.fixToText}>
              <TouchableOpacity
                style={styles.button_prev}
                onPress={this.handleBackPress} 
              >
                <Text style={{color:"#000"}}> {tex} </Text>
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
    title_center:{
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20,
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
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button_prev: {
      backgroundColor: '#fff',
      width: "50%",
      padding: 10
    },
    button_gender:{
      backgroundColor: '#99ebff',
      height: '25%',
      justifyContent: 'center',
      padding: 20,
      marginBottom:10,
    },
    text_button_gender:{
      fontSize:20,
      textAlignVertical:"center",
      paddingLeft: '5%',
      color: 'black',
      fontWeight: 'bold'
    },
  
  });
  