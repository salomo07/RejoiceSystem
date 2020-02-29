import React from "react";
import {Platform} from 'react-native';
import { Root,StyleProvider } from "native-base";
import Navigation from "./src/Navigation";
import getTheme from "./src/theme/components";
import variables from "./src/theme/variables/commonColor";
import "react-native-gesture-handler";


console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    
  }
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Navigation />
      </StyleProvider>
      );
    }
}
