import React, { useState, useContext } from 'react'
import {View,Text,StyleSheet,ScrollView,Dimensions,KeyboardAvoidingView,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import * as Animatable from 'react-native-animatable'
import {TextInput, Button,Colors,FAB} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {apiUri} from '../../Constants'
import AuthContext from './context'

function RegisterCard({setScreenMode}) {
    const [state,setState] = useState({
        username:'',
        password:'',
        hidePassword:true,


    })
    const authContext = useContext(AuthContext)
    const {setUserState,userstate} = authContext;



    async function loginCustomer(){
      try {
        let response = await fetch(apiUri+'api-token-auth/',{
            method:'POST',
            headers:{
                 Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:state.username,
                password:state.password,


            })
        });
        let res = await response.json()
        if(response.ok){
            await AsyncStorage.setItem('user',JSON.stringify(res))
            console.log('Data successfully saved')
                setUserState({
                    ...userstate,
                    token:res.token,
                    userid:res.user_id,
                    username:res.username

                })
        }else{
            console.log(res)
        }
          
      } catch (error) {
          console.log(error.messages)
      }
    }
    return (
       

        <KeyboardAwareScrollView 
        scrollEnabled={true}
        contentContainerStyle={{
            position:'absolute',
            top:0,
        }}
        >

            
       
       
            <Animatable.View 
            style={styles.card} animation="fadeInUp">
            <View>  
            <View style={{height:45,width:300,marginBottom:50,marginTop:20}}>
             <View style={{position:'absolute',left:0,top:20,zIndex:1}}>
             <Icon name="account" size={30} />
             </View>
           
             <TextInput 
                   label="Username"
                   value={state.username}
                   onChangeText={txt => setState({...state,username:txt})}
                   mode="flat"
                   dense={true}
                   style={{
                       height:65,
                       fontSize:20,
                       backgroundColor:'white',
                       paddingLeft:25,
                       
                   }}                     
                />
                {
                    state.username.length >3?
                    <View style={{position:'absolute',right:0,top:20,zIndex:1}}>
                    <Icon name="checkbox-marked-circle-outline" size={30} color="green" />
                   </View>
                :
                    null
                }
                
            </View>
            <View style={{height:45,width:300,marginBottom:30}}>
            <View style={{position:'absolute',left:0,top:20,zIndex:1}}>
            <Icon name="lock" size={30} />
            </View>
            <TextInput 
                   label="Password"
                   secureTextEntry={state.hidePassword}
                   value={state.password}
                   onChangeText={txt => setState({...state,password:txt})}
                   mode="flat"
                   dense={true}
                   style={{
                    height:65,
                    fontSize:20,
                    backgroundColor:'white',
                    paddingLeft:25,
                       
                   }}                     
                />
                 {
                    state.hidePassword?
                    <View style={{position:'absolute',right:0,top:20,zIndex:1}}>
                        <TouchableOpacity onPress={() => setState({...state,hidePassword:false})}>
                        <Icon name="eye-off" size={30} color="black" />
                        </TouchableOpacity>
                   </View>
                :
                <View style={{position:'absolute',right:0,top:20,zIndex:1}}>
                <TouchableOpacity onPress={() => setState({...state,hidePassword:true})}>
                <Icon name="eye" size={30} color="black" />
                </TouchableOpacity>
                 </View>
                }

            </View>
         

           <View style={{marginTop:50,}}>
           <View style={{marginTop:5}}>
                <Button
                mode="outlined"
                contentStyle={styles.btnContentStyle}
                style={styles.loginBtn}
                color='white'
                icon="login-variant"
                onPress={loginCustomer}
                >
                    Login
                </Button>
            </View>
            <View style={{height:100,marginTop:20}}>
            <FAB
                style={styles.fab}
                label='back'
                color="white"
                icon="arrow-left"
                onPress={() => setScreenMode('buttons')}
            />    
            </View> 
            
            </View>     
           
            </View>   
            
            

            </Animatable.View>
            

  

    
        </KeyboardAwareScrollView>
        
    )
}

export default RegisterCard
const styles = StyleSheet.create({
    card:{
        flex:2,
        width:Dimensions.get('screen').width,
        height:500,
        backgroundColor:'white',
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:10,
        borderRadius:10,


    },
    btnContentStyle:{
        height:45,
        width:300,
       
       
    },
    loginBtn:{

        backgroundColor:Colors.pinkA200,
        borderRadius:20,
        marginBottom:20,
  

    },
    regBtn:{
        borderColor:Colors.pinkA200,
        borderWidth:2,
        borderRadius:20,
        marginBottom:20,
    }

})