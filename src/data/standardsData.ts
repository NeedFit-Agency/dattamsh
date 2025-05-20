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
  | 'text';

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
  imageUrl?: string;
  exampleImages?: { src: string; alt: string }[];
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

export type LessonContent = LearningSlide | DragDropSlide | QuizSlide | HistorySlide;


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
        }, {
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
    }, {
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
          imageUrl: '/images/computer.png',
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
            { src: '/images/1st-standard/computer-to-write.png', alt: 'Using a computer to write' },
            { src: '/images/1st-standard/computer-to-draw.png', alt: 'Using a computer to draw' },
            { src: '/images/1st-standard/computer-to-play.png', alt: 'Playing games on a computer' },
            { src: '/images/1st-standard/computer-to-watch.png', alt: 'Watching videos on a computer' },
          ],
          audioSrc: '/audio/computer_uses.mp3',
          speakText: "Computers help us do many things: Type or write letters, stories, and poems. Draw colorful and beautiful paintings. Play fun games. Talk to family and friends who are far away. Listen to music and watch videos."
        }, {
          type: 'learn',
          format: 'text',
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
            { id: 'dnd-item-4', text: 'CPU', type: 'man-made', imageUrl: '/images/cycle.pxng' },
            { id: 'dnd-item-5', text: 'Speakers', type: 'natural', imageUrl: '/images/tree.png' },
          ],
          targets: [
            { id: 'naturalTarget', title: 'Input Devices', type: 'natural' },
            { id: 'manMadeTarget', title: 'Output Devices', type: 'man-made' },
          ],
          audioSrc: '/audio/computer_activity.mp3',
          speakText:
            'Drag each computer part to the correct description box! Is it an input device or an output device?',
        }, {
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
        }, {
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
    }, {
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
        }, {
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
        }, {
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
        }, {
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
    }, {
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
        }, {
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
        }, {
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
        }, {
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
            '🏦 Bank:  Banks use computers to keep track of customer\'s accounts and money. They also help with withdrawing cash from ATMs.'
          ]
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Sort the Places',
          instruction: 'Drag each place into the correct box: "Places where computers are used" or "Places where computers are not used".',
          items: [
            { id: 'dnd-place-1', text: 'School', type: 'man-made' },
            { id: 'dnd-place-3', text: 'Library', type: 'man-made' },
            { id: 'dnd-place-4', text: 'Bank', type: 'man-made' },
            { id: 'dnd-place-6', text: 'Playground', type: 'natural' },
            { id: 'dnd-place-7', text: 'Forest', type: 'natural' },
            { id: 'dnd-place-8', text: 'Beach', type: 'natural' }
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
            { "src": "/images/2nd-standard/communications.png", "alt": "Making phone calls" },
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
          "description": [
            "In MS Paint, using a Line tool you can draw straight lines.",
            "Step 1: Click on the 'Line' tool.",
            "Step 2: Click on the drawing area where you want the line to start, drag it to where you want it to end, and release the mouse button."
          ],
          "exampleImages": [
            { "src": "/images/horizontal_line.png", "alt": "Horizontal line" },
            { "src": "/images/vertical_line.png", "alt": "Vertical line" },
            { "src": "/images/slant_line.png", "alt": "Slant line" }
          ],
          "audioSrc": "/audio/ch4_line_tool.mp3",
          "speakText": "Use the Line tool to draw straight lines by clicking and dragging."
        },
        {
          "type": "learn",
          "format": "step-by-step",
          "title": "Curve Tool",
          "description": [
            "In MS Paint, using a Curve tool you can draw curved and wavy lines.",
            "Step 1: Click on the 'Curve' tool.",
            "Step 2: Draw a straight line first, then click and drag the line to make it curve."
          ],
          "exampleImages": [
            { "src": "/images/curve_example.png", "alt": "Curved line" }
          ],
          "audioSrc": "/audio/ch4_curve_tool.mp3",
          "speakText": "Use the Curve tool to make wavy lines by dragging a straight line."
        },
        {
          "type": "learn",
          "format": "step-by-step",
          "title": "Brushes Tool",
          "description": [
            "The Brushes tool in MS Paint lets you apply colour with various strokes and styles.",
            "Step 1: Click on the Brushes tool to see the different options. Select the type of stroke you want.",
            "Step 2: Drag the mouse pointer on the drawing area to draw.",
            "Step 3: Try different Brushes to see what strokes they make."
          ],
          "exampleImages": [
            { "src": "/images/brush_fish.png", "alt": "Fish drawn with Calligraphy pen" }
          ],
          "audioSrc": "/audio/ch4_brushes.mp3",
          "speakText": "The Brushes tool lets you draw with different styles and colours."
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
          "format": "step-by-step",
          "title": "Add Words to Pictures",
          "description": [
            "Step 1: Open MS Paint and draw a picture (like the flower from the activity).",
            "Step 2: Click the Text Tool (letter 'A') in the Ribbon.",
            "Step 3: Click where you want to add words; a box will pop up.",
            "Step 4: Type your words in the box.",
            "Step 5: Click outside the box to fix the text.",
            "Step 6: Save your picture by clicking 'File', then 'Save As', name it, and click 'Save'."
          ],
          "audioSrc": "/audio/ch4_text_tool.mp3",
          "speakText": "Add words to your picture with the Text tool and save it."
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
        {
          "type": "learn",
          "format": "quiz",
          "title": "Workstation A: Multiple Choice",
          "description": ["Answer the following questions by choosing the correct options."],
          "question": "Choose the correct answer for each question.",
          "options": [
            { "id": "q1-opt1", "text": "1. Which tool would you use to draw a straight line in MS Paint? a. Brush tool b. Line tool c. Curve tool", "isCorrect": true },
            { "id": "q1-opt2", "text": "2. What does the 'Undo' button do in MS Paint? a. It adds colours b. It fixes a mistake c. It makes your drawing bigger", "isCorrect": true },
            { "id": "q1-opt3", "text": "3. What tool would you use to draw a curved line? a. Line tool b. Curve tool c. Eraser tool", "isCorrect": true },
            { "id": "q1-opt4", "text": "4. What happens when you click the 'Redo' button? a. It erases b. It brings back the last action c. It adds text", "isCorrect": true },
            { "id": "q1-opt5", "text": "5. Which tool would you choose to write your name? a. Eraser tool b. Line tool c. Text tool", "isCorrect": true }
          ],
          "explanation": "Line tool draws straight lines, Undo fixes mistakes, Curve tool makes curves, Redo brings back actions, and Text tool adds words.",
          "audioSrc": "/audio/ch4_quiz_a.mp3",
          "speakText": "Pick the right answers about MS Paint tools."
        },
        {
          "type": "learn",
          "format": "quiz",
          "title": "Workstation B: True or False",
          "description": ["State whether the following statements are True or False."],
          "question": "Are these statements true or false?",
          "options": [
            { "id": "q2-opt1", "text": "1. You can use the Text tool to add colours to your picture.", "isCorrect": false },
            { "id": "q2-opt2", "text": "2. The Brushes tool can make different strokes.", "isCorrect": true },
            { "id": "q2-opt3", "text": "3. The Curve tool is used for adding text to your pictures.", "isCorrect": false },
            { "id": "q2-opt4", "text": "4. To undo a mistake in MS Paint, you use the Redo button.", "isCorrect": false },
            { "id": "q2-opt5", "text": "5. The Eraser tool in MS Paint can only remove entire drawings, not just parts.", "isCorrect": false }
          ],
          "explanation": "Text tool adds words, not colours; Brushes make strokes; Curve is for lines, not text; Undo fixes mistakes, not Redo; Eraser can remove parts.",
          "audioSrc": "/audio/ch4_quiz_b.mp3",
          "speakText": "Decide if these are true or false about MS Paint."
        },
        {
          "type": "learn",
          "format": "quiz",
          "title": "Workstation C: Match Tools",
          "description": ["Match the tools in column 'A' with their functions in column 'B'."],
          "question": "Match each tool to its function.",
          "options": [
            { "id": "q3-opt1", "text": "1. Brushes - a. adds colours and different stroke styles", "isCorrect": true },
            { "id": "q3-opt2", "text": "2. Line - b. draws straight lines", "isCorrect": true },
            { "id": "q3-opt3", "text": "3. Eraser - c. fixes mistakes by erasing part of the drawing", "isCorrect": true },
            { "id": "q3-opt4", "text": "4. Curve - d. draws curved and wavy lines", "isCorrect": true },
            { "id": "q3-opt5", "text": "5. Text - e. adds text to the picture", "isCorrect": true }
          ],
          "explanation": "Brushes add styles, Line draws straight, Eraser fixes, Curve makes waves, Text adds words.",
          "audioSrc": "/audio/ch4_quiz_c.mp3",
          "speakText": "Match the MS Paint tools to what they do."
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