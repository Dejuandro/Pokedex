import CustomColors from './Color'
import { StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: 'white',
        justifyContent:'center',
        margin:10
    },
    mainscreenTitle:{
        fontSize:17,
        fontWeight:'bold',
        marginVertical:20
    },
    PokeName:{
        fontSize:16,
        fontWeight:'bold',
        color:'white'
    },
    PokeDetail:{
        fontSize:14,
        color:'white'
    },
    ContainListCardBox:{
        flexDirection:'row',
        flexWrap:'wrap',
        minWidth:'100%',
        alignItems:'center',
        justifyContent:'space-between'

    },
    listCardBox:{
        margin:5,
        backgroundColor:CustomColors.green,
        borderRadius:10,
        padding:10,
        width:'45%',
        minHeight:100,
        alignItems:'flex-start',
        flexDirection:'row',
        justifyContent:'space-between',
        elevation:5
    },
    searchTextInput: {
        backgroundColor: 'white',
        marginBottom: 10,
        width:'100%',
        backgroundColor:"#f7f7f7"
    },
    aboutTitle:{
        color:CustomColors.Grey,
        marginVertical:5
    },
    aboutValue:{
        color:CustomColors.darkGrey,
        marginVertical:5
    }
})