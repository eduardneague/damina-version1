'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from '@/components/Toolbar'

const Tiptap = ({ content, onChange}: any) => {

    const handleChange = (newContent: string) => {
        onChange(newContent)
    }

    const editor = useEditor({
        extensions: [
        StarterKit,
        ],
        content: content,
        editorProps: {
            attributes: {
                class: `w-full flex bg-white rounded-none shadow-lg focus:outline-offset-3 focus:outline-1 focus:outline-green-700 focus-outline-1 p-2 min-h-[5rem]`
            }
        },

        onUpdate: ({editor}) => {
            handleChange(editor.getHTML())
        }
    })

    return (
        <div className = "w-full ">
            <Toolbar 
                editor = {editor} 
                content = {content} 
            />
            <EditorContent 
                editor={editor} 
                style = {{whiteSpace: 'pre-line'}}
            />
        </div>
    )
}

export default Tiptap