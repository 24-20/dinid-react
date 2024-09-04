
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '../../@/components/ui/input';
import {Textarea} from '../../@/components/ui/textarea'
import { Label } from '../../@/components/ui/label';
import { Button } from '../../@/components/ui/button';
import { AddMessageUser } from '../firebase/firebaseUtils';
const Support = () => {
    
  const [searchParams] = useSearchParams();
  const [email,setemail] = useState('')
  const [text,settext] = useState('')
  useEffect(()=>{
    const emailq = searchParams.get('mail');
    if (emailq) {
        setemail(emailq)
    }
  },[])
  return (
    <div className=' w-screen min-h-[calc(100vh-74px)] items-center justify-center flex flex-col '>
        <div className=' min-w-[380px] flex flex-col gap-6 relative'>
            <div className=' flex flex-col gap-2'>
                <Label>E-post</Label>
                <Input  value={email} onChange={e=>setemail(e.target.value)} placeholder='e-post'/>
            </div>
            <div className=' flex flex-col gap-2'>
                <Label>Melding</Label>
                <Textarea value={text} onChange={e=>settext(e.target.value)}  placeholder='Jeg har ikke mottatt tilgangskode etter betaling...'/>
            </div>
            <div className=' flex justify-between items-center w-full mt-4 '>
                <p className=' text-sm text-muted-foreground h-fit'>Vi sender svar til din email</p>
                <Button onClick={()=>{
                    AddMessageUser(email,text)
                }}>Send melding</Button>
            </div>
        </div>
        
        
    </div>  
  )
}

export default Support