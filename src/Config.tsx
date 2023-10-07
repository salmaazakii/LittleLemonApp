import AsyncStorage from '@react-native-async-storage/async-storage';

const IS_SETUP_COMPLETED_KEY: string = 'setup-completed'
const PROFILE_DATA_KEY: string = 'setup-completed'

export const setUserSetupCompleted = async() => {
    await storeData(IS_SETUP_COMPLETED_KEY,'1')
}
export const IsUserSetupCompleted = async(): Promise<boolean> => {
    return (await getData(IS_SETUP_COMPLETED_KEY) !== null)
}
export const setProfileData = async(value:Object) => {
  await storeData(PROFILE_DATA_KEY,JSON.stringify(value))
}
export const GetProfileData = async(): Promise<Object> => {
  const result = await getData(PROFILE_DATA_KEY)
  return JSON.parse(result !== null ? result : '')
}


const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('Could not save value to Async Storage, due to:', e)
    }
  };
const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
        console.error('Could not read value from Async Storage, due to:', e)
    }
    return null;
  };