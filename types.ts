// import {navi} from "@react-navigation/native"

/**
 * names : Map between names and their indicies
 * ratings : 2D Array of numerical values
 */
export interface State {
    names : { [key : string] : number}
    ratings : number[][]
}