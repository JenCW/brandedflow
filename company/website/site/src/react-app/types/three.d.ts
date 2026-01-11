import { extend } from '@react-three/fiber'
import * as THREE from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any
      mesh: any
      boxGeometry: any
      sphereGeometry: any
      torusGeometry: any
      meshBasicMaterial: any
      ambientLight: any
    }
  }
}

export {}
