import React,{useState} from 'react'
import {View,Text,StyleSheet,Image,StatusBar} from 'react-native'
import SelectButtons from './SelectButtons'
import LoginCard from './LoginCard'
import RegisterCard from './RegisterCard'
import * as Animatable from 'react-native-animatable'


function AuthScreen({navigation}) {
    const [screenMode,setScreenMode] = useState('buttons')
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#7f00ff" />

            
            <View style={styles.header}>
                    <Animatable.Image source={require('../../assets/logo.png')} 
                    style={styles.logo} 
                    animation='bounceIn'
                    duration={1500}/>
                    <Text style={{color:'white',fontSize:20,}}>Make Payments With Ease</Text>
            </View>
            
            <View style={{flex:2,}}>
            {
               screenMode =='buttons' 
               ?
               <SelectButtons setScreenMode={setScreenMode} navigation={navigation}/>

               :
               screenMode === 'login' ? <LoginCard setScreenMode={setScreenMode}/>
               :screenMode ==='register'?<RegisterCard setScreenMode={setScreenMode}/>:null
           }
            </View>
          
       
 </View>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#7f00ff',
        flexDirection:'column',
        alignItems:'stretch',
        
        
    

    },
    logo:{
        height:180,
        width:180,
        marginBottom:10,
    },
    header:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    },
    inputs:{
        flex:2,
        alignItems:'center',
        justifyContent:'center',

    
    },
    btnContentStyle:{
        height:45,
        width:300,
       
    },
    quickPayBtn:{

        backgroundColor:'white',
        marginBottom:20,
        borderRadius:20,

    },
    loginBtn:{

        backgroundColor:'white',
        borderRadius:20,
        marginBottom:20,
  

    }
    
})