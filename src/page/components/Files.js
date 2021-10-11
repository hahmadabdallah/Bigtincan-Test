import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFiles, deleteFile } from '../../services/api';

const Files = () => {

    const [files, setFiles] = useState([]);

    /* Get files function */
    const getAllFiles = () => {
        getFiles().then(x => {
            setFiles(x.data);

        })
    }

    useEffect(() => {
        getAllFiles();
    }, [getFiles]);

    /* Delete file function */
    const onDelete = async (id) => {
        await deleteFile(id);
        alert('Delete File!')
        getAllFiles();
    }


    return (
        <div className="container">
            <h2 className="mt-4">Files :</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>

                        <th scope="col">File Id</th>
                        <th scope="col">File</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        files.map(items =>

                            <tr key={items.id}>
                                <td>
                                    {items.id}
                                </td>
                                <td>
                                    <i className="fa fa-file"></i><span>{items.name}</span>
                                </td>
                                <td>
                                    <i className="fa fa-trash text-danger " onClick={() => { onDelete(items.id) }}></i>
                                    <Link to={`/add/${items.id}`}><i className="fa fa-edit "></i></Link>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Files;