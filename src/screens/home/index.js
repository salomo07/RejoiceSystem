import React, { Component } from "react";
import { StatusBar, AsyncStorage,ScrollView,Image,Dimensions,TouchableOpacity} from "react-native";
import { Card, CardItem, Left, Right, Body, Thumbnail, Container, Button, Text, Header, Icon, Title, Tabs, Tab, ScrollableTab, TabHeading, View, Item, Input } from "native-base";


import Functions from "./../../Functions.js";

const deviceWidth = Dimensions.get("window").width;
const cardImage = require("../../../assets/drawer-cover.png");
const logo = require("../../../assets/logo.png");
var Cards;

class Home extends Component {
  constructor(props) {
    super(props);
  }
  
  async componentWillMount(){

  }
  componentDidMount(){
    this.setState({invest:[{name:"Sucorinvest Maxi Fund",code:"SMF",cat:"Reksadana Saham",
      history:[
      {"Transaction":"Buy",Price:1000000,Date:"04-12-19",Unit:645.1113},
      {"Transaction":"Buy",Price:500000,Date:"06-09-19",Unit:297.8030},
      {"Transaction":"Buy",Price:1000000,Date:"06-09-19",Unit:583.0622},
      {"Transaction":"Buy",Price:1000000,Date:"06-08-19",Unit:616.2565},
      ]},

      {name:"Sucorinvest Money Market Fund",code:"SMMF",cat:"Reksadana Pasar Uang",
      history:[
      {"Transaction":"Buy",Price:2500000,Date:"06-02-20",Unit:1724.1142},
      {"Transaction":"Buy",Price:4300000,Date:"08-01-20",Unit:2982.2383},
      {"Transaction":"Sell",Price:1002651,Date:"30-10-19",Unit:705.0000},
      {"Transaction":"Buy",Price:1700000,Date:"12-09-19",Unit:1201.7192},
      {"Transaction":"Sell",Price:700635.22,Date:"12-09-19",Unit:496.0000},
      {"Transaction":"Buy",Price:600000,Date:"12-09-19",Unit:425.8620},
      {"Transaction":"Sell",Price:200965.91,Date:"30-08-19",Unit:143.0000},
      {"Transaction":"Sell",Price:520783.46,Date:"24-08-19",Unit:371.0000},
      {"Transaction":"Buy",Price:500000,Date:"06-08-19",Unit:357.4122},
      {"Transaction":"Sell",Price:300030.57,Date:"24-07-19",Unit:215.0000},
      {"Transaction":"Buy",Price:1000000,Date:"04-07-19",Unit:719.2713},
      {"Transaction":"Sell",Price:5508186.33,Date:"14-06-19",Unit:3976.9437},
      {"Transaction":"Buy",Price:4000000,Date:"12-06-19",Unit:2889.1422},
      {"Transaction":"Buy",Price:1500000,Date:"23-05-19",Unit:1087.8015}
      ]
    }]});
    new Functions().getHTMLFromURL("https://www.sucorinvestam.com:5447/scapi/Fund",(err,res)=>{
      if(err)
      {ToastAndroid.show("An error occurred.",ToastAndroid.SHORT);}
      else
      {this.setState({nav:res});}
    });    
  }
  clearUserData(){
    new Functions().localStorage.removeItem('userData');
    this.props.navigation.navigate('AuthNavigator');
  }
  currencyFormat(num) {
    return 'Rp ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  getDetailTotal(data)
  {
    var nav;
    var currentUnit=0,totalInvest=0,totalSell=0,currentInvest=0,currentNAV=data.nav;
    data.history.map((invest)=>{
      if(invest.Transaction=="Sell")
      { currentUnit=currentUnit-invest.Unit; totalSell=totalSell+invest.Price;}
      else
      {currentUnit=currentUnit+invest.Unit; totalInvest=totalInvest+invest.Price;}
    });

    totalInvest=totalInvest.toFixed(4)-totalSell.toFixed(4);
    currentInvest=currentNAV.toFixed(4) * currentUnit.toFixed(4);
    nav= (
      <View>
        <Text>Current Unit : {currentUnit.toFixed(4)} Unit</Text>
        <Text>Current NAV : {this.currencyFormat(currentNAV)} </Text>
        <Text>Total Invest : {this.currencyFormat(totalInvest)} </Text>
        <Text>Return : {this.currencyFormat(currentInvest-totalInvest)} --> ({((currentInvest-totalInvest)/(totalInvest)*100).toFixed(2)})% </Text>

        <Text style={{fontSize:30,color:"#67e465"}}>{this.currencyFormat(currentInvest)}</Text>
      </View>
        )
    return nav;
  }
  getCardComponent()
  {
    var Cards;
    if(this.state!=null){
      Cards= this.state.invest.map((data,key)=>{

        if(this.state.nav!=undefined){
          this.state.nav.map((n,key)=>{
            if(n.fundPK==data.code){data.nav=n.nav;}
          });
        }
        return (
        // <TouchableOpacity key={key}  onPress={() => {this.props.navigation.navigate("Detail",{data:data}); }}>
          <Card key={key}>
            <CardItem bordered>
              <Left>
                <Thumbnail source={logo} />
                <Body>
                  <Text>{data.name}</Text>
                  <Text note>{data.cat}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem>
              <Body>
              {
                this.state.nav !=undefined ?
                this.getDetailTotal(data)
                :
                (<Text>Connecting to server...</Text>)
              }
              </Body>
            </CardItem>
          </Card>
        // </TouchableOpacity>
        );
      })
    }
    return Cards;
  }
  
  render() { 
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Header searchBar rounded>
          <Item>
            <Icon active name="search" />
            <Input placeholder="Search" />
            <Icon active name="people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Tabs tabBarPosition="bottom" renderTabBar={() => <ScrollableTab />}>
          <Tab heading={
              <TabHeading >
              <Icon type="FontAwesome" name="home" style={{fontSize:20}} />
              <Text style={{fontSize:10}}>Home</Text>
              </TabHeading>
            }>
            
            <ScrollView style={{zIndex:999, height:300}}>
              {this.getCardComponent()}
              
            </ScrollView>
          </Tab>
          <Tab heading={
              <TabHeading>
                <Icon type="FontAwesome" name="user" style={{fontSize:20}} />
                <Text style={{fontSize:10}}>Account</Text>
              </TabHeading>
            }>
            
            <ScrollView style={{ flex: 1 }}>
            <Button block style={{ margin: 15, marginTop: 10 }} onPress={() => this.clearUserData()}>
              <Text>Clear Userdata</Text>
            </Button>
            <Button block style={{ margin: 15, marginTop: 10 }} onPress={() => this.props.navigation.openDrawer()}>
              <Text>Menu</Text>
            </Button>
            </ScrollView>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Home;
