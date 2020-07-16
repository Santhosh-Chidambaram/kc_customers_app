import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'


export default function PackRow({ item, onSelect }) {
    var sp = item.name.indexOf('') ;
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => onSelect(item)}
        style={styles.item}
        activeOpacity={0.9}
      >
        <>
        <View style={{
           justifyContent:'center',
           alignItems:'center',
           backgroundColor:item.isSelect  ? 'white':'#8e2de2',
           height:50,
           width:50,
           borderRadius:50,
           marginLeft:10,
           marginRight:25,
           
           }}>
               {item.isSelect
               ?
               <Ionicon name="ios-checkmark-circle" color="green" size={50} />
               :
               <Text style={{color:'white',fontSize:20,}}>{item.name.charAt(0)}{sp > 1?item.name.charAt(sp+1):null}</Text>
               }
          
         </View>
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}><Icon name="rupee" size={20} />{item.price}/-</Text>

          </View>

        </>
          
        
      </TouchableOpacity>
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
    
  });