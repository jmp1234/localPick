import React, { Component } from 'react';
import ActionSheet from 'react-native-actionsheet'
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

class Action extends Component {
  constructor(props) {
    super(props);
  }

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  render() {

    const {openOverlay, deleteLocalPick, restaurantId, userId, userNotesIds} = this.props

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
           options={['Add Note', 'Delete Local Pick', 'cancel']}
           cancelButtonIndex={2}
           destructiveButtonIndex={1}
           onPress={(index) => {
             if(index === 0) {
               openOverlay()
             } else if(index === 1) {
               //delete local pick
               deleteLocalPick(restaurantId, userId, userNotesIds)
             }
           }}
         />
      </View>

    )
  }
}

export default Action
