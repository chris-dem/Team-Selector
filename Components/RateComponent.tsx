import { RouteProp, TabActions, useNavigation, useRoute } from "@react-navigation/native"
import React, {FC, useState} from "react"
import { View,Text, TextInput, TouchableOpacity,StyleSheet, ScrollView } from "react-native"
import styles from "../styles"
import ModalDropdown from "react-native-modal-dropdown"
import NumericInput from 'react-native-numeric-input'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

interface RouteProps {
    names : string[]
}

interface ErrorMsg {
    errorMessage : string
    isError : boolean
}

export const RateComponent : FC = () => {
    const nameProp = useRoute().params as RouteProps;
    // const params : object = { names : [
    //     "Antrea","Chris","Iota","Aa"
    // ]}
    // const nameProp = params as RouteProps
    
    const numNames = nameProp.names.length

    const generateMemptyError : () => ErrorMsg = () => {
        return {
            errorMessage : "",
            isError : false
        }
    }

    const nav = useNavigation()
    const makeKey = (x : string,y : string) => x+'-'+y
    const [ratings,setRatings] = useState<{ [key : string] : number }>({})
    const [errorState, setErrorState] = useState<ErrorMsg>(generateMemptyError())
    const [fname,setFname] = useState(0)
    const [lname,setLname] = useState(1)
    
    const changeRating = (rating: number) => {
        if(rating > 0 && rating <= 10 && fname !== lname) {
            setRatings({...ratings,...{[makeKey(fname.toString(),lname.toString())] : rating }})
            setErrorState(generateMemptyError())
        }else {
            setErrorState({errorMessage: "You cannot rate yourself",isError:true})
        }
    }

    const goToResult = () => {
        if(Object.keys(ratings).length !== numNames * (numNames - 1)) {
            setErrorState({
                errorMessage : "Players that didn't rate everyone yet",
                isError : true,
            })
        }else{
            nav.navigate('Result',{
                nameArray : nameProp.names,
                values    : ratings
            })
        }
    }
    //Update list automatically
    return (
        <View style={[styles.container,styles.centerStyle,{flex:1,justifyContent:"space-between",alignSelf:"stretch",alignItems:"center",alignContent:"stretch" }]}>
            <Text style={[styles.sectionTitle,tableStyles.text,{marginTop : 15}]}>{nameProp.names[fname]} please enter enter how much you want to play with each player</Text>
            <View style={styles.rateWrapper}>
                <ModalDropdown defaultValue={nameProp.names[fname]} style={stls.dropdown} defaultIndex={0} options={nameProp.names} onSelect={(val) => {
                    setFname(parseInt(val))
                    setErrorState(generateMemptyError())
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
                 <ModalDropdown style={stls.dropdown} defaultValue={nameProp.names[1]} defaultIndex={1} options={nameProp.names} onSelect={(val) => {
                    setErrorState(generateMemptyError())
                    setLname(parseInt(val))
                    }}/>  
            </View> 
            <TouchableOpacity onPress = {() => goToResult()} >
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>Next</Text>
                    </View>
            </TouchableOpacity>
            {
                errorState.isError &&
                <Text style={[styles.sectionTitle,{color:'red'}]}>{errorState.errorMessage}</Text>
            }
            <View style={tableStyles.container}>
                <ScrollView style={{flexGrow:4,maxHeight:250}}>
                <Table borderStyle={{borderWidth:1}}>
                    <Row textStyle={tableStyles.text} style={tableStyles.head} data={["Player","Rating"]}/>
                    {
                        nameProp.names.map((nm,ind) => {
                                const val = ratings[makeKey(fname.toString(),ind.toString())]
                                return  {
                                    ind : ind,
                                    entry : (    <Row 
                                        key={ind}
                                        style = {tableStyles.children}
                                        textStyle = {tableStyles.text}
                                        data={[nm,val]}
                                    />
                                )   
                                }
                                
                        }).filter(val => val.ind !== fname).map(e => e.entry)
                    }
                </Table>
                </ScrollView>
            </View> 
        </View>
    )
}

const stls = StyleSheet.create({
    whiteText : {
        color : 'white'  
    },
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
        backgroundColor: '#FFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    }
})

const tableStyles = StyleSheet.create({
    container : {width : '90%', padding : 16, paddingTop : 30},
    children : { backgroundColor: 'yellow'},
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    text : {textAlign : "center"},
    component : {flexGrow : 1,backgroundColor:'white'}
})