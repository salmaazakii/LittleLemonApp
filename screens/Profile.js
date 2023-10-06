import React from 'react';
import {View, Image, Text, Pressable,TextInput, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import CheckBox from '@react-native-community/checkbox';

function UserProfileIcon(props){
    return(
        <View style={{backgroundColor:'white',alignItems:'center',justifyContent:'center' , ...props}}>
            <Image source={require('../assets/images/profile.jpg')} style={{width:'70%',height:'80%'}} alt='Image by juicy_fish on Freepik'/>
        </View>
    );
}

export default function Profile(){
    return (
        <LinearGradient colors={['#f5e7ae','#faf8f2']} style={{flex:1, alignItems:'center'}}>
            <View style={{width:'100%',height:'10%',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                <View style={{width:40,height:40,borderRadius:20,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                    <FontAwesomeIcon icon={faArrowLeft} color='#495E57' size={26}/>
                </View>
                <View style={{width:'70%',alignItems:'center'}}>
                    <Image source={require('../assets/images/Logo.png')}/>
                </View>
                <UserProfileIcon width={40} height={40} borderRadius={20} />
            </View>
            <View style={{width:'95%',backgroundColor:'white',borderRadius:20}}>
                <Text style={{fontFamily:'Karla-Regular',color:'#495E57',fontSize:24,marginStart:20,marginVertical:10}}>Personal Information</Text>
                <Text style={{fontFamily:'Karla-Regular',color:'grey',fontSize:18,marginStart:20}}>Avatar</Text>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginVertical:5}}>
                    <UserProfileIcon width={70} height={70} borderWidth={1} borderColor={'#ced2d9'}
                        borderRadius={50} overflow={'hidden'}/> 
                    <Pressable style={{width:120,height:45,backgroundColor:'#495E57',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                        <Text style={{color:'white',fontFamily:'Karla-Regular',fontSize:18}}>Change</Text>
                    </Pressable>
                    <Pressable style={{width:120,height:45,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:10,borderColor:'#495E57',borderWidth:1}}>
                        <Text style={{color:'#495E57',fontFamily:'Karla-Regular',fontSize:18}}>Remove</Text>
                    </Pressable>
                </View>
                <Text style={Styles.label}>First Name</Text>
                <TextInput style={Styles.textInput} placeholder='Salma'/>
                <Text style={Styles.label}>Last Name</Text>
                <TextInput style={Styles.textInput} placeholder='Zaki'/>
                <Text style={Styles.label}>Email</Text>
                <TextInput style={Styles.textInput} placeholder='email@email.com'/>
                <Text style={Styles.label}>Phone Number</Text>
                <TextInput style={Styles.textInput} placeholder='(0120) 1234 5678'/>
                <Text style={Styles.label}>Email Notification</Text>
                <View style={Styles.checkBox}>
                    <CheckBox value={true} tintColors={{true:'#495E57'}} onValueChange={() => {}}/>
                    <Text style={{width:'30%'}}>Order Statuses</Text>
                    <CheckBox value={true} tintColors={{true:'#495E57'}} onValueChange={() => {}}/>
                    <Text>Password Changes</Text>
                </View>
                <View style={Styles.checkBox}>
                    <CheckBox value={true} tintColors={{true:'#495E57'}} onValueChange={() => {}}/>
                    <Text style={{width:'30%'}}>Special Offers</Text>
                    <CheckBox value={true} tintColors={{true:'#495E57'}} onValueChange={() => {}}/>
                    <Text>Newsletter</Text>
                </View>
                <View style={{marginVertical:10,width:'100%',alignItems:'center'}}>
                    <Pressable style={{width:'80%',height:45,backgroundColor:'#F4CE14',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                            <Text style={{color:'white',fontFamily:'Karla-Regular',fontSize:18}}>Save Changes</Text>
                    </Pressable>
                    <View style={{flexDirection:'row',width:'80%',justifyContent:'space-between',marginTop:10}}>
                        <Pressable style={{width:'48%',height:45,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:10,borderColor:'#495E57',borderWidth:1}}>
                            <Text style={{color:'#495E57',fontFamily:'Karla-Regular',fontSize:16}}>Discard Changes</Text>
                        </Pressable>
                        <Pressable style={{width:'48%',height:45,backgroundColor:'#495E57',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                            <Text style={{color:'white',fontFamily:'Karla-Regular',fontSize:18}}>Log out</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}

const Styles = StyleSheet.create({
    label:{fontFamily:'Karla-Regular',color:'grey',fontSize:18,marginStart:20,marginTop:10}
    , textInput:{borderRadius:10,borderWidth:1,borderColor:'#495E57',width:'80%',height:40,marginStart:20,fontSize:16,paddingStart:10}
    , checkBox: {flexDirection:'row',marginStart:20,alignItems:'center'}
})