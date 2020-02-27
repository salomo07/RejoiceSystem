import React, { Component } from "react";
import {Header,Left,Button,Icon,Body,Title,Subtitle,Right} from "native-base";

class HeaderSubtitle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props;
    var data=navigation.getParam('data', '');
    return (
      <Header hasSubtitle>
        <Left>
          <Button transparent onPress={() =>{this.props.navigation.goBack()}}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{data.name}</Title>
          <Subtitle>{data.cat}</Subtitle>
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

export default HeaderSubtitle;
