import { ArrowLeft } from "lucide-react"
import { Button } from "../../@/components/ui/button"
import { NavLink } from "react-router-dom"
import { MultiStepFormCrypto,MultiStepFormKontanter } from "../components/MultiStepForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../@/components/ui/tabs"


const Contact = () => {
  return (
    <div className=' w-screen h-[calc(100vh-74px)] flex flex-col items-center  gap-3 '>
            {/* <h1 className=' text-lg text-center'>Kontakt en av våre representanter</h1>
            <NavLink to={'/'}><Button className=" gap-1 mt-2" variant={'outline'}><ArrowLeft size={16} />{' '}Gå tilbake </Button></NavLink> */}
            <Tabs defaultValue="crypto" className="max-w-[500px] w-full flex items-center flex-col ">
              <TabsList className="mt-12 mb-6" >
                <TabsTrigger value="crypto">Betal med Crypto</TabsTrigger>
                <TabsTrigger value="kontanter">Betal med kontanter</TabsTrigger>
              </TabsList>
              <TabsContent value="crypto">
                <MultiStepFormCrypto />
              </TabsContent>
              <TabsContent value="kontanter">
                <MultiStepFormKontanter />
              </TabsContent>
            </Tabs>

            
        </div>
  )
}

export default Contact