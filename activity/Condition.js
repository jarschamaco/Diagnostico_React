import React, {Component} from 'react';
import { View, Text,StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { CheckBox, Icon } from 'react-native-elements';
import Toolbar from './Toolbar'


export default class Condition extends Component {

    constructor(props){
        super(props);
        this.state = {
        data: 'true'
        }
    }
    state = {
        checked: false, disable: true,
    };

  getData(){
    setTimeout(() => {
      AsyncStorage.getItem('check').then((value) => {
        if (value!==null){
          var boolValue = value.toLowerCase() == 'true' ? true : false;  
          this.setState({ checked: boolValue});
        }
      });
    }, 100)
  }

  componentDidMount(){
    this.getData();
  }

  SaveData = async () => {
    try {
      this.setState({ checked: !this.state.checked, disable: !this.state.disable});
      await AsyncStorage.setItem('check', String(!this.state.checked));
      
    } catch (error) {
      // Error saving data
      alert(error);
    }
  };

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
    this.props.navigation.navigate('Gender');
  }
  
  handleBackPress = () => {
    this.props.navigation.goBack();
  } 

  render() {
    var tex = "< Atrás"
    return (
      
      <View style={styles.Container_screen_1}>
        
        <View style={styles.Container_principal}>
          <ScrollView>
             
            <Text style={styles.title_paragraph}>Condiciones del servicio</Text>
            <Text style={styles.paragraph}>Antes de utilizar esta aplicación, por favor, lea los términos y condiciones. Recuerde que: </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.vineta}> • </Text>
              <Text style={styles.paragraph}>El chequeo tiene finalidad informativa y no sustituye la opinión de un médico.</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.vineta}> • </Text>
              <Text style={styles.paragraph}>No usar en caso de emergencias. En caso de una emergencia de salud, llame a su número de emergencias locales inmediatamente. </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.vineta}> • </Text>
              <Text style={styles.paragraph}>Sus datos están a salvo. La información que usted proporcione es anónima y no será compartida con nadie.</Text>  
          </View>
        
          <CheckBox
            title="He leído y acepto las condiciones del servicio."
            checked={this.state.checked}
            onPress={this.SaveData }
          />

          </ScrollView>
        </View>

        <View style={styles.Container_next_prev}>
          <View style={styles.fixToText}>
            <TouchableOpacity
              style={styles.button_prev}
              onPress={this.handleBackPress} >
              <Text style={{color:"#000"}}> {tex} </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[ styles.button_next, this.state.checked ? '': styles.button_next_disable ]}
              onPress={this.gotoNextActivity} 
              disabled={this.state.checked ? false: true}>
              <Text style={{color:"#000", fontWeight: 'bold',}}> Siguiente </Text>
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
    vineta: {
      marginLeft: 20,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
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
     button_next: {
      alignItems: 'center',
      backgroundColor: '#99ebff',
      width: "50%",
      padding: 10
    },
    button_next_disable: {
      alignItems: 'center',
      backgroundColor: '#99ebff',
      opacity: 0.5,
      width: "50%",
      padding: 10
    },
    button_prev: {
      backgroundColor: '#fff',
      width: "50%",
      padding: 10
    },  
  });