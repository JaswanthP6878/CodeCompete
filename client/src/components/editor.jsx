import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import { langs, langNames } from '@uiw/codemirror-extensions-langs';
import axios from 'axios'

export default function Editor() {
    const [code, setCode] = useState("print('hello world')")

    
    const handleChange = (value, viewUpdate) => {
        setCode(value);
        console.log(code);
    }

    const handleSubmit = () => {
       axios.post('http://localhost:3000/code', {code: code})
    }
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

