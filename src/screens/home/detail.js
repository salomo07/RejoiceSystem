import React, { Component } from "react";
import {Container,Content,Card,CardItem,Left, Right, Body, Thumbnail,Text,Button,Icon} from "native-base";
import {DataTable} from 'react-native-paper';
import { View,TouchableOpacity,ScrollView } from "react-native";

import HeaderSubtitle from "../Header/HeaderSubtitle";
import Table from "../datatable/table";
import styles from "./styles";

const logo = require("../../../assets/logo.png");
class Detail extends Component {

  render() {
    const { navigation } = this.props;
    var data=navigation.getParam('data', '');
    return (
      <Container style={styles.container}>
        <HeaderSubtitle {...this.props}/>
        <Card>
          <CardItem bordered>
            <Left>
              <Thumbnail source={logo} />
              <Body>
                <Text>History Transaction</Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem>
            
              <ScrollView>
                <Table data={data}/>
              </ScrollView>
          </CardItem>
        </Card>
      </Container>
    );
  }
}

export default Detail;
