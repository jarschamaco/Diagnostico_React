import React, {Component} from 'react';
import { View, Dimensions, Text, StyleSheet, PermissionsAndroid, Alert} from 'react-native';
import { Icon } from 'react-native-elements'

import MapView,{ Marker, Callout, ProviderPropType }  from "react-native-maps";

import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -0.9523683;
const LONGITUDE = -80.7447645;
const LATITUDE_DELTA = 0.022;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class Locate extends Component {

  constructor(props){
    super(props);
    this.state = {
      x: '-0.9683167', y: '-80.7445343',  places: '',
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    }
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Diagnostico',
    headerTransparent: false,
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#99ebff',
    },
    headerRight: () =>(
    <View style={{flexDirection: 'row', margin:10, alignItems: 'center',}}>
      <View style={{ margin:15, alignItems: 'center',}}>
        <Icon
          size={30}
          name='address-card'
          type='font-awesome'
          color='#000'
          onPress={()=>{ navigation.navigate('Contact'); }}  />
      </View> 
    </View>  ),
  });
  
  handleBackPress = () => {
    this.props.navigation.goBack();
  }

  permissionsLocate = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Locate Permission',
          message:
            'Locate permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the locate');
      } else {
        console.log('Locate permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentDidMount(){
    this.permissionsLocate();
  }

  componentWillUnmount(){
    console.log('Screen exit');
  }
  
  render() {
    console.disableYellowBox = true;
    Geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      this.setState({x: latitude, y: longitude, 
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }})

      },
      (error) =>{
        if(error.message.concat('No location provider available')){
          Alert.alert(
            'Importante',
            'Verifique se su ubicación este encendida',
            [
              {text: 'OK', onPress: this.handleBackPress()},
            ],
            {cancelable: false},
          ),{enableHighAccuracy: true, timeout: 2000, maximumAge: 100 };
        }
      }
    )

    if(this.state.x === '' || this.state.y === ''){
      this.setState({x: -0.9683167, y: -80.7445343})
    }

    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={this.onMapPress}
          showsUserLocation
          loadingEnabled
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
        >
          <Marker
            coordinate={{
              latitude: -0.9549965,
              longitude: -80.7415161,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <Callout>
              <View>
                <Text>Manta Hospital Center</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: -0.9541786,
              longitude: -80.7422805,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <Callout>
              <View>
                <Text>Hospital Rodriguez Zambrano</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: -0.9542858,
              longitude: -80.7435277,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <Callout>
              <View>
                <Text>Cruz Roja Ecuatoriana</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: -0.9645787,
              longitude: -80.749155,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <Callout>
              <View>
                <Text>Hospital Umiña</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: -0.9534505,
              longitude: -80.7354516,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <Callout>
              <View>
                <Text>Centro de salud tipo C de Manta</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: -0.954369,
              longitude: -80.7265681,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <Callout>
              <View>
                <Text>Clinica Divino Niño</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: -0.9605747,
              longitude: -80.7129908,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <Callout>
              <View>
                <Text>Traverso Medical Center</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: -0.9707147,
              longitude: -80.7029432,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <Callout>
              <View>
                <Text>Solca Manta</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: -0.9725786,
              longitude: -80.7174459,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <Callout>
              <View>
                <Text>Centro de salud 20 de mayo</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: -0.98156,
              longitude: -80.705502,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <Callout>
              <View>
                <Text>Hospital de Cuba</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: -0.9847809,
              longitude: -80.694049,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <Callout>
              <View>
                <Text>Hospital General del IESS Manta</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: -0.9506171,
              longitude: -80.6760621,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <Callout>
              <View>
                <Text>Hospital General de la Fuerza Aérea Ecuatoriana</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
      </View>
    );
  }
}

Locate.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
