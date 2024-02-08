import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import {HiOutlineMail} from 'react-icons/hi';
import {BsWhatsapp} from 'react-icons/bs';
import {HiLocationMarker} from 'react-icons/hi';

function Footer() {
  return (
      <div>
         <section className='bg-green-700 md:px-28'>
        <div className='container flex flex-col items-center justify-between px-6 py-2 mx-auto space-y-12 md:py-12 md:flex-row md:space-y'>
            <h3 className='md:text-4-xl font-bold leading-tight text-center text-2xl text-white md:max-w-xl md:text-left'>Megha1 We cure more 120,000 patients</h3>
            <div className='flex justify-center md:justify-start '>
                <Link to="https://megha1.com/contact/" className='p-1 px-6 pt-2 text-green-700 rounded-full bg-white shadow-2xl hover:bg-green-400 hover:text-yellow-500'>Contact Us</Link>
            </div>
        </div>
       </section>

       <div className='bg-gray-900 md:px-28'>
        <div>
            <div>
                <div>
                    <img className='w-28' src={Logo} alt='logo' />
                </div>
                <div>
                    <Link to="/whatsapp">
                        <BsWhatsapp className='h-8 text-white'/>
                        <p>01234567</p>
                    </Link>

                    <Link to="/email">
                        <HiOutlineMail className='h-16 text-white'/>
                    </Link>

                    <Link to="/location">
                        <HiLocationMarker className='h-16 text-white'/>
                    </Link>
                   
                </div>
            </div>

            <div>
                <div>
                    <h2>Contact Us</h2>
                </div>
            </div>
            <div></div>
            
        </div>
       </div>
      </div>
       
    )
}

export default Footer