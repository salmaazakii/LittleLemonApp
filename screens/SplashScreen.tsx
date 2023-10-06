import React from 'react'
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export default function SplashScreen(){
    return(
        <LinearGradient colors={['#f5e7ae','#faf8f2']} style={{flex:1, alignItems:'center'}}>
            <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                <Image source={require('../assets/images/Logo.png')} style={{width:'70%',height:70}}/>
            </View>
        </LinearGradient>
    );
}