
import { MultiStepFormCrypto,MultiStepFormKontanter } from "../components/MultiStepForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../@/components/ui/tabs"
import { TypographyH3, TypographyList } from "../components/Typography"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../@/components/ui/accordion"


const Contact = () => {
  return (
    <div className=' w-screen h-fit flex flex-col items-center  gap-3 pb-8 '>
            <Tabs defaultValue="crypto" className="max-w-[500px] w-full flex items-center flex-col ">
              <TabsList className="mt-12 mb-6" >
                <TabsTrigger value="crypto" className=" relative">Betal med Crypto
                   <div className=" text-[10px] px-2 data-[state=active]:text-xl rounded-full absolute bg-blue-600 text-white left-[-30px] top-[-10px] -rotate-45">
                    SPAR 40%
                    </div>
                </TabsTrigger>
                <TabsTrigger value="kontanter">Betal med kontanter</TabsTrigger>
              </TabsList>
              <TabsContent value="crypto">
                <MultiStepFormCrypto />
                <TypographyH3 className=" mt-12">
                  Hvordan funker det?
                </TypographyH3>
                <TypographyList className=' text-sm'>
                  <li>
                    Begynn med å verifisere din email, dette gjøres for å forsikre oss og 
                    deg om at du har tilgang til den email adressen tilganskoden blir
                    sendt til når betaling er mottatt.
                   </li>
                   <div className=" w-full h-[1px] rounded-full bg-border mt-3"></div>

                  <li>
                    Logg inn på Mymonero appen på pc eller mobil, velg send Crypto og fyll inn infoen vi gir deg på steg 3.
                    Denne infoen inkluderer 
                    <br />
                    <span className=" font-bold">Amount: </span> 
                    <br />
                    <span className=" font-bold">To adress: </span> 
                    <br />
                    <span className=" font-bold">Payment ID: </span> 
                    <br />
                    Når betaling er sendt, går det vanligvis 10-60 minutter før vi mottar den.


                  </li>
                  <div className=" w-full h-[1px] rounded-full bg-border mt-3"></div>
                  <li>Når betaling er mottatt vil vi sende deg tilganskode på den mailen du har oppgitt,
                     deretter vil vi slette din email fra vår database.
                  </li>
                  <div className=" w-full h-[1px] rounded-full bg-border mt-3"></div>
                  <li>
                    Når du mottar tilganskoden på email, 
                    kan du nå logge inn på tjenesten fra landingsiden. Første gang du logger inn 
                    vil du bli bedt om å oppgi den infoen som skal vises på din test-ID, dette inkluderer:
                    <br />
                    <span className=" font-bold">Bilde: </span> 
                    <br />
                    <span className=" font-bold">Fullt navn: </span> 
                    <br />
                    <span className=" font-bold">Fødsels-dato: </span> 
                    <br />
                    Når alt er oppgitt og Vilkårne for bruk er godtatt, kan du begynne å bruke tjenesten.


                  </li>
                </TypographyList>
                <TypographyH3 className=" mt-8">
                  FAQ
                </TypographyH3>
                <Accordion type="single" collapsible className="w-full mb-8">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Hvor lang tid før jeg mottar engangskoden?</AccordionTrigger>
                    <AccordionContent>
                    <span className=" font-bold">30-60 minutter</span> 
                    <br />
                      Det tar vanligvis 10-30 minutter for at cryptoen skal sendes
                       og 30 minutter for oss å behandle bestillingen. Så mellom 30-60 minutter.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Er det anonymt?</AccordionTrigger>
                    <AccordionContent>
                    <span className=" font-bold">Ja, fullstendig anonymt</span> 
                    <br />
                    Anonymitet er vår høyeste prioritet, Betaling ved Monero er gullstandarn når
                       det kommer til anonyme online-betalinger, så der trenger man ikke bekymre seg. Vi lagrer ingen info om deg.
                       infoen som skal vises på din test-ID derimot må lagres for brukervennlighet,
                        den krypteres og lagres sikkert, du kan også slette denne infoen når som helst.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Hvor stabil er tjenesten?</AccordionTrigger>
                    <AccordionContent>
                    <span className=" font-bold">Tjenesten har hatt 100% oppetid i
                       løpet av de siste 6 månedene</span> 
                    <br />

                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Jeg har ikke MyMonero konto.</AccordionTrigger>
                    <AccordionContent>
                    <span className=" font-bold">MyMonero konto kan settes opp på 5 min eller du kan betale med kontant</span> 
                    <br />
                    
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              <TabsContent value="kontanter">
                <MultiStepFormKontanter />
              </TabsContent>
            </Tabs>

            
        </div>
  )
}

export default Contact