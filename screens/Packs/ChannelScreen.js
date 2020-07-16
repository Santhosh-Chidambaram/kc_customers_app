import React, { useContext,useEffect, useState, useMemo, useCallback } from 'react'
import {View,Text,StyleSheet,SafeAreaView,} from 'react-native'
import { MainContext } from '../Context/MainContext';
import ChannelList from './ChannelList'
import {Headline,Title} from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
function ChannelScreen({navigation}) {

    const mainContext = useContext(MainContext);
    
    const {getChannelsList,channellist,setChannelCost,
      channelcost,setChannelArray,setChannels,channelarray} = mainContext;
    const [cost,setCost] = useState({
      amount:channelcost
    })
    const [selected, setSelected] = useState(false)
    const [state,setState] = useState({
      channarr:[],
      mount:true,
    })
    const selectItem = useCallback((data) =>{

      data.isSelect = !data.isSelect

      if(data.isSelect){

        setState(prevState =>{
          return{
           ...prevState,
           channarr:[...prevState.channarr,data.id]
          
          
        }})

        setSelected(true)
        setCost(prevCost =>{
          return{
            ...prevCost,
            amount:prevCost.amount+data.price
          }
          
        })
        
        
      }else{
        setSelected(false)
        setState(prevState =>{
          return{
           ...prevState,
           channarr:prevState.channarr.filter(p => p != data.id)
          
          
        }})

        if(cost.amount > 1){
          setCost(prevCost =>{
            return{
              ...prevCost,
              amount:prevCost.amount-data.price
            }
          })
         

        }
        

      }
        
      
    },[selected])
     
    useMemo(() =>{

      setChannelCost(Math.round(cost.amount))
      if(!state.mount){
        setChannelArray(state.channarr)
      }
      setState({...state,mount:false})
     

    },[cost.amount])
 
    const _retrieveChannels = async () => {
     
      try {
        const value = await AsyncStorage.getItem('channels');
        if (value !== null) {

          setChannels(JSON.parse(value))
        }else{
          getChannelsList()
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    useEffect(() =>{
      if(channellist == ''){
        _retrieveChannels()
      }
      if(channelarray != '') setState({...state,channarr:channelarray})  

    },[])
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.cost}>
            <View>
            <Title style={{fontSize:18,color:'#8e2de2'}}>Total Cost :
          <Text style={{color:'red',fontSize:18}}>Rs.{channelcost}/-</Text></Title>
            </View>
         
          <View>
          <Title style={{fontSize:18,color:'#8e2de2'}}>Selected Pack :
          <Text style={{color:'red'}}>{state.channarr.length}/</Text>
          <Title style={{color:'#8e2de2',fontSize:18}}>{channellist.length}</Title></Title>
          </View>
          </View>


          <ChannelList 
          data={channellist}
          selectItem={selectItem}
          selected={selected}
          />

      </SafeAreaView>
    );
}

export default ChannelScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#7F00FF'
    },
    item: {
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 5,
        borderRadius: 20,
    },
    title: {
        fontSize: 20,
        paddingBottom:5,
        width:260
    },
    price:{
      fontSize:22,
      color:'red'
    },
    cost:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      width:"95%",
      backgroundColor: 'white',
      padding: 10,
      marginVertical: 2,
      marginHorizontal: 8,
      backgroundColor: "rgba(255,255,255,0.99)",
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 5,
      borderRadius: 10,
      position:'absolute',
      bottom:0,
      borderTopWidth:2,
      borderTopColor:'orange',
    }
  });