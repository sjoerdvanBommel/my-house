'use client'

import { Three } from '@/helpers/components/Three'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'

export const Common = ({ color }: any) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight />
    <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
    <pointLight position={[-10, -10, -10]} color='blue' decay={0.2} />
    <PerspectiveCamera makeDefault fov={40} position={[-20, 12, 1]} />
  </Suspense>
)

const View = forwardRef<any, any>(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
