import React, { Component } from "react";
import {Header,Left,Button,Body,Title,Right} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5';
class Header1 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // this.menu=this.props.navigation.state.params.menu;
    return (
      <Header>
        <Left>
          <Button transparent onPress={() =>{this.props.navigation.goBack()}}>
            <Icon name="arrow-left" size={20} color="#fff" />
            <Title>   </Title>
            <Icon name={this.menu.iconname} size={15} color="#fff" />
          </Button>
        </Left>
        <Body>
          <Title>{this.menu.label}</Title>
        </Body>
        <Right>
          <Button transparent onPress={() =>{this.props.navigation.openDrawer()}}>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
    );
    
  }
}

export default Header1;
