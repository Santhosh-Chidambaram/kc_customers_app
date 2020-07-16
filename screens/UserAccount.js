import React, { useState,useContext } from 'react'
import { View, Text,StyleSheet,Dimensions ,TextInput} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import {Colors,Button,RadioButton} from 'react-native-paper'
import AuthContext from './Auth/context';
import {apiUri} from '../Constants'
import AsyncStorage from '@react-native-community/async-storage'
import Header from './Layout/Header'
export default function UserAccount({route,navigation}) {
    const {conlen} = route.params;
    const authContext = useContext(AuthContext)
    const {userstate,setUserState} = authContext;

    const logout = async() =>{
            try {
                await AsyncStorage.removeItem('user')
                setUserState({...userstate,token:''})
            } catch (error) {
                console.log(error)
            }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Header title="My Account" back={true} navigation={navigation}/>
            </View>
            <View style={styles.body}>
            <LinearGradient
                useAngle={true}
                angle={145}
                angleCenter={{x: 0.7, y: 0.7}}            
    
                colors={['#8E2DE2','#4A00E0',]} 
                style={styles.card}>
                    <View >
                            <Text style={[styles.cardText,{textAlign:'center'}]}>Account Details</Text>
                            <View style={{borderBottomWidth:2,borderBottomColor:'white'}}></View>
                    </View> 
                    <View style={{marginTop:20}}>
                        
                        <Text style={styles.cardText}>LCO Admin :</Text>
                        <Text style={{fontSize:18,color:'white'}} >Kumars Cable Network</Text> 
                    </View>
                    <View style={{marginTop:20}}>
                        
                        <Text style={styles.cardText}>Username :</Text>
                        <Text style={{fontSize:18,color:'white'}} >{userstate.username}</Text> 
                    </View>
                    <View style={{marginTop:20}}>
                        
                        <Text style={styles.cardText}>Password: </Text>
                        <Text style={{fontSize:18,color:'white'}} >*********</Text>
                    </View>
                    <View style={{marginTop:20}}>
                        
                        <Text style={styles.cardText}>Total Connections : </Text>
                        <Text style={{fontSize:18,color:'white'}} >{conlen}</Text>
                    </View>
                    <View style={{marginTop:20}}>
                     <Button 
                     mode="outlined"
                     icon="exit-to-app"
                     color="white"
                     style={{
                         borderColor:'white',
                         borderWidth:2
                     }}
                     onPress={() =>logout()}
                     >
                        Logout
                    </Button>
                </View>   

                </LinearGradient>
                   
            </View>
            
           

        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',

    },

    body:{
         
         flex:1, 
         flexDirection:'column',
         alignItems:'center'  
    },

    card:{
        width:Dimensions.get('screen').width-20,
        flexDirection:'column',
        height:500,
        marginTop:25,
        backgroundColor:'orange',
        padding:20,
        
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:10,
        borderRadius:15,
    },
    payBtn:{
        flexDirection:'row',
        marginTop:20,
        height:40,
        width:330,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:10,
        backgroundColor:'white',
     

    },
    name:{
          color:'black',
          fontWeight:'bold',
          fontSize:20,

    },
    cardText:{
          color:'white',
          fontWeight:'bold',
          fontSize:20,
          marginBottom:10,
          
    },

    item:{
        marginTop:20,
        height:80,
        width:330,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        backgroundColor:'white',
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:10,
        borderRadius:10,
        marginBottom:25,
    },
    itemText:{
        color:'white',
        fontSize:18
        
    }
})