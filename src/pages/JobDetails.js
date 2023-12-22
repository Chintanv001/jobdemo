import React from 'react'
import { Text, View } from 'react-native'

const JobDetails = ({route}) => {
    const { id } = route.params;

  return (
    <View>
        <Text>id : {id}</Text>
    </View>
  )
}

export default JobDetails