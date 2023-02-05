import CodeMirror from '@uiw/react-codemirror';
import Output from './Output';
import GameEndModal from './GameEndModal';
import { useState } from 'react';
import { langs } from '@uiw/codemirror-extensions-langs';
import axios from 'axios'

export default function Editor() {
    const [code, setCode] = useState("print('hello world')")
    const [customInput, setCustomInput] = useState('')
    const [customOutput, setCustomOutput] = useState('')
    const [processing, setProcessing] = useState(false)
    const [outputDetails, setOutputDetails] = useState({})
    let currOutput = null;
    //api calls

    const handleCompile = () => {
        setProcessing(true);
        const formData = {
          language_id: 71,
          source_code: btoa(code),
          stdin: btoa(customInput),
          expected_output:  btoa(5)
        };
        const options = {
          method: "POST",
          url: import.meta.env.VITE_RAPID_API_URL,
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          },
          data: formData,
        };
    
        axios
          .request(options)
          .then(function (response) {
            console.log("res.data", response.data);
            const token = response.data.token;
            checkStatus(token);
          })
          .catch((err) => {
            let error = err.response ? err.response.data : err;
            setProcessing(false);
            console.log(error);
          });
      };
      const checkStatus = async (token) => {
        const options = {
          method: "GET",
          url: import.meta.env.VITE_RAPID_API_URL + "/" + token,
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          },
        };
        try {
          let response = await axios.request(options);
          let statusId = response.data.status?.id;
          // Processed - we have a result
          if (statusId === 1 || statusId === 2) {
            // still processing
            setTimeout(() => {
              checkStatus(token)
            }, 2000)
            return
          } else {
            console.log(response.data);
            if (response.data.status?.id == 3 ){ // correct answer
               currOutput = {output : atob(response.data.stdout), status: "accepted"}
          } else if (response.data.status?.id == 4){ //  wrong answer
             currOutput = {output : atob(response.data.stdout), status : "wrong"}
          } else { //  runtime or  compile time error
            currOutput = {output : atob(response.data.stderr), status : 'error'}
          }
            setOutputDetails(currOutput);
            setProcessing(false)
            return
          }
        } catch (err) {
          console.log("err", err);
          setProcessing(false);
        }
      };

    const handleChange = (value, viewUpdate) => {
        setCode(value);
        console.log(code);
    }

    const handleInputChange = (e) => {
        setCustomInput(e.target.value)
    }
    // if (processing == true) {
    //     return(
    //     <div> 
    //       Processing code 
    //     </div>) 
    // }

    return (
        <div>
            <CodeMirror
                value={code}
                height="200px"
                extensions={[langs.python()]}
                onChange={handleChange}
            />
            <div className='mt-3'>
              <input className='input w-full max-w-xs' type="text" value = {customInput} onChange = {handleInputChange}/>
            </div>
            <button onClick={handleCompile}>Submit code!!</button>
            <div className='mt-3'>
                  <Output outputDetails = {outputDetails}/>
            </div>
            {processing == true &&  <GameEndModal />}
        </div>
    );
}

