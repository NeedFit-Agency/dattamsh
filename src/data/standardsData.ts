export type FormatType = 
  | 'application'
  | 'type' 
  | 'code'
  | 'component'
  | 'drag-drop'
  | 'history'
  | 'quiz'
  | 'step-by-step'
  | 'video'
  | 'text'
  | 'types'; // Added 'types' format

export interface BaseContentProps {
  type: string;
  title: string;
  format: FormatType;
  audioSrc?: string;
  speakText?: string;
}

export interface LearningSlide extends BaseContentProps {
  type: 'learn';
  description: string | string[];
  content?: string[]; // Added content property to fix the TypeScript error
  imageUrl?: string;
  exampleImages?: { src: string; alt: string; caption?: string }[]; // Added optional caption property
  // Format will typically be 'text', 'video', etc.
}

export interface DraggableItemData {
  id: string;
  text: string;
  type: string;
  imageUrl?: string;
}

export interface DropTargetData {
  id: string;      // Unique identifier for the drop target
  title: string;   // Display title for the drop target
  type: string;    // Type/category for matching logic
}

export interface DragDropSlide extends BaseContentProps {
  type: 'drag-drop';
  instruction: string;
  items: DraggableItemData[];
  targets: DropTargetData[];
  // Format will typically be 'drag-drop'
}

export interface QuizSlide extends BaseContentProps {
  type: 'learn';
  description: string | string[];
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  explanation?: string;
  imageUrl?: string;
}


export interface HistorySlide extends BaseContentProps {
  type: 'learn';
  format: 'history';
  title: string;
  items: {
    id: string;
    title: string;
    description: string;
    visualIcon: string;
    position: 'left' | 'right';
  }[];
  imageUrl?: string;
  audioSrc?: string;
  speakText?: string;
}

export interface StepByStepSlide extends BaseContentProps {
  type: 'learn';
  description: string;
  steps: {
    id: string;
    number: number;
    instruction: string;
    visualContent?: string;
  }[];
  // Format will be 'step-by-step'
}

export interface ApplicationSlide extends BaseContentProps {
  type: 'learn';
  description: string;
  examples: {
    id: string;
    scenario: string;
    explanation: string;
    visualIcon?: string;
  }[];
  // Format will be 'application'
}
export interface TypesSlide extends BaseContentProps {
  type: 'learn';
  description: string;
  types: {
    id: string;
    name: string;
    description: string;
    icon?: string;
    imageUrl?: string;
  }[];
  // Format will be 'types'
}


export type LessonContent = LearningSlide | DragDropSlide | QuizSlide | TypesSlide | HistorySlide | StepByStepSlide | ApplicationSlide;
  
export interface Chapter {
  id: number;
  title: string;
  lessonContent: LessonContent[];
}

export interface Standard {
  [key: string]: Chapter[];
}

