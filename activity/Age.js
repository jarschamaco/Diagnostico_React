import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Slider } from 'react-native';

import { Icon } from 'react-native-elements';

export default class Age extends Component {

    static navigationOptions =
      {
        title: 'Diagnostico',
        headerTransparent: false,
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#0F4C81'
        }
      };
  
    constructor(props) {
      super(props);
      this.state = {
        value: 50,
      };
    }
  
    change(value) {
      this.setState(() => {
        return {
          value: parseFloat(value),
        };
      });
    }
  
    updateValueMore = () => {
      this.setState({
        value: this.state.value + 1
      })
    }
  
    updateValueMin = () => {
      this.setState({
        value: this.state.value - 1
      })
    }
  
    gotoNextActivity = () => {
      this.props.navigation.navigate('Gender');
    }
    
    handleBackPress = () => {
      this.props.navigation.goBack();
    } 
  
    render() {
      var tex = "< Atrás";
      const {value} = this.state;
      return (
        
        <View style={styles.Container_screen_1}>
          
          <View style={[styles.Container_principal,{justifyContent: 'center'}]}>
  
            <Text style={styles.title_center}>Seleccione su edad</Text>
        
            <Text style={[styles.title_paragraph, {textAlign: 'center'}]}>{String(value)}</Text>
            <Slider
              step={1}
              maximumValue={150}
              minimumValue={18}
              onValueChange={this.change.bind(this)}
              value={value}
            />
            <View style={{alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={this.updateValueMin}
                >
                  <Icon
                      name= 'minus-circle'
                      type= 'font-awesome'
                      size= {50}
                      color = '#0F4C81'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.updateValueMore}
                  style={{marginLeft: 10}}
                >
                  <Icon
                      name= 'plus-circle'
                      type= 'font-awesome'
                      size= {50}
                      color = '#0F4C81'
                    />
                </TouchableOpacity>
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
  
  
              <TouchableOpacity
                style={styles.button_next}
                onPress={this.gotoNextActivity} 
              >
                <Text style={{color:"#fff"}}> Siguiente </Text>
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
    title_paragraph: {
      marginLeft: 20,
      fontSize: 20,
      marginTop:10,
      fontWeight: 'bold',
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
      backgroundColor: '#0F4C81',
      width: "50%",
      padding: 10
    },
    button_prev: {
      backgroundColor: '#fff',
      width: "50%",
      padding: 10
    },  
  });
  