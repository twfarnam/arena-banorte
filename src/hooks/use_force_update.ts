import React from 'react'

export default function useForceUpdate() {
  const [, updateState] = React.useState<{}>()
  return () => updateState({})
}
