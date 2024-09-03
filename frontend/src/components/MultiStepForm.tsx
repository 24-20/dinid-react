
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
 
import { Button } from '../../@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../@/components/ui/form'
import { Input } from '../../@/components/ui/input';
import {
  MultiStepForm,
  MultiStepFormContextProvider,
  MultiStepFormHeader,
  MultiStepFormStep,
  createStepSchema,
  useMultiStepFormContext,
} from '../../@/components/ui/multi-step-form';
import Stepper from './Stepper';
import { ArrowLeft } from 'lucide-react';
import CryptoPayment from './CryptoPayment';
import { useState } from 'react';
import { createPaymentID } from '../firebase/firebaseUtils';
const FormSchema = createStepSchema({
  zodemail: z.object({
    email: z.string().email(),
  }),
  zodpaymentid: z.object({
    id: z.string(),
  })
});
 
type FormValues = z.infer<typeof FormSchema>;
 
export function MultiStepFormCrypto() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      zodemail: {
        email: '',
      },
      zodpaymentid: {
        id: '',
      },
    },
    reValidateMode: 'onBlur',
    mode: 'onBlur',
  });
 
  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
  };
 
  return (
    <MultiStepForm
      className={'space-y-10 p-6 py-8 rounded-xl border'}
      schema={FormSchema}
      form={form}
      onSubmit={onSubmit}
    >
      <MultiStepFormHeader
        className={'flex w-full flex-col justify-center space-y-6'}
      >
        <MultiStepFormContextProvider>
          {({ currentStepIndex }:{currentStepIndex:number}) => (
            <>
            <h2 className={'text-xl font-bold flex justify-between'}><div>Betal med Crypto</div><div >500Kr</div></h2>
            {
              (currentStepIndex===0 || currentStepIndex===1)&&
              
              <p className=' text-gray-500 text-sm font-medium '>Din email brukes kun til å sende tilgangs-kode.
              Den vil bli <span className=' font-bold'>slettet for alltid</span> fra vår database etter <span className=' font-bold'>24 timer</span>.</p>
              
            }
             
            <Stepper
              steps={['Email','Bekreft', 'Betal']}
              rows={2}
              currentStep={currentStepIndex}
            />
            </>
          )}
          </MultiStepFormContextProvider>
      </MultiStepFormHeader>
 
      <MultiStepFormStep name="zodemail">
        <EnterEMailStep />
      </MultiStepFormStep>
      <MultiStepFormStep >
        <ConfirmEMailStep />
      </MultiStepFormStep>
      <MultiStepFormStep name="review">
        <SendCryptoStep />
      </MultiStepFormStep>
 
    </MultiStepForm>
  );
}
export function MultiStepFormKontanter() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      zodemail: {
        email: '',
      },
      
    },
    reValidateMode: 'onBlur',
    mode: 'onBlur',
  });
 
  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
  };
 
  return (
    <MultiStepForm
      className={'space-y-10 p-6 py-8 rounded-xl border'}
      schema={FormSchema}
      form={form}
      onSubmit={onSubmit}
    >
      <MultiStepFormHeader
        className={'flex w-full flex-col justify-center space-y-6'}
      >

        <MultiStepFormContextProvider>
          {({ currentStepIndex }:{currentStepIndex:number}) => (
            <>
            <h2 className={'text-xl font-bold'}>Betal med Kontanter</h2>
            {
              (currentStepIndex===0 || currentStepIndex===1)&&
              
              <p className=' text-gray-500 text-sm font-medium '>Din email brukes kun til å sende tilgangs-kode.
              Den vil bli <span className=' font-bold'>slettet for alltid</span> fra vår database etter <span className=' font-bold'>24 timer</span>.</p>
              
            }

             
            <Stepper
              steps={['Email', 'Verifiser', 'Område','Chat','Betal']}
              rows={2}
              currentStep={currentStepIndex}
            />
            </>
          )}
        </MultiStepFormContextProvider>
      </MultiStepFormHeader>

      <MultiStepFormStep name="zodemail">
        <EnterEMailStep />
      </MultiStepFormStep>

      <MultiStepFormStep >
        <ConfirmEMailStep />
      </MultiStepFormStep>
 
      <MultiStepFormStep name="profile">
        <SendKontanterStep />
      </MultiStepFormStep>
 
    </MultiStepForm>
  );
}

function EnterEMailStep() {
  const { form, nextStep, isStepValid } = useMultiStepFormContext();
 
  return (
    <Form {...form}>
      <div className={'flex flex-col gap-4'}>
        <FormField
          name="zodemail.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          
          <Button onClick={(e)=>{
            nextStep(e)
          }} disabled={!isStepValid()}>
            Neste
          </Button>
        </div>
      </div>
    </Form>
  );
}
function ConfirmEMailStep() {
  const { form, nextStep,prevStep } = useMultiStepFormContext();
  const values = form.getValues();
  const [loading, setloading] = useState(false)
  async function handleonclick(e:React.SyntheticEvent<Element, Event>) {
      setloading(true)
      const id = await createPaymentID(values.zodemail.email)
      form.setValue('zodpaymentid.id',id.data.paymentId)
      setTimeout(() => {
        setloading(false)
        nextStep(e)
      }, 1000);
  }
  return (    
      <div className={'flex flex-col gap-4'}>
        <p className=' text-orange-500 text-sm'>
          Viktig! Tilgangskoden sendes til oppgitt e-post etter betaling. 
          Sørg for at adressen er korrekt og tilgjengelig.
        </p>
        
          <Input  value={values.zodemail.email} disabled/>
              
 
        <div className="flex justify-between">
          <Button type={'button'} className=' flex gap-1' variant={'outline'} onClick={prevStep}>
            <ArrowLeft size={16}/> <div>Tilbake</div>
          </Button>
          <Button disabled={loading} onClick={(e)=>{
              handleonclick(e as React.SyntheticEvent<Element, Event>)
          }} >
            {
              loading?
              <div>...</div>
              :
              <div>Generer Payment ID</div>
            }
          
          </Button>
        </div>
      </div>
  );
}
 
function SendCryptoStep() {
  const { form, prevStep } = useMultiStepFormContext();
  const values = form.getValues();
  return (
    <Form {...form}>
      <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col space-y-2 text-sm'}>
          <div>
            <span>Email</span>: <span>{values.zodemail.email}</span>
          </div>
        </div>
        <CryptoPayment paymentID={values.zodpaymentid.id}/>
 
        <div className="flex justify-end space-x-2">
          <Button type={'button'} variant={'outline'} onClick={prevStep}>
            Tilbake
          </Button>
 
        </div>
      </div>
    </Form>
  );
}
function SendKontanterStep() {
  const { form, nextStep, prevStep } = useMultiStepFormContext();
 
  return (
    <Form {...form}>
      <div className={'flex flex-col gap-4'}>
       <div>send 500 kroner til lishaug 56</div>
 
        <div className="flex justify-end space-x-2">
          <Button type={'button'} variant={'outline'} onClick={prevStep}>
            Tilbake
          </Button>
 
          <Button onClick={nextStep}>Neste</Button>
        </div>
      </div>
    </Form>
  );
}
 
