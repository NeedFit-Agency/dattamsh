// Example of how to use learning components with isLastLesson prop

import React from 'react';
import WhoAmI from '../WhoAmI/WhoAmI';
import BucketMatch from '../BucketMatch/BucketMatch';
import { DragDrop } from '../DragDrop/DragDrop';
import SequenceMatcher from '../SequenceMatcher/SequenceMatcher';

// Example usage showing how to set isLastLesson prop
export const LastLessonExample = () => {
  const handleComplete = () => {
    console.log('Last lesson completed - should navigate to chapters or main menu');
  };

  return (
    <div>
      {/* WhoAmI component as last lesson */}
      <WhoAmI
        riddleText="I am round and roll on roads, helping cars move smoothly. Who am I?"
        options={[
          { id: 'wheel', text: 'Wheel', icon: '🛞' },
          { id: 'car', text: 'Car', icon: '🚗' },
          { id: 'road', text: 'Road', icon: '🛣️' }
        ]}
        correctAnswerId="wheel"
        onComplete={handleComplete}
        isLastLesson={true} // This will show "Finish" button
      />

      {/* BucketMatch component as last lesson */}
      <BucketMatch
        title="Sort the Fruits - Final Challenge!"
        items={[
          { id: 'apple', type: 'red', text: 'Apple' },
          { id: 'banana', type: 'yellow', text: 'Banana' }
        ]}
        buckets={[
          { id: 'red-bucket', type: 'red', title: 'Red Fruits' },
          { id: 'yellow-bucket', type: 'yellow', title: 'Yellow Fruits' }
        ]}
        onComplete={handleComplete}
        isLastLesson={true} // This will show "Finish" button
      />

      {/* DragDrop component as last lesson */}
      <DragDrop
        title="Final Sorting Challenge"
        instruction="Sort all items correctly to complete the chapter!"
        items={[
          { id: 'item1', text: 'Apple', type: 'fruit' },
          { id: 'item2', text: 'Car', type: 'vehicle' }
        ]}
        targets={[
          { id: 'fruits', title: 'Fruits', type: 'fruit' },
          { id: 'vehicles', title: 'Vehicles', type: 'vehicle' }
        ]}
        onComplete={handleComplete}
        isLastLesson={true} // This will show "Finish" button
      />

      {/* SequenceMatcher component as last lesson */}
      <SequenceMatcher
        title="Arrange the Final Steps!"
        items={[
          { id: 'step1', content: 'First Step' },
          { id: 'step2', content: 'Second Step' },
          { id: 'step3', content: 'Final Step' }
        ]}
        correctOrder={['step1', 'step2', 'step3']}
        onComplete={handleComplete}
        isLastLesson={true} // This will show "Finish" button
      />
    </div>
  );
};

// Example of regular lessons (not last lesson)
export const RegularLessonExample = () => {
  const handleComplete = () => {
    console.log('Regular lesson completed - should navigate to next lesson');
  };

  return (
    <WhoAmI
      riddleText="I am used to write and draw. Who am I?"
      options={[
        { id: 'pencil', text: 'Pencil', icon: '✏️' },
        { id: 'book', text: 'Book', icon: '📚' },
        { id: 'paper', text: 'Paper', icon: '📝' }
      ]}
      correctAnswerId="pencil"
      onComplete={handleComplete}
      // isLastLesson is false by default, so this will show "Next" button
    />
  );
};

export default LastLessonExample;
