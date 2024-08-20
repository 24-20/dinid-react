import { useContext, useEffect, useState } from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "../../@/components/ui/input-otp"
import { ClipLoader } from 'react-spinners'
import {getDagenstall, getUser} from '../firebase/firebaseUtils'
import { GlobalContext } from './GlobalLayout'
const Landing = () => {
    const globalcontext = useContext(GlobalContext)


    const [val,setval] = useState('')
    const [staticVal,setStaticVal] = useState('')
    const [valauthenting,setValauthenting] = useState(false)
    const [error, seterror] = useState<false | string>(false)
    
    useEffect(()=>{
        if (val.length > 5 && !valauthenting) {
            setStaticVal(val)
            setValauthenting(true)
        }
    },[val])
    useEffect(()=>{
        async function getdata() {
            if (!globalcontext) return 
            
            seterror(false)
            const userobj = await getUser(val)
            const dagensdata = await getDagenstall() as {data:{dagenstall:string}}
            if (userobj?.error) {
                setValauthenting(false)
                seterror(userobj.error)
            } else {
                globalcontext.setUser({...userobj.data,id:val,dagenstall:dagensdata.data.dagenstall})
                setValauthenting(false)

            }
            
        }
        if (valauthenting) {
            getdata()
        }
    },[valauthenting])

    return (
        <div className=' w-screen h-[calc(100vh-74px)] flex flex-col items-center justify-center gap-3'>
            <h1 className=' text-lg'>Logg inn med din kode</h1>
            <InputOTP maxLength={6} onChange={(e)=>{setval(e)}} value={valauthenting?staticVal:val}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            {
                error&&
                <p className=' text-destructive mt-6'>{error}</p>
            }
            {
                valauthenting?
                <ClipLoader
                    color={'black'}
                    loading={valauthenting}
                    size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    className=' mt-10'
                />
                :
                
                <p className=' cursor-pointer underline text-gray-500 mt-10'>Jeg har ikke kode</p>

            }
            

        </div>
    )
}

export default Landing