import { useNavigation } from "@react-navigation/native";
import React, {FC} from "react";
import { View,Text,StyleSheet, FlatList, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";
import { StartComponent } from "./StartComponent";



export const HomeComponent : FC = () => {
    const nav = useNavigation()
    const data : string[] = [
        "Start"
    ]
    return (
        <SafeAreaView style={[styles.centerStyle,styles.container]}>
            <FlatList 
            data={data}
            renderItem={({item}) => {
                return (
                    <Button title={item} onPress={() => {
                        nav.navigate(item)//It works just leave it be
                    }}/>
                )
            }}/>
        </SafeAreaView>
    )
}
