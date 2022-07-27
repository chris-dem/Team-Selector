import {LogBox, StyleSheet   } from 'react-native';
import {StartComponent} from "./Components/StartComponent"
// import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {HomeComponent} from "./Components/HomeComponent"
import { RateComponent } from './Components/RateComponent';
import { ResultComponent } from './Components/ResultComponent';
import { AboutComponent } from './Components/AboutComponent';
const Stack = createNativeStackNavigator();





export default function App() {

LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'screenOptions={{
          title : "Team Selector",
          headerStyle: {
            backgroundColor: '#7d12ff',
          },
          headerTintColor: '#39FF14',
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}>
        <Stack.Screen name = 'Home'   component={HomeComponent}   />
        {/* <Stack.Screen name = 'About'   component={AboutComponent}   /> */}
        <Stack.Screen name = 'Start'  component={StartComponent}  />
        <Stack.Screen name = 'Rate'   component={RateComponent}  />
        <Stack.Screen name = 'Result' component={ResultComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


