import React, {useState, useContext,useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions,ToastAndroid} from 'react-native';
import {Button,Title,Colors} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import RNUpiPayment from 'react-native-upi-payment';
import MainContext from './Context/MainContext';
import AuthContext from './Auth/context';
import {apiUri} from '../Constants'
import LinearGradient from 'react-native-linear-gradient';
import Header from './Layout/Header'


function ReqPackScreen({route,navigation}) {
    const {cusitem} = route.params;
    const mainContext = useContext(MainContext)
    const authContext = useContext(AuthContext)
    const {userid,token} = authContext;
    const {packagecost,channelcost,packarray,channelarray,resetPackDetails} = mainContext;


    useEffect(() =>{
          resetPackDetails()
    },[])

   

    const [state, setState] = useState({
      showPaymentOptions:false,
      payment_mode: 'online',
      stbno:cusitem[0].stbno,
      status:'',
      txtnId:'',
      message:'',
      totalcost:0,
    });

    const showToast = (res) => {
      ToastAndroid.showWithGravityAndOffset(
        res,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        150
      );
    };

    function makePayment(){
        RNUpiPayment.initializePayment({
            vpa: '9789668588@ybl',//your upi address like 12345464896@okhdfcbank
            payeeName: 'KumarsCable',   			// payee name 
            amount: state.totalcost,				//amount
            transactionNote:'Cable Tv Payment',		//note of transaction
            transactionRef: 'kc-trans'+cusitem.id
        },successCallback,failureCallback);
    }

    function failureCallback(data){
        console.log(data)
        // in case no action taken
        if (data['status']=="FAILURE"){
            setState({
              ...state,
              status:"FAILURE",
              message:data['message']
            })
            
        }
        // in case of googlePay
        else if (data['Status']=="FAILURE"){
          setState({
            ...state,
            status:"FAILURE",
            message:"app closed without doing payment"
          })
            
        }
        // in case of phonepe
        else if (data['Status']=="Failed"){
          setState({
            ...state,
            status:"FAILURE",
            message:"app closed without doing payment"
          })
        }
        // in case of phonepe
        else if(data['Status']=="Submitted"){
          setState({
            ...state,
            status:"FAILURE",
            message:"transaction done but pending"
          })
         
        }
        // any other case than above mentioned
        else{
          setState({
            ...state,
            status:"FAILURE",
            message:data['Status']
          })
  
        }
    }



    function successCallback(data){
        //nothing happened here using Google Pay
        console.log(data);
        setState({status:"SUCCESS"});
        setState({txnId:data['txnId']});
        setState({message:"Succccessfull payment"});
    }

    React.useMemo(() =>{
        let t = packagecost+channelcost
        if(t ==0){
            setState({...state,totalcost:0})
        }else if(t!= 0 && t <=6){
            setState({...state,totalcost:10})
        }else if(t > 6 && t <= 10){
            setState({...state,totalcost:15})
        }else if(t > 10 && t <= 15){
            setState({...state,totalcost:20})
        }else if(t >15 && t <=25){
            setState({...state,totalcost:30})
        }else{
            setState({...state,totalcost:t+15})
        }
    },[packagecost,channelcost])

    async function sendPackageRequest(){

      try {
          let response = await fetch(apiUri+'api/customer/packagerequest',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':'Token '+token
            },
            body: JSON.stringify({
              customer: userid,
              stbno:state.stbno,
              payment_mode:state.payment_mode,
              packages:packarray,
              channels:channelarray

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
     <Header title="Request Packages" back={true} navigation={navigation} />

       
      <View style={styles.body}>
      <LinearGradient
                useAngle={true}
                angle={145}
                angleCenter={{x: 0.7, y: 0.7}}            
    
                colors={['#8E2DE2','#4A00E0',]} 
                style={styles.card}
      >
         <View style={styles.row}>
            <View style={{flex:1}}>
            <Title  style={[styles.packText,{color:'white'}]}>Customer Id </Title>
            </View>
            <Text style={{fontSize:20,color:'white'}}>: </Text>
            <View style={{flex:1}}>
              <Text style={styles.packCost}> {userid}</Text>
            </View>
       
        </View>
        
        <View style={styles.dropDown}>
            <View style={{flex:1}}>
            <Title  style={styles.packText}>STB Number</Title>
            </View>
            <Text style={{fontSize:20}}>: </Text>
            <View style={{flex:1}}>

              <Picker
                
                mode="dropdown"
                selectedValue={state.stbno}
                style={{height: 50,width:150,}}
                onValueChange={(itemValue,itemIndex) =>
                setState({...state,stbno:itemValue})

              }> 
              {
                cusitem.map((itm,id) =>(
                  <Picker.Item key={id}  label={itm.stbno.toString()} value={itm.stbno.toString()} />
                )
                 
                 
                )

              }

             </Picker>

            </View>
           
            
        </View>
        
    
        <View style={styles.dropDown}>
        <View >
        <Title  style={styles.packText}>Payment Mode</Title>
        </View>
        <Text style={{fontSize:20}}>: </Text>
        <View style={{flex:1}}>
        <Picker
              mode="dropdown"
              itemStyle={{
                color:'blue',
              }}
              selectedValue={state.payment_mode}
              style={{height: 50, width: 150,}}
              onValueChange={(itemValue, itemIndex) =>
               setState({...state,payment_mode:itemValue})
              }>
                   <Picker.Item label="ONLINE" value="online" />
              <Picker.Item label="OFFLINE" value="offline" />
             
            </Picker>

        </View>
      </View>

          <View style={[styles.row,{marginTop:10,marginBottom:20}]}>
            <View style={{flex:1}}>
            <Title style={[styles.packText,{color:'white'}]}>Packages Cost </Title>
            </View>
            <Text style={{fontSize:20,color:'white'}}>: </Text>
            <View style={{flex:1}}>
            <Text style={styles.packCost}>Rs.{state.totalcost}/-</Text>
            </View>
  
          </View>
             
       
      
        <View>
          <Button
            mode="contained"
            icon="cart"
            onPress={() => {navigation.navigate('Select Packages')}}
            contentStyle={{
              height: 40,
              width: 320,
            }}
            style={{
              borderRadius: 20,
              height: 40,
              width: 320,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 15,
              marginLeft:5,
              borderWidth:1,
              borderColor:'white'
            }}>
            Select Packages
          </Button>
        </View>
        <View style={{flex:1}}></View>
        <View >
            {
              state.payment_mode == 'online'?
              <Button 
              onPress={() =>{
                if(packarray != '' || channelarray != ''){ makePayment()}
                else{showToast("No Packages Selected")}
              }}
              color="white"
              icon="contactless-payment"
              style={{
                backgroundColor:Colors.greenA700,  borderRadius: 20,
                height: 40,
                width: 320,
                alignItems: 'center',
                justifyContent: 'center',        
                marginBottom: 15,
                marginLeft:5,
              }}
                contentStyle={{
                  height: 45,
                  width: 370,
                }}
                >
                  Pay
              </Button>
              :
              <Button 
              onPress={sendPackageRequest}
              color="white"
              icon="send"
              style={{
                backgroundColor:'orange', 
                 borderRadius: 20,
                 height: 40,
                 width: 320,
                alignItems: 'center',
                justifyContent: 'center',        
                marginBottom: 15,
                marginLeft:5,
              }}
                contentStyle={{
                  height: 45,
                  width: 370,
                }}
                >
                  Send Request
              </Button>
            }
           
        </View>
      


      </LinearGradient>
      </View>
    
    </View>
  );
}

export default ReqPackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fafafa'
  },
  body: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',

  },
  textInput:{
       
        width:200,
        height:45,
        borderColor:'red',
        borderRadius:25,
        paddingLeft:20,
        color:'#7f00ff',
        fontSize:20,
  },
  packText:{
      fontSize:20,
      color:'black',
      paddingRight:10,
      marginLeft:9,
  },
  packCost:{
      fontSize:18,
      color:'white',
      fontWeight:'bold'

  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    
  },
  name:{
    fontSize:20,
    marginRight:10,

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
dropDown:{
  flexDirection:'row',
  marginTop:20,
  marginBottom:5,
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
  paddingLeft:9


},
});
