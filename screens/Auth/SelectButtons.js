import React from 'react'
import {View,Text,StyleSheet,Image,StatusBar} from 'react-native'
import {TextInput,Button,Colors} from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
function SelectButtons({setScreenMode,navigation}) {
    return (
        <Animatable.View style={styles.inputs} animation="fadeInLeft">
                    <Button mode="outlined" 
                    icon="contactless-payment" 
                    labelStyle={{fontSize:20,color:'#fafafa'}} 
                    style={styles.quickPayBtn} 
                    contentStyle={styles.btnContentStyle}
                    onPress={() =>{navigation.navigate('QuickPay')}}
                    >Quick Pay</Button>

                    <Button  
                    icon="login-variant"
                    mode="outlined"  
                    labelStyle={{fontSize:20,color:"#E100FF"}} 
                    contentStyle={styles.btnContentStyle}
                    onPress={() =>{setScreenMode('login')}}
                    style={styles.loginBtn} >
                        Login</Button>
                        <Button  
                    icon="account-check"
                    mode="outlined"  
                    labelStyle={{fontSize:20,color:"#E100FF"}} 
                    contentStyle={styles.btnContentStyle}
                    onPress={() =>{setScreenMode('register')}}
                    style={styles.loginBtn} >
                        Register</Button>
            </Animatable.View>
    )
}

export default SelectButtons

const styles = StyleSheet.create({

    inputs:{
        flex:2,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:10
    
    },
    btnContentStyle:{
        height:45,
        width:300,
       
    },
    quickPayBtn:{

        backgroundColor:"#E100FF",
        marginBottom:30,
        borderRadius:20,

    },
    loginBtn:{

        borderColor:"#E100FF",
        borderWidth:1,
        borderRadius:20,
        marginBottom:30,
  

    }
    
})