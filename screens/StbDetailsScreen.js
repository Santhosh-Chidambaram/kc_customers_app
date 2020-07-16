import React, { useState } from 'react'
import { View,Text,FlatList,StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import {Colors,List} from 'react-native-paper'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import  Header  from './Layout/Header';

const StbItem = ({item,index}) =>{
    const [expanded,setExpanded] = useState(false)
    return(
        <View>
              <LinearGradient
    useAngle={true}
                angle={145}
                angleCenter={{x: 0.7, y: 0.7}}            
    
                colors={['#7f00ff',Colors.purpleA100]} 
    style={styles.stbitem}>
        <View style={{marginLeft:20}}>
        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
        <MCIcon name="set-top-box" size={40} color="white" /> 
        <Text style={{color:'white',fontSize:20,textAlign:'center'}}>{"   "}{item.stbno}</Text>
        </View>
        
        <Text style={{color:'white',fontSize:20}}>Box Status : {item.box_status}</Text>
        <View style={{width:320}}> 
        <List.Section  >
                <List.Accordion
                title="Packs"
                left={props => <MCIcon {...props} name="monitor" size={22} color="white" />}
                expanded={expanded}
                onPress={() => setExpanded(!expanded)}
                titleStyle={{fontSize:16,paddingLeft:10,color:'white'}}
                >
                 {
                     item.packages.map(p =>(
                        <List.Item
                        key={p.id}
                        title={p.name}
                        titleStyle={styles.keyText}
    
                        />
                     ))
                 }
                 {
                     item.channels.map(p =>(
                        <List.Item
                        key={p.id}
                        title={p.name}
                        titleStyle={styles.keyText}
                  
                        />
                     ))
                 }    
               


              
                </List.Accordion>
               
            </List.Section>

        </View>
        

            
           
      

        </View>
    </LinearGradient>

        </View>
      

    )
}

function StbDetailsScreen({route,navigation}) {
    const {stbitem} = route.params;

  
        
    return (
        <View style={styles.container}>
            <Header title="STB Details" back={true} navigation={navigation} />
            <FlatList
            data={stbitem}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item,index}) => <StbItem item={item} index={index} />}
            />
        </View>
    )
}

export default StbDetailsScreen
const styles = StyleSheet.create({
    container:{
            flex:1,
            backgroundColor:'white',
    },
    stbitem:{
        marginTop:10,
        padding:20,
        marginLeft:10,
        marginRight:10,
        borderRadius:20,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:10,
        backgroundColor:'#7f00ff',

    },
    keyText:{
        color:'white',
    },

})