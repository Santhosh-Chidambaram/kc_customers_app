import React from 'react'
import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const Header = (props) => {
    return (
        <View style={styles.headCard}>
            <Text style={styles.headerText}>{props.title}</Text>
            {
                props.back ?
                <View style={styles.back}>
                <TouchableOpacity onPress={() => props.navigation.pop()}>
                    <Icon name="arrow-left-circle" color="white" size={35}/>
                </TouchableOpacity>
                </View>
            :
            null

            }
            
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    headCard:{
        backgroundColor:'#7f00ff',
        height:60,
        justifyContent:'center',
        alignItems:'center',
        borderBottomRightRadius:90,
        borderBottomLeftRadius:90,
    },
    headerText:{
        color:'white',
        fontSize:22,
    },
    back:{
        zIndex:1,
        position:'absolute',
        left:30,
    }
})