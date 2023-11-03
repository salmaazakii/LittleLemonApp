import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View, FlatList, ImageBackground, TextInput } from "react-native";
import {fetchMenufromDB,fetchCategoriesfromDB,setMenuToDB,openDatabase,closeDatabase} from '../src/Database'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'

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
    const [categories,setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        async function fetchData() {
          openDatabase();
          try {
            // Wait for the promise to resolve
            const menuItems = await fetchMenufromDB(selectedCategories,searchText);
            if (menuItems.length === 0) {
              fetchMenuOnline();
            } else {
                setMenu(menuItems);
                const categories = await fetchCategoriesfromDB()
                setCategories(categories)
            }
          } catch (error) {
            console.log(error);
          }
          // Close the database connection
          closeDatabase();
        }
        // Call the async function
        fetchData();
      }, [selectedCategories,searchText]);
    const fetchMenuOnline = () => {
        try{
            fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
            .then(data => data.json())
            .then(data=> {
                setMenu(data.menu)
                saveData(data.menu)

                var categoriesSet = new Set()
                data.menu.forEach((item) => {
                    categoriesSet.add(item.category)
                })
                setCategories([...categoriesSet])
            })
            .catch(error => console.log(error))
        } catch(error) {
            console.log(error)
        }
    }
    const saveData = (data) => {
        setMenuToDB(data)
    }
    const handleSearch = (text) => {
        setTimeout(() => {
            setSearchText(text);
        }, 500)
      };
    console.log(categories)
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
            <Header onRequestProfile={() => navigation.navigate('Profile')}/>
            <View style={{width:'100%', backgroundColor:'#495E57'}}>
                <ImageBackground source={require('../assets/images/Heroimage.png')} resizeMode="cover">
                    <View style={{backgroundColor:'rgba(0,0,0,0.6)', padding:10}}>
                        <Text style={{fontFamily:'MarkaziText-Regular', fontSize:42, color:'#F4CE14'}}>Little Lemon</Text>
                        <Text style={{fontFamily:'Karla-Regular', fontSize:22, color:'white'}}>Chicago</Text>
                        <Text style={{fontFamily: 'Karla-Meduim', fontSize:18, color:'white'}}>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                        <View style={{width:'95%',height:40, backgroundColor:'white', borderRadius:10,marginVertical:10, flexDirection:'row'}}>
                            <View style={{margin: 10}}>
                                <FontAwesomeIcon icon={faSearch} color='#495E57' size={18}/>
                            </View>
                            <TextInput style={Styles.textInput} placeholder="Search" value={searchText} onChangeText={handleSearch}/>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style={{width:'100%', height:100}}>
                <Text style={{fontSize:22,color:'black',margin:10,fontFamily:'Karla-Bold'}}>ORDER FOR DELIVERY!</Text>
                <FlatList
                    horizontal
                    style={{width:'100%',marginVertical:5}}
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    key={(item) => item.index}
                    renderItem={(item)=> {
                        const categoryName = item.item
                        var itemIndex=-1;
                        return(
                            <Pressable onPress={()=>{
                                var selCategoriesCopy = selectedCategories.slice()
                                itemIndex = selCategoriesCopy.indexOf(categoryName)
                                if (itemIndex >= 0){
                                    selCategoriesCopy.splice(itemIndex,1)
                                } else {
                                    selCategoriesCopy.push(categoryName)
                                }
                                setSelectedCategories(selCategoriesCopy)
                            }}>
                                <View style={{backgroundColor:(selectedCategories.indexOf(categoryName) < 0 ? '#f2ecd3' : '#cca916'),marginHorizontal:5,padding:10, borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize:18, fontFamily:'Karla-Regular',includeFontPadding:false, color:(selectedCategories.indexOf(categoryName) < 0 ? '#cca916' : 'white')}}>{categoryName}</Text>
                                </View>
                            </Pressable>
                        )
                    }}
                />
            </View>
            <View style={Styles.listSeparator}></View>
            <View style={{margin:10}}>
                <FlatList style={{height:'46%'}}
                    data={menu}
                    keyExtractor={(item) => item.index}
                    key={(item) => item.index}
                    showsVerticalScrollIndicator={false}
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
    , textInput:{fontSize:16, width:'80%'}
});