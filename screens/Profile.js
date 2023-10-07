import React,{useState} from 'react';
import {View, Image, Text, Pressable,TextInput, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import CheckBox from '@react-native-community/checkbox';
import { MaskedTextInput } from "react-native-mask-text";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {setProfileData, setUserSetupCompleted} from '../src/Config'

function UserProfileIcon(props){
    return(
        <View style={{backgroundColor:'white',alignItems:'center',justifyContent:'center' , ...props}}>
            <Image source={require('../assets/images/profile.jpg')} style={{width:'70%',height:'80%'}} alt='Image by juicy_fish on Freepik'/>
        </View>
    );
}

export default function Profile({route,navigation}){

    const [firstName, setFirstName] = useState(route.params.firstName)
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState(route.params.email)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [IsOrderStatusEnabled, setOrderStatus] = useState(true)
    const [IsPasswordChangesEnabled, setPasswordChanges] = useState(true)
    const [IsSpecialOffersEnabled, setSpecialOffers] = useState(true)
    const [IsNewsletterEnabled, setNewsletter] = useState(true)
    
    async function  PickImage() {
        const result = await launchImageLibrary();
    }

    return (
        <LinearGradient colors={['#f5e7ae','#faf8f2']} style={{flex:1, alignItems:'center'}}>
            <View style={{width:'100%',height:'10%',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                <View style={{width:40,height:40,borderRadius:20,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                    <Pressable onPress={() => {
                        try{
                            navigation.pop()
                        } catch(e) {
                            console.log('Could not navigate back from profile screen, due to:', e)
                        }
                    }}>
                        <FontAwesomeIcon icon={faArrowLeft} color='#495E57' size={26}/>
                    </Pressable>
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
                    <Pressable style={{width:120,height:45,backgroundColor:'#495E57',alignItems:'center',justifyContent:'center',borderRadius:10}}
                        onPress={async() => await PickImage()}
                    >
                        <Text style={{color:'white',fontFamily:'Karla-Regular',fontSize:18}}>Change</Text>
                    </Pressable>
                    <Pressable style={{width:120,height:45,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:10,borderColor:'#495E57',borderWidth:1}}>
                        <Text style={{color:'#495E57',fontFamily:'Karla-Regular',fontSize:18}}>Remove</Text>
                    </Pressable>
                </View>
                <Text style={Styles.label}>First Name</Text>
                <TextInput style={Styles.textInput} value={firstName} onValueChange={(val) => setFirstName(val)}/>
                <Text style={Styles.label}>Last Name</Text>
                <TextInput style={Styles.textInput} placeholder='Zaki' value={lastName} onValueChange={(val) => setLastName(val)}/>
                <Text style={Styles.label}>Email</Text>
                <TextInput style={Styles.textInput} value={email} onValueChange={(val) => setEmail(val)}/>
                <Text style={Styles.label}>Phone Number</Text>
                <MaskedTextInput style={Styles.textInput} mask='999.999.999' placeholder='122.158.169' value={phoneNumber} onValueChange={(val) => setPhoneNumber(val)}/>
                <Text style={Styles.label}>Email Notification</Text>
                <View style={Styles.checkBox}>
                    <CheckBox value={IsOrderStatusEnabled} tintColors={{true:'#495E57'}} onValueChange={(val) => setOrderStatus(val)}/>
                    <Text style={{width:'30%'}}>Order Statuses</Text>
                    <CheckBox value={IsPasswordChangesEnabled} tintColors={{true:'#495E57'}} onValueChange={(val) => setPasswordChanges(val)}/>
                    <Text>Password Changes</Text>
                </View>
                <View style={Styles.checkBox}>
                    <CheckBox value={IsSpecialOffersEnabled} tintColors={{true:'#495E57'}} onValueChange={(val) => setSpecialOffers(val)}/>
                    <Text style={{width:'30%'}}>Special Offers</Text>
                    <CheckBox value={IsNewsletterEnabled} tintColors={{true:'#495E57'}} onValueChange={(val) => setNewsletter(val)}/>
                    <Text>Newsletter</Text>
                </View>
                <View style={{marginVertical:10,width:'100%',alignItems:'center'}}>
                    <Pressable style={{width:'80%',height:45,backgroundColor:'#F4CE14',alignItems:'center',justifyContent:'center',borderRadius:10}}
                        onPress={async () => {
                            await setUserSetupCompleted()
                            await setProfileData({
                                firstName
                                , lastName
                                , email
                                , phoneNumber
                                , IsOrderStatusEnabled
                                , IsPasswordChangesEnabled
                                , IsSpecialOffersEnabled
                                , IsNewsletterEnabled
                            })
                        }}
                    >
                            <Text style={{color:'white',fontFamily:'Karla-Regular',fontSize:18}}>Save Changes</Text>
                    </Pressable>
                    <View style={{flexDirection:'row',width:'80%',justifyContent:'space-between',marginTop:10}}>
                        <Pressable style={{width:'48%',height:45,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:10,borderColor:'#495E57',borderWidth:1}}>
                            <Text style={{color:'#495E57',fontFamily:'Karla-Regular',fontSize:16}}>Discard Changes</Text>
                        </Pressable>
                        <Pressable style={{width:'48%',height:45,backgroundColor:'#495E57',alignItems:'center',justifyContent:'center',borderRadius:10}}
                            onPress={()=>{
                                setProfileData(null)
                                navigation.navigate('Onboarding')
                            }}
                        >
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