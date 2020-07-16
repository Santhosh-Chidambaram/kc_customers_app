import React, { useEffect,useContext,useState } from 'react'
import {View,Text,StyleSheet,FlatList} from 'react-native'
import AuthContext from './Auth/context';
import { apiUri,successColor,pendingColor,failedColor } from '../Constants'
import { Caption,Title,Subheading } from 'react-native-paper'
import AIcon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/Feather'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

function ComplaintItem ({item}){
    return(
        <View style={styles.packItem}>
            <View style={styles.row}>
                <View style={{marginRight:20}}>
                    <View style={{
                        backgroundColor:'orange',
                        borderRadius:30,
                        padding:6
                    }}>
                        <AIcon name="exclamationcircle" size={40} color="white" />
                    </View>
                </View>

                <View >
                <Text style={{fontSize:18,color:'black'}}>{item.complaint}</Text>

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
                            (item.status === 'raised')?
                            <View style={styles.raised}>
                                <Text style={{color:'white'}}>{item.status}</Text>
                            </View>:
                            <View style={styles.success}>
                            <Text style={{color:'white'}}>{item.status}</Text>
                            </View>
                        }
                        
                        
                    </View>

                </View>

              
            </View>
            <View style={styles.row1}>
           
                <Text style={{color:'#a7a7a7'}}> 
                {
                    item.resolved_date == '' || item.resolved_date == null ?
                    
                    <Text>Raised on : {moment(item.date).format('LLL') }</Text>:
                    <Text>Resolved on : {moment(item.resolved_date).format('LLL') }</Text>

                }
                
                </Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                   
                </View>
               

            </View>
   
        </View>
    )

}
















function UserComplaintScreen() {
    const [usercomplaints,setUserComplaints] = useState([])
    const authContext = useContext(AuthContext)
    const {token} = authContext;
    async function getComplaintsList(){
        let response = await fetch(apiUri+'api/customer/complaint',{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                'Authorization':'Token '+token
            }
        });
        let res = await response.json()
        if(response.ok){
            setUserComplaints(res)
        }
    }
    
    useEffect(() =>{
          getComplaintsList()
    },[])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <Text style={{color:'white',fontSize:20,}}>My Complaints</Text>
            </View>
            <View style={{marginTop:10}}>
                <FlatList
                data={usercomplaints}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) =><ComplaintItem item={item} />}
                />

            </View>
        </View>
    )
}

export default UserComplaintScreen



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
        alignItems:'center',
    },
    row1:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:20,
        
        
    },
    raised:{
        backgroundColor:'orange',
        padding:8,
        borderRadius:30
    },
    success:{
        backgroundColor:'green',
        padding:8,
        borderRadius:30
    }
})