import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import JobPage from '../pages/JobPage';
import JobDetails from '../pages/JobDetails';

const Stack = createStackNavigator();


const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={JobPage} />
            <Stack.Screen name="Details" component={JobDetails} />
        </Stack.Navigator>
    )
}

export default StackNavigation