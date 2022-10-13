import { SafeAreaView, Text , StyleSheet} from 'react-native'
import React, {useLayoutEffect} from 'react'

import {useNavigation} from '@react-navigation/native'
import { TextInput, IconButton} from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


const styles = StyleSheet.create(
  {
    // Copy de el frontend
    searchBar: {
      height: 32,
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "center"
    },
  }
)

const SearchBar = () => {
  // const [searchQuery, setSearchQuery] = React.useState('')
  // const onChangeSearch = (query) => setSearchQuery(query)
  const navi = useNavigation();
  useLayoutEffect(()=> navi.setOptions({headerShown:false}))

    return (
      
      <SafeAreaView>
        {/* Heroicons y react-nativesvg pa esto  */}
        <TextInput
          // Intente stylearlo asi nomas y quedo medio raro??
          // style = {styles.searchBar }
          placeholder='Buscar'
          // inlineImageLeft='search_icon'
          trailing={props => (
          
              <IconButton
                icon={props => <Icon name="magnify" {...props} />}
                {...props}
              />
          )}

        />
       </SafeAreaView>
    )
   
    

}

export default SearchBar