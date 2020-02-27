import React, { Component } from "react";
import {DataTable} from 'react-native-paper';
var history,currentPage=0,lengthPerPage=10,startRow=0,lastRow=0;

class Table extends Component {
  componentWillMount(){
    this.setState({index:0});
    this.setState({history:this.props.data.history});
  }

  getHeaderTable(object){
    var header=Object.keys(object).map((key)=>{
      return <DataTable.Title key={key}>{key}</DataTable.Title>;
    });
    return (<DataTable.Header>{header}</DataTable.Header>)
  }
  getRowTable(data){
    var row=Object.values(data).map((val)=>{
      return (<DataTable.Cell>{val}</DataTable.Cell>);
    });
    return Object.values(data).map((row,key)=>{
      if(key>=this.state.index&&key<lengthPerPage*(this.state.index+1))
      {
        
        startRow=this.state.index + 1;
        lastRow=key+1;
        return (
          <DataTable.Row key={key} style={{}}>
            {
              Object.values(row).map((val,i)=>{
                return <DataTable.Cell key={row+i}>{val}</DataTable.Cell>
              })
            }
          </DataTable.Row>
        );
      }
    });
  }
  render() { 
    history=this.props.data.history;
    var numberOfPages=Math.ceil(history.length/10);
    return (
      <DataTable>
        {this.getHeaderTable(history[0])}
        {this.getRowTable(history)}

        <DataTable.Pagination
          page={currentPage}
          numberOfPages={numberOfPages}
          onPageChange={(page) => { 
            if(!page>numberOfPages||!page<numberOfPages)
            {
              currentPage=page;
              this.setState({index:page*lengthPerPage});
            }
          }}
          label={startRow+"-"+lastRow+" of "+history.length}
        />
      </DataTable>

    );
  }
}

export default Table;
