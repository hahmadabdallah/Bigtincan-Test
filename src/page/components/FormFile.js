import React, { useState, useEffect } from 'react';
import { addFile, editFile, getFiles } from '../../services/api';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import fileUploadIcon from "../../assets/images/icon-file-upload.svg";


const FormFile = () => {
    const id = useParams();
    const fileID = id.fileid;
    let history = useHistory();

    /* UseState */
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");
    const [erros, setErros] = useState(false);
    /* Select file function */
    const selectFile = async (e) => {
        const file = e.target.files[0];
        setFileName(e.target.files[0].name);
        const base64 = await convertBase64(file);
        setFile(base64);
        setErros(false);
    };

    /* Convert to base 64  function */
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    /* Delete file function */
    const deleteSelectedFile = () => {
        setFile("");
        setFileName(null);

    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }

    const fileDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        console.log(file);
        setFileName(e.dataTransfer.files[0].name);
        const base64 = await convertBase64(file);
        setFile(base64);
        setErros(false);
    }

    const fileUpload = {
        name: fileName,
        data: file
    }

    /* Add file submit function */
    const submitFileAdd = async (e) => {
        e.preventDefault();
        if (file == 0) {
            setErros(true);
        } else {
            await addFile(fileUpload);
            history.push('/');
        }


    };

    /* Edit file submit function */
    const submitFileEdit = async (e) => {
        e.preventDefault();
        if (file == 0) {
            setErros(true);
        } else {
            await editFile(fileID, fileUpload);
            history.push('/');
        }
    };

    /* useEffect */
    useEffect(async () => {
        if (fileID) {
            const result = await getFiles(fileID);
            setFile(result.data.data);
            setFileName(result.data.name);
        }
    }, [fileID])


    return (
        <div className="container">
            <h2 className="mt-4">Add File :</h2>
            <form onSubmit={fileID ? submitFileEdit : submitFileAdd}  >
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group ">
                            {!file ? (
                                <div className="uploadzone mt-2"
                                    onDragOver={dragOver}
                                    onDragEnter={dragEnter}
                                    onDragLeave={dragLeave}
                                    onDrop={fileDrop}
                                >

                                    <label htmlFor="file" className="custom-file-upload">
                                        <div className="d-flex">
                                            <div>
                                                <img src={fileUploadIcon} />
                                            </div>
                                            <div className="mt-1">
                                                <span className="fileUploadLabel">File upload</span>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <p>
                                                Upload file with the file dialog or by dragging and
                                                dropping file onto the dashed region Examples of file:
                                                Bigtincan Business items' list.
                                            </p>
                                        </div>
                                        <div className="mt-2">
                                            <p>
                                                Supported file types are: pdf, xls, xlsx, doc, docx, ppt, pptx, csv, txt, jpg, png, jpeg.
                                            </p>
                                        </div>
                                    </label>
                                    <input
                                        id="file"
                                        name="file"
                                        type="file"
                                        className="form-control "
                                        value={file === null ? '' : file}
                                        onChange={(e) => {
                                            selectFile(e);
                                        }}
                                    />


                                </div>

                            ) : (
                                <div>
                                    <div className="fileUpload">
                                        <div>
                                            <span> <i className="fa fa-file"></i></span> <span >{fileName}</span>
                                        </div>
                                        <div>
                                            <span>  <i className="fa fa-close text-danger " onClick={(e) => deleteSelectedFile(e)}></i></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div>
                                {erros && <strong className="text-danger">Please select file to upload</strong>}
                            </div>
                        </div>


                    </div>
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="btn base-btn-color" >
                        {fileID ? "Update" : "Create"}
                    </button>
                </div>

            </form>

        </div>
    );
}

export default FormFile;