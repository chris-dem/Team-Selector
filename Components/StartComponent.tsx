import React, {FC} from "react";
import { View,Text, SafeAreaView, KeyboardAvoidingView, Platform, TextInput, Touchable, TouchableOpacity } from "react-native";
import styles from "../styles";
import {Name} from './Name'


export const StartComponent : FC = () => {
    const names : string[] = [];
    return (
        <View style={styles.container}>
            <View style={styles.nameWrapper}>
                <Text style={styles.sectionTitle}>Hi</Text>

                <View style={styles.names}>
                    <Name name="Maria"/> 
                    <Name name="John"/> 
                </View>


                {/* Write a atask */}
                <KeyboardAvoidingView
                    behavior={Platform.OS == 'ios' ? "padding" : "height"}
                    style = {styles.writeTaskWrapper}
                >
                <TextInput style={styles.nameInput} placeholder={'Write a task'}/>
                <TouchableOpacity >
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}