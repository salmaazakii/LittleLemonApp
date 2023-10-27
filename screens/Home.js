import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import {fetchMenufromDB,setMenuToDB,openDatabase,closeDatabase} from '../src/Database'

function Header({...props}) {
    return(
        <View style={Styles.header}>
            <View style={Styles.logo}>
                <Image source={require('../assets/images/Logo.png')} resizeMode="contain"/>
            </View>
            <Pressable 
                style={Styles.profileImgView}
                onPress={() => props.onRequestProfile()}
            >
                <Image source={require('../assets/images/profile.jpg')} style={Styles.profileImg}  resizeMode="contain"/>
            </Pressable>
        </View>
    );
}

export default Home= ({route,navigation}) => {

    const [menu, setMenu] = useState([])
    useEffect(() => {
        async function fetchData() {
          openDatabase();
          try {
            // Wait for the promise to resolve
            const menuItems = await fetchMenufromDB();
            if (menuItems.length === 0) {
              fetchMenuOnline();
            } else {
              setMenu(menuItems);
            }
          } catch (error) {
            console.log(error);
          }
          // Close the database connection
          closeDatabase();
        }
        // Call the async function
        fetchData();
      }, []);
    const fetchMenuOnline = () => {
        fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
        .then(data => data.json())
        .then(data=> {
            setMenu(data.menu)
            saveData(data.menu)
        })
    }
    const saveData = (data) => {
        setMenuToDB(data)
    }
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
            <Header onRequestProfile={() => navigation.navigate('Profile')}/>
            <View style={{margin:10}}>
                <FlatList
                    data={menu}
                    keyExtractor={(item) => item.index}
                    key={(item) => item.index}
                    ItemSeparatorComponent={ (props) => {
                        return (
                            <View key={props.leadingItem.name} style={Styles.listSeparator}></View>
                        )}
                    }
                    renderItem={(item)=> {
                        menuItem = item.item
                        return(
                        <View key={item.index} style={Styles.listItem}>
                            <View style={{width:'70%'}}>
                                <Text style={Styles.itemTitle}>{menuItem.name}</Text>
                                <Text style={Styles.itemDescription}>{menuItem.description}</Text>
                                <Text style={Styles.itemPrice}>{menuItem.price}$</Text>
                            </View>
                            <View>
                                <Image width={100} height={100} style={{backgroundColor:'#e8eaed'}} resizeMode="cover" source={{uri:`https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${menuItem.image}?raw=true`}} />
                            </View>
                        </View>
                    )}
                }
                />
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    header:{
        width: '100%'
        , height:'10%'
        , flexDirection: 'row'
        , alignItems: 'center'
        , justifyContent:'center'
        , backgroundColor:'white'
    }
    , logo:{
        alignItems:'center'
        , justifyContent:'center'
        , width:200
        , height:50
    }
    , profileImgView:{
        position:'absolute'
        , end:5
    }
    , profileImg:{
        width:60
        , height:60
        , borderRadius:40
    }
    ,listSeparator : {
        width:'100%'
        , height:2
        , backgroundColor:'#e8eaed'
    }
    , listItem:{flexDirection:'row', padding:15,alignItems:'center'}
    , itemTitle:{color:'black',fontFamily:'Karla-Bold',fontSize:20, marginBottom:5}
    , itemDescription:{fontFamily:'Karla-Regular',fontSize:16}
    , itemPrice: {fontFamily:'Karla-Bold',fontSize:20,marginTop:5,fontWeight:'bold'}
});