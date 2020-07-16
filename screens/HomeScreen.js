import React, { useContext, useEffect, useState } from 'react'
import {View,Text,StyleSheet,TouchableOpacity, Dimensions,TextInput,StatusBar,ToastAndroid} from 'react-native'
import AuthContext from './Auth/context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient';
import { Title, Dialog, Portal,Provider,Button } from 'react-native-paper';
import { apiUri,pendingColor} from '../Constants';
import {makePayment} from '../utils/PaymentMode'
import moment from 'moment'
import  Header  from './Layout/Header';
function HomeScreen({navigation}) {

    const authContext = useContext(AuthContext)
    const {token,userid} = authContext;
    const [switchac,setSwitchac] = useState({
        id:0,
        len:0
    })
    const [customerData,setCustomerData] = useState('')
    const [visible, setVisible] = React.useState(false);
    const [addstbno,setAddStbNo] = useState('')
  const hideDialog = () => setVisible(false);
   
  const adjustcard = {
      marginTop:customerData != '' ? (customerData[switchac.id].payment_status != 'unpaid'?5:15):35
    
    }


    async function sendPaymentUpdate() {
        try {
          let response = await fetch(
            apiUri + 'api/customer/payment/update/' + customerData[switchac.id].id,
            {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token,
              },
              body: JSON.stringify({
                customer: customerData[switchac.id].id,
                payment_date: moment().format(),
                payment_status: 'paid',
                payment_mode:'online',
                collected_amount: customerData[switchac.id].payment_amount,
                collection_agent: '1',
    
                stb: customerData[switchac.id].stbno,

                //Online Transaction 
                doneby: customerData[switchac.id].id,
                transaction_id:Math.random(),
                transaction_amount:customerData[switchac.id].payment_amount,
                transaction_status:'successfull'
              }),
            },
          );
          let res = await response.json();
          if (response.ok) {
                showToast('Payment successfull')
            
          } else if (response.status == 400) {
            console.log(res)
            showToast('Payment Failed')
    
          } else if (response.status == 403) {
    
            showToast(res[0]);
            showToast('Payment Failed')
    
          }else{
    
          }
        } catch (error) {
          showToast('Customer Payment has already collected');
        }
      }

    async function getCustomerData(){
        console.log(userid)
        let response = await fetch(apiUri+'api/customerdata/'+userid,{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                'Authorization':"Token "+token
            }
        });
        let res = await response.json()
        if(response.ok){
            setCustomerData(res)
            setSwitchac({
                ...switchac,
                len:res.length
            })
  
          
        }
    }

    async function addStbToCustomer(){
        console.log(userid)
        let response = await fetch(apiUri+'api/customer/addstb/'+addstbno,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                'Authorization':"Token "+token
            },
            body:JSON.stringify({
                stbno:addstbno
            })
        });
        let res = await response.json()
        if(response.ok){
            hideDialog()
            console.log(res)
            getCustomerData()
        }
    }

    useEffect(() =>{
        getCustomerData()
    },[])
    

    //Toast for actions 
  const showToast = res => {
    ToastAndroid.showWithGravityAndOffset(
      res,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      80,
    );
  };


    const switchAccount = () =>{
            if(switchac.id >= 0 && switchac.id < switchac.len-1){
                setSwitchac(prevState =>{
                    return{
                        ...prevState,
                        id:prevState.id+1
                    }
                })
            }else if(switchac.id+1 == switchac.len){
                setSwitchac({
                    ...switchac,
                    id:0
                })
            }else{

            }
    }
    return (
        <Provider>
        <View style={styles.container}>
            <StatusBar backgroundColor="#7f00ff"/>
            <View style={styles.header}>

            <Header title="Kumars Cable" />

                <LinearGradient
                useAngle={true}
                angle={145}
                angleCenter={{x: 0.7, y: 0.7}}            
    
                colors={['#7f00ff','#E100FF',]} 
                style={styles.card}>

                <View style={{position:'absolute',right:15,top:10,}}>
                    <TouchableOpacity style={{flexDirection:'row',}}
                    onPress={switchAccount}
                    >
                    <Text style={{color:'white',fontSize:16}}>Switch Account </Text>
                     <Icon name="refresh" size={20} color="white"/>
                    </TouchableOpacity>
                    
                    
                </View>
                <View >
                <Title style={styles.name}>{customerData != '' ?customerData[switchac.id].name:'N/A'}</Title>
                <Title style={styles.cardText}>{customerData != '' ?customerData[switchac.id].payment_status === 'paid' ?'Paid Amount : ':"Due Amount :" :null}  Rs.{customerData != '' ?customerData[switchac.id].payment_amount:'N/A'}/-</Title>
                <Title style={styles.cardText}>Payment Status : <Text style={{textTransform:'uppercase',fontWeight:'bold'}}>{customerData != '' ?customerData[switchac.id].payment_status :'N/A'}</Text></Title>
    
                               {
                                   customerData != '' ?(customerData[switchac.id].payment_status == 'unpaid'?
                                   <TouchableOpacity style={styles.payBtn} onPress={() => sendPaymentUpdate()}>
                                   <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Pay</Text>
                               </TouchableOpacity>
                               :
                               null):null
    
                               }
           
                                
                </View>
                </LinearGradient>
     


            
 
                   
            
            </View>


        <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={{borderRadius:10}}>
                <Dialog.Title>ADD STB</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                    placeholder="Enter STB Number"
                    value={addstbno}
                    onChangeText={txt => setAddStbNo(txt.toUpperCase())}
                    style={{
                        borderWidth:2,
                        borderColor:'#ef00ff',
                        borderRadius:25,
                        paddingLeft:20,
                        fontSize:20,
                        color:'#7f00ff'
                    }}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                <Button 
                color="white"
                onPress={() => addStbToCustomer()}
                style={{
                    backgroundColor:'#7f00ff',
                   
                }}
                >Add</Button>
                </Dialog.Actions>
                </Dialog>
        </Portal>  


            <View style={[styles.body,adjustcard]}>
            <View style={styles.shortcuts}>
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('STB Details',{stbitem:customerData})}>
                        <Icon name="set-top-box" size={45} color="white"/>
                        <Text style={styles.itemText}>STB Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setVisible(true)}>
                        <Icon name="plus" size={40} color="white"/>
                        <Text style={styles.itemText}>Add STB</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('My Account',{conlen:switchac.len})}>
                        <Icon name="account" size={40} color="white" />
                        <Text style={styles.itemText}>My Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Request Packages',{cusitem:customerData})}>
                        <Icon name="monitor" size={40} color="white"/>
                        <Text style={styles.itemText}>Request Packages</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Raise Complaint')}>
                        <Icon name="message-alert" size={40} color="white" />
                        <Text style={styles.itemText}>Raise Complaint</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Payment Reports',{customer:customerData[switchac.id].id})}>
                        <Icon name="file-check" size={40} color="white" />
                        <Text style={styles.itemText}>Payment Reports</Text>
                    </TouchableOpacity>
              </View>
            <View>

            </View>
            </View>
             
        </View>
        </Provider>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'

    },
    header:{
        flex:1,

    },
    body:{
         
         flex:1, 
         flexDirection:'column'  
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
        marginTop:25,
        marginLeft:10,
        marginRight:10,
        padding:20,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:10,
        borderRadius:15,
    },
    payBtn:{
        marginTop:12,
        height:40,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:10,
        backgroundColor:'orange',
     

    },
    name:{
          color:'white',
          
          fontSize:25,
          marginTop:10,  
          marginBottom:10  
    },
    cardText:{
        
          color:'white',
          fontSize:20,
          marginBottom:10  
    },
    shortcuts:{
        flexDirection:'row',
        alignItems:'stretch',
        flexWrap:'wrap',
        width:Dimensions.get('screen').width,
        justifyContent:'space-evenly',
        

        

    },
    item:{

        justifyContent:'center',
        alignItems:'center',
        padding:20,
        width:120,
        backgroundColor:'#7f00ff',
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:10,
        borderRadius:15,
        marginBottom:25,
     
    },
    itemText:{
        color:'white',
        textAlign:'center',
    }
})