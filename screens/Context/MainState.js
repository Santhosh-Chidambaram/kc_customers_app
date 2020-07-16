import React, { useReducer,useContext } from 'react'
import MainContext from './MainContext'
import MainReducer from './MainReducer'
import AsyncStorage from '@react-native-community/async-storage'
import AuthContext from '../Auth/context'
import {apiUri} from '../../Constants'
const MainState = props =>{
     const authContext = useContext(AuthContext)
    const {token} = authContext;
    const _storeData = async (key,res) => {
        try {
          await AsyncStorage.setItem(key,JSON.stringify(res))
          console.log(key+' Data successfully saved')
    
         
        } catch (e) {
          console.log('Failed to save the data to the storage')
        }
       
      };
     
      const initialState = {


        'packagelist':[],
        'channellist':[],
        'packarray':[],
        'channelarray':[],
        'packagecost':0,
        'channelcost':0,
      
      }

    const [state,dispatch] = useReducer(MainReducer,initialState)

     //Set States
     const resetPackDetails = () =>{
      dispatch({type:'RESET_PACK_DETAILS'})
    }
     const setPackages = (res) =>{
        dispatch({type:'GET_PACKAGES',payload:res})
      }
      const setChannels = (res) =>{
        dispatch({type:'GET_CHANNELS',payload:res})
      }
      
    const setPackArray = (pack) =>{
        dispatch({type:'SET_PACK_ARRAY',payload:pack})
      }
    const setChannelArray = (chan) =>{
        dispatch({type:'SET_CHANNEL_ARRAY',payload:chan})
      }
    
    const setPackageCost = (cost) =>{
        dispatch({type:'SET_PACKAGE_COST',payload:cost})
      }
    const setChannelCost = (cost) =>{
        dispatch({type:'SET_CHANNEL_COST',payload:cost})
      }
      //Packages

    //Get Packages
    async function getPackagesList() {
        console.log('called')
        try {
          let response = await fetch(apiUri+"api/packages", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization:"Token "+token
            },
          });
          let res = await response.json();
          if (response.ok) {
            res = res.map(item =>{
              item.isSelect = false;
              return item
            })
  
            _storeData('packages',res)
            dispatch({type:'GET_PACKAGES',payload:res})
          }else{
            dispatch({type:'ERROR_STATUS',payload:res})
          }
        } catch (error) {
            dispatch({type:'ERROR_STATUS',payload:error.messages})
      }
    }
    async function getChannelsList() {
      try {
        let response = await fetch(apiUri+"api/channels", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:"Token "+token
          },
        });
        let res = await response.json();
        if (response.ok) {
  
          res = res.map(item =>{ 
              item.isSelect=false;
              return item
          })
         
          _storeData('channels',res)
          dispatch({type:'GET_CHANNELS',payload:res})
        }else{
          dispatch({type:'ERROR_STATUS',payload:res})
        }
      } catch (error) {
          dispatch({type:'ERROR_STATUS',payload:error.messages})
    }
  }
   return(
       <MainContext.Provider
       value={{
       packagelist:state.packagelist,
        channellist:state.channellist,
        packagecost:state.packagecost,
        channelcost:state.channelcost,
        packarray:state.packarray,
        channelarray:state.channelarray,
        setChannelArray,
        setPackArray,
        setPackageCost,
        setChannelCost,
        setPackages,
        setChannels,
        getChannelsList,
        getPackagesList,
        resetPackDetails

       }}>
            {props.children}
       </MainContext.Provider>
   )
}

export default MainState;