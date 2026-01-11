/**
 * WebGL Background Component (Placeholder)
 *
 * Note: The full WebGL implementation has been temporarily disabled
 * due to TypeScript build issues with @react-three/fiber and React 19.
 *
 * The original implementation is available in WebGLBackground.tsx.disabled
 *
 * To re-enable:
 * 1. Wait for @react-three/fiber to support React 19
 * 2. OR downgrade to React 18
 * 3. OR add proper type extensions in tsconfig
 */

export interface WebGLBackgroundProps {
  intensity?: 'subtle' | 'medium' | 'high';
  showShapes?: boolean;
}

export default function WebGLBackground(_props: WebGLBackgroundProps) {
  // Placeholder - return null for now
  return null;
}
