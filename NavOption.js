import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const data = [
    {
        id: '123',
        title: 'Get a ride',
        image: require('../assets/car.png'),
        screen: 'MapScreen'
    },
    {
        id: '456',
        title: 'Order food',
        image: require('../assets/food.png'),
        screen: 'EatsScreen'
    }
]

const NavOption = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
    
    return (
        <FlatList 
            data={data}
            keyExtractor={ (item) => item.id}
            horizontal
            renderItem={ ({item}) => (
                <TouchableOpacity 
                    onPress={() => navigation.navigate(item.screen)} 
                    className='p-2 pl-6 pb-8 pt-4 bg-green-500 m-2 w-40 rounded-lg' 
                    disabled={!origin}
                    >
                    <View className={!origin?.location && 'opacity-20'}>
                        <Image 
                            style={{width: 120, height: 120, resizeMode: 'contain'}}
                            source={item.image}
                        />
                        <Text className='mt-2 text-lg font-semibold' >{item.title}</Text>
                        <Icon 
                            className='p-2 bg-black rounded-full w-10 mt-4'
                            name='arrowright'
                            color='white'
                            type='antdesign'
                        />
                    </View>
                </TouchableOpacity>
            ) }
        />
  )
}

export default NavOption;