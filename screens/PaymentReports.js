import React, { useEffect,useState, useMemo, useContext } from 'react'
import {View,Text,StyleSheet,FlatList} from 'react-native'
import { apiUri } from '../Constants'
import { Caption,Title,Subheading } from 'react-native-paper'
import AuthContext from './Auth/context'
import moment from 'moment'


function PackRequestItem ({item}){
    return(
        <View style={styles.packItem}>
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1}}>
                <Title>
                        Customer Name :
                </Title>
                </View>
                <View style={{flex:1}}>
                <Subheading>
                    {item.customer_name}
                </Subheading>
                    
                </View>
                
            </View>

                <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <View  style={{flex:1}}>
                    <Title style={styles.name}>
                        Payment Date : {" "}
                        
                    </Title>
                    </View>
                    <View  style={{flex:1}}>
                    <Caption style={{fontSize:18}}>
                        {moment(item.payment_date).format('DD-MM-YYYY')}
                    </Caption>
                    </View>
                   
                    
                </View>
                <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <View  style={{flex:1}}>
                    <Title style={styles.name}>
                    Payment Amount : {" "}
                        
                    </Title>
                    </View>
                    <View  style={{flex:1}}>
                    <Text style={{fontSize:18,}}>{item.payment_amount}</Text>
                    </View>
                   
                    
                </View>

                
        </View>
    )

}














function PaymentReport({route,navigation}) {
    const {customer} = route.params;
    const [userreport,setUserReport] = useState([])
    const authContext = useContext(AuthContext)
    const {userid} = authContext;
    useMemo(() =>{
        getUserReports()
    },[])


    async function getUserReports(){
        try {
            let response = await fetch(apiUri+'api/customer/payment/update/'+customer,{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                }
            });
            let res = await response.json()
            if(response.ok){
                setUserReport(res.reports)
            }else{
    
            }
            
        } catch (error) {
            
        }
       
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <Text style={{color:'white',fontSize:20,}}>My Payment Reports</Text>
            </View>
            <View style={{marginTop:10}}>
                <FlatList
                data={userreport}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) =><PackRequestItem item={item} />}
                />

            </View>
        </View>
    )
}

export default PaymentReport

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    header:{
        backgroundColor:'#7f00ff',
            height:60,
            justifyContent:'center',
            alignItems:'center',
            borderBottomRightRadius:90,
            borderBottomLeftRadius:90,
    },
    packItem:{

        flexDirection:'column',
        marginLeft:10,
        marginRight:10,
        marginBottom:15,
        padding:20,
        alignItems:'stretch',
        justifyContent:'flex-start',
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:5,
        borderRadius:15,
        borderBottomWidth:2,
        borderBottomColor:'#ef00ff',
    
    },
    name:{
        fontSize:20,
        fontWeight:'normal'
    }
})