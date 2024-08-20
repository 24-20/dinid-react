
import KontrollButton from './kontroll-button'
import InfoButton from './info-button'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className=' w-screen fixed bottom-0 h-[100px] bg-white left-0 shadow-2xl flex items-center justify-between px-[16px]'>
        <div className=' bg-gradient-to-b from-white to-black/5 left-0 h-[8px] fixed bottom-[100px] w-full text-[#555E44]'> </div>
        <div className=' text-[16px] flex flex-col gap-1'>
            <h4>Førerkortkoder</h4>
            <InfoButton><span className=' font-semibold'>100</span> Prøveperiode</InfoButton>
        </div>
        <NavLink className=' w-fit h-fit' to={'/k'}>
          <KontrollButton />
        </NavLink>
    </div>
  )
}

export default Footer