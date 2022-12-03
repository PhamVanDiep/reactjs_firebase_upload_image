import ReactQuill, {Quill} from "react-quill";
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import storage from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ImageResize from "quill-image-resize-module-react";
import newsService from './services/news.service';
// import axios from "axios";

Quill.register('modules/imageResize', ImageResize);

class ReactQuillComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: 0,
            content: "",
            create_at: "NOW()"
        };
    }

    imageHandler =() => {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            // console.log(file.name);
            const storageRef = ref(storage,`/files/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);
        
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    console.log(percent);
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        // console.log(url);
                        let quill = this.quill.getEditor();
                        const range = quill.getSelection(true);
                        quill.insertEmbed(range.index, 'image', url);
                        quill.setSelection(range.index + 1);
                    });
                }
            ); 
        };
    }

    getDataUpload =() => {
        let my_data = {
            id: 0,
            content: this.quill.getEditor().container.firstChild.innerHTML
        }
        console.log(JSON.stringify(my_data));
        newsService.create(my_data)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <div className="text-editor">
                    <ReactQuill
                        ref={el => {
                            this.quill = el;
                        }}
                        modules={{
                            toolbar: {
                                container: [
                                    [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
                                    [{ size: [] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'image', 'video'],
                                    ['clean'],
                                    ['code-block']
                                ],
                                handlers: {
                                    'image': () => this.imageHandler()
                                }
                            },
                            imageResize: {
                                parchment: Quill.import('parchment'),
                                modules: ['Resize', 'DisplaySize']
                            }
                        }}
                    />
                </div>
                <div>
                    <input type={'button'} value={'Submit'} id={'submit'} onClick={this.getDataUpload}/>
                </div>
            </div>
        );
    }
}

export default ReactQuillComponent;
