import React, { PureComponent,Component } from 'react'
import {View,Text,FlatList} from 'react-native'
import PackRow from './PackRow'
import PropTypes from 'prop-types'

export default class PackList extends Component {
    static propTypes = {
        prop: PropTypes.object
    }


    render() {
        return (
            <View>
                <FlatList
                 shouldItemUpdate={(props,nextProps)=>
                  { 
                    return props.item!==nextProps.item
                      
                   }  }
                data={this.props.data}
                renderItem={({item}) => <PackRow item={item} onSelect={this.props.selectItem}/>}
                keyExtractor={item => item.id.toString()}
                extraData={this.props.selected}
                ListFooterComponent={() => <View style={{marginBottom:100}}></View>}
               
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={5} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
                maxToRenderPerBatch={100} // Increase time between renders
                windowSize={7} // Reduce the window size

                />
            </View>
        )
    }
}
