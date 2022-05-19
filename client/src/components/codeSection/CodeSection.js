import React from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-mono_industrial";
import "ace-builds/src-noconflict/ext-language_tools";

function CodeSection(props) {

    const {
        language,
        onChange
    } = props;

    return (
        <AceEditor
        placeholder="가장 빠르고 정확하게 코드를 입력해주세요!"
        mode={language}
        theme="mono_industrial"
        name="codeEditor"
        onLoad={null}
        height={'100%'}
        width={'100%'}
        onChange={onChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={null}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        }}/>
    )
}

export default CodeSection