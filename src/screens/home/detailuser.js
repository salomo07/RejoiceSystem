import React, { Component } from "react";
import {Container,Content,Card,CardItem,Left, Right, Body, Thumbnail,Text,Button,Icon} from "native-base";
import {DataTable} from 'react-native-paper';
import {View,TouchableOpacity,ScrollView } from "react-native";

import HeaderSubtitle from "../Header/HeaderSubtitle";
import Header1 from "../Header/Header1";
import Table from "../datatable/table";
import styles from "./styles";

const logo = require("../../../assets/logo.png");
class DetailUser extends Component {

  render() {
    // const { navigation } = this.props;
    // var data=navigation.getParam('data', '');
    // console.log("detaiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiil",this.props.navigation);
    return (
      <Container style={styles.container}>
        <Card>
          <CardItem bordered>
            <Left>
              <Thumbnail source={logo} />
              <Body>
                <Text>Detail User</Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem>
            
              <ScrollView>

              </ScrollView>
          </CardItem>
        </Card>
      </Container>
    );
  }
}

export default DetailUser;
