import { forwardRef } from "react"
import DotEffect from "./DotEffect"


export default forwardRef(function Dot(props, ref){
    const effect = new DotEffect(props)
    
    return <primitive  object={ effect } />
})

