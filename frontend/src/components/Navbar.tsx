import { ChevronLeft } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className={` fixed top-0 left-0  w-screen pt-6 pb-4 z-50 
     bg-white flex items-center justify-center ${(pathname === `/f`)?'':'border-b border-[#E8E8E8]'}`}>
        <NavLink to={'/f'}>
          <ChevronLeft size={36} className=' text-[#555E44] absolute left-6 bottom-4' />
        </NavLink>
        {
          pathname==='/k'&&
          <h1 className=' text-xl text-[#555e44] m-0 p-0'>Kontroll</h1>
        }
        {
          pathname==='b'&&
          <h1 className=' text-xl text-[#555E44] m-0 p-0'>Personalia</h1>
        }
        {
          pathname===`/f`&&
          <h1 className=' text-xl text-[#ffffff] m-0 p-0'>førerkort</h1>
        }
    </div>
  )
}

export default Navbar