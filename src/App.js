import React from 'react'
import axios from 'axios'
import Multi from './Multi'
import AWS from 'aws-sdk'
export default function App() {
  
  const [selectedFile, setSelectedFile] = React.useState();
  const [isFilePicked, setIsFilePicked] = React.useState(false);
  const [progress , setProgress] = React.useState(0);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const S3_BUCKET = 'myfilesharingapp';
  const REGION = 'us-east-1';

  AWS.config.update({
    accessKeyId: 'AKIARTBYSG5UF3MJWMVF',
    secretAccessKey: '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'
  })

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  })
   const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name,
            mode:'cors'
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }


  function header() {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: 100,
        // width:'100%',
        backgroundColor: "GrayText"
      }}>
        <h1
          style={{
            color: "whitesmoke",
            fontFamily: "monospace",
            marginLeft: 120
          }}
        >
          File Sharing App
        </h1>
      </div>
    )
  }
  function form() {
    return (
      <div style={{
        marginTop: 150,
        display: "flex",
        width: "40%",
        height: "50%",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "ButtonShadow",
        borderRadius: "20px",
        padding: 20,
        flexDirection: "column",
        alignItems: "center"
      }}>
        {Multi()}
        <input style={{
          display: "flex",
          padding: 20,
          margin: 10,
          alignSelf: "center",
          backgroundColor: isFilePicked ? " #AFE1AF" : " GrayText ",
          justifyContent: "center",
          borderRadius: "20px"
        }} type="file" name="file" onChange={(event) => { changeHandler(event) }} />
        <button
          style={{
            height: '60px',
            backgroundColor: "#AFE1AF",
            borderRadius: "25px",
            width: "120px",
            alignSelf: "center"
          }}
          onClick={() => {
            uploadFile(selectedFile)
          }}>
          <h3
            style={{
              color: "black",
              fontFamily: "monospace",
            }}
          >
            Share
          </h3>
        </button>
      </div>
    )
  }
  return (
    <div>
      {header()}
      <div style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center"
      }}>
        {form()}
      </div>
    </div>
  )
}
