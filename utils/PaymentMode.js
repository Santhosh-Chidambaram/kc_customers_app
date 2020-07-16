
import RNUpiPayment from 'react-native-upi-payment';
import {user_vpa} from '../Constants'
//make Payment


export function makePayment(order_id,cost){
    RNUpiPayment.initializePayment({
        vpa: user_vpa,//your upi address like 12345464896@okhdfcbank
        payeeName: 'Cable Name',   			// payee name 
        amount: cost,				//amount
        transactionNote:'Cable Tv Payment',		//note of transaction
        transactionRef: order_id
    },successCallback,failureCallback);
}

 function failureCallback(data){
    console.log(data)
    // in case no action taken
    if (data['status']=="FAILURE"){
        let response = {
            "status":"FAILURE",
            "message":data['message']
        }
        return response

        
    }
    // in case of googlePay
    else if (data['Status']=="FAILURE"){
        let response = {
            "status":"FAILURE",
            "message":data['message']
        }
        return response
        
    }
    // in case of phonepe
    else if (data['Status']=="Failed"){
        let response = {
            "status":"FAILURE",
            "message":data['message']
        }
        return response
    }
    // in case of phonepe
    else if(data['Status']=="Submitted"){
        let response = {
            "status":"FAILURE",
            "message":data['message']
        }
        return response
     
    }
    // any other case than above mentioned
    else{
        let response = {
            "status":"FAILURE",
            "message":data['Status']
        }
        return response

    }
}



function successCallback(data){
    //nothing happened here using Google Pay
    
    let response = {
        "status":"SUCCESS",
        "txnId":data['txnId'],
        "message":"successful Payment"
    }
    return response;
}