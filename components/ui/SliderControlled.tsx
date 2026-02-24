"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"

export function SliderControlled() {
  const [value, setValue] = React.useState([0.3, 0.7])

  return (
    <Slider
      value={value}
      onValueChange={(val) => setValue(val as number[])}
      min={0}
      max={1}
      step={0.0000000001}
    />
  )
}