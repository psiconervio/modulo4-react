import { motion } from 'framer-motion'
import { slideInFromSide } from "../util/animation";
import batman from "../assets/batman.png";

const EjemploMotion = () => {
  return (
    <div className="flex justify-center mt-40 md:mt-20 ">
      <motion.div
        variants={slideInFromSide("left", 1.5)}
        initial="initial"
        animate={["animate"]}
        className='p-10 sm:p-10 md:p-15 lg:p-30 xl:p-36'
      >
        <img
          src={batman}
          className='w-46'
        />
      </motion.div>
    </div>
  )
}

export default EjemploMotion
