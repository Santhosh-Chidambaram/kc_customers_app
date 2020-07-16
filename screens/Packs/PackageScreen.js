import React, { useContext,useEffect, useState, useMemo, useCallback } from 'react'
import {View,Text,StyleSheet,SafeAreaView} from 'react-native'
import { MainContext } from '../Context/MainContext';
import PackList from './PackList'
import {Headline,Title} from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'

export default function PackageScreen({navigation}) {

    const mainContext = useContext(MainContext);
    
    const {getPackagesList,packagelist,setPackageCost,packagecost,setPackArray,setPackages,packarray} = mainContext;
    const [cost,setCost] = useState({
      amount:packagecost
    })
    const [selected, setSelected] = useState(false)
    const [state,setState] = useState({
      packarr:[],
      mount:true
    })
    const selectItem = useCallback((data) =>{

      data.isSelect = !data.isSelect

      if(data.isSelect){

        setState(prevState =>{
          return{
           ...prevState,
           packarr:[...prevState.packarr,data.id]
          
          
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
           packarr:prevState.packarr.filter(p => p != data.id)
          
          
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
    

    const _retrievePackages = async () => {
     
      try {
        const value = await AsyncStorage.getItem('packages');
        if (value !== null) {

          setPackages(JSON.parse(value))
        }else{
          getPackagesList()
        }
      } catch (error) {
        // Error retrieving data
      }
    };


    useMemo(() =>{

      setPackageCost(Math.round(cost.amount))
      if(!state.mount){
        setPackArray(state.packarr)
      }
      setState({...state,mount:false})
      

    },[cost.amount])
 
  
        
    useEffect(() =>{
     
      if(packagelist == ''){
        _retrievePackages()
      }
      if(packarray != '') setState({...state,packarr:packarray})

    },[])
   
    
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.cost}>
            <View>
            <Title style={{fontSize:18,color:'#8e2de2'}}>Total Cost :
          <Text style={{color:'red',fontSize:18}}>{"  "}Rs.{packagecost}/-</Text></Title>
            </View>
         
          <View>
          <Title style={{fontSize:18,color:'#8e2de2'}}>Selected Pack :
          <Text style={{color:'red'}}>{state.packarr.length} / </Text>
          <Title style={{color:'#8e2de2',fontSize:18}}>{packagelist.length}</Title></Title>
          </View>
          </View>

          
          <PackList data={packagelist} selected={selected} selectItem={selectItem}/>





      </SafeAreaView>
    );
}



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
      width:"98%",
      backgroundColor: 'white',
      padding: 10,
      marginVertical: 1,
      marginHorizontal: 5,
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