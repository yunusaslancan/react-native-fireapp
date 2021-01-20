/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering"
import axios from 'axios'; 
export default class App extends React.Component
{
  constructor(){
    super();
    this.state = {
      events:[],
      loading:true
    }
  }
 
  componentDidMount(){
    axios.get('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events')
    .then((res)=>{
      this.setState({
        events:res.data.events,
        loading:false
      })
  
    })
    .catch((error)=>{
      console.log(error)
    })
   }

  render() {
    const {loading,events} = this.state;
    return <SafeAreaView style={{flex:1}}>
      <View style={{justifyContent:'center',alignItems:'center',padding:20}}>
        <Text style={{fontWeight:'700',fontSize:20}}>FireApp</Text>
      </View>
        {loading 
        ? 
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Yükleniyor...</Text></View>  
        :
        <MapView
          initialRegion={{
            latitude: 52.5,
            longitude: 19.2,
            latitudeDelta: 8.5,
            longitudeDelta: 8.5,
        }}
        style={{
          height:'100%'
        }}
      >
        {
          
           events.map(item =>{
            console.log('yeni')
           if(typeof item.geometries[0].coordinates[0] != 'object'){                           
            return <Marker
            title={item.title}
            description={item.description}
            coordinate=
            {{latitude:item.geometries[0].coordinates[1],
              longitude:item.geometries[0].coordinates[0]}}
            >
            <View><Text>🔥</Text></View> 
            </Marker>
           }
          
          })
        }
        

      </MapView>
       }
      </SafeAreaView>
    
  }
}