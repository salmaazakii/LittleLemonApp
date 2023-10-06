import {View,Image,TextInput,Pressable,Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import {setUserSetupCompleted} from '../src/Config'

function Header(){
    return(
        <View style={{width:'100%',height:'20%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../assets/images/Logo.png')} style={{width:'70%',height:70}}/>
        </View>
    );
}
export default function Onboarding(){
    return(
        <LinearGradient colors={['#f5e7ae','#faf8f2']} style={{flex:1, alignItems:'center'}}>
            <Header />
            <Text style={{marginTop:20,fontSize:20,fontWeight:'500', color:'#495E57',fontFamily:'Karla-Regular'}}>Let us get to know you</Text>
            <View style={{marginVertical:20,alignItems:'flex-start',width:'70%',height:'20%',justifyContent:'space-between'}}>
                <Text style={{fontFamily:'Karla-Regular',fontSize:16}}>First Name</Text>
                <TextInput style={{borderRadius:10,borderWidth:1,width:'100%'}}></TextInput>
                <Text style={{fontFamily:'Karla-Regular',fontSize:16,marginTop:20}}>Email</Text>
                <TextInput style={{borderRadius:10,borderWidth:1,width:'100%'}}></TextInput>
            </View>
            <Pressable 
                style={{marginTop:20,width:'25%',height:50,backgroundColor:'#495E57',borderRadius:10,alignItems:'center',justifyContent:'center'}}
                onPress={async ()=> await setUserSetupCompleted()}    
            >
                <Text style={{color:'white',fontSize:18}}>Next</Text>
            </Pressable>
        </LinearGradient>
    );
}