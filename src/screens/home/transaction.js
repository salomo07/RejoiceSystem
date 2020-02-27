import React, { Component} from "react";
import { StatusBar, AsyncStorage,View,Platform,DatePickerAndroid,DatePickerIOS} from "react-native";
import {Container,Header,Content,Button,Form,Left,Right,Radio,Card,CardItem,Body} from "native-base";
import Header1 from "../Header/Header1";
import styles from "./styles";
import Functions from "./../../Functions.js";
import { Col, Row, Grid } from 'react-native-easy-grid';
import {TextInput,RadioButton,Text} from 'react-native-paper';


const logo = require("../../../assets/logo.png");
var transactionDate,nominal,transaction='Buy';

class Transaction extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.setState({transaction:"Buy",transactiondate:"",nominal:"",nominalshow:""})
  }
  async onPressAction() {
    try 
    {
      if(Platform.OS !== "ios")
      {
        const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(),
        maxDate:new Date()
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          var datez = new Date(year, month, day);
          this.setState({transactiondate:datez.getDate()+"-"+(datez.getMonth()+1)+"-"+datez.getFullYear()});
        }
      }
      else
      {
        const {action, year, month, day} = await DatePickerIOS.open({
        date: new Date(),
        maxDate:new Date()
        });
        if (action !== DatePickerIOS.dismissedAction) {
          var datez = new Date(year, month, day);
          this.setState({transactiondate:datez.getDate()+"-"+(datez.getMonth()+1)+"-"+datez.getFullYear()});
        }
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    
    return (
      <Container style={styles.container}>
        <Header1 {...this.props}/>
        <Content style={styles.contain}>
          <Form >
            <RadioButton.Group
              onValueChange={value => {this.setState({transaction:value });}}
              value={this.state.transaction}
            >
              <Grid style={{justifyContent: 'center', alignItems: 'center'}}>
                <Col style={{ width:70 }}>
                  <Left>
                    <Text>Buy</Text>
                  </Left>
                  <Right>
                    <RadioButton value="Buy" status={this.state.transaction=='Buy'?'checked':'unchecked'} />
                  </Right>
                </Col>
                <Col style={{ width:70 }}>
                  <Left>
                    <Text>Sell</Text>
                  </Left>
                  <Right>
                    <RadioButton value="Sell" status={this.state.transaction=='Sell'?'checked':'unchecked'} />
                  </Right>
                </Col>
              </Grid>
            </RadioButton.Group>
            <TextInput keyboardType='numeric' value={this.state.nominalshow} mode='outlined' label="Nominal" style={{marginTop:10}} onChangeText={text => {text=text.replace(/[^0-9]/g, '');this.setState({nominal:text}); this.setState({nominalshow:text.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')})}} 
            />
            <TextInput value={this.state.transactiondate} mode='outlined' label="Transaction Date" style={{marginTop:10}} onFocus={() => {this.onPressAction();}} />
          </Form >
        </Content>
      </Container>
    );
  }
}

export default Transaction;
