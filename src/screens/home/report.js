import React, { Component } from "react";
import {Container,Header,Title,Content,Button,Icon,Text,Left,Body,Right,List,ListItem} from "native-base";
import Header1 from "../Header/Header1";
import styles from "./styles";
const datas = [
  {
    route: "BasicFooter",
    text: "Basic Footer"
  },
  {
    route: "IconFooter",
    text: "Icon Footer"
  },
  {
    route: "IconText",
    text: "Icon & Text Footer"
  },
  {
    route: "BadgeFooter",
    text: "With Badge"
  }
];

class Report extends Component {

  render() {
    // console.log("reportttttz",this.props);
    return (
      <Container style={styles.container}>
        <Header1 {...this.props}/>
        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Text>
                    {data.text}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" style={{ color: "#999" }} />
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default Report;
