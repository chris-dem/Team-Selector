import React, {FC} from "react";
import { View,Text, StyleSheet, ScrollView } from "react-native";
import blossom from 'edmonds-blossom'; // Input => Edge list representation
import { useNavigation, useRoute } from "@react-navigation/native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import styles from "../styles";
import AwesomeButton from "react-native-really-awesome-button";

//DONT USE THREADS YET
//IF VERY BAD PERFORMANCE
//USE THIS : https://github.com/joltup/react-native-threads
interface Props {
    nameArray : string[]
    values : {[key : string] : number}
}

interface Return {
    pairs : number[][][]
    remaining : number[]
    lonePlayer : null | number
}

const getRandom = (val : {[key : number] : number}) => {
    const keys = Object.keys(val)
    const randKey = keys[Math.floor(Math.random() * keys.length)]
    const ret = val[randKey]//should work ignore error
    delete val[randKey]
    return [ret as number,parseInt(randKey)]
}

//TODO:
// 2) Adjust output

function calculateBlossom(params : Props) : Return {
    const n : number = params.nameArray.length
    const extractIndex = (key : string) => key.split('-').map(x => parseInt(x))
    const convertIndex = (i : number, j : number) => i * n + j
    const edge_list : number[][] = []
    const arr : number[] = new Array(n * n).fill(0)
    for(let k in params.values) {
        let val = params.values[k]
        const [indx1,indx2] = extractIndex(k)
        if( arr[convertIndex(indx1,indx2)]== 0) {
            arr[convertIndex(indx1,indx2)] = val
            arr[convertIndex(indx2,indx1)] = val
        }else{
            val = (val + arr[convertIndex(indx1,indx2)]) / 2.
            arr[convertIndex(indx1,indx2)] = val
            arr[convertIndex(indx2,indx1)] = val
        }
        for(let i = 0; i < n; i++) {
            for(let j = i + 1; j < n; j++){
                edge_list.push([i,j,arr[i * n + j]])
            }
        }
    }
    const result = blossom(edge_list)
    const pairs : {[key : number] : number} = {}
    let lone : number | null = null
    for(let i in result) {
        if(result[i] === -1) {
            lone = parseInt(i)
            continue
        }
        let j = parseInt(i)
        const [key,val] = [Math.min(j,result[i]),Math.max(j,result[i])]
        pairs[key] = val
    }
    const ret : number[][][]  = []
    while(Object.keys(pairs).length > 1) {
        ret.push([getRandom(pairs),getRandom(pairs)])
    }
    let rem : number[] = []
    if(Object.keys(pairs).length !== 0) {
        const indx = Object.keys(pairs)[0]
        const val = pairs[indx]
        rem = [parseInt(indx),val]
    }
    return { pairs : ret , remaining : rem, lonePlayer : lone}
}

export const ResultComponent : FC = () => {
    const params : Props = useRoute().params as Props
    const nav = useNavigation()
    const teams = calculateBlossom(params)
    
    return (
        <View style={[styles.container]}>
            <ScrollView style = {tableStyles.component}>
                <Text style={[styles.sectionTitle,tableStyles.text]}>Teams</Text>
                <View style={styles.centerStyle}>
                    <ScrollView style={tableStyles.container}>
                        <Table borderStyle={{borderWidth:1}}>
                            <Row  textStyle={tableStyles.text} style={tableStyles.head} data={["Team 1", "Team 2"]} flexArr={[2,2]}/>
                            <Row  textStyle={tableStyles.text} style={tableStyles.head} data={["Player 1", "Player 2", "Player 3", "Player 4"]} flexArr={[1,1,1,1]}/>
                            {
                                teams.pairs.map(([[t1,t2],[t3,t4]],indx) => {
                                    const data =[ 
                                        params.nameArray[t1]
                                        , params.nameArray[t2]
                                        , params.nameArray[t3]
                                        , params.nameArray[t4]
                                        ]
                                        return (
                                            <Row key={indx} style={tableStyles.children} textStyle={tableStyles.text} data={data}/>
                                        )
                                })
                            }
                        </Table>
                    </ScrollView>
                </View>
                {
                    teams.remaining.length > 0 &&
                    <View>
                        <Text style={[styles.sectionTitle,tableStyles.text]}>Team remaining</Text>
                        <Table borderStyle={{borderWidth:1}}>
                        <Row  textStyle={tableStyles.text} style={tableStyles.head} data={teams.remaining} flexArr={[2,2]}/>
                        </Table>
                    </View>
                }
                {
                    teams.lonePlayer &&
                    <View>
                        <Text style={[styles.sectionTitle,tableStyles.text]}>Remaining Player</Text>
                        <Text style={[styles.sectionTitle,tableStyles.text]}>{teams.lonePlayer}</Text>
                    </View>
                }
                <View style={styles.centerStyle}>
                    <AwesomeButton  onPress={() => {nav.navigate('Home')}} width={100}>Home</AwesomeButton>
                </View>
            </ScrollView>
        </View>
    )
}

const tableStyles = StyleSheet.create({
    container : {width : '90%', padding : 16, paddingTop : 30},
    children : { backgroundColor: 'yellow'},
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    text : {textAlign : "center"},
    component : {flex : 1,padding : 10}
})