import { useNavigation } from "@react-navigation/native";
import React, {FC, useState} from "react";
import { StyleSheet,View,Text, SafeAreaView, KeyboardAvoidingView, Platform, TextInput, Touchable, TouchableOpacity, Keyboard, ScrollView } from "react-native";
import styles from "../styles";
import {Name} from './Name'

type nullableString = string | null

export const StartComponent : FC = () => {
    const [task, setTask] = useState<string>('')
    const [taskItems, setTaskItems] = useState<string[]>([])
    const [keyboardError, setKeyboardError] = useState<nullableString>(null)

    const handleAddName = () => {
        if(task in taskItems ) {
            setKeyboardError("Name must be unique")            
        }else if(task === ""){
            setKeyboardError("Name must not be empty")            
        } else {
            Keyboard.dismiss(); //minimize keyboard
            setTaskItems([...taskItems,task])
            setKeyboardError(null)
            setTask('')
        }
    }

    const removeName = (index : number) => {
        setTaskItems(taskItems.filter((_,indx) => indx !== index))
    }

    const nav = useNavigation()
    const goToAddRatings = () => {
        nav.navigate('Rate',{
            names : taskItems
        })//Ignore error
    }

    return (
        <View style={[styles.container,startStyles.wrapper]}>
            <View>
                <Text style={styles.sectionTitle}>Please add the players' names (At least 4):</Text>
            </View>
            <ScrollView style={styles.nameWrapper}>

                {
                    taskItems.map((item,index) => {
                        return (<Name key={index} name={item} indx={index} rem={removeName}  />)
                    })
                } 
            </ScrollView>
            <View>
                <KeyboardAvoidingView
                    behavior={Platform.OS == 'ios' ? "padding" : "height"}
                    style = {styles.writeTaskWrapper}
                >
                <TextInput style={keyboardError ? styles.nameInput : [styles.nameInput,startStyles.error]}
                     placeholder={!keyboardError ? 'Write a task' : 'Name must be unique'} 
                     value={task} 
                     placeholderTextColor={keyboardError ? '#CD001A' : 'grey' }
                     onChangeText={text => setTask(text)} 
                     maxLength = {50}/>
                <TouchableOpacity onPress= {() => handleAddName()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
                {
                    taskItems.length  >= 4 &&
                    <TouchableOpacity onPress = {() => {goToAddRatings()}} >
                        <View style={styles.addWrapper}>
                            <Text style={styles.addText}>Next</Text>
                        </View>
                    </TouchableOpacity>
                }
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}


const startStyles = StyleSheet.create({
    wrapper : {
        flex : 1,
        justifyContent : "space-between",
        alignItems:"flex-start",

    },
    
})