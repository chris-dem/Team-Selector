import { useNavigation } from "@react-navigation/native";
import React, {FC} from "react";
import { View,Text,StyleSheet, FlatList, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";
import { StartComponent } from "./StartComponent";
import AwesomeButton from "react-native-really-awesome-button"



export const HomeComponent : FC = () => {
    const nav = useNavigation()
    const data : string[] = [
        "Start",
        "About"
    ]
    return (
        <SafeAreaView style={[styles.centerStyle,styles.container]}>
            <View style={btnStyles.btnContainer}>
                <AwesomeButton onPress={() => {nav.navigate("Start")}} width={100}>Start</AwesomeButton>
                {/* <AwesomeButton width={100} onPress={() => {
                            nav.navigate("About")//It works just leave it be */}
                        {/* }}>About</AwesomeButton> */}
            </View>
        </SafeAreaView>
    )
}
const btnStyles = StyleSheet.create({
    
    btnContainer : {
        flex  : 1,
        justifyContent : 'space-evenly',
        margin : 10,
        padding : 5,
        alignContent:"center",
        borderColor : "#FFF",
        borderRadius:10,
    }
})