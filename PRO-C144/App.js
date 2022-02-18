import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { Icon } from "react-native-elements";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/home';
import PopularScreen from './screens/popular';
import RecommendationScreen from './screens/recommendation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RFValue } from "react-native-responsive-fontsize"

export default function App() {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerTintColor:"#23404f",
          headerStyle: {
            backgroundColor: '#82a5b8'
          },
        }}>
        <AppStack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={()=>{navigation.navigate("Search")}}>
                <Icon iconStyle={{color:"#23404f", marginRight:RFValue(6)}} name="search"/>
              </TouchableOpacity>
            )
          })}
        />
        <AppStack.Screen
          name="Search"
          component={Home}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  return(
    <Tab.Navigator>
      <Tab.Screen
        name='Popular'
        component={PopularScreen}
      />
      <Tab.Screen
        name='Recommended'
        component={RecommendationScreen}
      />
    </Tab.Navigator>
  );
}

const AppStack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()