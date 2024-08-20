
import { useEffect, useState } from 'react'
import { createUser } from '../firebase/firebaseUtils'

const Boss = () => {
    const [inp, setInp] = useState('')
    const [admin, setAdmin] = useState(false)
    
    const [code, setCode] = useState<string>('')
    const [clicked, setClicked] = useState(false)

    useEffect(()=>{
        async function generateCode() {
            const code = await createUser()
            setCode(code)
            console.log(code)
        }
        if (clicked) {
            generateCode()
            setClicked(false)
            
        }
    },[clicked])
    return (
        <div className=' flex flex-col justify-center items-center w-screen h-screen gap-6'>
            {
                !admin?
                <>
                    <input className=' bg-red-400' type="password" value={inp} onChange={(e)=>setInp(e.target.value)} />
                    <button onClick={()=>{if (inp === import.meta.env.VITE_ADMINPASSWORD) setAdmin(true)}}>
                        submit
                    </button>
                </>
                :
                <>
                    <h1>velkommen big boss</h1>
                    {
                        code?
                        <div>{code}</div>
                        :
                        <button onClick={()=>{
                            setClicked(true)
                        }} className=' bg-gray-400 p-2 px-6 rounded-md'>Ny bruker</button>
                    }
                </>
            }
        </div>
    )
}

export default Boss