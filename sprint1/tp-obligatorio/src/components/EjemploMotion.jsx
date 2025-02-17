import React from 'react'
import { motion } from 'framer-motion'
import { slideInFromSide } from "../util/animation";

const EjemploMotion = () => {
  return (
    <div className="flex justify-center mt-36 md:mt-20">
      <motion.div
        variants={slideInFromSide("left", 1.5)}
        initial="initial"
        animate={["animate"]}
        className='p-10 sm:p-10 md:p-15 lg:p-30 xl:p-36'
      >
        <img
          src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sol_de_Mayo_Bandera_Argentina.png/800px-Sol_de_Mayo_Bandera_Argentina.png'}
          className='w-46'
        />
      </motion.div>
    </div>
  )
}

export default EjemploMotion
