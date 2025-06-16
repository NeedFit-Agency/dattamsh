import { BucketMatchSlide } from '../standardsData';

export const colorMatchingLesson: BucketMatchSlide = {
  type: 'bucket-match',
  format: 'bucket-match',
  title: 'Match the Colors',
  instruction: 'Drag each fruit to its matching color bucket!',
  items: [
    {
      id: 'apple',
      text: 'Apple',
      type: 'red',
      imageUrl: '/images/fruits/apple.svg',
      color: '#ff5252'
    },
    {
      id: 'banana',
      text: 'Banana',
      type: 'yellow',
      imageUrl: '/images/fruits/banana.svg',
      color: '#ffeb3b'
    },
    {
      id: 'orange',
      text: 'Orange',
      type: 'orange',
      imageUrl: '/images/fruits/orange.svg',
      color: '#ff9800'
    },
    {
      id: 'grapes',
      text: 'Grapes',
      type: 'purple',
      imageUrl: '/images/fruits/grapes.svg',
      color: '#9c27b0'
    }
  ],
  buckets: [
    {
      id: 'red-bucket',
      title: 'Red',
      type: 'red',
      color: '#ff5252'
    },
    {
      id: 'yellow-bucket',
      title: 'Yellow',
      type: 'yellow',
      color: '#ffeb3b'
    },
    {
      id: 'orange-bucket',
      title: 'Orange',
      type: 'orange',
      color: '#ff9800'
    },
    {
      id: 'purple-bucket',
      title: 'Purple',
      type: 'purple',
      color: '#9c27b0'
    }
  ],
  audioSrc: '/audio/match-colors.mp3',
  speakText: 'Drag each fruit to its matching color bucket!'
};