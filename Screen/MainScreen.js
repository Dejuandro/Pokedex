import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ScrollView, ActivityIndicator, TouchableOpacity,StatusBar, SafeAreaView, Dimensions, Platform } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { GetProductList, AddOrder, ResetOrderList } from '../Redux/actions/GetProductList';
import ModaFullCustom from './Modal';
import styles from '../Global/styles';
import CustomColors from '../Global/Color'
import { TextInput, RadioButton, Checkbox } from 'react-native-paper';
import { GetPokemonDetail } from '../api_config';



export default function MainScreen() {
  const [isModalDetail, setisModalDetail] = useState(false);
  const [DetailPokemon, setDetailPokemon] = useState();
  const [SelectedPokemon, setSelectedPokemon] = useState();
  const [Limit, SetLimit] = useState(20);
  const [Offeset, setOffeset] = useState(0);
  const [isLast, setisLast]=useState(false)
  const [isScrollDown, setisScrollDown]=useState(false)
  const [SearchValue, setSearchValue]=useState()
  const [SearchedList, setSearchedList]=useState([])
  const [isSearching, setisSearching]=useState(false)
  const [SelectedMenuDetail, setSelectedMenuDetail]=useState('about')

  const {
    getProductResult,
    getProductLoading,
    getProductError,
    scrollLoading
  } = useSelector((state) => state.OrderReducer)

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetProductList(Limit, Offeset))
  }, [])

  const ColorList = [
    {
      type: "fire",
      color: CustomColors.red
    }, {
      type: "grass",
      color: CustomColors.green
    }, {
      type: "water",
      color: CustomColors.oceanBlue
    }, {
      type: "bug",
      color: CustomColors.OrangeBug
    }, {
      type: "normal",
      color: CustomColors.normal
    }, {
      type: "poison",
      color: "#682A68"
    }, {
      type: "rock",
      color: "#786824"
    },{
      type: "electric",
      color: "#00A6D7"
    }, {
      type: "ground",
      color: CustomColors.Grey
    },{
      type: "ghost",
      color: "#493963"
    },{
      type: "fighting",
      color: "#A63414"
    },
  ]

  useEffect(() => {
    // console.log(getProductResult)
    if(getProductResult){
      setSearchedList(getProductResult)
      setOffeset(getProductResult.length)
    }
  }, [getProductResult])

  function RenderListCake() {
    return (
      SearchedList.map((data, idx) => {
        // console.log(data)
        return (
          <TouchableOpacity onPress={async () => {
            setDetailPokemon()
            setSelectedPokemon()
            setSelectedPokemon(data)
            setisModalDetail(true)
            const GetDetail = await GetPokemonDetail(data.name)
            setDetailPokemon(GetDetail)
          
          }} style={[styles.listCardBox, { backgroundColor:  ColorList.find(x => x.type == data.types[0].type.name)?ColorList.find(x => x.type == data.types[0].type.name).color:CustomColors.darkGrey }]} key={idx}>
            <View>
            <Text style={styles.PokeName}>{data.name}</Text>
            {data.types.map((type, idxtype) => {
              return (
                <View key={idxtype}>
                  <Text style={styles.PokeDetail}>{type.type.name}</Text>
                </View>
              )
            })}
            </View>
            
        <Image
          style={{width: 60, height: 60}}
          source={{uri: data.image}} />
          </TouchableOpacity>
        )
      })
    )
  }

  async function GetMorePokemon() {
    console.log('GetMorePokemon')
    dispatch(GetProductList(Limit, Offeset, getProductResult))
  }

  function RenderDetailPokemon() {
    if (DetailPokemon) {
      return (
        <View style={{ width: '100%' }} >
          <View style={{ marginHorizontal: 20, width: '100%' }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, marginBottom: 10 }}>{SelectedPokemon ? SelectedPokemon.name.toUpperCase() : null}</Text>
            <View style={{ flexDirection: 'row' }}>
              {SelectedPokemon ? SelectedPokemon.types.map((type, idxtype) => {
                return (
                  <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', marginHorizontal: 5, width: 100, alignItems: 'center', borderRadius: 5, padding: 5 }} key={idxtype}>
                    <Text style={styles.PokeDetail}>{type.type.name.toUpperCase()}</Text>
                  </View>
                )
              }) : null}
            </View>
            <View style={{ width: '90%', alignItems: 'center', marginTop: 20, zIndex: 99999  }}>
              <Image
                style={{ width: 150, height: 150, resizeMode: 'contain'}}
                source={{ uri: DetailPokemon.sprites ? DetailPokemon.sprites.versions['generation-v']['black-white'].animated.front_default : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png' }} />
            </View>
          </View>
          <View style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: 'white',
            width: '100%',
            marginTop: Platform.OS=="ios"?0:-20,
            height: Dimensions.get('screen').height,
            padding: 20
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => {
                setSelectedMenuDetail('about')
              }} style={{ backgroundColor: SelectedMenuDetail == "about" ? 'rgba(125, 207, 255, 0.5)' : 'white', padding: 10, borderRadius: 10 }}>
                <Text>About</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                setSelectedMenuDetail('basestats')
              }} style={{ backgroundColor: SelectedMenuDetail == "basestats" ? 'rgba(125, 207, 255, 0.5)' : 'white', padding: 10, borderRadius: 10 }}>
                <Text>Base Stats</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={() => {
                setSelectedMenuDetail('evolution')
              }} style={{ backgroundColor: SelectedMenuDetail == "evolution" ? 'rgba(125, 207, 255, 0.5)' : 'white', padding: 10, borderRadius: 10 }}>
                <Text>Evolution</Text>
              </TouchableOpacity> */}

              <TouchableOpacity onPress={() => {
                setSelectedMenuDetail('moves')
              }} style={{ backgroundColor: SelectedMenuDetail == "moves" ? 'rgba(125, 207, 255, 0.5)' : 'white', padding: 10, borderRadius: 10 }}>
                <Text>Moves</Text>
              </TouchableOpacity>
            </View>
            {SelectedMenuDetail == "about" ?
              <View style={{ marginTop: 20,marginHorizontal: 10 , flexDirection: 'row', justifyContent: 'flex-start' }}>
                <View style={{ width: '50%' }}>
                  <Text style={styles.aboutTitle}>Species</Text>
                  <Text style={styles.aboutTitle}>Height</Text>
                  <Text style={styles.aboutTitle}>Weight</Text>
                  <Text style={styles.aboutTitle}>Abilities</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={styles.aboutValue}>{DetailPokemon?DetailPokemon.species.name:null}</Text>
                  <Text style={styles.aboutValue}>{DetailPokemon?DetailPokemon.height:null}</Text>
                  <Text style={styles.aboutValue}>{DetailPokemon?DetailPokemon.weight:null}</Text>
                  <View style={{marginTop:5}}>
                  {DetailPokemon.abilities.map((e,idx)=>{
                    return(
                      <Text style={{color:CustomColors.darkGrey}} key={idx}>
                      {e.ability.name}
                    </Text>
                    )
                  })}
                  </View>
                </View>
              </View>
              : null}
            {SelectedMenuDetail == "basestats" ?
              <View style={{ marginTop: 20,marginHorizontal: 10 }}>
                {DetailPokemon.stats.map((stat, idx) => {
                  return (
                    <View key={idx} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                      <View style={{ width: '50%' }}>
                        <Text style={styles.aboutTitle}>{stat.stat.name}</Text>
                      </View>
                      <View style={{ width: '50%' }}>
                        <Text style={styles.aboutValue}>{stat.base_stat}</Text>
                      </View>
                    </View>
                  )
                })}
              </View>
              : null}
            {SelectedMenuDetail == "evolution" ?
              <View style={{ marginTop: 20 }}>
                <Text>asdasd</Text>
              </View>
              : null}

            {SelectedMenuDetail == "moves" ?
              <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <View style={{ width: '50%' }}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>Moves</Text>
                  </View>
                  <View style={{ width: '50%' }}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>Level Earned At</Text>
                  </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {DetailPokemon.moves.map((stat, idx) => {
                    return (
                      <View key={idx} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ width: '50%' }}>
                          <Text style={styles.aboutTitle}>{stat.move.name.toUpperCase()}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                          <Text style={styles.aboutValue}>{stat.version_group_details[0].level_learned_at}</Text>
                        </View>
                      </View>
                    )
                  })}
                </ScrollView>
              </View>
              : null}

          </View>
        </View>
      )
    } else {
      return (
        <ActivityIndicator />
      )
    }
  }


 async function SearchFunction(text) {
    if (text) {
      setisSearching(true)
        const newData = getProductResult.filter(
            function (item) {
              const itemDataName = item.name? item.name.toUpperCase(): ''.toUpperCase();
              const itemDataType = item.types[0].type.name? item.types[0].type.name.toUpperCase(): ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemDataName.indexOf(textData) > -1 || itemDataType.indexOf(textData) > -1  ;
            });
            console.log(newData)
           
            setSearchedList(newData)
            setSearchValue(text)
    } else {
      setisSearching(false)
        setSearchedList(getProductResult)
        setSearchValue(text)
    }
}

  const scrollViewRef = React.useRef();

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={CustomColors.darkGrey} barStyle="light-content" />
      <SafeAreaView>
        <Text style={styles.mainscreenTitle}>Pokedex</Text>
        <View style={{width:Dimensions.get('screen').width-30}}>
        <TextInput
          placeholder='Search Pokemon Name / Type'
          style={styles.searchTextInput}
          mode='outlined'
          activeOutlineColor={CustomColors.green}
          outlineColor={CustomColors.medGrey}
          value={SearchValue}
          onChangeText={text => { SearchFunction(text) }}
        />
        </View>
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} onScroll={({ nativeEvent }) => {
          if (!scrollLoading && !isSearching) {
            if (isCloseToBottom(nativeEvent)) {
              if (!isLast) {
                setisScrollDown(true)
                GetMorePokemon()
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
            }
          }
        }}>
          <View >
            {getProductLoading ? <ActivityIndicator /> :
              <View style={styles.ContainListCardBox}>
                {RenderListCake()}
              </View>}

            {scrollLoading ? <ActivityIndicator style={{ margin: 20 }} /> : null}
          </View>
        </ScrollView>

        <ModaFullCustom
          isVisible={isModalDetail}
          title={'Pokedex Detail'}
          subtitle={'This is the detail of each cake'}
          body={RenderDetailPokemon()}
          closeModal={() => {
            setisModalDetail(false)
           }}
          submitfunction={() => {

          }}
          bgColor={SelectedPokemon?ColorList.find(x => x.type == SelectedPokemon.types[0].type.name)?ColorList.find(x => x.type == SelectedPokemon.types[0].type.name).color:CustomColors.darkGrey:'white'}
          submittitle={'Tutup'}
        />
      </SafeAreaView>
    </View>
  )
};