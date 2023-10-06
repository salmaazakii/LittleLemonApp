import {View,Image,TextInput,Pressable,Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import {setUserSetupCompleted} from '../src/Config'
import { useState } from 'react';

function Header(){
    return(
        <View style={{width:'100%',height:'20%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../assets/images/Logo.png')} style={{width:'70%',height:70}}/>
        </View>
    );
}
export default function Onboarding({navigation}){
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')

    return(
        <LinearGradient colors={['#f5e7ae','#faf8f2']} style={{flex:1, alignItems:'center'}}>
            <Header />
            <Text style={{marginTop:20,fontSize:20,fontWeight:'500', color:'#495E57',fontFamily:'Karla-Regular'}}>Let us get to know you</Text>
            <View style={{marginVertical:20,alignItems:'flex-start',width:'70%',height:'20%',justifyContent:'space-between'}}>
                <Text style={{fontFamily:'Karla-Regular',fontSize:16}}>First Name</Text>
                <TextInput style={{borderRadius:10,borderWidth:1,width:'100%'}} value={firstName} onChangeText={(value) => setFirstName(value)}></TextInput>
                <Text style={{fontFamily:'Karla-Regular',fontSize:16,marginTop:20}}>Email</Text>
                <TextInput style={{borderRadius:10,borderWidth:1,width:'100%'}} value={email} onChangeText={(value) => setEmail(value)}></TextInput>
            </View>
            <Pressable 
                disabled ={(firstName != '' && email != ''? false : true)}
                style={[{marginTop:20,width:'25%',height:50,borderRadius:10,alignItems:'center',justifyContent:'center'}
                ,{backgroundColor: disabled ? 'grey': '#495E57'}]}
                onPress={async ()=> {
                    navigation.navigate('Profile')
                    await setUserSetupCompleted()
                }}
            >
                <Text style={{color:'white',fontSize:18}}>Next</Text>
            </Pressable>
        </LinearGradient>
    );
}