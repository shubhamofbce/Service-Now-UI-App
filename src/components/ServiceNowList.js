import React, { Component } from 'react'
let base64 = require('base-64');
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  View,
  FlatList
} from 'react-native'

class ServiceNowList extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:[]
     };
   }
  renderSeparator = () => {  
    return (  
        <View  
            style={{  
                height: 1,  
                width: "100%",  
                backgroundColor: "#000",  
            }}  
        />  
    );  
};  
//handling onPress action  
getListViewItem = (item) => {  
    Alert.alert(item.description);  
}

componentDidMount(){
  let url = 'https://dev64765.service-now.com/api/now/table/x_514301_shubhamap_shubhamtable';
  let username = 'admin';
  let password = 'Shubham123';

  let headers = new Headers();

//headers.append('Content-Type', 'text/json');
headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
  fetch(url, {method:'GET',
  headers: headers,
 })
  .then(response => response.json())
  .then((responseJson) => {
      this.setState({
          loading: false,
          dataSource: responseJson.result
      })
  })
  .catch(error => console.log(error))
}

render() {
  
  if(this.state.loading){
    return(  
            <Text>Data is loading...</Text>  
    )
  }
  else{
    return (   
        <View style={styles.container}>  
            <FlatList  
                data={this.state.dataSource}  
                renderItem={({item}) =>  
                    <Text style={styles.item}  
                          onPress={this.getListViewItem.bind(this, item)}>{item.description}</Text>}  
                ItemSeparatorComponent={this.renderSeparator}  
            />  
        </View>  
    ); 
  }  
}
}

const styles = StyleSheet.create({  
  container: {  
      flex: 1,  
  },  
  item: {  
      padding: 10,  
      fontSize: 18,  
      height: 44,  
  },  
})  

export default ServiceNowList