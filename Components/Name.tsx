import React, {FC} from 'react';
import { View,Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

interface Props {
    name : string
}

export const Name : FC<Props> = (props : Props) => {
    return (
        <View style={styles.item }>
            <Text>{props.name ? props.name : "This is a task"}</Text>
            <TouchableOpacity style={styles.ex}></TouchableOpacity>
        </View>
    )
}