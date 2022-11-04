import logo from './logo.svg';
import './App.css';
import { Amplify, API } from 'aws-amplify';
import backendConfig from './backendConfig.json'
import VisNetwork from './VisNetwork.js'
import { useEffect, useState, useRef } from 'react';
import { CheckboxField, Button, Card, Text, Heading, Badge, Rating } from '@aws-amplify/ui-react';
import { MdAutorenew } from "react-icons/md";
import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider,defaultDarkModeOverride } from '@aws-amplify/ui-react';
import { Flex} from '@aws-amplify/ui-react';





Amplify.configure({
    API: backendConfig.API
});

const apiName = 'Neptune Service';
const path = '/'; 
const myInit = { // OPTIONAL
    headers: {"Access-Control-Allow-Origin" : "*",
    "content-type":"application/json"
    }, 
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {  // OPTIONAL

    },
};


function App() {

    const [myData,_setMyData] = useState({nodes: [],edges: []})

    const theme = {
        name: 'my-theme',
        overrides: [defaultDarkModeOverride],
      };
    
    const myDataRef = useRef(myData);
    const setMyData = data => {
        myDataRef.current = data;
        _setMyData(data);
    };

    useEffect(() => {
        ApiCall();
    
    },[])


    function ApiCall(){
        const myPath = "/";

        API
        .get(apiName, myPath, myInit)
        .then(response => {
            response.data.nodes.push();
            response.data.nodes.push();

            setMyData(response.data);
            
        })
        .catch(error => {
          console.log(error.response);
       });
    }

   return (
    <ThemeProvider theme={theme} colorMode="dark">
    <div className="App">
        <Heading level={1}>Demo Amplify / Vis.js / API Gateway / Lambda /NeptuneDB </Heading>
      <div className="App-header">        
        <Flex>            
            <VisNetwork graph={myData} />        
        </Flex>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
