
import React from 'react'
import StepByStep  from '@/components/learning/StepbyStep/page';
const seedPlantingSteps = [
    {
      id: 'step1',
      number: 1,
      title: 'Fill the Pot',
      instruction: 'Fill your pot with potting soil, leaving about an inch of space at the top.',
      visualContent: '🪴 (Visual for Filling Pot with Soil)'
    },
    {
      id: 'step2',
      number: 2,
      title: 'Make a Hole',
      instruction: 'Gently poke a small hole in the center of the soil with your finger. Not too deep! Just enough for the seed.',
      visualContent: '👇 + 🌱 (Visual for Making a Hole)'
    },
    // Add more steps...
  ];
  
const page = () => {
    return (
        <StepByStep
          title="Step-by-Step: Planting a Seed"
          steps={seedPlantingSteps}
          progress={40}
         
        />
      );
}

export default page