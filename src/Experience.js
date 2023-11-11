import { useRef, useEffect, useMemo } from "react"
import { OrbitControls , shaderMaterial, Center} from '@react-three/drei'
import { useAnimations,useGLTF, Clone } from "@react-three/drei"
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

import { useFrame, extend } from "@react-three/fiber";
import * as THREE from 'three';


export default function Experience(props){

    let raph = useRef()

    let ref = useRef()
   

 

  const model = useGLTF('raph3.glb')


  const group = useRef();
  const { nodes, materials, animations } = useGLTF("raph3.glb");
  

const animations1 = useAnimations(animations, model.scene)



useEffect(() => {
    let sparklyAction

      console.log(raph)
     sparklyAction = animations1.actions['metarigAction'];
    sparklyAction.reset().fadeIn(0.5).play();
    // sparklyAction.setEffectiveWeight(1);
   
  

},[]);

    return(

        <>
        
    <OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>


      <primitive ref={raph} object={ model.scene } 
         scale={ 1 }   
          />



   
        </>

        

    )
}



