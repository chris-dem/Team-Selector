import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import React, {FC, useState} from "react"
import { View,Text, TextInput, TouchableOpacity,StyleSheet } from "react-native"
import styles from "../styles"
import ModalDropdown from "react-native-modal-dropdown"
import NumericInput from 'react-native-numeric-input'

interface RouteProps {
    names : string[]
}

export const RateComponent : FC = () => {
    const nameProp = useRoute().params as RouteProps;
    // const params : object = { names : ["Antrea","Chris","Iota","Abc"]}
    // const nameProp = params as RouteProps
    
    const initObj : {[key : string] : number}= {}
    for(let st in nameProp.names) {
        for(let st2 in nameProp.names.filter(x => st !== x)) {
            initObj[st+"-"+st2] = 0   
        }
    }
    const nav = useNavigation()
    const makeKey = (x : string,y : string) => x+'-'+y
    const [ratings,setRatings] = useState<{ [key : string] : number }>(initObj)
    // const [rating,setRating] = useState<number>(0.)
    const [fname,setFname] = useState(0)
    const [lname,setLname] = useState(0)
    
    const changeRating = (rating: number) => {
        console.log(ratings)
        if(rating > 0 && rating <= 10 && fname !== lname) {
            setRatings({...ratings,...{[makeKey(fname.toString(),lname.toString())] : rating }})
        }
    }

    const goToResult = () => {
        nav.navigate('Result',{
            nameArray : nameProp.names,
            values    : ratings
        })
    }
    //Update list automatically
    return (
        <View style={[styles.container,styles.centerStyle]}>
            <View style={styles.rateWrapper}>
                <ModalDropdown defaultValue={nameProp.names[fname]} style={stls.dropdown} defaultIndex={0} options={nameProp.names} onSelect={(val) => {
                    setFname(parseInt(val)); 
                } }/>
                <NumericInput  
                    value={ratings[makeKey(fname.toString(),lname.toString())]}
                    minValue={0}
                    step={0.5}
                    maxValue={10}
                    valueType='real'
                    inputStyle = {{
                        backgroundColor : 'white'
                    }}
                    containerStyle = {{
                        marginRight : 10
                    }}
                    // iconStyle={{ color: 'white' }} 
                    onChange={(newNumber) => {
                        changeRating(newNumber)
                    }}/>
                <ModalDropdown style={stls.dropdown} defaultValue={nameProp.names[1]} defaultIndex={1} options={nameProp.names} onSelect={(val) => setLname(parseInt(val))}/> 
            </View>
            <TouchableOpacity onPress = {() => goToResult()} >
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>Next</Text>
                    </View>
            </TouchableOpacity>
        </View>
    )
}

const stls = StyleSheet.create({
    dropdown : {
        borderWidth: 0,
        borderRadius: 3,
        backgroundColor: 'cornflowerblue',
        width : '27%',
        padding : 10,
        color : '#fff',
        marginRight : 10,
        justifyContent :'center',
        alignContent : "center"
    },
    numb : {
        width: 60,
        // height: 60,
        backgroundColor: '#FFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    }
})