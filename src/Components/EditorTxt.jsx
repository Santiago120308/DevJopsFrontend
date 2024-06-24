import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import useVacantes from "../Hooks/useVacantes.jsx";

export default function EditorTxt() {

    const {dataVacante, setDataVacante} = useVacantes();

    const handlerContenido = (contenido) => {
        setDataVacante({
            ...dataVacante ,
            descripcion : contenido
        })

    }

    return (
        <Editor
            apiKey='0xok6hd4wpkuql4iiakoejy6sxte3qkeb4wyofnbxgulnu3q'
            init={{
                language: 'es',
                language_variant: 'es',
                language_load : false ,
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
            }}
            onEditorChange={handlerContenido}
            initialValue={dataVacante.descripcion}
        />
    );
}