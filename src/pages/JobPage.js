import React, { useState } from 'react'
import { Pressable, Text, View, TextInput, Button } from 'react-native'
import {useDispatch} from 'react-redux'
import { addTodoOffline } from '../redux/action/app';
import NetInfo from "@react-native-community/netinfo";

const data = [
    {
        id: 1,
        title: "job 1"
    },
    {
        id: 2,
        title: "job 2"
    },
    {
        id: 3,
        title: "job 3"
    },
    {
        id: 4,
        title: "job 4"
    },
    {
        id: 5,
        title: "job 5"
    },
    {
        id: 6,
        title: "job 6"
    },
    {
        id: 7,
        title: "job 7"
    },
]



const JobPage = ({ navigation }) => {

    const [text, setText] = useState();

    const { type, isConnected } = useNetInfo();

    const dispatch = useDispatch()


    const handlePress = () => {
        dispatch(addTodoOffline(text))
    }

    return (
        //         data.map((job)=>{
        //             return(
        //                 <Pressable onPress={()=>handlePress(job.id)} key={job.id} style={{display:"flex",justifyContent:'center',alignItems:'center',marginTop:20,}}>
        //                 <View style={{backgroundColor:"grey", width:'80%' ,height:40,justifyContent:'center',alignItems:'center',borderRadius:20 }}>
        //                     <Text style={{color:'black'}}>{job.title}</Text>
        //                 </View>
        //             </Pressable>
        //             )
        //         })
        <>
            <Text>Is online</Text>
             <Text style={{ color: isConnected ? "green" : "red" }}>
                is connected ({type}): {isConnected}
            </Text> 
            <TextInput
                style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                }}
                value={text}
                onChangeText={setText}
            />
            <Button onPress={handlePress} title='submit' />
            
        </>
    )
}

export default JobPage