import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import {auth, database} from '../../config/firebaseconfig';
import {connect} from 'react-redux';
import {restaurantUpload} from '../actions';
import { NavigationEvents, StackActions, NavigationActions } from 'react-navigation';

class CreateNotes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: ''
    }
  }

  s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);
  }

  uniqueId = () => {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
    this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  }

  submitNewLocalPick = () => {
    const {address, name, website, photoReference, restaurantId} = this.props.navigation.state.params
    const{notes} = this.state
    this.props.restaurantUpload(restaurantId, address, name, website, this.props.userId, notes, photoReference)
  }


  render() {

    const {address, name, website} = this.props.navigation.state.params

    return(
      <View style={{flex: 1}}>
        <View style={{position: 'relative', height: 70, paddingTop: 30, borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{width: 100, left: 0, top: 35, justifyContent: 'center', position: 'absolute'}}>
            <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'black'}}>←</Text>
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold'}}>Add Notes</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>{name}</Text>
          <Text style={{fontWeight: 'bold'}}>{address}</Text>
          <Text style={{fontWeight: 'bold'}}>{website}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TextInput
            editable={true}
            placeholder={'Enter your notes'}
            onChangeText={(text) => this.setState({notes: text})}
            value={this.state.notes}
            style={{width: 250, marginVertical: 10, padding: 5, borderWidth: 1, borderColor: 'grey', borderRadius: 3}}
          />
        </View>
        <KeyboardAvoidingView behavior="position" enabled style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15, paddingBottom: 14}}>
          <TouchableOpacity
            style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'rgb(52, 177, 209)',borderRadius: 1}}
                onPress={this.submitNewLocalPick}
          >
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>Add New Local Pick</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.currentUser.user
  }
}

const mapDispatchToProps = {restaurantUpload}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNotes);
