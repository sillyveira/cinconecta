import React from 'react'
import {Info} from 'lucide-react'
import {motion} from  'framer-motion'
function AuditCard({titulo, horario, data, funcaoClique}) {
  return (
    <>
    <div className='text-black items-center justify-between flex w-fit gap-6 bg-gray-200  px-4 py-2 rounded-lg'>
      {/* DIV DO HORÁRIO/DATA */}
      <div className='place-items-center'> 
        <h1>{horario}</h1>
        <h1>{data}</h1>
      </div>

      <div className="border-1 h-8 border-[#B6B6B6]" />

      {/*DIV DO TITULO */}
      <h1 className='px-6 max-w-[368px] text-center'>{titulo}</h1>

      <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={funcaoClique}
            className="cursor-pointer"
          >
            <Info/>
    </motion.button>

    </div>
    </>
  )
}

export default AuditCard