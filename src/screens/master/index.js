import React, { Component } from "react";
import { FlatList, AsyncStorage,View,TextInput,ScrollView} from "react-native";
import {Container,Header,Title,Content,Button,Text,Left,Body,Right,List,ListItem} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Splash from "../login/splash";
import Functions from "./../../Functions.js";
import Header1 from "../Header/Header1";
import styles from "./styles";

class Master extends Component {
  componentWillMount(){
    this.getSubMenu();
  }
  getSubMenu()
  {
    var menu1= this.props.navigation.getParam("userData").menu1;
    var menu2= this.props.navigation.getParam("userData").menu2;
    var arrMenu2=[];
    
    for (var i = 0; i < menu1.length; i++) {
      if(menu1[i].label==this.props.navigation.state.routeName)
      { 
        for (var j = 0; j < menu2.length; j++){
          menu2[j].key=j.toString();
          if(menu1[i]._id==menu2[j].idmenu1){arrMenu2.push(menu2[j]);}
        }
        this.setState({menu2:arrMenu2});
      }
    }
  }
  render() {
    return (
      <Container >
        <Header1 {...this.props} />
        {this.state==null ? (<Splash/>) :
          (
            <ScrollView>
              <FlatList data={this.state.menu2} renderItem={({item}) => 
                <ListItem onPress={() => {this.props.navigation.navigate(item.label);}}>
                  <Left>
                    <Icon active name={item.iconname} style={item.iconstyle}/>
                    <Text>{item.label}</Text>
                  </Left>
                </ListItem>
              }/>
            </ScrollView>
          )
        }
      </Container>
    );
  }
}

export default Master;
