import React, {FC} from 'react';
import { View,Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

interface Props {
    name : string
    indx : number,
    rem  : (indx : number) => void
}

export const Name : FC<Props> = (props : Props) => {
    return (
        <View style={styles.item }>
            <Text>{props.name}</Text>
            <TouchableOpacity style={styles.ex} onPress={() => props.rem(props.indx)}></TouchableOpacity>
        </View>
    )
}