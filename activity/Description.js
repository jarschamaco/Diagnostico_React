import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, NativeModules} from 'react-native';
import Toolbar from './Toolbar';
import { Icon } from 'react-native-elements';

var numeros="0123456789";

export default class Description extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      //defauilt value of the date time
      date: '',
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

    handleBackPress = () => {
      this.props.navigation.goBack();
    } 

    FinalPress = () => {
      this.props.navigation.navigate('Home');
    } 

    componentDidMount() {
      var that = this;
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      that.setState({
        //Setting the value of the date time
        date:
          date + '/' + month + '/' + year,
      });
    }

    render(){
        var tex = "< Atrás";
        
        const { navigation } = this.props;
        
        var gender =  navigation.getParam('gender', 'default value').toLowerCase();
        var number ='';

        removeAccents = (str) => {
          var accents    = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüŠšŸÿýŽž';
          var accentsOut = "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIUUUUuuuuSsYyyZz";
          str = str.split('');
          var strLen = str.length;
          var i, x;
          for (i = 0; i < strLen; i++) {
            if ((x = accents.indexOf(str[i])) != -1) {
              str[i] = accentsOut[x];
            }
          }
          return str.join('');
        }
        

        function ShowFever(){
          var valor = navigation.getParam('fever', 'default value').toLowerCase();
          const fever = removeAccents(valor);

          var resultadofever='', tratamientofeverOld='', tratamientofeverBoy='';
          var fever_ = 'fiebre';
          var Highfever = 'alta', Highfever1 = 'mucha', Highfever2 = 'demasiada', Highfever3 = 'fuerte';
          var Lowfever = 'baja', Lowfever1 = 'poca', Lowfever2 = 'muy', Lowfever3 = 'bajo';
          var nothing = 'no', nothing1 = 'sintoma', nothing2 = 'tengo', no='sin';
          var yes = 'si';

          var myObject_fever = {};
          var newArr_fever = [];


          if  (fever !== "") {
            for(var i=0; i<fever.length; i++){
              if (numeros.indexOf(fever.charAt(i),0)!=-1){
                number = number+fever.charAt(i);
              }
            }

            if  ((fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(nothing.toLowerCase()) > -1)||
                 (fever.indexOf(nothing.toLowerCase()) > -1 && fever.indexOf(nothing1.toLowerCase()) > -1 )||
                 (fever.indexOf(no.toLowerCase()) > -1 && fever.indexOf(nothing1.toLowerCase()) > -1 )||
                 (fever.indexOf(nothing.toLowerCase()) > -1 && fever.indexOf(nothing2.toLowerCase()) > -1 )){
                  resultadofever = 'El paciente no presenta el sintoma de la fiebre';
                  tratamientofeverOld =  '\n No necesita tratamiento';
                  tratamientofeverBoy =  '\n No necesita tratamiento';
            }else if((fever.indexOf(Highfever.toLowerCase())>-1 && fever.indexOf(Lowfever.toLowerCase())>-1) ||(fever.indexOf(Highfever.toLowerCase())>-1 && fever.indexOf(Lowfever1.toLowerCase())>-1) || (fever.indexOf(Highfever.toLowerCase())>-1 && fever.indexOf(Lowfever3.toLowerCase())>-1) ||
                    (fever.indexOf(Highfever1.toLowerCase())>-1 && fever.indexOf(Lowfever.toLowerCase())>-1) ||(fever.indexOf(Highfever1.toLowerCase())>-1 && fever.indexOf(Lowfever1.toLowerCase())>-1) || (fever.indexOf(Highfever1.toLowerCase())>-1 && fever.indexOf(Lowfever3.toLowerCase())>-1) ||
                    (fever.indexOf(Highfever2.toLowerCase())>-1 && fever.indexOf(Lowfever.toLowerCase())>-1) ||(fever.indexOf(Highfever2.toLowerCase())>-1 && fever.indexOf(Lowfever1.toLowerCase())>-1) || (fever.indexOf(Highfever2.toLowerCase())>-1 && fever.indexOf(Lowfever3.toLowerCase())>-1) ||
                    (fever.indexOf(Highfever3.toLowerCase())>-1 && fever.indexOf(Lowfever.toLowerCase())>-1) ||(fever.indexOf(Highfever3.toLowerCase())>-1 && fever.indexOf(Lowfever1.toLowerCase())>-1) || (fever.indexOf(Highfever3.toLowerCase())>-1 && fever.indexOf(Lowfever3.toLowerCase())>-1)){
                      resultadofever = 'No se puede hacer un diagnostico exacto. ';
                      tratamientofeverOld = '\n Detalle mejor el sintoma para poder mejorar el diagnostico. ';
                      tratamientofeverBoy = '\n Detalle mejor el sintoma para poder mejorar el diagnostico. ';
            }else if((fever.indexOf(Lowfever.toLowerCase()) > -1)||(fever.indexOf(Lowfever1.toLowerCase()) > -1 )||(fever.indexOf(Lowfever3.toLowerCase()) > -1 )||
            (fever.indexOf(Lowfever2.toLowerCase()) > -1 && fever.indexOf(Lowfever.toLowerCase()) > -1)||
            (fever.indexOf(Lowfever2.toLowerCase()) > -1 && fever.indexOf(Lowfever3.toLowerCase()) > -1)||
            (fever.indexOf(Lowfever2.toLowerCase()) > -1 && fever.indexOf(Lowfever1.toLowerCase()) > -1)||
            (fever.indexOf(nothing.toLowerCase()) > -1 && fever.indexOf(Highfever1.toLowerCase()) > -1)){
              resultadofever = 'El paciente presenta el sintoma de la fiebre, pero a un nivel bajo';
              tratamientofeverOld = '\n-Tomar una paracetamol 500 gm cada 4 horas \n -Hidratación abundante con agua';
              tratamientofeverBoy = '\n-Tomar la mitad de una paracetamol cada 4 horas \n -Hidratación abundante con agua' ;
            }else if (( fever.indexOf(Highfever.toLowerCase()) > -1 )||(fever.indexOf(Highfever1.toLowerCase()) > -1 )||
            (fever.indexOf(Highfever2.toLowerCase()) > -1)||(fever.indexOf(Highfever3.toLowerCase()) > -1 )||
            (fever.indexOf(Highfever1.toLowerCase()) > -1 )){
              resultadofever = 'El paciente presenta el sintoma de la fiebre, pero a un nivel alto';
              tratamientofeverOld = '\n-Tomar una paracetamol 500 gm cada 8 horas. \n -Hidratación abundante con agua. \n -No abrigar en exceso ni caldear la habitación. \n -Aplicar paños húmedos templados o frescos, nunca fríos, en la frente. \n -Tomar una ducha con agua tibia de 15 o 30 minutos';
              tratamientofeverBoy = '\n-Tomar la mitad de una paracetamol cada 8 horas \n -Hidratación abundante con agua. \n -No abrigar en exceso ni caldear la habitación. \n -Aplicar paños húmedos templados o frescos, nunca fríos, en la frente. \n -Darles baños con agua templada durante 15-20 minutos, dejando que el agua se vaya enfriando poco a poco.'; 
            }else if((number && fever.indexOf(fever_.toLowerCase()) > -1 )|| (number)){
              resultadofever = 'El paciente presenta el sintoma de la fiebre con '+number+'°C';
              if  (parseInt(number) > 39){
                tratamientofeverOld = '\n-LLevar de urgencia al hospital o subcentro más cercano. \n-Tomar una paracetamol 500 gm cada 8 horas. \n -Hidratación abundante con agua. \n -No abrigar en exceso ni caldear la habitación. \n -Aplicar paños húmedos templados o frescos, nunca fríos, en la frente. \n Tomar una ducha con agua tibia de 15 o 30 minutos';
                tratamientofeverBoy = '\n-LLevar de urgencia al hospital o subcentro más cercano. \n-Tomar la mitad de una paracetamol cada 8 horas \n -Hidratación abundante con agua. \n -No abrigar en exceso ni caldear la habitación. \n -Aplicar paños húmedos templados o frescos, nunca fríos, en la frente. \n Darles baños con agua templada durante 15-20 minutos, dejando que el agua se vaya enfriando poco a poco.'; 
              }else{
                tratamientofeverOld = '\n-Tomar una paracetamol 500 gm cada 8 horas. \n -Hidratación abundante con agua. \n -Aplicar paños húmedos templados o frescos, nunca fríos, en la frente. \n Tomar una ducha con agua tibia de 15 o 30 minutos';
                tratamientofeverBoy = '\n-Tomar la mitad de una paracetamol cada 8 horas \n -Hidratación abundante con agua. \n -Aplicar paños húmedos templados o frescos, nunca fríos, en la frente. \n Darles baños con agua templada durante 15-20 minutos, dejando que el agua se vaya enfriando poco a poco.'; 
              }
            }else if ( (fever.indexOf(yes.toLowerCase()) > -1 && fever.indexOf(nothing2.toLowerCase()) > -1 ) ||
            (fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(nothing2.toLowerCase()) > -1 )||
            (fever.indexOf(fever_.toLowerCase()) > -1 )
             ){
              resultadofever = 'El paciente presenta el sintoma de la fiebre';
              tratamientofeverOld = '\n-Tomar una paracetamol 500 gm cada 8 horas. \n -Hidratación abundante con agua. ';
              tratamientofeverBoy = '\n-Tomar la mitad de una paracetamol cada 8 horas \n -Hidratación abundante con agua. '; 
            }else {
              resultadofever = 'No se puede hacer un diagnostico exacto. ';
              tratamientofeverOld = '\n Detalle mejor el sintoma para poder mejorar el diagnostico. ';
              tratamientofeverBoy = '\n Detalle mejor el sintoma para poder mejorar el diagnostico. ';
            }
            myObject_fever['gender'] = gender;
            myObject_fever['diagnostico'] = resultadofever;
            if  (resultadofever !== ""){
              if  (gender === "boy"){
                myObject_fever['tratamiento'] = tratamientofeverBoy;
                newArr_fever.push(myObject_fever);
                console.log("boy_fever", newArr_fever);
                return (newArr_fever);
                //return (<Text> Genero: {gender} {"\n"} Diagnostico: {resultadofever} {"\n"} Tratamiento: {tratamientofeverBoy}</Text>);
              }else{
                myObject_fever['tratamiento'] = tratamientofeverOld;
                newArr_fever.push(myObject_fever);
                console.log("adulto_fever", newArr_fever);
                return (newArr_fever);
                //return (<Text> Genero: {gender} {"\n"} Diagnostico: {resultadofever} {"\n"} Tratamiento: {tratamientofeverOld}</Text>);
              }
            }else{return null}
          }else{return null}
        }

        function Showheadache(){
          var valor2 = navigation.getParam('headache', 'default value').toLowerCase();
          const headache = removeAccents(valor2);
      
          var resultadoHeadache='', tratamientoheadacheOld='', tratamientoheadacheBoy='';
          var front="adelante", front2='frente',front3="delantera", front4='frontal';
          var back='atras', back1='trasera' ;
          var dolor='dolor', dolor1='cabeza', dolor2='punzante', dolor4='pulsante', dolor3='palpitante', dolor6='palpitaciones', dolor5='pulsaciones', dolor9='palpitos', dolor7='pulsacion';
          var no='no', no1='tengo', no2='sintoma', no3='sin';
          var lateral='lado', lateral1='lateral' ;
          var small = 'pequeño', small1= 'poco', small2='leve', small3 = 'ligero';
          var big='gran', big1='mucho', big2='demasiado', big3='bastante', big4='fuerte';

          var myObject_headache = {};
          var newArr_headache = [];

          if  (headache !== "") {
            if  ((headache.indexOf(no.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1)||
                (headache.indexOf(no.toLowerCase()) > -1 && headache.indexOf(no2.toLowerCase()) > -1)||
                (headache.indexOf(no3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1)){
                  resultadoHeadache = 'El paciente no presenta el sintoma de dolor de cabeza';
                  tratamientoheadacheOld =  '\n No necesita tratamiento';
                  tratamientoheadacheBoy =  '\n No necesita tratamiento';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en la parte frontal de la cabeza, a un nivel alto con pulsaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ibuprofeno" cada 8 horas más cafeína por 2 días.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ketotolaco" en tabletas cada 8 horas, o en ampollas (intramuscular o intravenosa).';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en la parte trasera de la cabeza, a un nivel alto con pulsaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ibuprofeno" cada 8 horas más cafeína por 2 días.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ketotolaco" en tabletas cada 8 horas, o en ampollas (intramuscular o intravenosa).';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en la parte delantera de la cabeza, a un nivel alto con palpitaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ibuprofeno" cada 8 horas más cafeína por 2 días.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ketotolaco" en tabletas cada 8 horas, o en ampollas (intramuscular o intravenosa).';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en la parte trasera de la cabeza, a un nivel alto con palpitaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ibuprofeno" cada 8 horas más cafeína por 2 días.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ketotolaco" en tabletas cada 8 horas, o en ampollas (intramuscular o intravenosa).';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor punzante en la parte frontal de la cabeza, a un nivel alto.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ibuprofeno" cada 8 horas más cafeína por 2 días.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ketotolaco" en tabletas cada 8 horas, o en ampollas (intramuscular o intravenosa).';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor punzante en la parte trasera de la cabeza, a un nivel alto.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ibuprofeno" cada 8 horas más cafeína por 2 días.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ketotolaco" en tabletas cada 8 horas, o en ampollas (intramuscular o intravenosa).';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big1.toLowerCase())> -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase())> -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase())> -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase())> -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big2.toLowerCase())> -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase())> -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase())> -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase())> -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big3.toLowerCase())> -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase())> -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase())> -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase())> -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(big4.toLowerCase())> -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase())> -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase())> -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase())> -1 && headache.indexOf(front4.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza en la parte frontal, a un nivel alto.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ibuprofeno" cada 8 horas por 2 días, con cafeína (opcional).';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ketotolaco" en tabletas cada 8 horas por 2 días.';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big1.toLowerCase())> -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big1.toLowerCase())> -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big2.toLowerCase())> -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big2.toLowerCase())> -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big3.toLowerCase())> -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase())> -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(big4.toLowerCase())> -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase())> -1 && headache.indexOf(back1.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza en la parte trasera, a un nivel alto.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ibuprofeno" cada 8 horas por 2 días, con cafeína (opcional).';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Tomar analgesico "Ketotolaco" en tabletas cada 8 horas por 2 días.';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en parte lateral de la cabeza a un nivel alto, con pulsaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 más cafeína horas en 2 día';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 2 día o en ampollas (intramuscular o intravenosa)';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en parte lateral de la cabeza a un nivel alto, con palpitaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 más cafeína horas en 2 día';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 2 día o en ampollas (intramuscular o intravenosa)';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor punzante a un nivel alto en la parte lateral de la cabeza.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 más cafeína horas en 2 día';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 2 día o en ampollas (intramuscular o intravenosa)';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1)
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1)
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza, a un nivel alto con pulsaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1)
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1)
                      ||(headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza, a un nivel alto con palpitaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día';
                }else if((headache.indexOf(big.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1)
                      ||(headache.indexOf(big1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1)
                      ||(headache.indexOf(big2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1)
                      ||(headache.indexOf(big3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1)
                      ||(headache.indexOf(big4.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza punzante, a un nivel alto.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día';
                }else if((headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1 )||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1 )||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1 )||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1 )){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en la parte frontal de la cabeza, a un nivel bajo con pulsaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Distraerse o hacer activida física por 45 minutos, evitando todo el estres posible';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Distraerse o hacer activida física por 45 minutos, evitando cualquier situación que genere estres';
                }else if((headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1 )||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1 )){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en la parte trasera de la cabeza, a un nivel bajo con pulsaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Distraerse o hacer activida física por 45 minutos, evitando todo el estres posible';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Distraerse o hacer activida física por 45 minutos, evitando cualquier situación que genere estres';
                }else if((headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en la parte delantera de la cabeza, a un nivel bajo con palpitaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Distraerse o hacer activida física por 45 minutos, evitando todo el estres posible';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Distraerse o hacer activida física por 45 minutos, evitando cualquier situación que genere estres';
                }else if((headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en la parte trasera de la cabeza, a un nivel bajo con palpitaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Distraerse o hacer activida física por 45 minutos, evitando todo el estres posible';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Distraerse o hacer activida física por 45 minutos, evitando cualquier situación que genere estres';
                }else if((headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor punzante en la parte frontal de la cabeza, a un nivel bajo.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Distraerse o hacer activida física por 45 minutos, evitando todo el estres posible';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Distraerse o hacer activida física por 45 minutos, evitando cualquier situación que genere estres';
                }else if((headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor punzante en la parte trasera de la cabeza, a un nivel bajo.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Distraerse o hacer activida física por 45 minutos, evitando todo el estres posible';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Distraerse o hacer activida física por 45 minutos, evitando cualquier situación que genere estres';
                }else if((headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza en la parte frontal, con pulsaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando todo el estres posible';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando cualquier situación que genere estres';
                }else if((headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en la parte trasera de la cabeza, con pulsaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando todo el estres posible';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando cualquier situación que genere estres';
                }else if((headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase()) > -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza en la parte frontal, con palpitaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando todo el estres posible';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando cualquier situación que genere estres';
                }else if((headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase()) > -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase()) > -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en la parte trasera de la cabeza, con palpitaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando todo el estres posible';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando cualquier situación que genere estres';
                }else if((headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza punzante, en la parte frontal de la cabeza';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando todo el estres posible';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando cualquier situación que genere estres';
                }else if((headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza punzante, en la parte trasera de la cabeza';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando todo el estres posible';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando cualquier situación que genere estres';
                }else if((headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small1.toLowerCase())> -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase())> -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase())> -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase())> -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small2.toLowerCase())> -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase())> -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase())> -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase())> -1 && headache.indexOf(front4.toLowerCase())> -1)
                      ||(headache.indexOf(small3.toLowerCase())> -1 && headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase())> -1 && headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase())> -1 && headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase())> -1 && headache.indexOf(front4.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza en la parte frontal, a un nivel bajo.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                }else if((headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small1.toLowerCase())> -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small1.toLowerCase())> -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small2.toLowerCase())> -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small2.toLowerCase())> -1 && headache.indexOf(back1.toLowerCase())> -1)
                      ||(headache.indexOf(small3.toLowerCase())> -1 && headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase())> -1 && headache.indexOf(back1.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza en la parte trasera, a un nivel bajo.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                }else if((headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en parte lateral de la cabeza, con pulsaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día';
                }else if((headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor en parte lateral de la cabeza, con palpitaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día';
                }else if((headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1 && headache.indexOf(lateral1.toLowerCase())>-1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor punzante en la parte lateral de la cabeza';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día';
                }else if((headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1)
                      ||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1)
                      ||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza, a un nivel bajo con pulsaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 45 minutos.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 45 minutos.';
                }else if((headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1)
                      ||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1)
                      ||(headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza, a un nivel bajo con palpitaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 45 minutos.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 45 minutos.';
                }else if((headache.indexOf(small.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1)
                      ||(headache.indexOf(small1.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1)
                      ||(headache.indexOf(small2.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1)
                      ||(headache.indexOf(small3.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza punzante, a un nivel bajo.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 45 minutos.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 45 minutos.';
                }else if((headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor4.toLowerCase()) > -1) || (headache.indexOf(dolor4.toLowerCase()) > -1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor7.toLowerCase()) > -1)|| (headache.indexOf(dolor7.toLowerCase()) > -1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor5.toLowerCase()) > -1)|| (headache.indexOf(dolor5.toLowerCase()) > -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza, con pulsaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día';
                }else if((headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor6.toLowerCase()) > -1) || (headache.indexOf(dolor6.toLowerCase()) > -1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor3.toLowerCase()) > -1) || (headache.indexOf(dolor3.toLowerCase()) > -1)
                      ||(headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor9.toLowerCase()) > -1) || (headache.indexOf(dolor9.toLowerCase()) > -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza, con palpitaciones.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día';
                }else if((headache.indexOf(dolor.toLowerCase()) > -1 && headache.indexOf(dolor2.toLowerCase()) > -1) || (headache.indexOf(dolor2.toLowerCase()) > -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza punzante';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día';
                }else if((headache.indexOf(no1.toLowerCase())> -1 && headache.indexOf(no2.toLowerCase())>-1)
                      ||(headache.indexOf(no1.toLowerCase())> -1 && headache.indexOf(dolor.toLowerCase())>-1) ){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                }else if((headache.indexOf(no1.toLowerCase())> -1 && headache.indexOf(no2.toLowerCase())>-1 && headache.indexOf(big.toLowerCase())> -1)||(headache.indexOf(no1.toLowerCase())> -1 && headache.indexOf(no2.toLowerCase())>-1 && headache.indexOf(big1.toLowerCase())> -1)
                      ||(headache.indexOf(no1.toLowerCase())> -1 && headache.indexOf(dolor.toLowerCase())>-1) ){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                }else if((headache.indexOf(no1.toLowerCase())> -1 && headache.indexOf(no2.toLowerCase())>-1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(no1.toLowerCase())> -1 && headache.indexOf(no2.toLowerCase())>-1 && headache.indexOf(lateral1.toLowerCase())>-1)
                      ||(headache.indexOf(no1.toLowerCase())> -1 && headache.indexOf(dolor.toLowerCase())>-1 && headache.indexOf(lateral.toLowerCase())>-1)||(headache.indexOf(no1.toLowerCase())> -1 && headache.indexOf(dolor.toLowerCase())>-1 && headache.indexOf(lateral1.toLowerCase())>-1) ){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza, en la parte lateral de la cabeza';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                }else if((headache.indexOf(front.toLowerCase())> -1)||(headache.indexOf(front2.toLowerCase())> -1)||(headache.indexOf(front3.toLowerCase())> -1)||(headache.indexOf(front4.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza, en la parte delantera de la cabeza';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                }else if((headache.indexOf(back.toLowerCase())> -1)||(headache.indexOf(back1.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza, en la parte trasera de la cabeza';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 20 minutos.';
                }else if((headache.indexOf(small.toLowerCase()) > -1)||(headache.indexOf(small1.toLowerCase())> -1)
                      ||(headache.indexOf(small2.toLowerCase())> -1)||(headache.indexOf(small3.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza, a un nivel bajo.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 15 minutos.';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 15 minutos.';
                }else if((headache.indexOf(big.toLowerCase()) > -1)||(headache.indexOf(big1.toLowerCase())> -1)
                      ||(headache.indexOf(big2.toLowerCase())> -1)||(headache.indexOf(big3.toLowerCase())> -1)||(headache.indexOf(big4.toLowerCase())> -1)){
                        resultadoHeadache = 'El paciente presenta el sintoma de dolor de cabeza, a un nivel alto.';
                        tratamientoheadacheOld =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ibuprofeno" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando todo el estres posible';
                        tratamientoheadacheBoy =  '\n -Hidratación abundante con agua. \n-Descansar por 50 minutos. \n-Tomar analgesico "Ketorolaco" en tabletas cada 8 horas en 1 día. \n-Distraerse o hacer activida física por 45 minutos, evitando cualquier situación que genere estres';
                }else {
                  resultadoHeadache = 'No se puede hacer un diagnostico exacto. ';
                  tratamientoheadacheOld = '\n Detalle mejor el sintoma para poder mejorar el diagnostico. ';
                  tratamientoheadacheBoy = '\n Detalle mejor el sintoma para poder mejorar el diagnostico. ';
                }
                myObject_headache['gender'] = gender;
                myObject_headache['diagnostico'] = resultadoHeadache;
                if  (resultadoHeadache !== ""){
                  if  (gender === "boy"){
                    myObject_headache['tratamiento'] = tratamientoheadacheBoy;
                    newArr_headache.push(myObject_headache);
                    console.log("boy_headache", newArr_headache);
                    return (newArr_headache);
                    //return (<Text> Genero: {gender} {"\n"} Diagnostico: {resultadoHeadache} {"\n"} Tratamiento: {tratamientoheadacheBoy}</Text>);
                  }else{
                    myObject_headache['tratamiento'] = tratamientoheadacheOld;
                    newArr_headache.push(myObject_headache);
                    console.log("adulto_headache", newArr_headache);
                    return (newArr_headache);
                    //return (<Text> Genero: {gender} {"\n"} Diagnostico: {resultadoHeadache} {"\n"} Tratamiento: {tratamientoheadacheOld}</Text>);
                  }
                }else{return null}
          }else{return null}
        }

        function Showstomachache(){
          var valor3 = navigation.getParam('stomachache', 'default value').toLowerCase();
          const stomachache = removeAccents(valor3);
      
          var resultadoStomachache='', tratamientoStomachacheOld='', tratamientoStomachacheBoy='';
          var dolor='dolor', dolor1='estomago', dolor2='acidez', dolor3='hinchazon', dolor4='eructos', dolor5='llenura';
          var dolor6='diarrea', dolor7='estreñimiento', dolor8='mareo', dolor9='vomito';
          var no='no', no1='tengo', no2='sintoma', no3='sin';
          var small='leve', small1='pequeño';
          var big='duro', big1='fuerte';

          var myObject_stomachache = {};
          var newArr = [];

          if  (stomachache !== "") {
            if  ((stomachache.indexOf(no.toLowerCase()) > -1 && stomachache.indexOf(dolor.toLowerCase()) > -1)||
                (stomachache.indexOf(no.toLowerCase()) > -1 && stomachache.indexOf(no2.toLowerCase()) > -1)||
                (stomachache.indexOf(no3.toLowerCase()) > -1 && stomachache.indexOf(dolor.toLowerCase()) > -1)){
                  resultadoStomachache = 'El paciente no presenta el sintoma de dolor de estómago';
                  tratamientoStomachacheOld =  '\n El adulto no necesita tratamiento';
                  tratamientoStomachacheBoy =  '\n El niño no necesita tratamiento';
                }else if((stomachache.indexOf(dolor.toLowerCase())> -1 && stomachache.indexOf(dolor6.toLowerCase())> -1)||
                        (stomachache.indexOf(dolor.toLowerCase())> -1 && stomachache.indexOf(dolor7.toLowerCase())> -1)||
                        (stomachache.indexOf(dolor.toLowerCase())> -1 && stomachache.indexOf(dolor8.toLowerCase())> -1)||
                        (stomachache.indexOf(dolor.toLowerCase())> -1 && stomachache.indexOf(dolor9.toLowerCase())> -1)){
                          resultadoStomachache = 'El paciente presenta el sintoma de dolor de barriga con varios dolores';
                          tratamientoStomachacheOld =  '\n - Se recomienda hidratarse lo más pronto posible.\n -Tomar una dosis de Omeprazol cada 8 horas por 2 días.';
                          tratamientoStomachacheBoy =  '\n - Se recomienda hidratarse lo más pronto posible.\n -Tomar la mitad de una dosis de Omeprazol cada 8 horas por 2 días.';
                }else if((stomachache.indexOf(dolor6.toLowerCase())>-1 && stomachache.indexOf(dolor7.toLowerCase())>-1 && stomachache.indexOf(dolor8.toLowerCase())>-1 && stomachache.indexOf(dolor9.toLowerCase())>-1 )||
                (stomachache.indexOf(dolor6.toLowerCase())>-1 && stomachache.indexOf(dolor7.toLowerCase())>-1 && stomachache.indexOf(dolor8.toLowerCase())>-1)||
                (stomachache.indexOf(dolor6.toLowerCase())>-1 && stomachache.indexOf(dolor7.toLowerCase())>-1 && stomachache.indexOf(dolor9.toLowerCase())>-1)||
                (stomachache.indexOf(dolor6.toLowerCase())>-1 && stomachache.indexOf(dolor9.toLowerCase())>-1 && stomachache.indexOf(dolor8.toLowerCase())>-1)){
                  resultadoStomachache = 'El paciente presenta el sintoma de la gastritis';
                          tratamientoStomachacheOld =  '\n - Se recomienda tomar ranitidina o famotidina 150 mg dos veces al día durante una semana. \n - Se recomienda ir a un gastroenterólogo, para un diagnostico más detallado.';
                          tratamientoStomachacheBoy =  '\n - Se recomienda ir a un gastroenterólogo para realizar un analisis de sangre o una endoscopia para un mejor resultado.';
                }else if((stomachache.indexOf(dolor2.toLowerCase())> -1 && stomachache.indexOf(dolor4.toLowerCase())> -1 && stomachache.indexOf(dolor5.toLowerCase())> -1)||
                        (stomachache.indexOf(dolor2.toLowerCase())> -1 && stomachache.indexOf(dolor3.toLowerCase())> -1 && stomachache.indexOf(dolor5.toLowerCase())> -1)||
                        (stomachache.indexOf(dolor2.toLowerCase())> -1 && stomachache.indexOf(dolor5.toLowerCase())> -1)||(stomachache.indexOf(dolor2.toLowerCase())> -1 && stomachache.indexOf(dolor3.toLowerCase())> -1)){
                          resultadoStomachache = 'El paciente presenta el sintoma de mala digestión';
                          tratamientoStomachacheOld =  '\n - Se recomienda tomar precaución con la alimentación que tiene. \n - Tomar tés digestivos que ayuden a eliminar la hinchazón ';
                          tratamientoStomachacheBoy =  '\n - Se recomienda tomar precaución con la alimentación que tiene. \n - Tomar tés digestivos de hierbas naturales que ayuden a eliminar la hinchazón ';
                }else if(stomachache.indexOf(dolor2.toLowerCase())> -1 || stomachache.indexOf(dolor3.toLowerCase())> -1 ){
                  resultadoStomachache = 'El paciente presenta el sintoma de exceso de gases';
                  tratamientoStomachacheOld =  '\n - Se recomienda tomar medicamentos naturales que ayuden a la digestión, tales como, el anis o el jengibre, estas hierbas son remedios excelente para problemas con gases. \n - Se recomienda tomar una dosis diaria de Aquilea Gases ó Digest Gases Eladiet, los cuales son suplementos farmaseuticos naturales.';
                  tratamientoStomachacheBoy =  '\n - Se recomienda tomar medicamentos naturales que ayuden a la digestión, tales como, el anis o el jengibre, estas hierbas son remedios excelente para problemas con gases. \n - Se recomienda tomar una dosis diaria de NEO Peques Gases, los cuales son suplementos farmaseuticos naturales.';
                }else if((stomachache.indexOf(small.toLowerCase())> -1)||(stomachache.indexOf(small1.toLowerCase())> -1)){
                  resultadoStomachache = 'El paciente presenta el sintoma de dolor de barriga, a un nivel bajo';
                  tratamientoStomachacheOld =  '\n - Reposar por 15 minutos sin realizar actividad física.\n - Hidratarse lo más pronto posible.';
                  tratamientoStomachacheBoy =  '\n - Reposar por 15 minutos sin realizar actividad física.\n - Hidratarse lo más pronto posible.';
                }else if((stomachache.indexOf(big.toLowerCase())> -1)||(stomachache.indexOf(big1.toLowerCase())> -1)){
                  resultadoStomachache = 'El paciente presenta el sintoma de dolor de barriga, a un nivel alto';
                  tratamientoStomachacheOld =  '\n - Tomar una cápsula de Omeprazol de 40 mg cada 4 horas por 1 días. \n - Reposar por 15 minutos sin realizar actividad física.\n - Hidratarse lo más pronto posible.';
                  tratamientoStomachacheBoy =  '\n - Tomar una cápsula de Omeprazol de 20 mg cada 4 horas por 1 días. \n - Reposar por 15 minutos sin realizar actividad física.\n - Hidratarse lo más pronto posible.';
                }else if(stomachache.indexOf(dolor.toLowerCase())> -1){
                  resultadoStomachache = 'El paciente presenta el sintoma de dolor de barriga';
                  tratamientoStomachacheOld =  '\n - Reposar por 20 minutos sin realizar actividad física.\n - Hidratarse lo más pronto posible.\n - Evitar el estres.';
                  tratamientoStomachacheBoy =  '\n - Reposar por 20 minutos sin realizar actividad física.\n - Hidratarse lo más pronto posible.\n - Evitar el estres.';
                }else {
                  resultadoStomachache = 'No se puede hacer un diagnostico exacto. ';
                  tratamientoStomachacheOld = '\n Detalle mejor el sintoma para poder mejorar el diagnostico. ';
                  tratamientoStomachacheBoy = '\n Detalle mejor el sintoma para poder mejorar el diagnostico. ';
                }
                myObject_stomachache['gender'] = gender;
                myObject_stomachache['diagnostico'] = resultadoStomachache;
                if  (resultadoStomachache !== ""){
                  if  (gender === "boy"){
                    myObject_stomachache['tratamiento'] = tratamientoStomachacheBoy;
                    newArr.push(myObject_stomachache);
                    console.log("prueba array boy", newArr);
                    return (newArr);
                    //return (<Text> Genero: {gender} {"\n"} Diagnostico: {resultadoStomachache} {"\n"} Tratamiento: {tratamientoStomachacheBoy}</Text>);
                  }else{
                    myObject_stomachache['tratamiento'] = tratamientoStomachacheOld;
                    newArr.push(myObject_stomachache);
                    console.log("prueba array old", newArr);
                    return (newArr);
                    //return (<Text> Genero: {gender} {"\n"} Diagnostico: {resultadoStomachache} {"\n"} Tratamiento: {tratamientoStomachacheOld}</Text>);
                  }
                }else{return null}
                
          }else{return null}
        }

        function Showcold(){
          var valor4 = navigation.getParam('cold', 'default value').toLowerCase();
          const cold = removeAccents(valor4);
      
          var resultadoCold='', tratamientoColdOld='', tratamientoColdBoy='';
          var dolor='gripe', dolor1='resfriado';
          var sint='tos', sint1='flema', sint2='corporal', sint3='cuerpo', sint4='escalofrio', sint5='fatiga';
          var sint6='congestion', sint7='estornudos', sint8='moqueo', sint9='lloroso', sint10='picazon', sint11='moco';
          var sint12='tapada', sint13='mucosidad' ;
          var san='sangre', san1='sangrado';
          var no='no', no1='tengo', no2='sintoma', no3='sin';

          var myObject_cold = {};
          var newArr_cold = [];

          if  (cold !== "") {
            if  ((cold.indexOf(no.toLowerCase()) > -1 && cold.indexOf(dolor.toLowerCase()) > -1)||
                (cold.indexOf(no.toLowerCase()) > -1 && cold.indexOf(no2.toLowerCase()) > -1)||
                (cold.indexOf(no.toLowerCase()) > -1 && cold.indexOf(dolor1.toLowerCase()) > -1)||
                (cold.indexOf(no3.toLowerCase()) > -1 && cold.indexOf(dolor1.toLowerCase()) > -1)||
                (cold.indexOf(no3.toLowerCase()) > -1 && cold.indexOf(dolor.toLowerCase()) > -1)||
                (cold.indexOf(no.toLowerCase()) > -1 && cold.indexOf(no1.toLowerCase()) > -1)){
                  resultadoCold = 'El paciente no presenta el sintoma de resfriado';
                  tratamientoColdOld =  '\n El adulto no necesita tratamiento';
                  tratamientoColdBoy =  '\n El niño no necesita tratamiento';
                }else if((cold.indexOf(san.toLowerCase())> -1)||(cold.indexOf(san1.toLowerCase())> -1) ){
                  resultadoCold = 'El paciente presenta sangrado en la fosas nasales.';
                  tratamientoColdOld =  '\n - Al presentar sangrado renpetino, se recomienda acudir a su medico más cercano' ;
                  tratamientoColdBoy =  '\n - Al presentar sangrado renpetino, se recomienda acudir a su medico más cercano' ;
                }else if((cold.indexOf(sint.toLowerCase())> -1 && cold.indexOf(sint1.toLowerCase())> -1 )||
                        (cold.indexOf(sint.toLowerCase())> -1 && cold.indexOf(sint13.toLowerCase())> -1 )||
                        (cold.indexOf(sint.toLowerCase())> -1 && cold.indexOf(sint11.toLowerCase())> -1 )){ 
                  resultadoCold = 'El paciente presenta el sintoma de la tos con flema';
                  tratamientoColdOld =  '\n - Puede tomar Ambrosol con una dosis de 60 a 90 mg/día cada 8 horas. \n - Tambien puede tomar bromhexina 8 mg/día cada 8 horas.';
                  tratamientoColdBoy =  '\n - Puede tomar Ambrosol con una dosis de 30 a 45 mg/día cada 8 horas. \n - Tambien puede tomar bromhexina 4 mg/día cada 8 horas.';
                }else if(cold.indexOf(sint.toLowerCase())> -1){
                  resultadoCold = 'El paciente presenta el sintoma de la tos';
                  tratamientoColdOld =  '\n - Se recomienda tomar té con miel. \n - Tomar pastillas para la garganta con mentol. \n - Tomar el jarabe Guaifenesina dos veces al día para disolver la tos';
                  tratamientoColdBoy =  '\n - Frote una capa gruesa de ungüento mentolado en la piel sobre el pecho y el cuello (cubriendo la garganta). \n - Tomar pastillas para la garganta con mentol. ';
                }else if((cold.indexOf(sint6.toLowerCase())> -1 && cold.indexOf(sint7.toLowerCase())> -1 && cold.indexOf(sint8.toLowerCase())> -1 && cold.indexOf(sint10.toLowerCase())> -1)
                      ||(cold.indexOf(sint6.toLowerCase())> -1 && cold.indexOf(sint7.toLowerCase())> -1 && cold.indexOf(sint10.toLowerCase())> -1)||(cold.indexOf(sint6.toLowerCase())> -1 && cold.indexOf(sint7.toLowerCase())> -1 && cold.indexOf(sint8.toLowerCase())> -1)
                      ||(cold.indexOf(dolor.toLowerCase())> -1)||(cold.indexOf(dolor1.toLowerCase())> -1)||(cold.indexOf(sint12.toLowerCase())> -1)
                      ||(cold.indexOf(sint7.toLowerCase())> -1 && cold.indexOf(sint8.toLowerCase())> -1 && cold.indexOf(sint10.toLowerCase())> -1)||(cold.indexOf(sint8.toLowerCase())> -1 && cold.indexOf(sint10.toLowerCase())> -1 && cold.indexOf(sint6.toLowerCase())> -1)
                      ||(cold.indexOf(sint6.toLowerCase())> -1 && cold.indexOf(sint8.toLowerCase())> -1)||(cold.indexOf(sint8.toLowerCase())> -1 && cold.indexOf(sint7.toLowerCase())> -1)||(cold.indexOf(sint6.toLowerCase())> -1 && cold.indexOf(sint7.toLowerCase())> -1)
                      ||(cold.indexOf(sint7.toLowerCase())> -1 && cold.indexOf(sint10.toLowerCase())> -1)||(cold.indexOf(sint8.toLowerCase())> -1 && cold.indexOf(sint10.toLowerCase())> -1)||(cold.indexOf(sint8.toLowerCase())> -1 && cold.indexOf(sint6.toLowerCase())> -1)
                      ||(cold.indexOf(sint6.toLowerCase())> -1 && cold.indexOf(sint10.toLowerCase())> -1)||(cold.indexOf(sint7.toLowerCase())> -1)||(cold.indexOf(sint6.toLowerCase())> -1)||(cold.indexOf(sint8.toLowerCase())> -1)||(cold.indexOf(sint10.toLowerCase())> -1) ||(cold.indexOf(sint11.toLowerCase())> -1)  ){
                        resultadoCold = 'El paciente presenta el sintoma de congestion en la naris';
                        tratamientoColdOld =  '\n - Usar budesónida un atomizador nasal con esteroide. \n - Tomar dos cucharadas una vez al día de cetirizina en jarabe. \n - Usar un descongestionate como oximetazolina con una dosis de 2 ó 3 atomizaciones en cada fosa nasal, cada 12 horas.' ;
                        tratamientoColdBoy =  '\n - Usar un atomizador nasal. \n - Tomar una cucharada una vez al día de cetirizina en jarabe. \n - Usar un descongestionate como oximetazolina con una dosis de 2 ó 3 atomizaciones en cada fosa nasal, cada 12 horas.'
                      }else {
                  resultadoCold = 'No se puede hacer un diagnostico exacto. ';
                  tratamientoColdOld = '\n Detalle mejor el sintoma para poder mejorar el diagnostico. ';
                  tratamientoColdBoy = '\n Detalle mejor el sintoma para poder mejorar el diagnostico. ';
                }
                myObject_cold['gender'] = gender;
                myObject_cold['diagnostico'] = resultadoCold;
                if  (resultadoCold !== ""){
                  if  (gender === "boy"){
                    myObject_cold['tratamiento'] = tratamientoColdBoy;
                    newArr_cold.push(myObject_cold);
                    console.log("boy_cold", newArr_cold);
                    return (newArr_cold);
                    //return (<Text> Genero: {gender} {"\n"} Diagnostico: {resultadoStomachache} {"\n"} Tratamiento: {tratamientoStomachacheBoy}</Text>);
                  }else{
                    myObject_cold['tratamiento'] = tratamientoColdOld;
                    newArr_cold.push(myObject_cold);
                    console.log("oldmen_cold", newArr_cold);
                    return (newArr_cold);
                    //return (<Text> Genero: {gender} {"\n"} Diagnostico: {resultadoStomachache} {"\n"} Tratamiento: {tratamientoStomachacheOld}</Text>);
                  }
                }else{return null}
                
          }else{return null}
        }

        function RetornarDiagnostico(valor){
          var  diagnostico_='';
          var retornar="";
          for (var i=0; i<valor.length; i++){
            diagnostico_= valor[i].diagnostico;
          }
          if  (diagnostico_==='No se puede hacer un diagnostico exacto. '){
            Alert.alert(
              'Importante',
              'Debe detallar mejor los sintomas para obtener un diagnostico con mayor certeza, verifique la información ingresada.',
              [
                {text: 'OK'},
              ],
              {cancelable: false},
            )
            return("");
          }else{
            return(diagnostico_.substring(21))
          }
        }

        function RetornarTratamiento(valor){
          var gender_='';
          for (var i=0; i<valor.length; i++){
            gender_ = valor[i].tratamiento;
          }
          return(gender_)
        }

        function Diagnosticar(){
          var array=[];
          var stomachache=Showstomachache();
          var fever = ShowFever();
          var headache= Showheadache();
          var cold= Showcold();
          var gender_='', diagnostico_='', tratamiento_='';

          if(cold!== null && fever!== null && headache!== null && stomachache!==null){
            var diagnosticoFever= RetornarDiagnostico(fever);
            var diagnosticoHeadache= RetornarDiagnostico(headache);
            var diagnosticCold= RetornarDiagnostico(cold);
            var diagnosticStomachache= RetornarDiagnostico(stomachache);
            var TratamientoFever= RetornarTratamiento(fever);
            var TratamientoHeadache= RetornarTratamiento(headache);
            var TratamientoCold= RetornarTratamiento(cold);
            var TratamientoStomachache= RetornarTratamiento(stomachache);
            var diagnosticFinal= "El paciente presenta los siguiente sintomas: \n"+diagnosticoFever+"\n"+diagnosticoHeadache+"\n"+diagnosticCold+"\n"+diagnosticStomachache;
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnosticFinal}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.diagnostic}>Fiebre:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoFever}</Text>
                    <Text style={styles.diagnostic}>Dolor de cabeza:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoHeadache}</Text>
                    <Text style={styles.diagnostic}>Resfriado:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoCold}</Text>
                    <Text style={styles.diagnostic}>Dolor de barriga:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoStomachache}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if(cold!== null && fever!== null && headache!== null){
            var diagnosticoFever= RetornarDiagnostico(fever);
            var diagnosticoHeadache= RetornarDiagnostico(headache);
            var diagnosticCold= RetornarDiagnostico(cold);
            var TratamientoFever= RetornarTratamiento(fever);
            var TratamientoHeadache= RetornarTratamiento(headache);
            var TratamientoCold= RetornarTratamiento(cold);
            var diagnosticFinal= "El paciente presenta los siguiente sintomas: \n"+diagnosticoFever+"\n"+diagnosticoHeadache+"\n"+diagnosticCold;
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnosticFinal}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.diagnostic}>Fiebre:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoFever}</Text>
                    <Text style={styles.diagnostic}>Dolor de cabeza:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoHeadache}</Text>
                    <Text style={styles.diagnostic}>Resfriado:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoCold}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if(stomachache!== null && cold!== null && fever!== null){
            var diagnosticoFever= RetornarDiagnostico(fever);
            var diagnosticStomachache= RetornarDiagnostico(stomachache);
            var diagnosticCold= RetornarDiagnostico(cold);
            var TratamientoFever= RetornarTratamiento(fever);
            var TratamientoStomachache= RetornarTratamiento(stomachache);
            var TratamientoCold= RetornarTratamiento(cold);
            var diagnosticFinal= "El paciente presenta los siguiente sintomas: \n"+diagnosticoFever+"\n"+diagnosticStomachache+"\n"+diagnosticCold;
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnosticFinal}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.diagnostic}>Fiebre:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoFever}</Text>
                    <Text style={styles.diagnostic}>Dolor de barriga:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoStomachache}</Text>
                    <Text style={styles.diagnostic}>Resfriado:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoCold}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if(headache!== null && stomachache!== null && cold!== null){
            var diagnosticoHeadache= RetornarDiagnostico(headache);
            var diagnosticStomachache= RetornarDiagnostico(stomachache);
            var diagnosticCold= RetornarDiagnostico(cold);
            var TratamientoHeadache= RetornarTratamiento(headache);
            var TratamientoStomachache= RetornarTratamiento(stomachache);
            var TratamientoCold= RetornarTratamiento(cold);
            var diagnosticFinal= "El paciente presenta los siguiente sintomas: \n"+diagnosticoHeadache+"\n"+diagnosticStomachache+"\n"+diagnosticCold;
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnosticFinal}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.diagnostic}>Dolor de cabeza:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoHeadache}</Text>
                    <Text style={styles.diagnostic}>Dolor de barriga:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoStomachache}</Text>
                    <Text style={styles.diagnostic}>Resfriado:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoCold}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if(fever!==null && headache!== null && stomachache!== null){
            var diagnosticoHeadache= RetornarDiagnostico(headache);
            var diagnosticStomachache= RetornarDiagnostico(stomachache);
            var diagnosticFever= RetornarDiagnostico(fever);
            var TratamientoHeadache= RetornarTratamiento(headache);
            var TratamientoStomachache= RetornarTratamiento(stomachache);
            var TratamientoFever= RetornarTratamiento(fever);
            var diagnosticFinal= "El paciente presenta los siguiente sintomas: \n"+diagnosticoHeadache+"\n"+diagnosticStomachache+"\n"+diagnosticFever;
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnosticFinal}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.diagnostic}>Dolor de cabeza:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoHeadache}</Text>
                    <Text style={styles.diagnostic}>Dolor de barriga:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoStomachache}</Text>
                    <Text style={styles.diagnostic}>Fiebre:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoFever}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if(stomachache!==null && cold!== null ){
            var diagnosticStomachache= RetornarDiagnostico(stomachache);
            var diagnosticCold= RetornarDiagnostico(cold);
            var TratamientoStomachache= RetornarTratamiento(stomachache);
            var TratamientoCold= RetornarTratamiento(cold);
            var diagnosticFinal= "El paciente presenta los siguiente sintomas: \n"+diagnosticStomachache+"\n"+diagnosticCold;
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnosticFinal}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.diagnostic}>Dolor de barriga:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoStomachache}</Text>
                    <Text style={styles.diagnostic}>Resfriado:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoCold}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if(headache!==null && cold!== null ){
            var diagnosticoHeadache= RetornarDiagnostico(headache);
            var diagnosticCold= RetornarDiagnostico(cold);
            var TratamientoHeadache= RetornarTratamiento(headache);
            var TratamientoCold= RetornarTratamiento(cold);
            var diagnosticFinal= "El paciente presenta los siguiente sintomas: \n"+diagnosticoHeadache+"\n"+diagnosticCold;
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnosticFinal}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.diagnostic}>Dolor de cabeza:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoHeadache}</Text>
                    <Text style={styles.diagnostic}>Resfriado:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoCold}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if(headache!==null && stomachache!== null ){
            var diagnosticoHeadache= RetornarDiagnostico(headache);
            var diagnosticStomachache= RetornarDiagnostico(stomachache);
            var TratamientoHeadache= RetornarTratamiento(headache);
            var TratamientoStomachache= RetornarTratamiento(stomachache);
            var diagnosticFinal= "El paciente presenta los siguiente sintomas: \n"+diagnosticoHeadache+"\n"+diagnosticStomachache;
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnosticFinal}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.diagnostic}>Dolor de cabeza:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoHeadache}</Text>
                    <Text style={styles.diagnostic}>Dolor de barriga:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoStomachache}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if(fever!==null && cold!== null ){
            var diagnosticoCold= RetornarDiagnostico(cold);
            var diagnosticFever= RetornarDiagnostico(fever);;
            var TratamientoCold= RetornarTratamiento(cold);
            var TratamientoFever= RetornarTratamiento(fever);
            var diagnosticFinal= "El paciente presenta los siguiente sintomas: \n"+diagnosticoCold+"\n"+diagnosticFever;
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnosticFinal}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.diagnostic}>Resfriado:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoCold}</Text>
                    <Text style={styles.diagnostic}>Fiebre:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoFever}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if(fever!==null && stomachache!== null ){
            var diagnosticoStomachache= RetornarDiagnostico(stomachache);
            var diagnosticFever= RetornarDiagnostico(fever)
            var TratamientoStomachache= RetornarTratamiento(stomachache);
            var TratamientoFever= RetornarTratamiento(fever);
            var diagnosticFinal= "El paciente presenta los siguiente sintomas: \n"+diagnosticoStomachache+"\n"+diagnosticFever;
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnosticFinal}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.diagnostic}>Dolor de barriga:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoStomachache}</Text>
                    <Text style={styles.diagnostic}>Fiebre:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoFever}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if(fever!==null && headache!== null ){
            var diagnosticoHeadache= RetornarDiagnostico(headache);
            var diagnosticFever= RetornarDiagnostico(fever);
            var TratamientoHeadache= RetornarTratamiento(headache);
            var TratamientoFever= RetornarTratamiento(fever);
            var diagnosticFinal= "El paciente presenta los siguiente sintomas: \n"+diagnosticoHeadache+"\n"+diagnosticFever;
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnosticFinal}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.diagnostic}>Dolor de cabeza:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoHeadache}</Text>
                    <Text style={styles.diagnostic}>Fiebre:</Text>
                    <Text style={styles.subdiagnostic}>{TratamientoFever}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if  (fever !== null){
            console.log("resultado final fever",fever);
            for (var i=0; i<fever.length; i++){
              gender_ = fever[i].gender;
              diagnostico_= fever[i].diagnostico;
              tratamiento_ = fever[i].tratamiento;
            }
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnostico_}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{tratamiento_}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if(headache !== null){
            console.log("resultado final headache",headache);
            for (var i=0; i<headache.length; i++){
              gender_ = headache[i].gender;
              diagnostico_= headache[i].diagnostico;
              tratamiento_ = headache[i].tratamiento;
            }
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnostico_}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{tratamiento_}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if(stomachache!==null){
            console.log("resultado final stomachace",stomachache);
            for (var i=0; i<stomachache.length; i++){
              gender_ = stomachache[i].gender;
              diagnostico_= stomachache[i].diagnostico;
              tratamiento_ = stomachache[i].tratamiento;
            }
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnostico_}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{tratamiento_}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else if(cold !==null){
            console.log("resultado final cold",cold);
            for (var i=0; i<cold.length; i++){
              gender_ = cold[i].gender;
              diagnostico_= cold[i].diagnostico;
              tratamiento_ = cold[i].tratamiento;
            }
            return (
              <View >
                <View style={[styles.ViewBorder,{width: '100%', height: '35%'}]}>
                  <Text style={styles.diagnostic}>Diagnostico:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{diagnostico_}</Text>
                  </ScrollView>
                </View>
                <View style={[styles.ViewBorder,{width: '100%', height: '55%'}]}>
                  <Text style={styles.diagnostic}>Tratamiento:</Text>
                  <ScrollView>
                    <Text style={styles.subdiagnostic}>{tratamiento_}</Text>
                  </ ScrollView>
                </View>
              </View>
            );
          }else{
            return null;
          }
        }
        
        return(
            <View style={styles.Container_screen_1}>

                <View style={[styles.Container_principal]}>
                    
                    <View style={{width: '100%', height: '23%', backgroundColor: '#99ebff', flexDirection: 'row'}} >
                      <View style={[styles.ViewBorder,{backgroundColor: 'white', justifyContent: 'center',width: '30%', height: '100%'}]}><Text style={{textAlign:'center'}}>Logo</Text></View>
                      <View style={[styles.ViewBorder,{width: '70%', height: '100%'}]}>
                        <Text style={[styles.toolbar,{color: '#000'}]}>DR. NOMBRE DEL DOCTOR</Text>
                        <Text style={[styles.subtoolbar,{color: '#000'}]}>Información de contacto</Text>
                        <Text style={[styles.date,{color: '#000'}]}>{this.state.date}</Text>
                      </View>
                    </View>
                    <Diagnosticar />
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
                    style={styles.button_next}
                    onPress={this.FinalPress}
                  >
                    <Text style={{color:"#000", fontWeight: 'bold'}}> Finalizar </Text>
                  </TouchableOpacity>
                  </View>
                </View>  
            </View>
        )
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
     button_next: {
      alignItems: 'center',
      backgroundColor: '#99ebff',
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
      color: 'white',
      fontWeight: 'bold'
    },
    textAreaContainer: {
        borderColor: '#393d42',
        borderWidth: 1,
        padding: 5
      },
      textArea: {
        height: 150,
        justifyContent: "flex-start"
      },
    toolbar:{
      paddingLeft: '10%',
      paddingTop: '10%',
      justifyContent: 'flex-start',
      fontWeight: 'bold',
    },
    diagnostic:{
      justifyContent: 'flex-start',
      fontWeight: 'bold',
      paddingLeft:'5%',
      paddingRight:'5%',
      paddingTop:'4%',
      paddingBottom:'2%',
    },
    subdiagnostic:{
      justifyContent: 'flex-start',
      paddingLeft:'5%',
      paddingRight:'5%',
      paddingBottom:'5%',
    },
    subtoolbar:{
      paddingLeft: '10%',
      justifyContent: 'flex-start',
    },
    date:{
      paddingLeft: '10%',
      justifyContent: 'flex-end',
      textAlign: 'right',
      paddingTop:'5%',
      paddingRight: '10%',
    },
    ViewBorder:{
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#000',
    }
});
