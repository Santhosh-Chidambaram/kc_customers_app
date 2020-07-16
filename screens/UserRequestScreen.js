import React, { useEffect,useState, useMemo, useContext } from 'react'
import {View,Text,StyleSheet,FlatList} from 'react-native'
import { apiUri,successColor,pendingColor,failedColor } from '../Constants'
import { Caption,Title,Subheading } from 'react-native-paper'
import AuthContext from './Auth/context'
import AIcon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/Feather'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
function PackRequestItem ({item}){
    return(
        <View style={styles.packItem}>
            <View style={styles.row}>
                <View style={{marginRight:20}}>
                    <View style={{
                        backgroundColor:'#8e2de2',
                        borderRadius:30,
                        padding:6
                    }}>
                        <FIcon name="arrow-up-right" size={40} color="white" />
                    </View>
                </View>

                <View >
                    {
                            item.packs.packages.map((p,id) =>(
                                <Text key={id} style={{fontSize:18,color:'black'}} >{p} ,</Text>)  
                            )
                    }

                </View>

                <View style={{
                   position:'absolute',
                   right:0,

                }}>
                    <View style={{
                        backgroundColor:'white',
                        borderRadius:30,
                        padding:6
                    }}>
                        {
                            (item.request_status === 'pending')?
                            <AIcon name="exclamationcircle" color="orange" size={30}/>:
                            <AIcon name="checkcircle" color="green" size={30}/>
                        }
                        
                        
                    </View>

                </View>








                
            </View>
            <View style={styles.row1}>
           
                <Text style={{color:'#a7a7a7'}}> {moment(item.date).format('LLL') }</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <MCIcon name="credit-card" size={25} />
                    <Text style={{textTransform:'capitalize'}}>{item.payment_status}</Text>
                </View>
               

            </View>
   
        </View>
    )

}














function UserRequestScreen() {
    const [userpackrequest,setUserPackRequest] = useState([])
    const authContext = useContext(AuthContext)
    const {userid} = authContext;
    useMemo(() =>{
         getRequestsList()
    },[])


    async function getRequestsList(){
        let response = await fetch(apiUri+'api/customer/packagerequest/'+userid,{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        });
        let res = await response.json()
        if(response.ok){
            setUserPackRequest(res)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <Text style={{color:'white',fontSize:20,}}>My Package Requests</Text>
            </View>
            <View style={{marginTop:15}}>
                <FlatList
                data={userpackrequest}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) =><PackRequestItem item={item} />}
                />

            </View>
        </View>
    )
}

export default UserRequestScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f6f6f6',
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
        marginBottom:5,
        marginTop:5,
        paddingTop:20,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:10,
        alignItems:'stretch',
        justifyContent:'flex-start',
        shadowColor:'#000',
        shadowOffset:{width:5,height:2},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:5,
        borderRadius:10,
        borderBottomWidth:2,
        borderBottomColor:'#8e2de2',
        backgroundColor:'white',
    
    },
    name:{
        fontSize:20,
        fontWeight:'normal'
    },
    row:{
        flex:1,
        flexDirection:'row',
        
    },
    row1:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:20,
        
        
    }
})