export const standards: Standard = {
  "1": [
    {
      id: 1,
      title: "Introduction to Nature and Man-made",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Introduction to Nature and Man-made',
          description: [
            "Hi there! I'm Zippy! We see so many things around us every day.",
            'Some things, like trees and birds, are found in nature.',
            'Other things, like chairs and cars, are made by people.',
            "Let's learn the difference together!",
          ],
          imageUrl: '/images/intro-scene.png',
          audioSrc: '/audio/01_intro.mp3',
          speakText:
            "Hi there! I'm Zippy! We see so many things around us every day. Some things, like trees and birds, are found in nature. Other things, like chairs and cars, are made by people. Let's learn the difference together!",
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Natural Things',
          description: [
            "Natural things are things we find in nature. People didn't make them. Look at these examples!",
          ],
          exampleImages: [
            { src: '/images/sun.png', alt: 'The bright Sun' },
            { src: '/images/water.png', alt: 'Flowing Water' },
            { src: '/images/tree.png', alt: 'A tall Tree' },
            { src: '/images/bird.png', alt: 'A flying Bird' },
          ],
          audioSrc: '/audio/02_natural.mp3',
          speakText:
            "Natural things are things we find in nature. People didn't make them. Look at these examples! The bright Sun, flowing Water, a tall Tree, and a flying Bird.",
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Man-made Things',
          description: [
            'Man-made things are things that people build or create. Can you spot some things people made here?',
          ],
          exampleImages: [
            { src: '/images/school-bus.png', alt: 'A yellow School Bus' },
            { src: '/images/cycle.png', alt: 'A shiny Cycle' },
            { src: '/images/chair.png', alt: 'A comfy Chair' },
            { src: '/images/blackboard.png', alt: 'A classroom Blackboard' },
          ],
          audioSrc: '/audio/03_manmade.mp3',
          speakText:
            'Man-made things are things that people build or create. Can you spot some things people made here? A yellow School Bus, a shiny Cycle, a comfy Chair, and a classroom Blackboard.',
        },        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Sort Them Out!',
          instruction:
            'Hoot hoot! Help me sort these pictures. Drag them into the correct box: "Natural Things" or "Man-made Things".',
          items: [
            { id: 'dnd-item-1', text: 'Tree', type: 'natural', imageUrl: '/images/tree.png' },
            { id: 'dnd-item-2', text: 'Chair', type: 'man-made', imageUrl: '/images/chair.png' },
            { id: 'dnd-item-3', text: 'Bird', type: 'natural', imageUrl: '/images/bird.png' },
            { id: 'dnd-item-4', text: 'Cycle', type: 'man-made', imageUrl: '/images/cycle.png' },
            { id: 'dnd-item-5', text: 'Sun', type: 'natural', imageUrl: '/images/sun.png' },
            { id: 'dnd-item-6', text: 'Blackboard', type: 'man-made', imageUrl: '/images/blackboard.png' },
          ],
          targets: [
            { id: 'naturalTarget', title: 'Natural Things', type: 'natural' },
            { id: 'manMadeTarget', title: 'Man-made Things', type: 'man-made' },
          ],
          audioSrc: '/audio/04_dnd_instruction.mp3',
          speakText:
            'Hoot hoot! Help me sort these pictures. Drag them into the correct box: Natural Things or Man-made Things.',
        },
      ],
    },{
      id: 2,
      title: "All About Computers",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Introduction to Computers',
          description: [
            "Hi there! I'm Zippy! Today we're going to learn about computers!",
            "A computer is a machine. It makes our work easy. A computer is called a supermachine because it helps us do many things.",
            "Let's learn what computers are and how they help us!",
          ],
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/computer_intro.mp3',
          speakText: "Hi there! I'm Zippy! Today we're going to learn about computers! A computer is a machine. It makes our work easy. A computer is called a supermachine because it helps us do many things. Let's learn what computers are and how they help us!"
        },
        {
          type: 'learn',
          format: 'text',
          title: 'What Can Computers Do?',
          description: [
            "Computers help us do many things:",
            "1. Type or write letters, stories, and poems",
            "2. Draw colorful and beautiful paintings",
            "3. Play fun games",
            "4. Talk to family and friends who are far away",
            "5. Listen to music and watch videos",
          ],
          exampleImages: [
            { src: '/images/tools.png', alt: 'Using a computer to write' },
            { src: '/images/school-bus.png', alt: 'Using a computer to draw' },
            { src: '/images/mascot.png', alt: 'Playing games on a computer' },
            { src: '/images/chair.png', alt: 'Talking with family on a computer' },
          ],
          audioSrc: '/audio/computer_uses.mp3',
          speakText: "Computers help us do many things: Type or write letters, stories, and poems. Draw colorful and beautiful paintings. Play fun games. Talk to family and friends who are far away. Listen to music and watch videos."
        },        {
          type: 'learn',
          format: 'type',
          title: 'Parts of a Computer',
          description: [
            "Just like our body has different parts that help us do different things, a computer also has different parts!",
            "Let's learn about the main parts of a computer:",
            "1. Monitor: Like a TV screen that shows what the computer is doing",
            "2. Keyboard: Has letters, numbers, and other buttons to type with",
            "3. Mouse: Helps move the pointer on the screen and select things",
            "4. CPU (Central Processing Unit): The brain of the computer inside the CPU cabinet",
            "5. Speakers: Where sound comes from",
          ],
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/computer_parts.mp3',
          speakText: "Just like our body has different parts that help us do different things, a computer also has different parts! Let's learn about the main parts of a computer: Monitor, Keyboard, Mouse, CPU, and Speakers."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Match Computer Parts',
          instruction:
            'Drag each computer part to the correct description box!',
          items: [
            { id: 'dnd-item-1', text: 'Monitor', type: 'natural', imageUrl: '/images/sun.png' },
            { id: 'dnd-item-2', text: 'Keyboard', type: 'man-made', imageUrl: '/images/chair.png' },
            { id: 'dnd-item-3', text: 'Mouse', type: 'natural', imageUrl: '/images/bird.png' },
            { id: 'dnd-item-4', text: 'CPU', type: 'man-made', imageUrl: '/images/cycle.png' },
            { id: 'dnd-item-5', text: 'Speakers', type: 'natural', imageUrl: '/images/tree.png' },
          ],
          targets: [
            { id: 'naturalTarget', title: 'Input Devices', type: 'natural' },
            { id: 'manMadeTarget', title: 'Output Devices', type: 'man-made' },
          ],
          audioSrc: '/audio/computer_activity.mp3',
          speakText:
            'Drag each computer part to the correct description box! Is it an input device or an output device?',
        },        {
          type: 'learn',
          format: 'history',
          title: 'Story: The Magic of Computers',
          description: [
            "Raju was a young boy. One day, he was going home from school. On the way, he saw his father working on a computer.",
            "Raju asked, 'Dad, what are you doing?'",
            "His father replied, 'I'm writing a letter to your uncle using this computer.'",
            "Raju was amazed! He asked his teacher the next day about computers. His teacher showed the class how computers work.",
            "Raju learned that computers can help people do many things quickly and easily. He was very excited to learn more about computers!"
          ],
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/computer_story.mp3',
          speakText: "Raju was a young boy. One day, he was going home from school. On the way, he saw his father working on a computer. Raju asked, 'Dad, what are you doing?' His father replied, 'I'm writing a letter to your uncle using this computer.' Raju was amazed! He asked his teacher the next day about computers. His teacher showed the class how computers work. Raju learned that computers can help people do many things quickly and easily. He was very excited to learn more about computers!"
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Did You Know?',
          description: [
            "The first electronic computer, ENIAC, weighed more than 27 tons and took up the size of a small house!",
            "Modern computers can be as small as your pocket!",
            "Computers can do millions of calculations in just one second!"
          ],
          audioSrc: '/audio/computer_facts.mp3',
          speakText: "Did you know? The first electronic computer, ENIAC, weighed more than 27 tons and took up the size of a small house! Modern computers can be as small as your pocket! Computers can do millions of calculations in just one second!"
        },        {
          type: 'learn',
          format: 'text',
          title: 'Points to Remember',
          description: [
            "1. A computer is a machine that makes our work easy.",
            "2. A computer is called a supermachine.",
            "3. Computers help us write, draw, play games, talk to people, and listen to music.",
            "4. The main parts of a computer are the monitor, keyboard, mouse, CPU, and speakers.",
            "5. The monitor shows what the computer is doing.",
            "6. The keyboard helps us type letters and numbers.",
            "7. The mouse helps us point and click.",
            "8. The CPU is the brain of the computer."
          ],
          audioSrc: '/audio/computer_summary.mp3',
          speakText: "Points to remember: A computer is a machine that makes our work easy. A computer is called a supermachine. Computers help us write, draw, play games, talk to people, and listen to music. The main parts of a computer are the monitor, keyboard, mouse, CPU, and speakers."
        },
      ]
    },    {
      id: 3,
      title: "Computer Care and Safety",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Taking Care of Computers',
          description: [
            "Hi there! I'm Zippy! Just like you take care of your toys and games, it's very important to take care of computers too!",
            "Today, we will learn how to keep our computers safe and make them last longer.",
            "Let's explore how to take good care of computers and ourselves when using them!"
          ],
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/computer_care_intro.mp3',
          speakText: "Hi there! I'm Zippy! Just like you take care of your toys and games, it's very important to take care of computers too! Today, we will learn how to keep our computers safe and make them last longer. Let's explore how to take good care of computers and ourselves when using them!"
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Taking Care of Yourself While Using Computers',
          description: [
            "When using computers, it's important to take care of your body too! Here's how:",
            "1. Sit up straight with your back against the chair",
            "2. Keep the screen at eye level - not too high or too low",
            "3. Take a break every 30 minutes and look at something far away",
            "4. Stretch your arms, legs, and neck during breaks",
            "5. Make sure there's enough light in the room",
            "6. Don't sit too close to the screen"
          ],
          exampleImages: [
            { src: '/images/chair.png', alt: 'Proper sitting posture' },
            { src: '/images/mascot.png', alt: 'Taking a break' },
            { src: '/images/sun.png', alt: 'Having proper lighting' }
          ],
          audioSrc: '/audio/self_care_computers.mp3',
          speakText: "When using computers, it's important to take care of your body too! Here's how: Sit up straight with your back against the chair. Keep the screen at eye level - not too high or too low. Take a break every 30 minutes and look at something far away. Stretch your arms, legs, and neck during breaks. Make sure there's enough light in the room. Don't sit too close to the screen."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'How to Keep Your Computer Safe',
          description: [
            "Let's learn how to take care of computers:",
            "1. Keep it Clean: Use a soft cloth to gently clean the screen and keyboard",
            "2. No Food or Drinks: Keep food and drinks away from the computer",
            "3. Gentle Hands: Press keys gently and handle the mouse carefully",
            "4. Cool Place: Keep computers in cool, dust-free places",
            "5. Proper Shutdown: Always turn off the computer properly when you're done"
          ],
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/computer_care_tips.mp3',
          speakText: "Let's learn how to take care of computers: Keep it Clean: Use a soft cloth to gently clean the screen and keyboard. No Food or Drinks: Keep food and drinks away from the computer. Gentle Hands: Press keys gently and handle the mouse carefully. Cool Place: Keep computers in cool, dust-free places. Proper Shutdown: Always turn off the computer properly when you're done."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Good or Bad Computer Habits',
          instruction:
            'Sort these habits into "Good Habits" or "Bad Habits" for computer care!',
          items: [
            { id: 'dnd-item-1', text: 'Eating chips while using the computer', type: 'man-made', imageUrl: '/images/chair.png' },
            { id: 'dnd-item-2', text: 'Wiping the screen with a soft cloth', type: 'natural', imageUrl: '/images/water.png' },
            { id: 'dnd-item-3', text: 'Shutting down properly', type: 'natural', imageUrl: '/images/sun.png' },
            { id: 'dnd-item-4', text: 'Banging on the keyboard when angry', type: 'man-made', imageUrl: '/images/cycle.png' },
            { id: 'dnd-item-5', text: 'Taking breaks during computer use', type: 'natural', imageUrl: '/images/tree.png' },
            { id: 'dnd-item-6', text: 'Putting drinks next to the computer', type: 'man-made', imageUrl: '/images/blackboard.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Good Habits', type: 'natural' },
            { id: 'manMadeTarget', title: 'Bad Habits', type: 'man-made' }
          ],
          audioSrc: '/audio/computer_habits.mp3',
          speakText: "Let's sort these habits into good habits and bad habits for computer care! Drag each item to the correct box."
        },        {
          type: 'learn',
          format: 'step-by-step',
          title: 'How to Shut Down a Computer Properly',
          description: [
            "One of the most important ways to take care of your computer is to shut it down properly. Here's how:",
            "1. Save your work first",
            "2. Close all open programs",
            "3. Click on the Start button at the bottom left of the screen",
            "4. Click on Shut Down",
            "5. Wait for the computer to turn off completely before switching off the power"
          ],
          exampleImages: [
            { src: '/images/mascot.png', alt: 'Save your work' },
            { src: '/images/chair.png', alt: 'Click on Start button' },
            { src: '/images/sun.png', alt: 'Click on Shut Down' }
          ],
          audioSrc: '/audio/shutdown_computer.mp3',
          speakText: "One of the most important ways to take care of your computer is to shut it down properly. Here's how: Save your work first. Close all open programs. Click on the Start button at the bottom left of the screen. Click on Shut Down. Wait for the computer to turn off completely before switching off the power."
        },        {
          type: 'learn',
          format: 'history',
          title: "Story: Leo's Computer Lesson",
          description: [
            "Leo loved playing games on his computer. One day, the computer stopped working!",
            "Leo was very upset and called his dad for help.",
            "Dad explained that computers need proper care. Leo had been shutting down his computer incorrectly by just pressing the power button.",
            "'Computers are like friends,' said Dad. 'You have to say goodbye properly.'",
            "Dad showed Leo how to shut down the computer correctly by saving his work, closing all programs, and clicking on Shut Down.",
            "Leo learned his lesson and always took good care of his computer after that. His computer worked well for a very long time!",
            "Remember: Always shut down your computer properly!"
          ],
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/leo_story.mp3',
          speakText: "Leo loved playing games on his computer. One day, the computer stopped working! Leo was very upset and called his dad for help. Dad explained that computers need proper care. Leo had been shutting down his computer incorrectly by just pressing the power button. 'Computers are like friends,' said Dad. 'You have to say goodbye properly.' Dad showed Leo how to shut down the computer correctly by saving his work, closing all programs, and clicking on Shut Down. Leo learned his lesson and always took good care of his computer after that. His computer worked well for a very long time! Remember: Always shut down your computer properly!"
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Did You Know?',
          description: [
            "If you try to shut down your computer without closing your programs, the computer will ask if you still want to shut down.",
            "Shutting down your computer properly can make it last longer!",
            "Taking short breaks when using the computer is good for your eyes and body!"
          ],
          audioSrc: '/audio/computer_care_facts.mp3',
          speakText: "Did you know? If you try to shut down your computer without closing your programs, the computer will ask if you still want to shut down. Shutting down your computer properly can make it last longer! Taking short breaks when using the computer is good for your eyes and body!"
        },        {
          type: 'learn',
          format: 'text',
          title: 'Points to Remember',
          description: [
            "1. Sit up straight when using a computer.",
            "2. Take breaks every 30 minutes.",
            "3. Keep food and drinks away from computers.",
            "4. Clean the screen and keyboard with a soft cloth.",
            "5. Always shut down your computer properly.",
            "6. Use gentle hands when typing and using the mouse.",
            "7. Keep computers in cool, dust-free places."
          ],
          audioSrc: '/audio/care_summary.mp3',
          speakText: "Points to remember: Sit up straight when using a computer. Take breaks every 30 minutes. Keep food and drinks away from computers. Clean the screen and keyboard with a soft cloth. Always shut down your computer properly. Use gentle hands when typing and using the mouse. Keep computers in cool, dust-free places."
        },
      ]
    },    {
      id: 4,
      title: "Keyboard and Mouse Fun",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Introduction to Keyboard and Mouse',
          description: [
            "Hi there! I'm Zippy! Today we're going to learn about two very important parts of a computer - the keyboard and mouse!",
            "These parts help us talk to the computer and tell it what to do.",
            "Let's have fun learning about the keyboard and mouse!",
          ],
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/keyboard_intro.mp3',
          speakText: "Hi there! I'm Zippy! Today we're going to learn about two very important parts of a computer - the keyboard and mouse! These parts help us talk to the computer and tell it what to do. Let's have fun learning about the keyboard and mouse!"
        },
        {
          type: 'learn',
          format: 'text',
          title: 'All About the Keyboard',
          description: [
            "A keyboard is a board with many buttons called keys.",
            "We press these keys to type letters, numbers, and symbols on the computer.",
            "When we press keys on the keyboard, the letters show up on the monitor!",
            "The keyboard helps us write words, sentences, stories, and even do math on the computer."
          ],
          exampleImages: [
            { src: '/images/tools.png', alt: 'A computer keyboard' },
            { src: '/images/mascot.png', alt: 'Typing on a keyboard' }
          ],
          audioSrc: '/audio/keyboard_basics.mp3',
          speakText: "A keyboard is a board with many buttons called keys. We press these keys to type letters, numbers, and symbols on the computer. When we press keys on the keyboard, the letters show up on the monitor! The keyboard helps us write words, sentences, stories, and even do math on the computer."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Special Keys on the Keyboard',
          description: [
            "The keyboard has many special keys that do different things:",
            "1. Alphabet Keys: These keys have letters A to Z for typing words",
            "2. Number Keys: These have numbers 0-9 for typing numbers",
            "3. Space Bar: The longest key at the bottom that puts a space between words",
            "4. Enter Key: This key moves to a new line, like when you finish a sentence",
            "5. Backspace Key: This key erases mistakes when you type",
            "6. Arrow Keys: These keys help move around in your text",
            "7. Caps Lock Key: This key makes all letters CAPITAL when turned on"
          ],
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/special_keys.mp3',
          speakText: "The keyboard has many special keys that do different things: Alphabet Keys have letters A to Z for typing words. Number Keys have numbers 0-9 for typing numbers. Space Bar is the longest key at the bottom that puts a space between words. Enter Key moves to a new line, like when you finish a sentence. Backspace Key erases mistakes when you type. Arrow Keys help move around in your text. Caps Lock Key makes all letters CAPITAL when turned on."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'All About the Mouse',
          description: [
            "A mouse is a small device that helps us point at things on the computer screen.",
            "When we move the mouse on the table, a pointer (small arrow) moves on the screen.",
            "The mouse has buttons that we can click to select things or open programs.",
            "Using a mouse is like pointing at something with your finger to show what you want!"
          ],
          exampleImages: [
            { src: '/images/mascot.png', alt: 'A computer mouse' },
            { src: '/images/tree.png', alt: 'Using a mouse' }
          ],
          audioSrc: '/audio/mouse_basics.mp3',
          speakText: "A mouse is a small device that helps us point at things on the computer screen. When we move the mouse on the table, a pointer (small arrow) moves on the screen. The mouse has buttons that we can click to select things or open programs. Using a mouse is like pointing at something with your finger to show what you want!"
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Parts of a Mouse',
          description: [
            "A mouse has different parts:",
            "1. Left Button: The main button used for clicking on things",
            "2. Right Button: Used for special menus and options",
            "3. Scroll Wheel: The wheel in the middle that helps scroll up and down on pages",
            "4. Mouse Body: The part you hold in your hand",
            "5. Mouse Pointer: The arrow on the screen that moves when you move the mouse"
          ],
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/mouse_parts.mp3',
          speakText: "A mouse has different parts: Left Button is the main button used for clicking on things. Right Button is used for special menus and options. Scroll Wheel is the wheel in the middle that helps scroll up and down on pages. Mouse Body is the part you hold in your hand. Mouse Pointer is the arrow on the screen that moves when you move the mouse."
        },        {
          type: 'learn',
          format: 'step-by-step',
          title: 'How to Hold a Mouse',
          description: [
            "Let's learn the correct way to hold a mouse:",
            "1. Place the mouse on a flat surface like a table or mouse pad",
            "2. Put your hand gently over the mouse with your palm covering the back part",
            "3. Place your index finger on the left button",
            "4. Place your middle finger on the right button",
            "5. Rest your thumb on the left side of the mouse",
            "6. The other two fingers should rest lightly on the right side",
            "7. Move the mouse gently with your whole hand, not just your fingers"
          ],
          exampleImages: [
            { src: '/images/mascot.png', alt: 'Proper mouse grip' },
            { src: '/images/chair.png', alt: 'Hand position on mouse' }
          ],
          audioSrc: '/audio/holding_mouse.mp3',
          speakText: "Let's learn the correct way to hold a mouse: Place the mouse on a flat surface like a table or mouse pad. Put your hand gently over the mouse with your palm covering the back part. Place your index finger on the left button. Place your middle finger on the right button. Rest your thumb on the left side of the mouse. The other two fingers should rest lightly on the right side. Move the mouse gently with your whole hand, not just your fingers."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Match the Computer Parts',
          instruction:
            'Drag each item to the correct category: Keyboard Parts or Mouse Parts',
          items: [
            { id: 'dnd-item-1', text: 'Space Bar', type: 'natural', imageUrl: '/images/sun.png' },
            { id: 'dnd-item-2', text: 'Left Click Button', type: 'man-made', imageUrl: '/images/chair.png' },
            { id: 'dnd-item-3', text: 'Enter Key', type: 'natural', imageUrl: '/images/tree.png' },
            { id: 'dnd-item-4', text: 'Scroll Wheel', type: 'man-made', imageUrl: '/images/cycle.png' },
            { id: 'dnd-item-5', text: 'Arrow Keys', type: 'natural', imageUrl: '/images/bird.png' },
            { id: 'dnd-item-6', text: 'Right Click Button', type: 'man-made', imageUrl: '/images/blackboard.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Keyboard Parts', type: 'natural' },
            { id: 'manMadeTarget', title: 'Mouse Parts', type: 'man-made' }
          ],
          audioSrc: '/audio/match_parts.mp3',
          speakText: 'Drag each item to the correct category! Is it a part of the keyboard or a part of the mouse?'
        },        {
          type: 'learn',
          format: 'history',
          title: 'Story: The Friendly Keyboard and Mouse',
          description: [
            "Once upon a time, there was a friendly Keyboard named Kaya and a helpful Mouse named Max.",
            "They both lived inside a computer and were the best of friends. Their job was to help children use the computer.",
            "Kaya the Keyboard would help children type letters and words to write stories and do homework.",
            "Max the Mouse would help children point, click, and move things around on the screen.",
            "Together, they made using the computer fun and easy! Whenever children needed help, Kaya and Max were ready to work.",
            "Kaya would say, 'Just press my keys gently to type.' And Max would add, 'Move me smoothly and click my buttons to select things!'",
            "The children loved using Kaya and Max to play games, learn new things, and create beautiful pictures on the computer."
          ],
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/keyboard_mouse_story.mp3',
          speakText: "Once upon a time, there was a friendly Keyboard named Kaya and a helpful Mouse named Max. They both lived inside a computer and were the best of friends. Their job was to help children use the computer. Kaya the Keyboard would help children type letters and words to write stories and do homework. Max the Mouse would help children point, click, and move things around on the screen. Together, they made using the computer fun and easy! Whenever children needed help, Kaya and Max were ready to work. Kaya would say, 'Just press my keys gently to type.' And Max would add, 'Move me smoothly and click my buttons to select things!' The children loved using Kaya and Max to play games, learn new things, and create beautiful pictures on the computer."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Did You Know?',
          description: [
            "A standard keyboard has 104 keys!",
            "The arrangement of keys on a keyboard is called QWERTY, named after the first six letters on the top row.",
            "The computer mouse was invented by Douglas Engelbart in 1964.",
            "The mouse got its name because the cord coming out looked like a mouse's tail!",
            "On laptops, instead of a mouse, there's often a touchpad that works the same way."
          ],
          audioSrc: '/audio/keyboard_mouse_facts.mp3',
          speakText: "Did you know? A standard keyboard has 104 keys! The arrangement of keys on a keyboard is called QWERTY, named after the first six letters on the top row. The computer mouse was invented by Douglas Engelbart in 1964. The mouse got its name because the cord coming out looked like a mouse's tail! On laptops, instead of a mouse, there's often a touchpad that works the same way."
        },        {
          type: 'learn',
          format: 'text',
          title: 'Points to Remember',
          description: [
            "1. The keyboard and mouse help us communicate with the computer.",
            "2. The keyboard has alphabet keys, number keys, and special keys like Space Bar and Enter.",
            "3. We use the keyboard to type letters, words, numbers, and symbols.",
            "4. The mouse helps us point to and select things on the screen.",
            "5. A mouse has left and right buttons and usually a scroll wheel in the middle.",
            "6. When we move the mouse on the table, the pointer moves on the screen.",
            "7. We should hold the mouse gently and press keyboard keys softly."
          ],
          audioSrc: '/audio/keyboard_mouse_summary.mp3',
          speakText: "Points to remember: The keyboard and mouse help us communicate with the computer. The keyboard has alphabet keys, number keys, and special keys like Space Bar and Enter. We use the keyboard to type letters, words, numbers, and symbols. The mouse helps us point to and select things on the screen. A mouse has left and right buttons and usually a scroll wheel in the middle. When we move the mouse on the table, the pointer moves on the screen. We should hold the mouse gently and press keyboard keys softly."
        },
      ]
    }
  ],
  "2": [
    {
      id: 1,
      title: "More about Computers",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Questions to Ponder',
          description: [
            'In which places have you seen a computer being used?',
            'How does a computer listen and talk?',
            'How does a computer turn your ideas into results?'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Where do we use Computers?',
          description: [
            '🏫 School: Teachers use computers in school to teach children more about topics by showing videos. Children learn computer skills in school using computers. Computers are also used in school offices for accounting and to keep records of teachers, staff, and students.',
            '🛒 Shop:In shops, computers help in money transactions, check prices, and keep track of what is sold.',
            '🏢 Office: In offices, people use computers to write letters, send emails, and complete important tasks efficiently. Computers are also used in offices to maintain records and to store information.',
            '🏥 Hospital: Doctors use computers to store patient information. Some advanced computers also help operate machines used in medical procedures.',
            '🏠 Home:  We use computers at home to watch our favourite cartoons, play games, type letters, draw and colour, to learn, watch videos, listen to music, etc.',
            '🏦 Bank:  Banks use computers to keep track of customer’s accounts and money. They also help with withdrawing cash from ATMs.'
          ]
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Sort the Places',
          instruction: 'Drag each place into the correct box: "Places where computers are used" or "Places where computers are not used".',
          items: [
            { id: 'dnd-place-1', text: 'School', type: 'man-made'},
            { id: 'dnd-place-3', text: 'Library', type: 'man-made'},
            { id: 'dnd-place-4', text: 'Bank', type: 'man-made'},
            { id: 'dnd-place-6', text: 'Playground', type: 'natural'},
            { id: 'dnd-place-7', text: 'Forest', type: 'natural'},
            { id: 'dnd-place-8', text: 'Beach', type: 'natural'}
          ],
          targets: [
            { id: 'manMadeTarget', title: 'Places where computers are used', type: 'man-made' },
            { id: 'naturalTarget', title: 'Places where computers are not used', type: 'natural' }
          ],
          audioSrc: '/audio/dragdrop_places.mp3',
          speakText: 'Drag each place into the correct box: Places where computers are used or Places where computers are not used.'
        },
        {
          type: 'learn',
          format: 'text',
          title: 'What is a Computer made of?',
          description: [
            'Hardware and Software are the two main components of a computer system.',
            'Hardware is the parts of the computer you can touch. Example: CPU cabinet, Keyboard, Monitor, Mouse.',
            'Software is what makes the computer work. Software is a set of instructions that tells a computer what to do. You cant touch software. Without software, the computer hardware is of no use. Example: MS Paint, Scratch, Notepad, Periwinkle App.'
          ],
          exampleImages: [
            { src: '/images/hardware.png', alt: 'Hardware' },
            { src: '/images/software.png', alt: 'Software' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Hardware Parts',
          description: [
            "Zippy says: Click a card to check whether that is a hardware part!"
          ],
          exampleImages: [
            { src: '/images/printer.png', alt: 'Printer' },
            { src: '/images/scanner.png', alt: 'Scanner' },
            { src: '/images/microphone.png', alt: 'Microphone' },
            { src: '/images/mouse.png', alt: 'Mouse' },
          ]
        },
      ]
    },
    {
      id: 2,
      title: "Smartphones: Pocket Computers",
      lessonContent: [
        {
          "type": "learn",
          "format": "text",
          "title": "Questions to Ponder",
          "description": [
            "What are some things you can do with a smartphone that you couldn't do with a regular phone?",
            "Are computers and smartphones similar? Why do you think so?"
          ],
          "audioSrc": "/audio/ch2_questions.mp3",
          "speakText": "What are some things you can do with a smartphone that you couldn't do with a regular phone? Are computers and smartphones similar? Why do you think so?"
        },
        {
          "type": "learn",
          "format": "text",
          "title": "What can Smartphones do?",
          "description": [
            "Earlier, mobile phones were only used to make calls and send messages. Over the years, mobile phones have developed into smartphones which can do a lot more than just making calls and sending messages.",
            "Smartphones are like small computers that fit in your pocket. They can do many things. For example: make phone calls, send messages and emails, take pictures, play games, listen to music, help people find their way with maps, search for information on the internet."
          ],
          "exampleImages": [
            { "src": "/images/smartphone_calls.png", "alt": "Making phone calls" },
            { "src": "/images/smartphone_messages.png", "alt": "Sending messages" },
            { "src": "/images/smartphone_camera.png", "alt": "Taking pictures" },
            { "src": "/images/smartphone_games.png", "alt": "Playing games" },
            { "src": "/images/smartphone_music.png", "alt": "Listening to music" },
            { "src": "/images/smartphone_maps.png", "alt": "Using maps" },
            { "src": "/images/smartphone_internet.png", "alt": "Searching the internet" }
          ],
          "audioSrc": "/audio/ch2_what_smartphones_do.mp3",
          "speakText": "Smartphones can make phone calls, send messages and emails, take pictures, play games, listen to music, use maps, and search the internet."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Activity: Think and Discuss",
          "description": [
            "Can you think of any other things you can do on a smartphone? Discuss them in class."
          ],
          "audioSrc": "/audio/ch2_activity.mp3",
          "speakText": "Think of other things you can do with a smartphone and talk about them with your classmates."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "How are Smartphones like Computers?",
          "description": [
            "Computer: Hey, smartphone! Guess what? People say we are like twins. What do you think?",
            "Smartphone: Hi computer, I agree with you. We can do so many similar things.",
            "Computer: But you can go on adventures because you're small and fit in people's pockets.",
            "Smartphone: Yes, I am like a mini-computer! I can send messages and emails, play games, show videos, listen to music, help people search for information on the internet, and even make calls.",
            "Computer: So, we both help people in their day-to-day tasks, just in different ways.",
            "Smartphone: We make quite the team!",
            "Computer: High five, smartphone!",
            "Smartphone: High five, computer!"
          ],
          "audioSrc": "/audio/ch2_dialogue.mp3",
          "speakText": "Smartphones and computers are similar because they can do many of the same things, but smartphones are small and portable."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "YouTube and other Smartphone Apps",
          "description": [
            "YouTube is an application (app) where you can watch and share videos. It's like watching TV but on a computer, tablet, or phone.",
            "1. You can watch your favourite cartoon.",
            "2. You can listen to rhymes.",
            "3. You can watch educational videos and learn about animals, birds, flowers and so much more.",
            "4. You can watch and learn how to draw and learn new things.",
            "YouTube is a really fun app! As the YouTube app can be used to watch videos on a smartphone, similarly we can watch videos on a desktop and laptop computer by visiting the YouTube website: www.youtube.com"
          ],
          "exampleImages": [
            { "src": "/images/youtube_app.png", "alt": "YouTube app" },
            { "src": "/images/youtube_website.png", "alt": "YouTube website" }
          ],
          "audioSrc": "/audio/ch2_youtube.mp3",
          "speakText": "YouTube lets you watch cartoons, rhymes, and educational videos on your smartphone or computer."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Some more fun and Useful Apps",
          "description": [
            "There are many more apps for our smartphones like educational apps, gaming apps, shopping apps, messaging apps, and so on. Let's look at a few of them.",
            "1. Educational app: Periwinkle eLearning app - consists of learning videos and stories for various subjects across all grades.",
            "2. Gaming app: Endless Alphabet - teaches alphabets and words with fun games.",
            "3. Shopping apps: Amazon and Flipkart - help you with shopping.",
            "4. Creativity apps: Art For Kids Hub - teaches drawing and crafts. Colorfy - colouring book on mobile.",
            "5. Some more apps: WhatsApp - WhatsApp is an app that lets people communicate with one another. People can send messages, photos, videos, documents and make calls to one another. Google Maps - It shows you where places are and helps you find the best way to get there."
          ],
          "exampleImages": [
            { "src": "/images/periwinkle_app.png", "alt": "Periwinkle eLearning app" },
            { "src": "/images/endless_alphabet.png", "alt": "Endless Alphabet app" },
            { "src": "/images/amazon_app.png", "alt": "Amazon shopping app" },
            { "src": "/images/art_for_kids_hub.png", "alt": "Art For Kids Hub app" },
            { "src": "/images/whatsapp.png", "alt": "WhatsApp app" },
            { "src": "/images/google_maps.png", "alt": "Google Maps app" }
          ],
          "audioSrc": "/audio/ch2_other_apps.mp3",
          "speakText": "There are many apps like Periwinkle for learning, Endless Alphabet for games, Amazon for shopping, and WhatsApp for messaging."
        },
        {
          "type": "learn",
          "format": "history",
          "title": "Caselet: Reducing Screen Time",
          "description": [
            "In the city of Mumbai, lived a boy named Ravi. He loved playing games on his parent's phone. He spent three to four hours each day on the screen. On Saturday, Ravi's family decided to take him to the local park. Ravi was unhappy but still went along. At the park, he saw children playing hide and seek, flying kites, and playing football. Ravi was not sure at first but soon joined in the fun. As Ravi played with his friends, he felt the fresh air, heard joyful laughter, and discovered how exciting outdoor games could be. By the end of the day, Ravi was full of energy and could not stop smiling. His mom said, \"Ravi, see how much fun you had? Outdoor play keeps you healthy and happy, and it's a great way to spend time with friends.\""
          ],
          "items": [
            {
              "id": "1",
              "title": "Ravi loves games",
              "description": "Ravi spent hours playing games on his parent's phone.",
              "visualIcon": "/story/scenerio-img1.png",
              "position": "left"
            },
            {
              "id": "2",
              "title": "Trip to the park",
              "description": "His family took him to the park, where he saw children playing.",
              "visualIcon": "/story/scenerio-img2.png",
              "position": "right"
            },
            {
              "id": "3",
              "title": "New fun",
              "description": "Ravi joined the games and discovered the joy of outdoor play.",
              "visualIcon": "/story/scenerio-img3.png",
              "position": "left"
            },
            {
              "id": "4",
              "title": "Lesson learned",
              "description": "Ravi realized outdoor play is fun and healthy.",
              "visualIcon": "/story/scenerio-img4.png",
              "position": "right"
            }
          ],
          "imageUrl": "/images/ravi_park.png",
          "audioSrc": "/audio/ch2_caselet.mp3",
          "speakText": "Ravi learned that playing outside is fun and keeps you healthy."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Did you know?",
          "description": [
            "The first smartphone was invented in 1992.",
            "YouTube was created in 2005.",
            "The first video ever uploaded to YouTube is titled 'Me at the Zoo'. It was uploaded by Jawed Karim, on April 23, 2005."
          ],
          "audioSrc": "/audio/ch2_facts.mp3",
          "speakText": "The first smartphone was made in 1992, and YouTube started in 2005 with its first video called 'Me at the Zoo'."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Points to Remember",
          "description": [
            "Smartphones are like small computers that fit in your pocket.",
            "Smartphones and computers are very similar.",
            "YouTube is a fun learning app.",
            "There are many more apps like educational apps, gaming apps, messaging apps, shopping apps, and so on."
          ],
          "audioSrc": "/audio/ch2_summary.mp3",
          "speakText": "Smartphones are like tiny computers, similar to big ones, and apps like YouTube help us learn and have fun."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Workstation D: Fill in the Crossword",
          "description": [
            "Fill in the crossword with the help of the clues given.",
            "Clues Down: 1. This app helps people find their way (MAP). 2. This is a shopping app (AMAZON). 3. This app is used to watch videos and movies (YOUTUBE). 4. This is an educational app that teaches you subjects with fun videos (PERIWINKLE).",
            "Across: 5. A device that is like a small computer (SMARTPHONE)."
          ],
          "imageUrl": "/images/crossword.png",
          "audioSrc": "/audio/ch2_crossword.mp3",
          "speakText": "Use the clues to fill in the crossword."
        }
      ]
    },
    {
      id: 3,
      title: "Introduction to Notepad",
      lessonContent: [
        {
          "type": "learn",
          "format": "text",
          "title": "Questions to Ponder",
          "description": [
            "If you wanted to practice writing words, how would you do that on a computer?",
            "Have you ever copied something from a book to a computer, and if so, how did you do it?",
            "How do you keep your work safe so it doesn't get lost from the computer?"
          ],
          "audioSrc": "/audio/ch3_questions.mp3",
          "speakText": "How would you write words on a computer? How do you copy from a book? How do you save your work?"
        },
        {
          "type": "learn",
          "format": "text",
          "title": "What is Notepad?",
          "description": [
            "Notepad is like a notebook that you can use on a computer. It helps you write down things like stories, ideas, letters, or any notes you want to keep."
          ],
          "imageUrl": "/images/notepad_icon.png",
          "audioSrc": "/audio/ch3_notepad_intro.mp3",
          "speakText": "Notepad is a digital notebook on your computer for writing stories and notes."
        },
        {
          "type": "learn",
          "format": "step-by-step",
          "title": "Open Notepad",
          "description": [
            "Step 1: Go to the search bar in the Start icon on your computer.",
            "Step 2: Search for Notepad. The icon looks like a small white paper Notepad. Click on it to Open."
          ],
          "exampleImages": [
            { "src": "/images/search_notepad.png", "alt": "Searching for Notepad" },
            { "src": "/images/notepad_icon.png", "alt": "Notepad icon" }
          ],
          "audioSrc": "/audio/ch3_open_notepad.mp3",
          "speakText": "Search for Notepad in the Start menu and click the icon to open it."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Components of Notepad",
          "description": [
            "1. Title Bar: This is the top part of Notepad where you see the name of your file. When you first open Notepad, it will say Untitled. This means you haven't saved your file yet.",
            "2. Menu Bar: It has different menu options like File, Edit, and View. File helps you save or open files, Edit lets you copy or paste, and View can show or hide the Status Bar.",
            "3. Text Area: This is the big blank space where you type your words, sentences, etc.",
            "4. Settings: This lets you change how the app looks, like switching between dark and light themes or turning on spell check."
          ],
          "imageUrl": "/images/notepad_components.png",
          "audioSrc": "/audio/ch3_components.mp3",
          "speakText": "Notepad has a Title Bar, Menu Bar, Text Area, and Settings to help you write and customize."
        },
        {
          "type": "learn",
          "format": "step-by-step",
          "title": "Practice Typing",
          "description": [
            "Step 1: Use the keyboard to type your name. Press the Enter key to start typing on a new line.",
            "Step 2: Type the names of 4 to 5 of your classmates."
          ],
          "audioSrc": "/audio/ch3_typing_practice.mp3",
          "speakText": "Type your name and your friends' names in Notepad using the keyboard."
        },
        {
          "type": "learn",
          "format": "step-by-step",
          "title": "Type and Save a Story",
          "description": [
            "Step 1: Think of a short story.",
            "Step 2: Start typing your story in Notepad. For example, 'Once upon a time, there was a cat.' Use the backspace key to fix mistakes.",
            "Step 3: Click on the 'File' menu at the top.",
            "Step 4: Choose 'Save As'.",
            "Step 5: Give your file a name, like 'MyStory'.",
            "Step 6: Click 'Save'."
          ],
          "exampleImages": [
            { "src": "/images/typing_story.png", "alt": "Typing a story" },
            { "src": "/images/save_as.png", "alt": "Saving the file" }
          ],
          "audioSrc": "/audio/ch3_save_story.mp3",
          "speakText": "Write a story in Notepad and save it with a name like 'MyStory'."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Activity: Copy a Story",
          "description": [
            "1. Find a Story: Take a story from a storybook or write your own in a notebook.",
            "2. Type the Story: Open Notepad and type the story.",
            "3. Save the Story: Click on 'File' and then 'Save As'. Name it something unique like 'My First Story' and click 'Save'."
          ],
          "audioSrc": "/audio/ch3_activity.mp3",
          "speakText": "Copy a story into Notepad and save it with a special name."
        },
        {
          "type": "learn",
          "format": "history",
          "title": "Caselet: Saketh's Story",
          "description": [
            "Saketh is a little boy who loves to write stories. One day, his teacher showed him Notepad on the computer. 'You can type your stories here!' she said. Saketh typed a story about his dog Ruby. When he finished, he saved it as 'RubyAdventure' and felt proud. He loves Notepad because it keeps his stories neat and safe."
          ],
          "imageUrl": "/images/saketh_notepad.png",
          "audioSrc": "/audio/ch3_caselet.mp3",
          "speakText": "Saketh used Notepad to write and save a story about his dog Ruby."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Did you know?",
          "description": [
            "Notepad was developed in 1983 and has been part of Windows since 1985.",
            "Notepad is a simple text editor and often a good choice for basic coding.",
            "Notepad can be used to create web pages."
          ],
          "audioSrc": "/audio/ch3_facts.mp3",
          "speakText": "Notepad started in 1983 and can even be used for coding."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Points to Remember",
          "description": [
            "Notepad helps you type and save simple text easily.",
            "You can open Notepad by clicking the little paper notepad icon on your computer.",
            "Use the keyboard to write stories or lists in Notepad.",
            "Save your work by clicking 'File' and then 'Save As'."
          ],
          "audioSrc": "/audio/ch3_summary.mp3",
          "speakText": "Notepad is easy to use for typing and saving stories with your keyboard."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Workstation C: Decode the Secret Message",
          "description": [
            "Decoding is converting symbols, codes, or letters into meaningful words or messages. Use the key provided to decode an important message about working on Notepad. (Note: Key and message to be provided in class.)"
          ],
          "audioSrc": "/audio/ch3_decode.mp3",
          "speakText": "Use the key to figure out the secret message about Notepad."
        }
      ]
    },
    {
      "id": 4,
      "title": "Drawing with MS Paint (Part 2)",
      "lessonContent": [
        {
          "type": "learn",
          "format": "text",
          "title": "Questions to Ponder",
          "description": [
            "If you could paint a big rainbow, how would you do that on a computer?",
            "How would you add a name to a picture on the computer?"
          ],
          "audioSrc": "/audio/ch4_questions.mp3",
          "speakText": "How would you draw a rainbow on a computer? How would you add your name to a picture?"
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Exploring Lines, Curves, and Brushes",
          "description": [
            "We all like to paint with different things like brushes, crayons, or wax colours, right? In this lesson, we will explore more features of MS Paint! You know how to draw and fill a shape with colour. Now it's time to discover new tools like lines, curves, and brushes."
          ],
          "audioSrc": "/audio/ch4_intro.mp3",
          "speakText": "Let's learn more about MS Paint tools like lines, curves, and brushes."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "The Ribbon",
          "description": [
            "When you open MS Paint, you'll see a section at the top called the Ribbon. The Ribbon holds all the tools you need to create your drawings: Selection tools to choose parts, Image editing tools like Pencil and Brushes, Shape tools for squares and circles, and a Colours tool with a colour palette."
          ],
          "imageUrl": "/images/paint_ribbon.png",
          "audioSrc": "/audio/ch4_ribbon.mp3",
          "speakText": "The Ribbon in MS Paint has all the tools you need to draw."
        },
        {
          "type": "learn",
          "format": "step-by-step",
          "title": "Line Tool",
          "steps": [
            {
              "id": "line-1",
              "number": 1,
              "instruction": "Click on the 'Line' tool.",
              "visualContent": { "src": "/images/horizontal_line.png", "alt": "Horizontal line" },
              "audioContent": "Click on the 'Line' tool."
            },
            {
              "id": "line-2",
              "number": 2,
              "title": "Draw the line",
              "instruction": "Click on the drawing area where you want the line to start, drag it to where you want it to end, and release the mouse button.",
              "visualContent": { "src": "/images/vertical_line.png", "alt": "Vertical line" },
              "audioContent": "Draw the line by dragging and releasing the mouse button."
            }
          ],
          "audioSrc": "/audio/ch4_line_tool.mp3",
          "speakText": "Use the Line tool to draw straight lines by clicking and dragging."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Activity: Draw a Flower",
          "description": [
            "Use MS Paint on your computer to draw a flower.",
            "Instructions: 1. Use the Circle Tool for the centre. 2. Use the Line Tool for petal outlines. 3. Use the Curve Tool to shape petals. 4. Use the Brush Tool to add details and colours."
          ],
          "imageUrl": "/images/flower_example.png",
          "audioSrc": "/audio/ch4_activity_flower.mp3",
          "speakText": "Draw a flower in MS Paint using the Circle, Line, Curve, and Brush tools."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Activity: Draw a Tree",
          "description": [
            "Try drawing a tree using the Line, Curve, and other tools. Add a name to your drawing using the Text tool."
          ],
          "audioSrc": "/audio/ch4_activity_tree.mp3",
          "speakText": "Draw a tree and add your name with the Text tool."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Fixing Mistakes in MS Paint",
          "description": [
            "1. Use the Eraser: Click the Eraser Tool (pink block), adjust its size, and drag over the mistake.",
            "2. Undo a Mistake: Click the Undo arrow (curved left arrow) to remove the last action.",
            "3. Redo your Work: Click the Redo arrow (curved right arrow) to bring back what you undid."
          ],
          "audioSrc": "/audio/ch4_fixing_mistakes.mp3",
          "speakText": "Fix mistakes with the Eraser, Undo, or Redo in MS Paint."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Activity: Drawing What You See",
          "description": [
            "1. Find a Picture: Look around for something like a cup or book.",
            "2. Open MS Paint: Click the Paint icon.",
            "3. Draw What You See: Use tools to draw it.",
            "4. Add Details: Use colours and tools to make it look real.",
            "5. Share Your Drawing: Save it and show it to someone."
          ],
          "audioSrc": "/audio/ch4_activity_see.mp3",
          "speakText": "Draw something you see around you in MS Paint."
        },
        {
          "type": "learn",
          "format": "history",
          "title": "Caselet: Nidhi's Mountains",
          "description": [
            "Nidhi wanted to draw mountains in MS Paint. She made a mistake making one side too small but used the Undo button to fix it. She finished her mountains, added a blue sky, and wrote 'I love mountains!' in colourful letters. Her friends loved it!"
          ],
          "items": [
            {
              "id": "1",
              "title": "Drawing the Mountains",
              "description": "Nidhi started drawing mountains in MS Paint.",
              "visualIcon": "/images/nidhi_mountains.png",
              "position": "left"
            },
            {
              "id": "2",
              "title": "A Small Mistake",
              "description": "She made one side of the mountain too small.",
              "visualIcon": "/images/undo_icon.png",
              "position": "right"
            },
            {
              "id": "3",
              "title": "Using Undo",
              "description": "Nidhi used the Undo button to fix her mistake.",
              "visualIcon": "/images/undo_icon.png",
              "position": "left"
            },
            {
              "id": "4",
              "title": "Finishing Touches",
              "description": "She added a blue sky and wrote 'I love mountains!' in colourful letters.",
              "visualIcon": "/images/nidhi_mountains.png",
              "position": "right"
            }
          ],
          "imageUrl": "/images/nidhi_mountains.png",
          "audioSrc": "/audio/ch4_caselet.mp3",
          "speakText": "Nidhi fixed a mistake in her mountain drawing with Undo and added text."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Did you know?",
          "description": [
            "MS Paint has been part of Windows since 1985.",
            "It was one of the first programs for drawing on computers.",
            "Old versions didn't have an undo button.",
            "You can mix colours to create new ones."
          ],
          "audioSrc": "/audio/ch4_facts.mp3",
          "speakText": "MS Paint started in 1985 and didn't always have an undo button."
        },
        {
          "type": "learn",
          "format": "text",
          "title": "Points to Remember",
          "description": [
            "Line tool helps you draw straight lines.",
            "The Curve tool makes smooth, wavy lines.",
            "The Brushes tool adds colour and details with different strokes.",
            "Undo and Redo help you fix and change your work.",
            "The Eraser tool lets you erase parts of your drawing.",
            "The Save option keeps your drawing safe on your computer."
          ],
          "audioSrc": "/audio/ch4_summary.mp3",
          "speakText": "Remember the tools like Line, Curve, Brushes, Undo, Redo, Eraser, and Save in MS Paint."
        },
      ]
    }
  ],
  
 
  "4": [
    {
      id: 1,
      title: "Operating Systems",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'What is an Operating System?',
          description: [
            "Imagine your computer as a busy office, and the operating system (OS) is the boss of this office. Just like a boss helps organise work, so that everyone knows what to do, the OS tells the computer parts what to do, so they work together efficiently.",
            "An operating system (OS) is a special program that acts like the boss of a computer. It helps organise everything inside the computer, making sure all parts execute the work together smoothly.",
            "Without an OS, a device is not useful. It won't be able to perform basic functions like logging in, opening apps, or visiting websites.",
            "Microsoft Windows, macOS, Linux are popular OS for computers. Android and iOS are OS used in smartphones."
          ],
          imageUrl: '/images/standard4/chapter1/os_boss_analogy.png',
        },
        {
          type: 'learn',
          format: 'type',
          title: 'Operating System: The Computers Boss - Main Responsibilities',
          description: "An operating system is like the computer's boss because it handles three main responsibilities:",
          types: [
            {
              id: 'res1',
              name: '1. Resource Allocation (Deciding who gets what)',
              description: "The OS decides which programs get to use the CPU (computer's brain), memory (short-term info storage), and storage (where files are saved). If you're playing a game and listening to music, the OS ensures each program gets enough resources to run smoothly.",
              imageUrl: '/images/standard4/chapter1/resource_allocation.png'
            },
            {
              id: 'res2',
              name: '2. Process Management (Organising tasks in order)',
              description: "The OS manages the order of tasks. It decides which tasks are more important and should be completed first. This prevents the computer from getting overwhelmed and ensures everything runs smoothly.",
              imageUrl: '/images/standard4/chapter1/process_management.png'
            },
            {
              id: 'res3',
              name: '3. User Interface (Making it easy to use)',
              description: "The OS provides a friendly interface with icons, folders, and menus, making it easy for you to interact with the computer. Instead of typing complex instructions, you can click icons and use menus.",
              imageUrl: '/images/standard4/chapter1/user_interface.png'
            }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'How does an Operating System Work?',
          description: [
            "Imagine your computer is like a school, and the OS is the school's timetable. The timetable organises the school day, telling each class when they have subjects and use resources like the library or computer lab. It ensures all subjects get sufficient time.",
            "On the computer, the OS tells programs when they can use resources like the CPU, memory, and storage. If a game needs more power, the OS makes sure other applications still get a fair share. Just as a timetable keeps the school in order, an OS keeps the computer running smoothly."
          ],
          imageUrl: '/images/standard4/chapter1/os_timetable_analogy.png',
        },
        {
          type: 'learn',
          format: 'type',
          title: 'Different Types of Operating Systems',
          description: "There are several types of operating systems. Let's look at some popular ones:",
          types: [
            {
              id: 'os_android',
              name: 'Android',
              description: "Made by Google, runs on many mobile devices like smartphones and tablets. Popular for its millions of apps on Google Play Store. Has a friendly touch-screen interface with icons, customizable with wallpapers and widgets.",
              imageUrl: '/images/standard4/chapter1/android_logo.png'
            },
            {
              id: 'os_ios',
              name: 'iOS',
              description: "Made by Apple, runs on iPhones and iPads. Known for being simple, secure, and smooth. Apps are downloaded from the App Store. Has a clean, colourful look with rounded icons and an easy-to-use touch interface.",
              imageUrl: '/images/standard4/chapter1/ios_logo.png'
            },
            {
              id: 'os_linux',
              name: 'Linux',
              description: "A powerful and free OS mostly used by experts, programmers, and big companies for servers. Known for being secure and stable. It has different 'flavours' or distributions like Ubuntu, Fedora, and Mint. Its look can vary.",
              imageUrl: '/images/standard4/chapter1/linux_logo.png'
            },
            {
              id: 'os_macos',
              name: 'macOS',
              description: "Runs on Apple's desktop and laptop computers (MacBook, iMac). Known for being stylish, easy to use, and great for creative tasks like graphic design and video editing. Has a polished design with a menu bar at the top and a dock at the bottom.",
              imageUrl: '/images/standard4/chapter1/macos_logo.png'
            },
            {
              id: 'os_windows',
              name: 'Windows',
              description: "Made by Microsoft, runs on many desktop and laptop computers. Very popular worldwide. User-friendly, supports lots of software, great for school and home. Has a start menu, taskbar, icons, and windows. Windows 11 has a modern look.",
              imageUrl: '/images/standard4/chapter1/windows_logo.png'
            }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'What if there was no Operating System?',
          description: "Life without an OS on your computer would be very different and difficult:",
          content: [
            "1. Complexity for users: You'd have to type complex commands directly to the hardware instead of clicking icons.",
            "2. No multitasking: Only one program could run at a time. You'd have to stop one before starting another.",
            "3. Security issues: No passwords or firewalls to protect your data from viruses or unwanted access.",
            "4. Hardware compatibility: Every program would need specific instructions for each device (like printers or keyboards), making it hard to use new hardware."
          ],
          imageUrl: '/images/standard4/chapter1/no_os_problem.png'
        },
        {
          type: 'learn',
          format: 'type',
          title: 'Components of an Operating System',
          description: "An OS has several key parts that work together:",
          types: [
            {
              id: 'comp_kernel',
              name: '1. Kernel',
              description: "The brain of the OS. It controls everything, talks directly to hardware (CPU), decides task order, and shares resources. Example: If you're gaming and listening to music, the Kernel ensures both work smoothly.",
              icon: '🧠'
            },
            {
              id: 'comp_ui',
              name: '2. User Interface (UI)',
              description: "The face of the OS – what you see and interact with. Lets you control the computer using icons, windows, and menus. Example: Clicking a folder or using the Start menu.",
              icon: '🖥️'
            },
            {
              id: 'comp_file_mgmt',
              name: '3. File Management System',
              description: "Like an organised librarian. Keeps files and folders organised and easy to find. Saves, opens, moves, or deletes documents. Example: Remembers where your school project is saved.",
              icon: '📁'
            },
            {
              id: 'comp_drivers',
              name: '4. Device Drivers',
              description: "Translators that help the computer talk to hardware devices (printer, mouse, keyboard). Each device has its own language, and the driver helps them understand each other. Example: Lets your new printer work correctly.",
              icon: '🔌'
            },
            {
              id: 'comp_utilities',
              name: '5. System Utilities',
              description: "Special tools that keep your computer in good shape, like a toolbox. Clean up, protect from viruses, make it run faster. Example: Antivirus software, Disk Cleanup.",
              icon: '🛠️'
            }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: "Caselet: Preeti's Old Phone Discovery",
          description: [
            "One day, Preeti found an old phone with buttons. Her dad explained it was basic, used only for calls and texts, with no touch screen or apps. He told her how smartphones evolved with apps, touch screens, and many features like games, camera, music, internet, etc. Software engineers continuously develop technology for new features.",
            "Preeti realised phones in the future might have even more features, and maybe she could invent something advanced one day!"
          ],
          content: [
            "Questions for discussion:",
            "1. How have phones changed from the old button phone Preeti found to modern smartphones?",
            "2. What role do software engineers play in the development of phone features?"
          ],
          imageUrl: '/images/standard4/chapter1/old_vs_new_phone.png'
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Chapter Summary: Operating Systems',
          description: "Let's review what we've learned about Operating Systems!",
          content: [
            "Points to Remember:",
            "Ÿ The OS is the 'boss' of the computer, managing resources and connecting users with hardware.",
            "Ÿ OS Responsibilities: Resource allocation, process management, providing a user interface.",
            "Ÿ Popular OS: Android (mobiles, Google), iOS (Apple mobiles), Linux (experts, servers, free), macOS (Apple computers), Windows (PCs, Microsoft).",
            "Ÿ Without an OS: Computers would be complex, no multitasking, security risks, hardware compatibility issues.",
            "Ÿ OS Components: Kernel (core), User Interface (interaction), File Management (organises files), Device Drivers (hardware communication), System Utilities (maintenance tools).",
            "",
            "Did you know?",
            "Ÿ Android versions are named after sweet treats (Cupcake, Donut).",
            "Ÿ iOS features the Siri voice assistant.",
            "Ÿ Windows has been a leading OS since 1985.",
            "Ÿ macOS versions are named after California locations (Yosemite, Big Sur)."
          ]
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: OS Basics',
          description: ["Let's check your understanding of Operating Systems!"],
          question: "What is the main function of an operating system (OS)?",
          options: [
            { id: 'c1q1opt1', text: "To create hardware", isCorrect: false, explanation: "Hardware is the physical parts; the OS manages them." },
            { id: 'c1q1opt2', text: "To manage computer resources and make it user-friendly", isCorrect: true, explanation: "Correct! The OS is the 'boss' that manages everything and helps you use the computer." },
            { id: 'c1q1opt3', text: "To make games", isCorrect: false, explanation: "Games are applications that run on an OS." },
            { id: 'c1q1opt4', text: "To connect to the internet", isCorrect: false, explanation: "The OS helps manage network connections, but its main role is broader." }
          ],
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: OS Types',
          description: ["Which OS is primarily used on Apple's mobile devices like iPhones?"],
          question: "Which operating system runs on Apple's iPhones and iPads?",
          options: [
            { id: 'c1q2opt1', text: "Android", isCorrect: false, explanation: "Android is used on many non-Apple smartphones and tablets." },
            { id: 'c1q2opt2', text: "Windows", isCorrect: false, explanation: "Windows is mainly for desktop and laptop computers." },
            { id: 'c1q2opt3', text: "iOS", isCorrect: true, explanation: "Correct! iOS is Apple's operating system for its mobile devices." },
            { id: 'c1q2opt4', text: "Linux", isCorrect: false, explanation: "Linux is more common on servers and for specialized computer users." }
          ],
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: OS Components',
          description: ["What is the 'brain' of the operating system called?"],
          question: "Which component of the OS directly interacts with the computer's hardware and manages core tasks?",
          options: [
            { id: 'c1q3opt1', text: "User Interface", isCorrect: false, explanation: "The User Interface is how you interact with the OS, not its core brain." },
            { id: 'c1q3opt2', text: "Device Driver", isCorrect: false, explanation: "Device drivers help the OS talk to specific hardware parts." },
            { id: 'c1q3opt3', text: "Kernel", isCorrect: true, explanation: "Correct! The Kernel is the central part of the OS, managing hardware and software." },
            { id: 'c1q3opt4', text: "System Utility", isCorrect: false, explanation: "System Utilities are tools for maintenance, not the core brain." }
          ],
        }
      ]
    },
    {
      id: 2,
      title: "Introduction to Windows",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'What is Windows?',
          description: [
            "Windows is an operating system (OS) made by Microsoft. An OS manages everything on your computer, helping organise and run all its parts. Without an OS like Windows, you wouldn't be able to interact with your computer easily.",
            "Windows provides a user-friendly interface that allows you to open programs, play games, browse the internet, watch videos, and do homework. It acts as a bridge between you and the computer's hardware (keyboard, mouse, screen)."
          ],
          imageUrl: '/images/standard4/chapter2/windows_os_screen.png'
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Brief History of Windows',
          description: [
            "Windows was first made by Microsoft in 1985. Early versions were mostly text and simple graphics, much different from today.",
            "Over time, Microsoft released new versions like Windows XP (2001), Windows 7 (2009), Windows 10 (2015), and now Windows 11 (2021). Each version became faster, safer, and added more features, icons, pictures, and colourful menus."
          ],
          exampleImages: [
            { src: '/images/standard4/chapter2/windows_xp_logo.png', alt: 'Windows XP Logo', caption: 'Windows XP (2001)' },
            { src: '/images/standard4/chapter2/windows_7_logo.png', alt: 'Windows 7 Logo', caption: 'Windows 7 (2009)' },
            { src: '/images/standard4/chapter2/windows_10_logo.png', alt: 'Windows 10 Logo', caption: 'Windows 10 (2015)' },
            { src: '/images/standard4/chapter2/windows_11_logo.png', alt: 'Windows 11 Logo', caption: 'Windows 11 (2021)' }
          ]
        },
        {
          type: 'learn',
          format: 'type',
          title: 'Why is Windows Popular?',
          description: "Windows is very popular for several reasons:",
          types: [
            { id: 'pop1', name: 'User-friendly interface', description: 'Uses icons and menus that are easy to click. No need for complex commands.', icon: '🖱️' },
            { id: 'pop2', name: 'Widely used in schools and offices', description: 'Simple and has tools like word processors, spreadsheets, and presentation apps.', icon: '🏢' },
            { id: 'pop3', name: 'Lots of programs and games', description: 'Supports a large variety of applications for homework, art, or games.', icon: '🎮' },
            { id: 'pop4', name: 'Supports multiple devices', description: 'Works on computers, laptops, and tablets.', icon: '💻' }
          ]
        },
        {
          type: 'learn',
          format: 'application',
          title: 'What can Windows do?',
          description: "Windows helps you do many things on your computer:",
          examples: [
            { id: 'do1', scenario: 'Organise your files', explanation: 'Helps you sort files into neat folders, like organising books on shelves.', visualIcon: '📂' },
            { id: 'do2', scenario: 'Run multiple programs (Multitasking)', explanation: 'Play games while listening to music, or watch videos and do homework all at once.', visualIcon: '🔄' },
            { id: 'do3', scenario: 'Search for anything', explanation: 'The search tab helps you find applications and files quickly.', visualIcon: '🔍' },
            { id: 'do4', scenario: 'Connect to networks and devices', explanation: 'Wi-Fi connects to the internet. Bluetooth connects to devices like headphones. Airplane mode disconnects wireless connections.', visualIcon: '📶' },
            { id: 'do5', scenario: 'Adjust settings', explanation: 'The Settings app lets you adjust sound, screen brightness, Wi-Fi, and more.', visualIcon: '⚙️' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Understanding the Basics: The Desktop',
          description: [
            "Have you seen an office desk? It usually has files, folders, books, a calendar, and a clock. Similarly, the Desktop on your computer monitor is like an office desk.",
            "It has icons (small pictures) that are shortcuts to open apps you use often. It can also hold folders and files you need frequently. You can add your own icons, files, and folders. It also shows the time and date."
          ],
          imageUrl: '/images/standard4/chapter2/windows_desktop_overview.png'
        },
        {
          type: 'learn',
          format: 'type',
          title: 'Basic Icons on the Windows Desktop',
          description: "You'll often see these icons:",
          types: [
            { id: 'icon_pc', name: 'This PC', description: 'A place where you can see all your folders, files, and storage devices. Helps you find anything saved on your computer.', imageUrl: '/images/standard4/chapter2/this_pc_icon.png' },
            { id: 'icon_recycle', name: 'Recycle Bin', description: 'Where deleted files are temporarily stored. If you accidentally delete a file, you can often restore it from here before it\'s emptied.', imageUrl: '/images/standard4/chapter2/recycle_bin_icon.png' },
            { id: 'icon_settings', name: 'Settings', description: 'The Settings app lets you adjust system features like sound, screen brightness, and Wi-Fi connections.', imageUrl: '/images/standard4/chapter2/settings_icon.png' },
            { id: 'icon_downloads', name: 'Downloads Folder', description: 'A common location where files downloaded from the internet are stored.', imageUrl: '/images/standard4/chapter2/downloads_folder_icon.png' }
          ]
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Lets Create a Folder',
          description: "Folders help you organise your files. Here's how to create one:",
          steps: [
            { id: 'cf1', number: 1, instruction: 'Right-click on an empty area of your Desktop (or inside another folder).' },
            { id: 'cf2', number: 2, instruction: 'From the menu that appears, point to "New," then click on "Folder".', visualContent: '/images/standard4/chapter2/new_folder_menu.png' },
            { id: 'cf3', number: 3, instruction: 'A new folder icon will appear with its name highlighted. Type a name for your folder (e.g., "My First Folder") and press Enter.', visualContent: '/images/standard4/chapter2/naming_new_folder.png' },
            { id: 'cf4', number: 4, instruction: 'Done! Your folder is created. Double-click on it to open it.' },
            { id: 'cf5', number: 5, instruction: 'Inside the folder, you can add new files. For example, right-click, choose New, then Microsoft Word Document.' },
            { id: 'cf6', number: 6, instruction: 'Type a name for the new document (e.g., "Lesson 1 Homework") and press Enter.' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Multitasking Features: Switching Between Programs',
          description: [
            "Windows lets you do many tasks at once (multitasking). You can open several programs and switch between them easily.",
            "To see all your open programs or switch between them, press 'Alt + Tab' on your keyboard. Hold down Alt and press Tab to cycle through the open windows."
          ],
          imageUrl: '/images/standard4/chapter2/alt_tab_switching.png'
        },
        {
          type: 'learn',
          format: 'text',
          title: 'CPU - Processors and their Speed',
          description: [
            "CPU (Central Processing Unit): The CPU is the brain of the computer. Just like your brain helps you think and solve problems, the CPU helps the computer run applications and programs. It does all the hard work!",
            "Processor Speed: The speed of the CPU is like how quickly you can solve a puzzle. A faster CPU can do more tasks quickly, making everything run smoother. This speed is measured in gigahertz (GHz), which tells you how many billions of instructions the CPU can handle in one second.",
            "Earlier CPUs ran at 1-2 GHz, while modern CPUs typically range from 3-5 GHz, with some even faster. Higher GHz means better performance."
          ],
          imageUrl: '/images/standard4/chapter2/cpu_brain_analogy.png'
        },
        {
          type: 'learn',
          format: 'text',
          title: "Caselet: Nameet and the Cooling Fans",
          description: [
            "Nameet started playing a game on his father's laptop. Soon, the laptop got hot, and the fans made noise. Worried, he asked his father. His father explained, The laptop has an Intel i5 processor. When you play graphic-intensive games, it works harder. The Windows OS notices this and turns on the cooling fans to prevent overheating. It's like giving the laptop a break to stay cool. Nameet understood the fans were doing their job."
          ],
          content: [
            "Questions for discussion:",
            "1. Have you ever experienced a device heating up? What happened?",
            "2. How does the laptop manage to cool itself down during heavy tasks?"
          ],
          imageUrl: '/images/standard4/chapter2/laptop_cooling_fan.png'
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Chapter Summary: Introduction to Windows',
          description: "Let's review what we've learned about Windows!",
          content: [
            "Points to Remember:",
            "Ÿ Windows is an OS by Microsoft that manages your computer and makes it user-friendly.",
            "Ÿ Popular for its easy interface, wide use in schools/offices, program support, and multi-device compatibility.",
            "Ÿ Windows can organise files, run multiple programs (multitasking), search, connect (Wi-Fi, Bluetooth), and adjust settings.",
            "Ÿ The Desktop is your main workspace, showing icons, files, and folders.",
            "Ÿ Basic Icons: This PC (access files), Recycle Bin (deleted files), Settings (adjust system), Downloads Folder.",
            "Ÿ You can create folders to organise files.",
            "Ÿ Alt + Tab lets you switch between open programs.",
            "Ÿ CPU is the computer's 'brain'; its speed (in GHz) affects performance. Higher GHz means faster.",
            "",
            "Did you know?",
            "Ÿ Windows supports over 100 languages.",
            "Ÿ The Windows logo has changed 11 times since 1985."
          ]
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: Windows Basics',
          description: ["Let's check your understanding of Windows!"],
          question: "What is the primary purpose of an operating system like Windows?",
          options: [
            { id: 'c2q1opt1', text: "To increase the speed of the internet", isCorrect: false, explanation: "Internet speed depends on your connection, not just the OS." },
            { id: 'c2q1opt2', text: "To help manage all parts of a computer and make it user-friendly", isCorrect: true, explanation: "Correct! Windows manages hardware and software, providing an easy way to use the computer." },
            { id: 'c2q1opt3', text: "To prevent the computer from turning off", isCorrect: false, explanation: "The OS manages power, but its main purpose is broader." },
            { id: 'c2q1opt4', text: "To store all programs", isCorrect: false, explanation: "Programs are stored on the hard drive; the OS helps run them." }
          ],
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: Windows Features',
          description: ["What icon on the Windows Desktop is used to access all your files, folders, and storage devices?"],
          question: "Which Windows feature is like a digital office desk, showing frequently used files and application shortcuts?",
          options: [
            { id: 'c2q2opt1', text: "Recycle Bin", isCorrect: false, explanation: "The Recycle Bin stores deleted files." },
            { id: 'c2q2opt2', text: "Desktop", isCorrect: true, explanation: "Correct! The Desktop is your main workspace on Windows." },
            { id: 'c2q2opt3', text: "Settings", isCorrect: false, explanation: "Settings is for configuring the system." },
            { id: 'c2q2opt4', text: "This PC", isCorrect: false, explanation: "'This PC' lets you browse storage, but the Desktop is the main visual workspace." }
          ],
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: CPU Speed',
          description: ["What unit is used to measure the speed of a CPU?"],
          question: "The speed of a CPU (Central Processing Unit) is measured in:",
          options: [
            { id: 'c2q3opt1', text: "Megabytes (MB)", isCorrect: false, explanation: "Megabytes measure storage capacity or file size." },
            { id: 'c2q3opt2', text: "Gigahertz (GHz)", isCorrect: true, explanation: "Correct! Gigahertz measures the number of instructions a CPU can process per second." },
            { id: 'c2q3opt3', text: "Kilowatts (kW)", isCorrect: false, explanation: "Kilowatts measure power." },
            { id: 'c2q3opt4', text: "Pixels per inch (PPI)", isCorrect: false, explanation: "PPI measures screen resolution." }
          ],
        }
      ]
    },
    {
      id: 3,
      title: "Different File Types",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Introduction to Files and its Types',
          description: [
            "Just like we use different boxes for toys, clothes, etc., computers use different types of files to store information. Some files hold pictures, some music, others text or videos. The 'file type' tells the computer and user what kind of information is inside.",
            "A file is a collection of data that gives a complete set of information about a certain item.",
            "We need different file types because each type of information is unique. A picture is saved differently from a song. Different file types help the computer know how to open and use the information correctly. For example, .txt for text, .jpg for images, .mp3 for music."
          ],
          imageUrl: '/images/standard4/chapter3/file_types_boxes.png'
        },
        {
          type: 'learn',
          format: 'type',
          title: 'Common File Types',
          description: "Here are some common types of files you'll find:",
          types: [
            { id: 'ft_text', name: 'Text files', description: 'Hold words and sentences. Examples: .txt (simple text), .docx (Microsoft Word), .pdf (readable documents).', icon: '📄' },
            { id: 'ft_image', name: 'Image files', description: 'Used for pictures and drawings. Examples: .jpg (photos), .png (pictures with clear backgrounds), .gif (moving pictures).', icon: '🖼️' },
            { id: 'ft_video', name: 'Video files', description: 'Hold videos and movies. Examples: .mp4 (common video format), .avi, .mkv.', icon: '🎞️' },
            { id: 'ft_audio', name: 'Audio files', description: 'Store sounds, music, or recordings. Examples: .mp3 (music), .wav (better quality sound).', icon: '🎵' },
            { id: 'ft_compressed', name: 'Compressed files', description: 'Like a zipped suitcase holding many files to take up less space. Example: .zip. You "unzip" them to use the files.', icon: 'ዚ' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Understanding File Extensions',
          description: [
            "A file extension is like a label or tag telling us the file type. It's a small set of letters after the filename and a dot (e.g., in 'Periwinkle.png', '.png' is the extension).",
            "File extensions are important because they help the computer know how to open a file. If it sees .jpg, it opens with a photo viewer; if .txt, with a text editor."
          ],
          exampleImages: [
             { src: '/images/standard4/chapter3/extension_example_txt.png', alt: 'Text file icon with .txt extension', caption: '.txt (Text)' },
             { src: '/images/standard4/chapter3/extension_example_jpg.png', alt: 'Image file icon with .jpg extension', caption: '.jpg (Image)' },
             { src: '/images/standard4/chapter3/extension_example_mp4.png', alt: 'Video file icon with .mp4 extension', caption: '.mp4 (Video)' }
          ]
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Activity: Check a File Type on Your Computer',
          description: "Let's learn how to identify a file's type by checking its properties:",
          steps: [
            { id: 'check_ft1', number: 1, instruction: 'Find any file on your computer.' },
            { id: 'check_ft2', number: 2, instruction: 'Right-click on the file. A menu will appear.' },
            { id: 'check_ft3', number: 3, instruction: 'From the menu, select "Properties" (you might need to click "Show more options" first on some Windows versions).', visualContent: '/images/standard4/chapter3/file_properties_menu.png' },
            { id: 'check_ft4', number: 4, instruction: 'In the Properties window, look for "Type of file". This will tell you what kind of file it is (e.g., Text Document (.txt), JPG File (.jpg)).', visualContent: '/images/standard4/chapter3/file_properties_window.png' }
          ]
        },
        {
          type: 'learn',
          format: 'type',
          title: 'Details of Common File Types',
          description: "Let's dive deeper into some common file types:",
          types: [
            { id: 'detail_txt', name: 'Text files', description: '.txt: Simplest, plain text. .docx: Microsoft Word, can have formatting, pictures. .pdf: For sharing, looks same on all devices, hard to edit.', imageUrl: '/images/standard4/chapter3/text_file_icons.png' },
            { id: 'detail_img', name: 'Image files', description: '.jpg (JPEG): Good for photos, smaller size. .png: High quality, supports clear/transparent backgrounds. .gif: For animations (short moving images). .svg: For logos, resizable without losing quality.', imageUrl: '/images/standard4/chapter3/image_file_icons.png' },
            { id: 'detail_vid', name: 'Video files', description: '.mp4: Most common, good quality, smaller size. .avi: Older, larger file size. .mkv: High quality, can hold multiple audio/subtitles.', imageUrl: '/images/standard4/chapter3/video_file_icons.png' },
            { id: 'detail_aud', name: 'Audio files', description: '.mp3: Popular, compresses sound, smaller size. .wav: High quality recording, larger size. .aac: Used in Apple Music, better sound than MP3 at smaller size.', imageUrl: '/images/standard4/chapter3/audio_file_icons.png' },
            { id: 'detail_zip', name: 'Compressed files', description: '.zip: Puts multiple files/folders into one smaller file for easy sharing/storage. .rar, .7z: Other compressed formats.', imageUrl: '/images/standard4/chapter3/compressed_file_icon.png' }
          ]
        },
        {
          type: 'learn',
          format: 'application',
          title: 'Why Convert Files Online?',
          description: "Sometimes you need to change a file from one type to another. Here's why:",
          examples: [
            { id: 'convert1', scenario: 'Compatibility', explanation: 'Different devices/apps support different file types. Converting ensures you can open them. (e.g., some apps prefer JPEG over PNG).', visualIcon: '🔄' },
            { id: 'convert2', scenario: 'Space-saving', explanation: 'Some file types are smaller. Converting a large PNG to JPEG can save space.', visualIcon: '💾' },
            { id: 'convert3', scenario: 'Easy sharing', explanation: 'Certain formats are easier to share (smaller or more common). Converting PDF to Word allows editing.', visualIcon: '📤' }
          ]
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Converting PNG to JPG Online (Example)',
          description: "Let's learn how to convert a PNG image to a JPG image using an online tool (always ask a parent or teacher before using online converters):",
          steps: [
            { id: 'png2jpg1', number: 1, instruction: 'Choose a trustworthy online converter website (e.g., PNG2JPG, FreeConvert). Let\'s use PNG2JPG for this example.' },
            { id: 'png2jpg2', number: 2, instruction: 'On the website, look for an "Upload Files" button. Click it and select the PNG file from your computer.', visualContent: '/images/standard4/chapter3/png2jpg_upload.png' },
            { id: 'png2jpg3', number: 3, instruction: 'Ensure the output format is set to JPG. Most converters do this automatically for PNG to JPG conversion.' },
            { id: 'png2jpg4', number: 4, instruction: 'Click the "Convert" or "Download All" button to start the conversion.' },
            { id: 'png2jpg5', number: 5, instruction: 'After a few seconds, your new JPG file will be ready. Download it to your computer.', visualContent: '/images/standard4/chapter3/png2jpg_download.png' }
          ]
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Activity: Creating ZIP Files on Windows',
          description: "Let's learn to compress multiple files into a single ZIP file:",
          steps: [
            { id: 'zip_create1', number: 1, instruction: 'Open the folder containing the files you want to zip.' },
            { id: 'zip_create2', number: 2, instruction: 'Select all the files you want to include (Click and drag, or hold Ctrl and click each file).' },
            { id: 'zip_create3', number: 3, instruction: 'Right-click on one of the selected files. In the menu, choose "Compress to ZIP file" (or "Send to" > "Compressed (zipped) folder" on older Windows).', visualContent: '/images/standard4/chapter3/compress_to_zip_menu.png' },
            { id: 'zip_create4', number: 4, instruction: 'A new ZIP file will be created. You can rename it if you want. Press Enter.' }
          ]
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Activity: Extracting (Unzipping) ZIP Files',
          description: "Now let's learn how to get files out of a ZIP file:",
          steps: [
            { id: 'zip_extract1', number: 1, instruction: 'Find the ZIP file you want to extract. Double-click to open it (it might open like a normal folder).' },
            { id: 'zip_extract2', number: 2, instruction: 'Look for an "Extract all" button (usually at the top in File Explorer). Click it.', visualContent: '/images/standard4/chapter3/extract_all_button.png' },
            { id: 'zip_extract3', number: 3, instruction: 'A window will ask where to save the extracted files. You can choose a destination or use the suggested one. Click "Extract".' },
            { id: 'zip_extract4', number: 4, instruction: 'The files will be copied from the ZIP file to the chosen folder.' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: "Caselet: File Types and Teamwork",
          description: [
            "Class 4 students worked on a 'Wonders of Nature' project. Anaya had .jpg photos, Rohan a .pdf report, Kiran an .mp3 narration, and Meera an .mp4 video. They saved files in one folder but struggled to email them individually. Their teacher, Ms. Sharma, suggested creating a ZIP folder to store all files together, making it easier to transfer. The students learned about managing files and teamwork."
          ],
          content: [
            "Questions for discussion:",
            "1. How did creating a ZIP file help the students?",
            "2. Why is it important to understand different file formats when working in a team?"
          ],
          imageUrl: '/images/standard4/chapter3/teamwork_files.png'
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Chapter Summary: Different File Types',
          description: "Let's review what we've learned about file types!",
          content: [
            "Points to Remember:",
            "Ÿ A file stores specific information, and its type helps the computer understand it.",
            "Ÿ Common file types: Text (.txt, .docx, .pdf), Image (.jpg, .png, .gif), Video (.mp4, .avi), Audio (.mp3, .wav), Compressed (.zip).",
            "Ÿ A file extension (e.g., .jpg) is a label after the filename and dot, indicating the file type.",
            "Ÿ Extensions help the computer choose the right program to open a file.",
            "Ÿ Files can be converted to other types for compatibility, space-saving, or easier sharing.",
            "Ÿ ZIP files compress multiple files into one for easier storage and transfer.",
            "",
            "Did you know?",
            "Ÿ JPEG and JPG are two names for the same image file format.",
            "Ÿ MP4 players can play MP4 videos and MP3 audio, but MP3 players only play MP3 audio.",
            "Ÿ PDFs are common for school notes because they look the same on any device."
          ]
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: File Types Basics',
          description: ["Let's test your knowledge of file types!"],
          question: "Which file type is commonly used for storing written documents that you create in Microsoft Word?",
          options: [
            { id: 'c3q1opt1', text: ".jpg", isCorrect: false, explanation: ".jpg is for images." },
            { id: 'c3q1opt2', text: ".mp3", isCorrect: false, explanation: ".mp3 is for audio music files." },
            { id: 'c3q1opt3', text: ".docx", isCorrect: true, explanation: "Correct! .docx is the file extension for Microsoft Word documents." },
            { id: 'c3q1opt4', text: ".mp4", isCorrect: false, explanation: ".mp4 is for video files." }
          ],
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: File Extensions',
          description: ["What does a file extension like '.zip' usually indicate?"],
          question: "If you see a file ending with '.zip', what kind of file is it most likely?",
          options: [
            { id: 'c3q2opt1', text: "An audio file", isCorrect: false, explanation: "Audio files usually have extensions like .mp3 or .wav." },
            { id: 'c3q2opt2', text: "A video file", isCorrect: false, explanation: "Video files often end in .mp4 or .avi." },
            { id: 'c3q2opt3', text: "A compressed file", isCorrect: true, explanation: "Correct! .zip indicates a compressed file containing one or more other files." },
            { id: 'c3q2opt4', text: "A plain text file", isCorrect: false, explanation: "Plain text files usually end in .txt." }
          ],
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: Converting Files',
          description: ["Why might you convert a file from a PNG image to a JPEG image?"],
          question: "One common reason to convert a PNG image file to a JPEG image file is:",
          options: [
            { id: 'c3q3opt1', text: "To make the image quality much better", isCorrect: false, explanation: "JPEG is a lossy compression, so quality might slightly decrease, not improve significantly over PNG in all cases." },
            { id: 'c3q3opt2', text: "To add animation to the image", isCorrect: false, explanation: "Neither PNG nor JPEG typically support animation; .gif is used for that." },
            { id: 'c3q3opt3', text: "To save space, as JPEGs are often smaller than PNGs", isCorrect: true, explanation: "Correct! JPEGs often have smaller file sizes than PNGs for photographic images, which saves space." },
            { id: 'c3q3opt4', text: "To be able to edit the image in Microsoft Word", isCorrect: false, explanation: "Both PNG and JPEG can be inserted into Word, but conversion isn't primarily for editing capability in Word." }
          ],
        }
      ]
    },
    {
      id: 4,
      title: "Microsoft Word (Part 2)",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'About Microsoft Word',
          description: [
            "Microsoft Word is a word-processing program that helps create and edit text documents like essays, letters, reports, and stories. You can write, change text appearance, add pictures, and check spelling. It makes organising work easier for school or fun.",
            "We've learned basics like typing, saving, and opening. Now, let's explore more exciting features!"
          ],
          imageUrl: '/images/standard4/chapter4/ms_word_document_example.png'
        },
        {
          type: 'learn',
          format: 'text',
          title: 'The Insert Tab in MS Word',
          description: [
            "The Insert tab on the Ribbon in MS Word lets you add various elements to make your document more engaging and informative.",
            "You can insert pictures, tables (to organise data), shapes (for diagrams), charts (to display data visually), and links (to websites or other documents)."
          ],
          imageUrl: '/images/standard4/chapter4/word_insert_tab.png'
        },
        {
          type: 'learn',
          format: 'type',
          title: 'Overview of Insert Tab Sections',
          description: "The Insert tab has many tools grouped into sections:",
          types: [
            { id: 'insert_pages', name: 'Pages', description: 'Add Cover Page, Blank Page, or Page Break.' },
            { id: 'insert_tables', name: 'Tables', description: 'Insert tables to organise data in rows and columns.' },
            { id: 'insert_illustrations', name: 'Illustrations', description: 'Add Pictures (from computer or online), Shapes, Icons, SmartArt, Charts, Screenshots.' },
            { id: 'insert_media', name: 'Media', description: 'Embed Online Videos.' },
            { id: 'insert_links', name: 'Links', description: 'Add Hyperlinks, Bookmarks, Cross-references.' },
            { id: 'insert_comments', name: 'Comments', description: 'Add comments for feedback or notes.' },
            { id: 'insert_header_footer', name: 'Header & Footer', description: 'Add or edit headers (top of page) or footers (bottom of page), include page numbers.' },
            { id: 'insert_text', name: 'Text', description: 'Insert Text Box, Quick Parts, WordArt, Drop Cap, Signature Line, Date & Time, Object (embed files).' },
            { id: 'insert_symbols', name: 'Symbols', description: 'Insert Equations or special Symbols not on the keyboard.' }
          ]
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'How to Insert an Image in Word',
          description: "Let's add a picture to your document:",
          steps: [
            { id: 'img_ins1', number: 1, instruction: 'Open your Word document.' },
            { id: 'img_ins2', number: 2, instruction: 'Click on the "Insert" Tab.' },
            { id: 'img_ins3', number: 3, instruction: 'In the "Illustrations" group, click the "Pictures" button.', visualContent: '/images/standard4/chapter4/insert_pictures_button.png' },
            { id: 'img_ins4', number: 4, instruction: 'A window will open. Find the picture on your computer, click on it, and then click "Insert".' },
            { id: 'img_ins5', number: 5, instruction: 'After inserting, you can click and drag the corners of the picture to resize it or move it around.' }
          ]
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'How to Create a Table in Word',
          description: "Tables help organise information neatly. Here's how to make one:",
          steps: [
            { id: 'tbl_ins1', number: 1, instruction: 'In the "Insert" tab, click the "Table" button. A grid will appear.', visualContent: '/images/standard4/chapter4/insert_table_button.png' },
            { id: 'tbl_ins2', number: 2, instruction: 'Drag your mouse over the grid to select the number of rows (horizontal) and columns (vertical) you want. Click to insert it.' },
            { id: 'tbl_ins3', number: 0, instruction: 'Alternative Way (for more rows/columns): Click "Insert Table" from the dropdown. A window will appear.' },
            { id: 'tbl_ins4', number: 3, instruction: 'In the window, enter the number of columns and rows you need. Click "OK".', visualContent: '/images/standard4/chapter4/insert_table_dialog.png' },
            { id: 'tbl_ins5', number: 4, instruction: 'Note: A rectangular box where a row and column meet is called a cell.' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Quick Tables',
          description: [
            "Quick Tables are pre-designed table formats (like calendars, lists) in Word that you can insert quickly. They save time and come with built-in styles.",
            "To use: Place cursor > Insert tab > Table button > Quick Tables > Choose a table."
          ],
          exampleImages: [
            { src: '/images/standard4/chapter4/quick_tables_calendar.png', alt: 'Quick Table Calendar Example', caption: 'Calendar Quick Table' },
            { src: '/images/standard4/chapter4/quick_tables_list.png', alt: 'Quick Table List Example', caption: 'List Quick Table' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Typing Information and Table Design/Layout Tabs',
          description: [
            "How to type in a table: Click inside a cell and start typing. Use formatting tools (Bold, Font Color) to change text appearance. Use Tab key or arrow keys to move between cells.",
            "When you insert a table, two new tabs appear: 'Table Design' and 'Table Layout'."
          ],
          imageUrl: '/images/standard4/chapter4/table_typing_example.png'
        },
        {
          type: 'learn',
          format: 'type',
          title: 'Table Design Tab',
          description: "This tab is for making your table look beautiful:",
          types: [
            { id: 'td_style', name: 'Table Styles', description: 'Choose ready-made colourful designs for your table.', imageUrl: '/images/standard4/chapter4/table_styles_options.png' },
            { id: 'td_shading', name: 'Shading', description: 'Fill cells with different colors to highlight parts.', imageUrl: '/images/standard4/chapter4/table_shading_example.png' },
            { id: 'td_borders', name: 'Borders', description: 'Change lines around the table (thicker, dotted, etc.).', imageUrl: '/images/standard4/chapter4/table_borders_example.png' }
          ]
        },
        {
          type: 'learn',
          format: 'type',
          title: 'Table Layout Tab',
          description: "This tab helps you organise and arrange your table structure:",
          types: [
            { id: 'tl_insert', name: 'Insert Rows and Columns', description: 'Add new rows (horizontal) or columns (vertical) if you need more space.', imageUrl: '/images/standard4/chapter4/table_layout_insert_delete.png' },
            { id: 'tl_delete', name: 'Delete', description: 'Remove rows, columns, or the entire table.' },
            { id: 'tl_merge', name: 'Merge Cells', description: 'Combine two or more cells into one large cell (useful for headings). Select cells > Click Merge Cells.', imageUrl: '/images/standard4/chapter4/table_merge_cells.png' },
            { id: 'tl_split', name: 'Split Cells', description: 'Break one cell into smaller parts. Place cursor in cell > Click Split Cells > Enter number of new columns/rows.', imageUrl: '/images/standard4/chapter4/table_split_cells.png' }
          ]
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Adding Header and Footer',
          description: "Headers appear at the top of each page, Footers at the bottom. They can contain titles, names, dates, or page numbers.",
          steps: [
            { id: 'hf_h1', number: 0, instruction: 'Adding a Header: Go to "Insert" tab > Click "Header".' },
            { id: 'hf_h2', number: 1, instruction: 'Pick a style you like.' },
            { id: 'hf_h3', number: 2, instruction: 'Type your header text (e.g., "My Document").' },
            { id: 'hf_h4', number: 3, instruction: 'Click "Close Header and Footer" on the Ribbon.', visualContent: '/images/standard4/chapter4/header_example.png' },
            { id: 'hf_f1', number: 0, instruction: 'Adding a Footer: Go to "Insert" tab > Click "Footer".' },
            { id: 'hf_f2', number: 1, instruction: 'Pick a style.' },
            { id: 'hf_f3', number: 2, instruction: 'Type your footer text.' },
            { id: 'hf_f4', number: 3, instruction: 'Click "Close Header and Footer".', visualContent: '/images/standard4/chapter4/footer_example.png' }
          ]
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Adding Page Numbers',
          description: "Easily add page numbers to your document:",
          steps: [
            { id: 'pn1', number: 1, instruction: 'Go to "Insert" tab > Click "Page Number".' },
            { id: 'pn2', number: 2, instruction: 'Select where you want the page number (Top of Page, Bottom of Page, etc.) and choose a style.', visualContent: '/images/standard4/chapter4/page_number_options.png' },
            { id: 'pn3', number: 3, instruction: 'The page number will be inserted. Click "Close Header and Footer".' }
          ]
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Adding Watermark',
          description: "A Watermark is light text or an image appearing behind your main text (e.g., 'DRAFT', 'CONFIDENTIAL').",
          steps: [
            { id: 'wm1', number: 1, instruction: 'Go to the "Design" tab on the Ribbon.' },
            { id: 'wm2', number: 2, instruction: 'Click on "Watermark".', visualContent: '/images/standard4/chapter4/watermark_button.png' },
            { id: 'wm3', number: 3, instruction: 'Pick a premade watermark (like "CONFIDENTIAL") or click "Custom Watermark" to add your own text or image.' },
            { id: 'wm4', number: 4, instruction: 'If custom, enter text or select picture. Click "Apply" or "OK". The watermark will appear on every page.', visualContent: '/images/standard4/chapter4/custom_watermark_dialog.png' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Using SmartArt in Microsoft Word',
          description: [
            "SmartArt is a tool to create visual diagrams like lists, processes, and cycles. It helps turn complex information into simple, easy-to-understand pictures. It saves time and makes content more engaging.",
            "To use: Insert tab > SmartArt button > Choose a graphic > Click OK > Type text into shapes."
          ],
          imageUrl: '/images/standard4/chapter4/smartart_examples.png'
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Creating a Butterfly Life Cycle using SmartArt',
          description: "Let's make a life cycle diagram:",
          steps: [
            { id: 'sa_bf1', number: 1, instruction: 'Open Word > Insert tab > SmartArt.' },
            { id: 'sa_bf2', number: 2, instruction: 'Choose a "Cycle" type graphic (e.g., Basic Cycle) and click OK.' },
            { id: 'sa_bf3', number: 3, instruction: 'If it has more than four circles, select extra ones and press Delete.' },
            { id: 'sa_bf4', number: 4, instruction: 'Click inside each circle and type: "Eggs", "Caterpillar", "Chrysalis", "Butterfly".', visualContent: '/images/standard4/chapter4/smartart_butterfly_cycle.png' },
            { id: 'sa_bf5', number: 5, instruction: 'Use the "SmartArt Design" tab to change colors and styles.' },
            { id: 'sa_bf6', number: 6, instruction: 'Adjust size and position as needed. Review your work.' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: "Caselet: Panda Report with Word",
          description: [
            "Jessica created a project about pandas. She added a title and inserted a panda picture. She used the Insert Tab to create a table for panda facts, and Table Design to add color. She added her name in the Header, date in the Footer, and Page Numbers. She used a Watermark 'Panda Project'. Finally, she used SmartArt to show the panda life cycle. Jessica was proud of her report."
          ],
          content: [
            "Questions for discussion:",
            "1. Which Word tools did Jessica use to make her report informative and visually appealing?",
            "2. Why do you think SmartArt was a good choice for showing the panda life cycle?"
          ],
          imageUrl: '/images/standard4/chapter4/panda_report_example.png'
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Chapter Summary: Microsoft Word (Part 2)',
          description: "Let's review advanced features of Microsoft Word!",
          content: [
            "Points to Remember:",
            "Ÿ The Insert Tab in Word is used to add elements like Pictures, Tables, Shapes, SmartArt, Charts, Header & Footer, Page Numbers, etc.",
            "Ÿ Tables organise data in rows and columns. Table Design and Table Layout tabs help customize them.",
            "Ÿ Headers (top of page) and Footers (bottom of page) can display text like titles or page numbers on every page.",
            "Ÿ Watermarks are faint background images or text.",
            "Ÿ SmartArt helps create visual diagrams easily.",
            "",
            "Did you know?",
            "Ÿ The first version of Word (Word 1.0) was released in October 1983 for Xenix and MS-DOS.",
            "Ÿ The longest Word document ever created had over 100,000 pages."
          ]
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: Insert Tab',
          description: ["Let's test your knowledge of Word's Insert Tab!"],
          question: "Which group in the 'Insert' tab would you use to add a pre-designed diagram like a cycle or a process list?",
          options: [
            { id: 'c4q1opt1', text: "Tables", isCorrect: false, explanation: "The Tables group is for creating rows and columns of data." },
            { id: 'c4q1opt2', text: "Illustrations (specifically SmartArt)", isCorrect: true, explanation: "Correct! SmartArt, found in the Illustrations group, is used for such diagrams." },
            { id: 'c4q1opt3', text: "Header & Footer", isCorrect: false, explanation: "Header & Footer is for adding content to the top/bottom of pages." },
            { id: 'c4q1opt4', text: "Text", isCorrect: false, explanation: "The Text group includes Text Boxes, WordArt, etc., but SmartArt is for diagrams." }
          ],
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: Table Features',
          description: ["What is the purpose of the 'Merge Cells' feature in the Table Layout tab?"],
          question: "If you want to combine several cells in a table into one single, larger cell, which feature would you use?",
          options: [
            { id: 'c4q2opt1', text: "Split Cells", isCorrect: false, explanation: "Split Cells divides one cell into multiple smaller cells." },
            { id: 'c4q2opt2', text: "Table Styles", isCorrect: false, explanation: "Table Styles changes the visual appearance (colors, borders) of the table." },
            { id: 'c4q2opt3', text: "Merge Cells", isCorrect: true, explanation: "Correct! Merge Cells combines selected cells into one." },
            { id: 'c4q2opt4', text: "Insert Row", isCorrect: false, explanation: "Insert Row adds a new row to the table." }
          ],
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: Document Elements',
          description: ["Where would you typically add a page number that appears on every page?"],
          question: "If you want text like 'Page 1', 'Page 2' to appear automatically on each page, where would you insert it?",
          options: [
            { id: 'c4q3opt1', text: "As a Watermark", isCorrect: false, explanation: "A watermark is a faint background image or text." },
            { id: 'c4q3opt2', text: "In the Header or Footer using Page Number option", isCorrect: true, explanation: "Correct! Page numbers are typically placed in the Header or Footer." },
            { id: 'c4q3opt3', text: "Using SmartArt", isCorrect: false, explanation: "SmartArt is for creating diagrams." },
            { id: 'c4q3opt4', text: "In a Text Box in the middle of the page", isCorrect: false, explanation: "While possible, this wouldn't automatically repeat on every page or update correctly." }
          ],
        }
      ]
    }
  ]
};

export interface Step {
  id: string;
  number: number;
  title: string;
  instruction: string;
  visualContent: string | { src: string; alt?: string };
  audioContent?: string;
}