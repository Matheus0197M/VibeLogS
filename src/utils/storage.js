const isWeb = typeof window !== ’undefined’ && window.localStorage;

 const storage = {
 async getItem(key) {
 if (isWeb) {
 const item = window.localStorage.getItem(key);
 return item ? JSON.parse(item) : null;
 }
 const AsyncStorage = require(’@react-native-async-storage/async
storage’).default;
 const item = await AsyncStorage.getItem(key);
 return item ? JSON.parse(item) : null;
 },

 async setItem(key, value) {
 const json = JSON.stringify(value);
 if (isWeb) {
 window.localStorage.setItem(key, json);
 return;
 }
 const AsyncStorage = require(’@react-native-async-storage/async
orage’).default;
 await AsyncStorage.setItem(key, json);
 },

 async removeItem(key) {
 if (isWeb) {
 window.localStorage.removeItem(key);
 return;
 }
 const AsyncStorage = require(’@react-native-async-storage/async
orage’).default;
 await AsyncStorage.removeItem(key);
 }
 };

 export default storage;