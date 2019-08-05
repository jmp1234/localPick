import React, { Component } from 'react';
import ActionSheet from 'react-native-actionsheet'
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

class Action extends Component {

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  render() {
    return (
      <View>
        <Icon
          name='more-horiz'
          type='material'
          color='black'
          onPress={this.showActionSheet}
        />

        <ActionSheet
           ref={o => this.ActionSheet = o}
           // title={'Which one do you like ?'}
           options={['Add Note', 'Delete Local Pick', 'cancel']}
           cancelButtonIndex={2}
           destructiveButtonIndex={1}
           onPress={(index) => { /* do something */ }}
         />
      </View>

    )
  }
}

export default Action
