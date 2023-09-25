import {View,Image,TextInput,Button} from 'react-native'

function Header(){
    return(
        <View style={{width:'100%',height:'20%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../assets/images/Logo.png')} style={{width:'70%',height:70}}/>
        </View>
    );
}
export default function Onboarding(){
    return(
        <View style={{flex:1,backgroundColor:'red'}}>
            <Header />
        </View>
    );
}