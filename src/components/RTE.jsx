import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { Controller } from 'react-hook-form'



export default function RTE({
  name, control, label, defaultValue = ""
}) {
  return (
    <div className="w-full">
      {label && <label className='inline-block mb-1 pb-1'>{label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey='ufzqd2iegxp84iplerxyr5a9fxf3me016nelsj5dbvvtbg3r'
            initialValue='default value'
            init={
              {
                branding: false,
                height: 500,
                menubar: true,
                plugins: [
                  // Core editing features
                  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                  // Your account includes a free trial of TinyMCE premium features
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                content_style: ""
              }
            }
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}
