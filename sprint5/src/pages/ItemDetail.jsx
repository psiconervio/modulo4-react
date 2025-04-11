import React from 'react'
import { useContext } from 'react'

import { SuperContext } from '../context/SuperContext'

 const ItemDetail = () => {
  const {getItem} = useContext(SuperContext)
  const {id} = useParams()
  const {loading,error,items} = useContext(SuperContext)
  return (
    <div>ItemDetail</div>
  )
}

export default ItemDetail