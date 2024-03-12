import React from 'react'

import { Undo, Redo } from 'lucide-react'
import { Editor } from '@tiptap/react'

interface ToolbarProps {
    editor: Editor | null,
    content: string
}

const Toolbar = ({editor, content}: ToolbarProps) => {
    if(!editor) {
        return null
    }

    const handleUndo = (event: any) => {
        event.preventDefault()
        editor.chain().focus().undo().run()
    }

    const handleRedo = (event: any) => {
        event.preventDefault()
        editor.chain().focus().redo().run()
    }

    return (
        <div className = "flex items-start justify-between w-full bg-green-700 rounded-tl-md rounded-tr-md p-2 border-b border-gray-400">
            <div className = "undo_redo flex items-center justify-center gap-4">
                <button
                    onClick = {handleUndo}
                    className = {
                        editor.isActive("undo") 
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-white hover:bg-green-500 hover:text-white p-1 hover:rounded-lg"
                    }
                >
                <Undo className = "w-5 h-5"/>
                </button>
                <button
                    onClick = {handleRedo}
                    className = {
                        editor.isActive("redo") 
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-white hover:bg-green-500 hover:text-white p-1 hover:rounded-lg"
                    }
                >
                <Redo className = "w-5 h-5"/>
                </button>
            </div>
            <div>
                <h1 className = "text-white text-sm md:text-base tracking-wide font-bold">
                    EDITOR TEXT
                </h1>
            </div>
        </div>
    )
}

export default Toolbar