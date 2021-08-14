import {useState} from 'react'
import axios from "axios"

const FileUpload = () => {


  const [file, setFile] = useState("")
  const [uploadedFile, setUploadedFile] = useState()

  const onChange = (e)=>{
    setFile(e.target.files[0])
  }

  const onSubmit = async (e)=>{
    
    try{
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)

    
      const res = await axios.post("/upload", formData,{
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })

      const {fileName, filePath} = res.data

      setUploadedFile({fileName, filePath})
     
    }catch(err){
      if(err.response.status === 500){
        console.error("There was a problem with the server")
      }else{
        console.log(err.response.data.message)
      }
    }
  }


  
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="input-group mb-3 mb-4">
          <input type="file" className="form-control" id="inputGroupFile02"
          onChange={onChange}/>
          <input 
          value="Upload"
          type="submit"
          className="btn btn-primary input-group-text" htmlFor="inputGroupFile02"/>
        </div>
      </form>
      {uploadedFile ? (<div className="row mt-5">
        <div className="col-md-6 m-auto">
          <h3 className="text-center">{uploadedFile.fileName}</h3>
          <img style= {{width: "100%"}} src={uploadedFile.filePath} alt="user uploaded file" />
        </div>
        </div>):
        <div>No Image Uploaded</div>
     }
    </>
  )
}

export default FileUpload
