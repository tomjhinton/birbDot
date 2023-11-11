import { useRef, useEffect, useMemo, useState } from "react"
import { OrbitControls , shaderMaterial, Center, Html} from '@react-three/drei'
import { useAnimations,useGLTF, Clone } from "@react-three/drei"
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

import { useFrame, extend } from "@react-three/fiber";
import * as THREE from 'three';
import Dot from './Dot.js'


export default function Experience(props){

    let raph = useRef()

    let ref = useRef()
   
    let dotRef = useRef()
 

  const model = useGLTF('raph3.glb')


  const group = useRef();
  const { nodes, materials, animations } = useGLTF("raph3.glb");
  

const animations1 = useAnimations(animations, model.scene)

const [slide, setSlide] = useState(0);


const handleChange = e => {
    console.log(e.target.value)
    setSlide(e.target.value)
  }


useEffect(() => {
    let sparklyAction

      console.log(raph)
     sparklyAction = animations1.actions['metarigAction'];
    sparklyAction.reset().fadeIn(0.5).play();

    
  

},[]);

    return(

        <>

<EffectComposer >
    
    <Dot 
    ref={ dotRef }
   slide
    />

</EffectComposer>

    <Html
     position={[0, -2, 0]}>
    <input type="range" id="dots" name="dots" min="0" max="1"  step=".02" onChange={handleChange}/>
    </Html>

   
        
    <OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>


      <primitive ref={raph} object={ model.scene } 
         scale={ 1 }   
          />



   
        </>

        

    )
}



