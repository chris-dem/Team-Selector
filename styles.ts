import { StyleSheet } from "react-native";

export default StyleSheet.create({
    centerStyle : {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container :  {
        flex : 1,
        backgroundColor : '#282B30',
    },
    nameWrapper : {
        marginTop : 20,
        paddingHorizontal : 20,
        paddingBottom : 50,
        marginBottom : 15,
        overflow :"scroll",
        width : '100%'
    },
    sectionTitle : {
        fontSize : 18,
        fontWeight : 'bold',
        color:'#fff',
        padding : 10,
        justifyContent : 'center',
        alignItems:'center'
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
        borderRadius : 5,
        // marginTop: 30
    },
    writeTaskWrapper : {
        // position : "absolute",
        bottom : 20,
        width : '100%',
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center',
        marginHorizontal : 5,
        padding : 10
    },
    nameInput : {
        paddingVertical : 15,
        paddingHorizontal : 15,
        width : 250,
        backgroundColor : '#fff',
        borderRadius : 60,
    },
    addWrapper : {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        // marginRight : 10
    },
    addText : {

    },
    rateWrapper : {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems:"stretch",
        marginBottom : 10,
    }
})