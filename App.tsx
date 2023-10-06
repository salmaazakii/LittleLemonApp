import 'react-native-gesture-handler';
import React from 'react';
import Onboarding from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import SplashScreen from './screens/SplashScreen';
import Profile from './screens/Profile';
import { IsUserSetupCompleted } from './src/Config';

const Stack = createNativeStackNavigator();
class App extends React.Component {
  state:any;

  constructor(props:any){
    super(props)
    this.state = {
      isLoading: true
      , isOnboardingCompleted: false
    }
  }

  async componentDidMount(): Promise<void> {
    await IsUserSetupCompleted()
    .then((result:boolean)=> {
      this.setState((prevState)=>{
        return {
          ...prevState
          , isOnboardingCompleted : result
          , isLoading : false
        }
      })
    })
  }

  render() {
    return (
    <NavigationContainer>
      {
        this.state.isLoading
        ? <SplashScreen/>
        : 
        <Stack.Navigator screenOptions={{headerShown:false}}>
          {
            this.state.isOnboardingCompleted
            ? <Stack.Screen 
                name={'Profile'}
                component={Profile}
              />
            : <>
              <Stack.Screen 
                name={'Onboarding'}
                component={Onboarding}
              />
              <Stack.Screen 
                name={'Profile'}
                component={Profile}
              />
              </>
          }
        </Stack.Navigator>
      }
    </NavigationContainer>
    );
  }
}

export default App;