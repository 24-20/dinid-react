
import { useEffect, useState } from 'react'
import { createUser, setDagenstall } from '../firebase/firebaseUtils'
import { Input } from '../../@/components/ui/input'
import { Button } from '../../@/components/ui/button'
import { ArrowRight, Clipboard } from 'lucide-react'
import { Label } from '../../@/components/ui/label'
import {Textarea} from '../../@/components/ui/textarea'
const Boss = () => {
    const [inp, setInp] = useState('')
    const [admin, setAdmin] = useState(false)
    const [dagenstall, setdagenstall] = useState('')
    const [code, setCode] = useState<string>('')
    const [textarea, settextarea] = useState<string>('')
    const [clicked, setClicked] = useState(false)

    useEffect(()=>{
        async function generateCode() {
            const code = await createUser()
            setCode(code)
            settextarea(prev=>prev += ` ${code} \n`)
        }
        if (clicked) {
            generateCode()
            setClicked(false)
            
        }
    },[clicked])
    return (
        <div className=' flex flex-col justify-center items-center w-screen h-fit min-h-[calc(100vh-74px)] gap-6 p-8 max-w-[500px]'>
            {
                !admin?
                <div className=' flex w-full  gap-2 '>
                    <Input className='' type="password" value={inp} onChange={(e)=>setInp(e.target.value)} />
                    <Button onClick={()=>{if (inp === import.meta.env.VITE_ADMINPASSWORD) setAdmin(true)}}>
                        <ArrowRight size={20}/>
                    </Button>
                </div>
                :
                <>
                    <h1 className=' text-xl w-full'>Data</h1>
                    
                    <div className=' flex w-full max-w-[500px] gap-2'>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="time">Dagens tall</Label>
                            <Input placeholder='Dagens tall' className='' type="number" value={dagenstall} onChange={(e)=>setdagenstall(e.target.value)} />
                        </div>
                        <Button className=' mt-6' onClick={()=>{
                            setDagenstall(dagenstall)
                        }}>
                            Oppdater<ArrowRight size={20}/>
                        </Button>
                    </div>
                    <div className=' w-full h-[1px] bg-border my-4'></div>
                    <h1 className=' text-xl w-full'>Administrerende</h1>
                    <div className=' flex w-full  gap-2'>
                        <div className=' items-center flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'>
                            {
                                code?
                                <div className=' flex w-full justify-between'>
                                    <div>{code}</div>
                                    <div><Clipboard size={16} color='grey' /></div>
                                </div>
                                
                                :
                                <div>******</div>
                                    
                            }
                        </div>
                        {
                                code?
                                <Button onClick={()=>{
                                    setClicked(true)
                                }} className=' '>Ny bruker</Button>
                                :
                                <Button onClick={()=>{
                                    setClicked(true)
                                }} className=' '>Ny bruker</Button>
                        }
                        
                    </div>
                    <Textarea value={textarea} />
                    
                        
                </>
            }
        </div>
    )
}

export default Boss