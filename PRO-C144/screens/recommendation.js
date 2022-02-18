import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios"
import { Linking } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize"

export default class PopularScreen extends React.Component{
    constructor(){
        super();
        this.state={
            article_details: [],
        }
    }

    componentDidMount(){
        this.getArticles();
    }

    getArticles =()=>{
        const url = "http://10.0.0.77:5000/recommended-articles";
        axios.get(url).then(response=>{
            return this.setState({article_details:response.data.data})
        })
        .catch(error=>{alert(error.message)})
    }

    renderItem=({item, index})=>{
        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={{fontSize: RFValue(12), textAlign:"center"}}>{item.title}</Text>
                </View>
                <View style={{justifyContent:"center"}}>
                    <TouchableOpacity onPress={()=>Linking.openURL(item.url)} style={{marginHorizontal:25}}>
                        <Image
                            style={styles.button}
                            source={require("../assets/images/linkbutton.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    keyExtractor=(item, index)=>index.toString();

    render(){
        return(
            <View>
                <FlatList
                    data={this.state.article_details}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row", 
        padding:10, 
        justifyContent:"space-between",
        borderBottomWidth:2,
        borderColor:"#82a5b8"
    },
    button:{
        width: RFValue(30),
        height: RFValue(30),
        alignSelf: 'center',
    },
    header:{
        fontSize: RFValue(25),
        color: "#23404f",
    },
    titleContainer:{
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        borderColor:"#FFFFFF",
        backgroundColor:"#FFFFFF",
        margin: 20,
        justifyContent:"center",
        width: RFValue(200)
    }
})
