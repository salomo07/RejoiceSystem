import React,{ Component } from "react";
// import {createAppContainer,createSwitchNavigator} from "react-navigation";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ToastAndroid,AppState} from "react-native";
import {Container} from 'native-base';

import Login from "./screens/login/index";
import Splash from "./screens/login/splash";
import Home from "./screens/home/index";
import Detail from "./screens/home/detail";
import Transaction from "./screens/home/transaction";
import Report from "./screens/home/report.js";
import Master from "./screens/master/";
import MasterProduct from "./screens/master/product";
import SideBar from "./screens/sidebar/";

var AppDesc =require("../app.json");
import Functions from "./Functions.js";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

var screenList={"Transaction":Transaction,"Report":Report,"Detail":Detail,"Master":Master,"Setting":Master,"TransactionOut":Transaction,"ReportMonthly":Transaction,"ReportDaily":Transaction,"SettingMenu":Transaction,"TransactionIn":Transaction,"MasterUser":Transaction,"MasterProduct":MasterProduct,"MasterWarehouse":Transaction};


var userdata;
class DrawerComponent extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Drawer.Navigator initialRouteName="Home" drawerPosition="right" drawerContent={props => { return <SideBar {...props} datauser={userdata} /> }}>
                <Drawer.Screen name="Home" component={Home} />
                {this.props.userdata!=undefined ? 
                    this.props.userdata.menu2.map((val,i)=>{
                        return (<Drawer.Screen key={i} name={val.url} component={screenList[val.url]} />)
                    }): ""
                }
                {this.props.userdata!=undefined ? 
                    this.props.userdata.menu1.map((val,i)=>{
                        return (<Drawer.Screen key={i} name={val.url} component={screenList[val.url]} />)
                    }): ""
                }
            </Drawer.Navigator>
        );
    }
}
class Navigation extends Component {
    constructor(props){
        super(props);
        this.appState="";
    }
    componentDidMount(){
        new Functions().getDataFromStorage('userData',(err,res)=>{
            this.setState({"userdata":res});
            if(res!=null)
            {userdata=res;}            
        });
    }
    refreshNavigation=(userdata)=>{       
        this.setState({userdata:userdata});
    }
    
    render()
    {
        if(this.state!=null)
        { 
            var initNavigator= this.state.userdata==null? "AuthNavigator" : "AppNavigator";
            return (
                <NavigationContainer>
                    <Drawer.Navigator initialRouteName={initNavigator} headerMode="none">
                        <Drawer.Screen name="AuthNavigator" component={props=>{return <Login {...props} refreshNavigation={this.refreshNavigation}/>}} params={{refresh:this.refreshNavigation,"userdata":this.state.userdata}}/>
                        <Drawer.Screen name="AppNavigator" component={
                            ()=>{
                                return (
                                <Drawer.Navigator initialRouteName="Home" drawerPosition="right" drawerContent={props => { return <SideBar {...props} datauser={this.state.userdata} /> }}>
                                    <Drawer.Screen name="Home" component={Home} />
                                    {this.state.userdata.menu1.map((val,i)=>{
                                        <Drawer.Screen name={val.url}  component={screenList[val.url]} />
                                    })}
                                    {this.state.userdata.menu2.map((val,i)=>{
                                        <Drawer.Screen name={val.url} component={screenList[val.url]} />
                                    })}
                                </Drawer.Navigator>)
                            }
                        }/>
                    </Drawer.Navigator>
                </NavigationContainer>
            )
        }
        else
        {return <Splash/>;}
    }
}
export default Navigation;
