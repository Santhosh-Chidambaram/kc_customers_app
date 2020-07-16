import React, { useState,useContext } from 'react'
import { View, Text,StyleSheet,Dimensions ,TextInput} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import {Colors,Button,RadioButton} from 'react-native-paper'
import {Picker} from '@react-native-community/picker';
import AuthContext from './Auth/context';
import {apiUri} from '../Constants'
import Header from './Layout/Header'



export default function RaiseCompaint({navigation}) {
    const authContext = useContext(AuthContext)
    const {userid,token} = authContext;

    const [state,setState] = useState({
        complaint_type:'service',
        complaint:'',
        remarks:'',

    })

    async function sendComplaintForm(){

        try {
            let response = await fetch(apiUri+'api/customer/complaint',{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Token '+token
              },
              body: JSON.stringify({
                customer: userid,
                complaint_type:state.complaint_type,
                complaint:state.complaint,
                remarks:state.remarks
  
              }),
            })
            let res = await response.json()
            if(response.ok){
              console.log(res)
                alert("Request Send successfully")
            }else{
              console.log(res)
            }
        } catch (error) {
          
        }
      }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Header title="Raise Complaint" back={true} navigation={navigation} />

            </View>
            <View style={styles.body}>
            <LinearGradient
                useAngle={true}
                angle={145}
                angleCenter={{x: 0.7, y: 0.7}}            
    
                colors={['#8E2DE2','#4A00E0',]} 
                style={styles.card}>
                    <View >
                            <Text style={styles.cardText}>Compaint Form</Text>
                            <View style={{borderBottomWidth:2,borderBottomColor:'white'}}></View>
                    </View> 
                    <View style={styles.payBtn}>
                        <Text style={styles.name}>Complaint Type :</Text>
                        <Picker
                            
                            mode="dropdown"
                            selectedValue={state.complaint_type}
                            style={{height: 50,width:150,}}
                            onValueChange={(itemValue,itemIndex) =>
                            setState({...state,complaint_type:itemValue})

                        }> 
                            <Picker.Item label="SERVICE" value="service" />
                            <Picker.Item label="QUERY" value="query" />    
                        </Picker>
                    </View>
                 <View style={{flexDirection:'column',alignItems:'flex-start',marginTop:20}}>
                     <RadioButton.Group onValueChange={value => setState({...state,complaint:value})} value={state.complaint} >
                    <View style={{flexDirection:'row-reverse',alignItems:'center'}}>
                        <Text style={styles.itemText}>My STB is complaint</Text>
                        <RadioButton value="My STB is complaint" color="orange"/>
                    </View>
                    <View style={{flexDirection:'row-reverse',alignItems:'center'}}>
                        <Text style={styles.itemText}>Remote is not working</Text>
                        <RadioButton value="Remote is not working" color="orange"/>
                    </View>
                    <View style={{flexDirection:'row-reverse',alignItems:'center'}}>
                        <Text style={styles.itemText}>Some Channels are not available</Text>
                        <RadioButton value="Some Channels are not available" color="orange"/>
                    </View>
                    <View style={{flexDirection:'row-reverse',alignItems:'center'}}>
                        <Text style={styles.itemText}>No Signal</Text>
                        <RadioButton value="No Signal" color="orange"/>
                    </View>
                    </RadioButton.Group>
                    </View>
                    <View style={styles.item}>
                        <Text style={{fontSize:22}}>Remarks</Text>
                        <TextInput
                        placeholder="Enter Your remarks.."
                        style={{
                            height:45,
                            width:200,
                            textAlign:'center',
                            color:'black',
                            fontSize:20
                        }}
                        value={state.remarks}
                        onChangeText={val => setState({...state,remarks:val})}
                        />
                    </View>   
                     <View style={{marginTop:20}}>
                     <Button 
                     mode="outlined"
                     icon="send"
                     color="white"
                     style={{
                         borderColor:'white',
                         borderWidth:2
                     }}
                     onPress={sendComplaintForm}
                     >
                        Submit
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
    headCard:{
            backgroundColor:'#7f00ff',
            height:60,
            justifyContent:'center',
            alignItems:'center',
            borderBottomRightRadius:90,
            borderBottomLeftRadius:90,
    },
    card:{
        width:Dimensions.get('screen').width-20,
        flexDirection:'column',
        height:500,
        marginTop:25,
        backgroundColor:'orange',
        padding:20,
        alignItems:'center',
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
          fontSize:18,

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