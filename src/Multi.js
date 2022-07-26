import React from 'react'

export default function Multi() {
    const [email,setEmail] = React.useState([])
    const [textEmail,setTestemail] = React.useState('')
    console.log(email)
    function clear(){

    }
  return (
    <div style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        margin:5,
        alignSelf:"center"
    }}>
        <div style={{
        display:"flex",
        flexDirection:"row",
        alignSelf:"center"
        }}>
        <input
        style={{
            width: '420px',
            height: '45px',
            borderRadius:"22px"
          }}
        placeholder="Enter The user Email"
        type={"email"}
          onChange={(event)=>{
            
                setTestemail(event.target.value)

           
          }}
        />
        <button 
        style={{
            margin:2,
            height:'50px',
            backgroundColor:"#AFE1AF",
            borderRadius:"25px",
            width:"40px"
        }}
        onClick={()=>{
            if (email.length<=4 && isNaN(textEmail)){
                email.push(textEmail)
                setTestemail("")
            }
            else{
                alert("Only 5 email can be added or Invalid Input")
            }
           
        }}>Add</button>
        </div>
        <div style={{
            width: '465px',
            height: '145px',
            borderRadius:"22px",
            border: '2px solid black',
            backgroundColor:"Background",
            marginTop:5,
            overflow:"scroll"
        }}
        >
            {
                email.map((a,index)=>(
                    <p>
                        {index+1}. {a}
                    </p>
                ))
            }
        </div>
    </div>
  )
}
