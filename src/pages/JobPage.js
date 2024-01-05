import React, { useState, useEffect, useCallback } from 'react'
import { Pressable, Text, View, TextInput, Button } from 'react-native'
import { getDBConnection, getTodoItems, saveTodoItems, createTable, deleteTodoItem, deleteTable } from '../database/dbFunction';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { pick } from 'react-native-document-picker';


// const data = [
//     {
//         id: 1,
//         title: "job 1"
//     },
//     {
//         id: 2,
//         title: "job 2"
//     },
//     {
//         id: 3,
//         title: "job 3"
//     },
//     {
//         id: 4,
//         title: "job 4"
//     },
//     {
//         id: 5,
//         title: "job 5"
//     },
//     {
//         id: 6,
//         title: "job 6"
//     },
//     {
//         id: 7,
//         title: "job 7"
//     },
// ]



const JobPage = ({ navigation }) => {



  const [data, setData] = useState();
  const [apiData, setApiData] = useState();

  const [firstName, setFirstName] = useState()
  const [LastName, setLastName] = useState()
  const [address, setAddress] = useState()
  const [city, setCity] = useState()
  const [flag, setFlag] = useState(false)
  const [timeStamp, setTimeStamp] = useState()



  const fetchDataFromApi = async () => {
    try {
      const response = await axios.get('http://192.168.1.145:8000/');
      setApiData(response.data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  useEffect(() => {
    fetchDataFromApi()
  }, [])

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db)
      await db.transaction(async (txn) => {
        try {
          await txn.executeSql(`SELECT * FROM dummyData`, [], (txn, results) => {
            setData(results.rows.raw());
          });
        } catch (error) {
          console.error("Error executing SQL query:", error);
        }
      });

    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  console.log("data", data);
  console.log("apidata", apiData)



  const handlePress = async () => {
    const db = await getDBConnection();

    console.log("db", db)
    await db.transaction(async (txn) => {
      try {
        console.log("first")

        await txn.executeSql(`INSERT INTO dummyData (LastName, FirstName, Address, City, Flag, TimestampColumn, PdfContent, ImageContent) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          ['Doe', 'John', '123 Main St', 'New York', 0, '2024-01-02 12:30:00', null, null], (txn, results) => {
            console.log("results", results);
            console.log("successfully");
          });
      } catch (error) {
        console.error("Error executing SQL query:", error);
      }
    })
  }

  const submitImage = async() => {
    const result = await launchImageLibrary({selectionLimit:2,includeBase64:true})
    axios.post("http://192.168.0.147/projects/testing/public/api/image",result).then((res)=>{
      console.log("11111111111",res)
    }).catch((err)=>{
     console.log("eroor",err)
    })
    console.log("resultofimage",result)
   
  }

  const submitPdf = () => {
 pick({
  allowMultiSelection: true,
  type: 'application/pdf',
  copyTo: 'cachesDirectory',
}).then((res)=>{
   console.log('2222222222222',res.fi)
})
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
      {/* <Text style={{ color: isConnected ? "green" : "red" }}>
                is connected ({type}): {isConnected}
            </Text>  */}
      <Text>First Name</Text>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text>Last Name</Text>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        value={LastName}
        onChangeText={setLastName}
      />
      <Text>Address</Text>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        value={address}
        onChangeText={setAddress}
      />
      <Text>City</Text>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        value={city}
        onChangeText={setCity}
      />
      <Pressable onPress={submitImage} style={{ height: 100, display: 'flex', justifyContent: 'center', borderColor: 'black', borderWidth: 2}}>
        <Text style={{ textAlign: 'center' }}>Upload image</Text>
      </Pressable>
      <Pressable onPress={submitPdf} style={{ height: 100, display: 'flex', justifyContent: 'center', borderColor: 'black', borderWidth: 2}}>
        <Text style={{ textAlign: 'center' }}>Upload pdf</Text>
      </Pressable>
      <Button title='submit' />

    </>
  )
}

export default JobPage