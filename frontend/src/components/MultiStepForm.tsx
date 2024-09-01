
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
const FormSchema = createStepSchema({
  zodemail: z.object({
    email: z.string().email(),
  }),
  zodotp: z.object({
    otp: z.string().min(4),
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
      zodotp: {
        otp: '',
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
      className={'space-y-10 p-8 rounded-xl border'}
      schema={FormSchema}
      form={form}
      onSubmit={onSubmit}
    >
      <MultiStepFormHeader
        className={'flex w-full flex-col justify-center space-y-6'}
      >
        <h2 className={'text-xl font-bold'}>Betal med Crypto</h2>
        <p className=' text-gray-500 text-sm font-bold '>Din email brukes kun til å sende tilgangs-kode når betaling er fullført,
        og vil bli slettet fra vår database etter 24 timer.</p>

 
        <MultiStepFormContextProvider>
          {({ currentStepIndex }:{currentStepIndex:number}) => (
            <Stepper
              steps={['Account', 'Profile', 'Review']}
              currentStep={currentStepIndex}
            />
          )}
        </MultiStepFormContextProvider>
      </MultiStepFormHeader>
 
      <MultiStepFormStep name="zodemail">
        <EnterEMailStep />
      </MultiStepFormStep>

      <MultiStepFormStep name="zodotp">
        <ConfirmEMailStep />
      </MultiStepFormStep>
 
      <MultiStepFormStep name="profile">
        <SendCryptoStep />
      </MultiStepFormStep>
 
      <MultiStepFormStep name="review">
        <ReviewStep />
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
      zodotp: {
        otp: '',
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
      className={'space-y-10 p-8 rounded-xl border'}
      schema={FormSchema}
      form={form}
      onSubmit={onSubmit}
    >
      <MultiStepFormHeader
        className={'flex w-full flex-col justify-center space-y-6'}
      >
        <h2 className={'text-xl font-bold'}>Betal med Kontanter</h2>
 
        <MultiStepFormContextProvider>
          {({ currentStepIndex }:{currentStepIndex:number}) => (
            <Stepper
              steps={['Account', 'Profile', 'Review']}
              currentStep={currentStepIndex}
            />
          )}
        </MultiStepFormContextProvider>
      </MultiStepFormHeader>

      <MultiStepFormStep name="zodemail">
        <EnterEMailStep />
      </MultiStepFormStep>

      <MultiStepFormStep name="zodotp">
        <ConfirmEMailStep />
      </MultiStepFormStep>
 
      <MultiStepFormStep name="profile">
        <SendKontanterStep />
      </MultiStepFormStep>
 
      <MultiStepFormStep name="review">
        <ReviewStep />
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
            Motta Engangskode
          </Button>
        </div>
      </div>
    </Form>
  );
}
function ConfirmEMailStep() {
  const { form, nextStep,prevStep, isStepValid } = useMultiStepFormContext();
 
  return (
    <Form {...form}>
      <div className={'flex flex-col gap-4'}>
 
        <FormField
          name="zodotp.otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enganskode</FormLabel>
              <FormControl>
                <Input type="otp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <div className="flex justify-end space-x-2">
          <Button type={'button'} className=' flex gap-1' variant={'outline'} onClick={prevStep}>
            <ArrowLeft size={16}/> <div>Bruk annen email</div>
          </Button>
          <Button type='submit' onClick={nextStep} disabled={!isStepValid()}>
            Verifiser
          </Button>
        </div>
      </div>
    </Form>
  );
}
 
function SendCryptoStep() {
  const { form, nextStep, prevStep } = useMultiStepFormContext();
 
  return (
    <Form {...form}>
      <div className={'flex flex-col gap-4'}>
       <div>send 50 usd til wallet:12189470912489071240798</div>
 
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
 
function ReviewStep() {
  const { prevStep, form } = useMultiStepFormContext<typeof FormSchema>();
  const values = form.getValues();
 
  return (
    <div className={'flex flex-col space-y-4'}>
      <div className={'flex flex-col space-y-4'}>
        <div>Great! Please review the values.</div>
 
        <div className={'flex flex-col space-y-2 text-sm'}>
          <div>
            <span>Email</span>: <span>{values.zodemail.email}</span>
          </div>
        </div>
      </div>
 
      <div className="flex justify-end space-x-2">
        <Button type={'button'} variant={'outline'} onClick={prevStep}>
          Back
        </Button>
 
        <Button type={'submit'}>Create Account</Button>
      </div>
    </div>
  );
}