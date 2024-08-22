import { ArrowLeft } from "lucide-react"
import { Button } from "../../@/components/ui/button"
import { NavLink } from "react-router-dom"


const Contact = () => {
  return (
    <div className=' w-screen h-[calc(100vh-74px)] flex flex-col items-center justify-center gap-3 px-8'>
            <h1 className=' text-lg text-center'>Kontakt en av våre representanter i Trondheim, Oslo eller Tromsø</h1>
            <NavLink to={'/'}><Button className=" gap-1 mt-2" variant={'outline'}><ArrowLeft size={16} />{' '}Gå tilbake </Button></NavLink>

        </div>
  )
}

export default Contact