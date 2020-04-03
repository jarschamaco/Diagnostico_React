import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { Icon,Overlay } from 'react-native-elements';
import Toolbar from './Toolbar';

export default class Symtoms extends Component {

    constructor(){
      super();
      this.state = {
        modalVisible: false,
        text_Fever: '',
        text_Headache: '',
        text_stomachache: '',
        text_cold: '',
        clic: '',
        gender: '',
        texto_completo: [],
        lleno: false, /// probar indeof para buscar las palabras claves
      };
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
  
    gotoNextActivity = () =>{
      const { navigation } = this.props;
      const type_gender = navigation.getParam('gender');
      this.props.navigation.navigate('Description', {gender: type_gender, fever: this.state.text_Fever, headache: this.state.text_Headache, stomachache: this.state.text_stomachache, cold: this.state.text_cold});
    }
      
    handleBackPress = () => {
      this.props.navigation.goBack();
    } 
    
    closeModal(){
      this.setState({modalVisible: !this.state.modalVisible});
      if  (this.state.text_Fever.length === 0 && this.state.text_Headache.length ===0 && this.state.text_cold.length ===0 && this.state.text_stomachache.length ===0 ){
        this.setState({lleno: false});
      }else{
        this.setState({lleno: true});
      }
    }

    ShowInput = () =>{
      if  (this.state.clic === 'fever'){return <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholder="Describa fiebre ... "
        placeholderTextColor="grey"
        numberOfLines={50}
        multiline={true}
        onChangeText={(text_Fever) => this.setState({text_Fever})}
        value={this.state.text_Fever}
        editable
        />}
      if  (this.state.clic === 'headache'){return <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholder="Describa dolor de cabeza ... "
        placeholderTextColor="grey"
        numberOfLines={50}
        multiline={true}
        onChangeText={(text_Headache) => this.setState({text_Headache})}
        value={this.state.text_Headache}
        editable
        />}
      if  (this.state.clic === 'stomachache'){return <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholder="Describa dolor de estomago ... "
        placeholderTextColor="grey"
        numberOfLines={50}
        multiline={true}
        onChangeText={(text_stomachache) => this.setState({text_stomachache})}
        value={this.state.text_stomachache}
        editable
        />}
      if  (this.state.clic === 'cold'){return <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholder="Describa el resfriado ... "
        placeholderTextColor="grey"
        numberOfLines={50}
        multiline={true}
        onChangeText={(text_cold) => this.setState({text_cold})}
        value={this.state.text_cold}
        editable
        />}
    }

    render() {
      var tex = "< Atrás";     
      console.disableYellowBox = true;

      return (
        
        <View style={styles.Container_screen_1}>
          
          <View style={styles.Container_cuerpo}>
  
            <Text style={styles.title_center}>Seleccione el sintoma que presenta y detalle sus dolencias</Text>

            <TouchableOpacity
              style={[styles.button_gender,{marginTop:10}]}
              onPress={() => this.setState({modalVisible: !this.state.modalVisible, clic: 'fever'})} 
            >
            <View style={{ flexDirection: 'row'}}>
                <Icon
                  name= 'thermometer-full'
                  type= 'font-awesome'
                  color = 'black'
                  size = {40}
                />
                <Text style={styles.text_button_gender}>Fiebre</Text>
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.button_gender}
            onPress={() => this.setState({modalVisible: !this.state.modalVisible, clic: 'headache'})} 
            >
            <View style={{ flexDirection: 'row'}}>
                <Icon
                  name= 'thermometer-full'
                  type= 'font-awesome'
                  color = 'black'
                  size = {40}
                />
                <Text style={styles.text_button_gender}>Dolor de cabeza</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button_gender}
            onPress={() => this.setState({modalVisible: !this.state.modalVisible, clic: 'stomachache'})}  
            >
            <View style={{ flexDirection: 'row'}}>
                <Icon
                  name= 'thermometer-full'
                  type= 'font-awesome'
                  color = 'black'
                  size = {40}
                />
                <Text style={styles.text_button_gender}>Dolor estomacal</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button_gender}
            onPress={() => this.setState({modalVisible: !this.state.modalVisible, clic: 'cold'})}  
            >
            <View style={{ flexDirection: 'row'}}>
                <Icon
                  name= 'thermometer-full'
                  type= 'font-awesome'
                  color = 'black'
                  size = {40}
                />
                <Text style={styles.text_button_gender}>Resfriado</Text>
            </View>
          </TouchableOpacity>

          <Overlay
            isVisible={this.state.modalVisible}
            height="auto"
            onBackdropPress={() => this.setState({ modalVisible: !this.state.modalVisible})}
          >
            <Text style={styles.title_center}>Describa su sintoma</Text>
            <View style={styles.textAreaContainer} >
              {this.ShowInput()}  
            </View>
            <TouchableOpacity
                style={{alignItems: 'center',backgroundColor: '#99ebff',width: "100%", padding:15}}
                onPress={() => this.closeModal()} 
              >
                <Text style={{color:"#000"}}> Aceptar </Text>
              </TouchableOpacity>
          </Overlay>

          </View>
  
  
          <View style={styles.Container_next_prev}>
            <View style={styles.fixToText}>
            <TouchableOpacity
              style={styles.button_prev}
              onPress={this.handleBackPress} 
            >
              <Text style={{color:"#000"}}> {tex} </Text>
            </TouchableOpacity>


            <TouchableOpacity
            style={[ styles.button_next, this.state.lleno ? '': styles.button_next_disable ]}
              onPress={this.gotoNextActivity} 
              disabled={this.state.lleno ? false: true}
            >
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
    title_center:{
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
      fontSize: 20,
    },
    Container_cuerpo:{
      width: '90%',
      height: '90%',
      position: 'absolute', 
      top: 5,
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
    button_gender:{
      backgroundColor: '#99ebff',
      height: '16%',
      justifyContent: 'center',
      paddingLeft: 30,
      marginBottom:10,
    },
    text_button_gender:{
      fontSize:25,
      textAlignVertical:"center",
      paddingLeft: '10%',
      color: 'black',
      fontWeight: 'bold'
    },
    textAreaContainer: {
        borderColor: '#393d42',
        borderWidth: 1,
        padding: 5
      },
      textArea: {
        height: '80%',
        justifyContent: "flex-start"
      }
  });