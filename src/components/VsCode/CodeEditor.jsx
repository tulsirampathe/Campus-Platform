/* eslint-disable react/prop-types */
import { Editor } from '@monaco-editor/react'
import React from 'react'
import { CODE_SNIPPETS } from '../../constants'

function CodeEditor({language, onMount, value, setValue}) {
  return (
    <>
        <div className="editor-container flex-grow">
            <Editor
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 20 },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true,
              }}
              height="100%"
              theme="vs-light"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value)}
              className="rounded-lg border border-gray-400"
            />
          </div>
    </>
  )
}

export default CodeEditor