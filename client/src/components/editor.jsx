import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import { langs, langNames } from '@uiw/codemirror-extensions-langs';
import axios from 'axios'

export default function Editor() {
    const [code, setCode] = useState("print('hello world')")
    const [customInput, setCustomInput] = useState('')
    const [customOutput, setCustomOutput] = useState('')
    const [processing, setProcessing] = useState(false)

    //api calls
    const handleCompile = () => {
        setProcessing(true);
        const formData = {
          language_id: 71,
          source_code: btoa(code),
          stdin: btoa(customInput)
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
            setProcessing(false)
            // setOutputDetails(response.data)
            // showSuccessToast(`Compiled Successfully!`)
            console.log(response.data)
            // setCustomOutput(atob(response.data.stdout))
            return
          }
        } catch (err) {
          console.log("err", err);
          setProcessing(false);
        //   showErrorToast();
        }
      };


    const handleChange = (value, viewUpdate) => {
        setCode(value);
        console.log(code);
    }
    console.log(import.meta.env.VITE_RAPID_API_KEY)

    const handleSubmit = (e) => {
        console.log(customInput)
        console.log(code)
    };

    const handleInputChange = (e) => {
        setCustomInput(e.target.value)
    }
    if (processing == true) {
        return <div> Processing code </div>;
    }

    return (
        <div>
            <CodeMirror
                value={code}
                height="200px"
                extensions={[langs.python()]}
                onChange={handleChange}
            />
            <input className='border-2' type="text" value = {customInput} onChange = {handleInputChange}/>
            <button onClick={handleCompile}>Submit code!!</button>
            <div className='mt-3'>
                <h4>Output is:</h4>
                  <span>{customOutput}</span>
            </div>
        </div>
        

    );
}

