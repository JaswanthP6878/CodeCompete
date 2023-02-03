import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import { langs, langNames } from '@uiw/codemirror-extensions-langs';
import axios from 'axios'

export default function Editor() {
    const [code, setCode] = useState("print('hello world')")

    // add the keys for testing/

    // const options = {
    //     method: 'POST',
    //     url: 'https://judge0-ce.p.rapidapi.com/submissions',
    //     params: {base64_encoded: 'true', fields: '*'},
    //     headers: {
    //       'content-type': 'application/json',
    //       'Content-Type': 'application/json',
    //       'X-RapidAPI-Key': '' ,
    //       'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    //     },
    //     data: '{"language_id":52,"source_code":"I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=","stdin":"SnVkZ2Uw"}'
    //   };
    
    // const handleChange = (value, viewUpdate) => {
    //     setCode(value);
    //     console.log(code);
    // }

    // const handleSubmit = async () => {
    //     console.log(options);
    //     try {
    //         const response = await axios.request(options);
    //         const {token} = (response.data)
    //         const getSubmissionsOptions  = {
    //             method: 'GET',
    //             url: 'https://judge0-ce.p.rapidapi.com/submissions/2e979232-92fd-4012-97cf-3e9177257d10',
    //             params: {base64_encoded: 'true', fields: '*', token: token },
    //             headers: {
    //               'X-RapidAPI-Key': '',
    //               'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    //             }
    //           };
    //         const {data} = await axios.request(getSubmissionsOptions)
    //         console.log(data)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    return (
        <div>
            <CodeMirror
                value={code}
                height="200px"
                extensions={[langs.python()]}
                onChange={handleChange}
            />
            <button onClick={handleSubmit}>Submit code!!</button>
        </div>
        

    );
}

