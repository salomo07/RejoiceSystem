import React, { Component} from "react";
import {TouchableOpacity,} from "react-native";
import {Container,Content} from "native-base";
import Header1 from "../Header/Header1";
import styles from "./styles";
import Functions from "./../../Functions.js";
import { Col, Row, Grid } from 'react-native-easy-grid';
import {Avatar,IconButton,Button,Title,Card,Divider} from 'react-native-paper';


const logo = require("../../../assets/logo.png");

class MasterProduct extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.setState({transaction:"Buy",transactiondate:"",nominal:"",nominalshow:""})
  }
  render() {
    console.log("props",this.props)
    // this.props.navigation.state.routeName
    // console.log(this.state.nominal);
    return (
      <Container style={styles.container}>
        <Header1 {...this.props}/>
        <Content style={styles.contain}>
          <Grid>
            <Col style={{marginRight:5,marginLeft:5,marginTop:5}}>
              <TouchableOpacity style={{width:'100%'}} onPress={() => {this.props.navigation.navigate("xxx"); }}>
                <Card>
                  <Card.Title title="Helm Anti Maling" subtitle="Rp.450.000" right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}/>
                  <Divider />
                  <Card.Cover source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRoQcfwmkfMT5kzpbw5vfdA9JXrltPWQJgZzh-HXyDlJnylaUkZw'  }} />
                  <Divider />
                </Card>
              </TouchableOpacity>
            </Col>
            <Col style={{marginRight:5,marginLeft:5,marginTop:5}}>
              <TouchableOpacity style={{width:'100%'}} onPress={() => {this.props.navigation.navigate("xxx"); }}>
                <Card>
                  <Card.Title title="Helm Anti Maling" subtitle="Rp.450.000" right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}/>
                  <Divider />
                  <Card.Cover style={{size:'auto'}} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRoQcfwmkfMT5kzpbw5vfdA9JXrltPWQJgZzh-HXyDlJnylaUkZw'  }} />
                  <Divider />
                </Card>
              </TouchableOpacity>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default MasterProduct;
