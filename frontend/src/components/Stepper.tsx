
const Stepper = ({steps,currentStep}:{steps:string[], currentStep:number}) => {
  return (
    <>
    {
        steps.map((step,i)=>{
            return (
                <div className={i===currentStep?'bg-red-500':'bg-black'}>
                    {step}
                </div>
            )
        })
    }
    </>
  )
}

export default Stepper