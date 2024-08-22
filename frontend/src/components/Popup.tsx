import { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import sjult from '../public/adressebar_hidden.png'
import ikke_sjult from '../public/adressebar_not_hidden.png'
import verktøy from '../public/adressebar_verktøy.png'
import { Button } from '../../@/components/ui/button'
const Popup = (props:{display:boolean}) => {
    
    const [bgclick, setbgclick] = useState(false)
    const [fgclick, setfgclick] = useState(false)
    const [display, setDisplay] = useState(false)

    const [popupstate, setpopupstate] = useState<undefined | 'IOS' | 'Android'>(undefined)
    useEffect(()=>{
        if (props.display) {
            setDisplay(true)
        }
    },[props.display])
    useEffect(()=>{
        setTimeout(() => {
            if (bgclick) {
                if (!fgclick) {
                    
                    sessionStorage.setItem("tutorial_finished",'true');
                    setDisplay(false)
                    setbgclick(false)
                } else {
                    setbgclick(false)
                    setfgclick(false)
                }
            }
        }, 1);
    },[bgclick])
    console.log('mounted')
  return (
            <div key={'popup'} className={`bg-black/50 w-screen h-screen z-[150] top-0 left-0 flex justify-center items-center fixed overflow-y-hidden ${!display?'hidden':''}`} onClick={()=>setbgclick(true)}>
            <motion.div
                exit={{opacity:0, scale:0.8 }}
                initial={{opacity:0, scale:0.8 }}
                animate={{opacity:1, scale:1 }}

                className=' bg-white w-screen h-screen rounded-lg max-w-[500px] max-h-[500px] flex flex-col items-center text-center px-8 relative py-4  ' onClick={()=>setfgclick(true)}>

            
                
                

                {
                    !popupstate &&
                    <>
                        <X size={18} className=" absolute top-6 left-6 cursor-pointer text-gray-500" onClick={()=>{
                        sessionStorage.setItem("tutorial_finished",'true')
                        setfgclick(false)
                        setbgclick(false)
                        setDisplay(false)
                        }}/>
                        <h1 className='text-lg font-bold'>Tips ved bruk av tjenesten</h1>
                        <p className=' text-gray-500 mb-5'>Skjul adressebaren før bruk</p>
                        <div className=' flex gap-4 p-1 border-grey-500 border relative h-fit'>
                            <img className=' h-[280px] border-grey-500 border-r ' src={ikke_sjult} alt="" />
                            <ArrowRight size={40} className=' h-full'/>
                            <img className=' h-[280px] border-grey-500 border-l ' src={sjult} alt="" />
                        </div>
                        <p className=' text-gray-500 my-2 '>Trykk på det systemet du har for tutorial om hvordan man skjuler adressebaren</p>
                        <div className=' mt-2 w-screnn flex gap-8'>
                            <Button variant={'outline'} onClick={()=>setpopupstate('Android')}>Android</Button>
                            <Button variant={'default'} onClick={()=>setpopupstate('IOS')}>IOS</Button>
                        </div>
                    </>
                }
                {
                    popupstate === 'IOS' &&
                    <>  
                        <ArrowLeft size={18} className=" absolute top-6 left-6 cursor-pointer text-gray-500" onClick={()=>setpopupstate(undefined)}/>
                        <h1 className='text-lg font-bold'>Skjul adressebar IOS</h1>
                        <p className=' text-gray-500 mb-5'>Klikk på "aA" deretter "Skjul verktøylinje"</p>
                        <div className=' flex gap-4 p-1 border-grey-500 border relative h-fit'>
                            <img className=' h-[280px] border-grey-500 border-r ' src={ikke_sjult} alt="" />
                            <ArrowRight size={40} className=' h-full'/>
                            <img className=' h-[280px] border-grey-500 border-l ' src={verktøy} alt="" />
                        </div>
                        <div className=' mt-5 w-screnn flex gap-8'>
                            <Button variant={'outline'} onClick={()=>{
                                sessionStorage.setItem("tutorial_finished",'true');
                                setDisplay(false)
                            }}>Lukk</Button>
                        </div>
                    </>
                }
                {
                    popupstate === 'Android' &&
                    <>  
                        <ArrowLeft size={18} className=" absolute top-6 left-6 cursor-pointer text-gray-500" onClick={()=>setpopupstate(undefined)}/>
                        <h1 className='text-lg font-bold'>Skjul adressebar Android</h1>
                        <p className=' text-gray-500 mb-5'>Skaff deg en ordentlig telefon...</p>
                        
                    </>
                }
            </motion.div>

        </div>
    
  )
}

export default Popup