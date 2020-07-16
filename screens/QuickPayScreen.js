import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from 'react-native-paper';
import {apiUri, user_vpa} from '../Constants';
import RazorpayCheckout from 'react-native-razorpay';
import moment from 'moment';
import RNUpiPayment from 'react-native-upi-payment';




function QuickPayScreen() {
  const [stbno, setStbno] = useState('');
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [showcd, setShowCd] = useState(false);
  const [successid, setSuccessId] = useState('');

  const [customerDetails, setCustomerDetails] = useState({
    id: '',
    name: '',
    street: '',
    phone: '',
    stbno: '',
    payment_amount: '',
    payment_status: '',
    order_id: '',
  });

  async function fetchCustomerDetails() {
    try {
      let response = await fetch(apiUri + 'api/customer-details/' + stbno, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let res = await response.json();
      console.log(res);
      if (response.ok) {
        setCustomerDetails({
          id: res.cusData.id,
          name: res.cusData.name,
          street: res.cusData.street,
          phone: res.cusData.phone,
          stbno: res.cusData.stbno,
          payment_amount: res.cusData.payment_amount,
          payment_status: res.cusData.payment_status,
          order_id: res.order_id,
        });
        setShowCd(true);
      }
    } catch (error) {
      console.log(error.messages);
    }
  }

  
  //Send payment of Customer to server
  async function OnPaymentSuccess(){
    try {
      let response = await fetch(apiUri + 'api/checkout/' + customerDetails.id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: customerDetails.id,
          payment_date: moment().format(),
          payment_status: 'paid',
          payment_mode:'online',
          collected_amount: customerDetails.payment_amount,
          collection_agent: 1,

          stb: customerDetails.stbno,

          //Online Transaction 
          doneby: customerDetails.id,
          transaction_id:customerDetails.order_id,
          transaction_amount:customerDetails.payment_amount,
          transaction_status:'successfull'
        }),
      });
      let res = await response.json();
      if (response.ok) {
        setShowCd(false)
        setShowSuccessCard(true)
        console.log(res)
        setCustomerDetails({
            id: res.id,
            name: res.name,
            street: res.street,
            phone: res.phone,
            stbno: res.stbno,
            payment_amount: res.payment_amount,
            payment_status: res.payment_status,

        })

      } else if (response.status == 400) {
          console.log(res)

      }
    } catch (error) {
      console.log(error)
     
    }
  }

  function makePayment(){
      RNUpiPayment.initializePayment({
          vpa: user_vpa,//your upi address like 12345464896@okhdfcbank
          payeeName: 'KumarsCable',   			// payee name 
          amount: 1,				//amount
          transactionNote:'Cable Tv Payment',		//note of transaction
          transactionRef: customerDetails.order_id
      },successCallback,failureCallback);
  }

  function failureCallback(data){
      console.log(data)
      if(data.Status == 'SUCCESS' || data.Status == 'Success'){
        setSuccessId(data.txnId)
        OnPaymentSuccess()
      }
      
      let response;
      // in case no action taken
      if (data['status']=="FAILURE"){
          response = {
              "status":"FAILURE",
              "message":data['message']
          }
          return response;
          
      }
      // in case of googlePay
      else if (data['Status']=="FAILURE"){
          response = {
              "status":"FAILURE",
              "message":data['message']
          }
          return response;          
      }
      // in case of phonepe
      else if (data['Status']=="Failed"){
          response = {
              "status":"FAILURE",
              "message":data['message']
          }
          return response;
                }
      // in case of phonepe
      else if(data['Status']=="Submitted"){
          response = {
              "status":"FAILURE",
              "message":data['message']
          }
          return response;     
      }
      // any other case than above mentioned
      else{
          response = {
              "status":"FAILURE",
              "message":data['Status']
          }
          return response;
      }
      
      
  
    }

  function successCallback(data){
      //nothing happened here using Google Pay
      OnPaymentSuccess()
       let response = {
          "status":"SUCCESS",
          "txnId":data['txnId'],
          "message":"successful Payment"
      }
      setSuccessId(response.txnId)
      
  }




  return (
    <View style={styles.container}>
      <View 
      style={{
        marginTop: 15,
        backgroundColor:'white',
        shadowColor:'#000',
        shadowOffset:{height:10,width:20},
        shadowOpacity:0.8,
        shadowRadius:1,
        elevation:15,
        marginBottom:10,
        marginLeft:10,
        marginRight:10,
        borderRadius: 10,
        
        }}>
        <Icon
          name="set-top-box"
          size={40}
          style={{position: 'absolute', left: 20, top: 2}}
        />
        <TextInput
          placeholder="Enter STB Number"
          value={stbno}
          onChangeText={txt => setStbno(txt.toUpperCase())}
          style={{
            borderWidth: 2,
            paddingLeft: 65,  
            borderRadius: 10,
            fontSize: 20,
            borderColor:'#8e2de2'
          }}
        />
        <TouchableOpacity
          onPress={fetchCustomerDetails}
          style={{zIndex: 1, position: 'absolute', right: 17, top: 5}}>
          <Icon name="chevron-right-circle" size={35} style={{color: 'red'}} />
        </TouchableOpacity>
      </View>

      {showcd ? (
        <View style={styles.cd}>
          <View >
            <Text style={{fontSize: 20, color: 'green', marginBottom: 20,fontWeight:'bold'}}>
              Customer Details
            </Text>
          </View>
          <View style={styles.cdItem}>
            <View style={{flex: 1}}>
              <Icon name="account" size={30} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.cusText}>Customer Name : </Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.cusValue}>{customerDetails.name}</Text>
            </View>
          </View>

          <View style={styles.cdItem}>
            <View style={{flex: 1}}>
              <Icon name="set-top-box" size={35} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.cusText}>STB Number : </Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.cusValue}>{customerDetails.stbno}</Text>
            </View>
          </View>

          <View style={styles.cdItem}>
            <View style={{flex: 1}}>
              <Icon name="home" size={30} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.cusText}>Street : </Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.cusValue}>{customerDetails.street}</Text>
            </View>
          </View>

          <View style={styles.cdItem}>
            <View style={{flex: 1}}>
              <Icon name="phone" size={30} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.cusText}>Phone : </Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.cusValue}>
                {customerDetails.phone != null ? customerDetails.phone : 'N/A'}
              </Text>
            </View>
          </View>
          <View style={styles.cdItem}>
            <View style={{flex: 1}}>
              <Icon name="checkbox-marked-outline" size={30} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.cusText}>Payment Status : </Text>
            </View>
            <View style={{flex: 3}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight:'bold',
                  textTransform:'uppercase',
                  color:
                    customerDetails.payment_status === 'paid' ? 'green' : 'red',
                }}>
                {customerDetails.payment_status}
              </Text>
            </View>
          </View>
          <View style={styles.cdItem}>
            <View style={{flex: 1}}>
              <FIcon name="rupee" size={30} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.cusText}>Payment Amount : </Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.cusValue}>
                Rs.{customerDetails.payment_amount}/-
              </Text>
            </View>
          </View>
          <View style={styles.cdItem}>
            <View style={{flex: 1}}>
              <MIcon name="payment" size={30} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.cusText}>Transaction Id: </Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.cusValue}>{customerDetails.order_id}</Text>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.pay} onPress={() => makePayment()}>
              <Text style={{color:'white',fontSize:20}}> Pay </Text>
              <Text style={{color:'white',fontSize:20}}>Rs.{customerDetails.payment_amount}/-</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}


      {/* On Payment Successful           */}

      {
        showSuccessCard ?
        (
          <View style={styles.successcard}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="checkbox-marked-circle-outline" color="green" size={60} />
            <Text style={{color: 'green', fontSize: 22}}>Payment Successful</Text>
          </View>
          <View style={{marginTop: 20, marginBottom: 30}}>
            <Text style={{fontSize: 20, color: 'black',fontWeight:'bold'}}>
              Transaction Id :{' '}
              <Text style={{color: 'black'}}>{successid}</Text>
            </Text>
          </View>
  
          <View style={styles.cdItem}>
            <View style={{flex: 1}}>
              <Icon name="account" size={30} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.cusText}>Customer Name  </Text>
            </View>
            <View >
              <Text style={styles.cusText}>: </Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.cusValue}>{customerDetails.name}</Text>
            </View>
          </View>
  
          <View style={styles.cdItem}>
            <View style={{flex: 1}}>
              <Icon name="set-top-box" size={35} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.cusText}>STB Number </Text>
            </View>
            <View >
              <Text style={styles.cusText}>: </Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.cusValue}>{customerDetails.stbno}</Text>
            </View>
          </View>
  
          <View style={styles.cdItem}>
            <View style={{flex: 1}}>
              <Icon name="home" size={30} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.cusText}>Street </Text>
            </View>
            <View >
              <Text style={styles.cusText}>: </Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.cusValue}>{customerDetails.street}</Text>
            </View>
          </View>
  
          <View style={styles.cdItem}>
            <View style={{flex: 1}}>
              <Icon name="phone" size={30} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.cusText}>Phone  </Text>
            </View>
            <View >
              <Text style={styles.cusText}>: </Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.cusValue}>
                {customerDetails.phone != null ? customerDetails.phone : 'N/A'}
              </Text>
            </View>
          </View>
          <View style={styles.cdItem}>
            <View style={{flex: 1}}>
              <Icon name="checkbox-marked-outline" size={30} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.cusText}>Payment Status  </Text>
            </View>
            <View >
              <Text style={styles.cusText}>: </Text>
            </View>
            <View style={{flex: 3}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight:'bold',
                  textTransform:'uppercase',
                  color: customerDetails.payment_status === 'paid' ? 'green' : 'red',
                }}>
                {customerDetails.payment_status}
              </Text>
            </View>
          </View>
          <View style={styles.cdItem}>
            <View style={{flex: 1}}>
              <FIcon name="rupee" size={30} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.cusText}>Payment Amount  </Text>
            </View>
            <View >
              <Text style={styles.cusText}>: </Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.cusValue}>Rs.{customerDetails.payment_amount}/-</Text>
            </View>
          </View>
        </View>
        )
        :
        null
      }
    </View>
  );
}

export default QuickPayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cd: {
    flex: 2,
    marginTop: 10,
    alignItems: 'center',
    width: Dimensions.get('screen').width - 20,
    padding: 20,
    backgroundColor:'white',
        shadowColor:'#000',
        shadowOffset:{height:10,width:20},
        shadowOpacity:0.8,
        shadowRadius:1,
        elevation:15,
        marginBottom:10,
        marginLeft:10,
        borderRadius: 10,
  },
  cdItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  pay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greenA700,
    width: 350,
    height: 45,
    borderRadius: 20,
    marginTop: 20,
  },
  cusText: {
    fontSize: 20,
    color: '#7f00ff',
    fontWeight:'bold'
  },
  cusValue: {
    fontSize: 19,
    color: 'black',
  },
  successcard: {
    flex: 2,
    marginTop: 20,
    alignItems: 'center',
    width: Dimensions.get('screen').width - 5,
    padding: 20,
    // borderRadius: 20,
    // borderColor: '#ddd',
    // borderBottomWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 2,
    // marginLeft: 5,
    // marginBottom: 20,
  },
});
