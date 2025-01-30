import React from 'react'
import {Info} from 'lucide-react'
import {motion} from  'framer-motion'
function AuditCard({titulo, horario, data, funcaoClique}) {
  return (
    <>
    <div className='text-black flex items-center gap-6 bg-gray-200 w-fit px-4 py-2 rounded-lg ml-5'>
      {/* DIV DO HORÁRIO/DATA */}
      <div className='place-items-center'> 
        <h1>{horario}</h1>
        <h1>{data}</h1>
      </div>

      <div className="border-l border-gray-400 h-8" />
      
      {/* DIV DO TITULO */}
      <h1 className='px-6'>{titulo}</h1>

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