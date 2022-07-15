import { StyleSheet } from "react-native";

export default StyleSheet.create({
    centerStyle : {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container :  {
        flex : 1,
        backgroundColor : '#E8EAED',
    },
    nameWrapper : {
        paddingTop : 80,
        paddingHorizontal : 20,
    },
    sectionTitle : {
        fontSize : 25,
        fontWeight : 'bold'
    },
    names : {
        marginTop : 30
    },
    item : {
        backgroundColor : "#fff",
        padding : 15,
        borderRadius : 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : "space-between",
        marginBottom : 20,
    },
    nameText : {
        maxWidth : '80%',
    },
    ex : {
        width : 12,
        height : 12,
        borderColor : '#55BCF6',
        borderWidth : 2,
        borderRadius : 5
    },
    writeTaskWrapper : {
        position : "absolute",
        bottom : 50,
        width : '100%',
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    nameInput : {
        paddingVertical : 15,
        paddingHorizontal : 15,
        width : 250,
        backgroundColor : '#fff',
        borderRadius : 60,
    },
    addWrapper : {
        
    },
    addText : {

    }

})