import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Modal,
  Portal,
  Text,
  Provider,
  ActivityIndicator,
  Colors,
  configureFonts,
  DefaultTheme,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import AuthContext from './screens/Auth/context';
import MainState from './screens/Context/MainState';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/Auth/AuthScreen';
import QuickPayScreen from './screens/QuickPayScreen';
import StbDetailsScreen from './screens/StbDetailsScreen';
import PackageScreen from './screens/Packs/PackageScreen';
import ChannelScreen from './screens/Packs/ChannelScreen'
import RaiseComplaint from './screens/RaiseCompaint'

//Navigators Imports
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ReqPackScreen from './screens/ReqPackScreen';
import UserRequestScreen from './screens/UserRequestScreen';
import UserComplaintScreen from './screens/UserComplaintScreen';
import PaymentReport from './screens/PaymentReports';
import UserAccount from './screens/UserAccount';

const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator()
const BottomTab = createMaterialBottomTabNavigator()



//Tab Navigations
const TopTabScreen = () =>(
  <TopTab.Navigator 
  
  
  tabBarOptions={{
    showIcon:true,
    
    labelStyle:{
      fontSize:18,
      color:'#fafafa'
    },
    activeTintColor:'#7F00FF',
    indicatorStyle:{
      backgroundColor:'#fafafa',
    },
    style:{
        backgroundColor:'#7F00FF'
    },
    
    
 
  }}>
    <TopTab.Screen name="Packages" component={PackageScreen} options={{tabBarIcon:() => <MCIcon name="cart" size={25} color="white" />}}/>
    <TopTab.Screen name="Channels" component={ChannelScreen} options={{tabBarIcon:() => <MCIcon name="monitor" size={25} color="white" />}}/>
  </TopTab.Navigator>
)







const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerTitleStyle: {
        textAlign: 'center',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#7f00ff',
      },
      headerShown:false
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      
    />
    <HomeStack.Screen name="STB Details" component={StbDetailsScreen} />
    <HomeStack.Screen name="Payment Reports" component={PaymentReport} />
    <HomeStack.Screen name='Request Packages' component={ReqPackScreen} />
    <HomeStack.Screen name='Raise Complaint' component={RaiseComplaint} />
    <HomeStack.Screen name="Select Packages" component={TopTabScreen} options={{headerShown:true}}/>
    <HomeStack.Screen name="My Account" component={UserAccount} />
  </HomeStack.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#7f00ff',
      },
      headerTintColor: 'white',
      headerTitleAlign: 'center',
    }}>
    <AuthStack.Screen
      name="AuthScreen"
      component={AuthScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="QuickPay"
      component={QuickPayScreen}
      options={{title: 'Quick Pay'}}
    />
  </AuthStack.Navigator>
);

const BottomTabScreen =() =>(
  <BottomTab.Navigator
  initialRouteName='Home'
  barStyle={{backgroundColor:'#7f00ff'}}
  >
  <BottomTab.Screen name='Home'  component={HomeStackScreen} 
  options={{
    tabBarIcon: ({ color }) => (
      <Icon name="home" size={26} color={color} />
    ),
  }}/>
  <BottomTab.Screen name='Requests'  component={UserRequestScreen} 
  options={{
    tabBarIcon: ({ color }) => (
      <Icon  name="monitor" size={25} color={color} />
    ),
  }}/>
  <BottomTab.Screen name='Complaints'  component={UserComplaintScreen} 
  options={{
    tabBarIcon: ({ color }) => (
      <MIcon name="error" size={26} color={color} />
    ),
  }}/>

</BottomTab.Navigator>
)
const App = () => {
  const [state,setState] = useState({
      token:'',
      userid:'',
      username:'',
      email:'',
  })
  const [visible, setVisible] = useState(false);
  const _showModal = () => setVisible(true);
  const _hideModal = () => setVisible(false);
  async function retrieveToken() {
    try {
      let usercred = await AsyncStorage.getItem('user');
      let uservalue = JSON.parse(usercred)
      console.log(uservalue)
      if (usercred) {
        setTimeout(() => {
          _showModal();
        }, 1000);


        setTimeout(() => {
          setState({
            ...state,
            token:uservalue.token,
            userid:uservalue.user_id,
            username:uservalue.username
          })
     
          _hideModal();
        }, 1000);
      }
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }

  const AutoLoginModal = () => (
    <Portal>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Modal
          visible={visible}
          onDismiss={_hideModal}
          contentContainerStyle={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            width: 300,
            borderRadius: 20,
            marginLeft: '11%',
          }}>
          <ActivityIndicator animating={true} color={Colors.red800} size={40} />
          <Text style={{paddingTop: 5, fontSize: 18, color: 'purple'}}>
            Please wait user auto logging in
          </Text>
        </Modal>
      </View>
    </Portal>
  );

  useEffect(() => {
    retrieveToken();
  }, []);

  return (
    
      <AuthContext.Provider
        value={{
          userstate:state,
          token: state.token,
          setUserState: setState,
          userid: state.userid,
    
        }}>
          <MainState>
        <NavigationContainer>
          {state.token ? 
          <BottomTabScreen/>
         
          : 
          <AuthStackScreen />}
        </NavigationContainer>
        </MainState>
      </AuthContext.Provider>
   
  );
};

export default App;
