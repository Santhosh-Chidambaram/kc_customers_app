<TouchableOpacity
onPress={() => 
 {    var options = 
   {   
      description: 'Cable Tv Payment',  
     image: 'https://i.imgur.com/3g7nmJC.png',
         currency: 'INR',
             key: 'rzp_test_nipc8N0m9QfOub', 
                amount: '195',   
                 name: 'Kumarscable',  
                   order_id: 'order_F7eAEfUUVVtbNe',
                   //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.    
                   prefill: {      
                     email: 'san@example.com', 
                          contact: '9789668588',     
                           name: 'santhohs'    },   
                    theme: {color: '#53a20e'}  } 
                     RazorpayCheckout.open(options).then((data) => {    
                       // handle success    
                       alert(`Success: ${data.razorpay_payment_id}`);  }).catch((error) => {   
                          // handle failure   
                           alert(`Error: ${error.code} | ${error.description}`);  });
                         }}
                           
                           ><Text>Pay</Text></TouchableOpacity>