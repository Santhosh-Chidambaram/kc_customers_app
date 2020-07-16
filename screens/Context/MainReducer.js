
const MainReducer = (state,action) =>{
    switch(action.type){
        case 'GET_PACKAGES':
        return {
          ...state,
          packagelist:action.payload
        };
       case 'GET_CHANNELS':
        return {
          ...state,
          channellist:action.payload
        };
        case 'SET_PACKAGE_COST':
            return{
              ...state,
              packagecost:action.payload
            }
       case 'SET_CHANNEL_COST':
        return{
          ...state,
          channelcost:action.payload
        }
        case 'SET_PACK_ARRAY':
            return{
              ...state,
              packarray:action.payload
            }
        case 'SET_CHANNEL_ARRAY':
              return{
                ...state,
                channelarray:action.payload
              }
        case 'RESET_PACK_DETAILS':
          return{
            ...state,
            packagecost:0,
            channelcost:0,
            packarray:[],
            channelarray:[],
            packagelist: state.packagelist.map(item =>{ 
              item.isSelect=false;
              return item
            }),
            channellist: state.channellist.map(item =>{ 
              item.isSelect=false;
              return item
          })
          }
    }
}

export default MainReducer