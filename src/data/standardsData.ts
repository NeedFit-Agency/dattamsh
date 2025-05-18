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
  // Format will be 'quiz'
}

export type LessonContent = LearningSlide | DragDropSlide | QuizSlide;

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
        {
          type: 'learn',
          format: 'quiz',
          title: 'Chapter Quiz: Nature and Man-made',
          description: ["Let's check what you've learned about natural and man-made things!"],
          question: "Which of these is a natural thing?",
          options: [
            { id: "q1-opt1", text: "Pencil", isCorrect: false, explanation: "A pencil is made by people, so it's a man-made thing." },
            { id: "q1-opt2", text: "Mountain", isCorrect: true, explanation: "Correct! Mountains are found in nature and weren't made by people." },
            { id: "q1-opt3", text: "Book", isCorrect: false, explanation: "Books are made by people, so they are man-made things." },
            { id: "q1-opt4", text: "Desk", isCorrect: false, explanation: "Desks are made by people, so they are man-made things." }
          ],
          explanation: "Natural things are found in nature and not made by humans. Man-made things are created by people.",
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/quiz1.mp3',
          speakText: "Let's check what you've learned about natural and man-made things! Which of these is a natural thing?"
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
        {
          type: 'learn',
          format: 'quiz',
          title: 'Chapter Quiz: All About Computers',
          description: [
            "Let's see what we've learned about computers!"
          ],
          audioSrc: '/audio/computer_quiz.mp3',
          speakText: "Let's see what we've learned about computers! Answer these fun questions!",
          question: "Which part of the computer is called its 'brain'?",
          options: [
            { id: "q1-opt1", text: "Monitor", isCorrect: false, explanation: "The monitor shows what the computer is doing, but it's not the brain." },
            { id: "q1-opt2", text: "Keyboard", isCorrect: false, explanation: "The keyboard helps us type, but it's not the brain." },
            { id: "q1-opt3", text: "CPU", isCorrect: true, explanation: "Correct! The CPU (Central Processing Unit) is the brain of the computer." },
            { id: "q1-opt4", text: "Mouse", isCorrect: false, explanation: "The mouse helps us point and click, but it's not the brain." }
          ],
          explanation: "The CPU (Central Processing Unit) is like the brain of the computer. It does all the thinking and processing of information!"
        }
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
        {
          type: 'learn',
          format: 'quiz',
          title: 'Chapter Quiz: Computer Care and Safety',
          description: ["Let's check what you've learned about taking care of computers!"],
          question: "Which of these is a good computer care habit?",
          options: [
            { id: "q3-opt1", text: "Eating snacks while using the computer", isCorrect: false, explanation: "Food and drinks should be kept away from computers to avoid damage." },
            { id: "q3-opt2", text: "Pressing the keys very hard when typing", isCorrect: false, explanation: "You should press keys gently to avoid damaging the keyboard." },
            { id: "q3-opt3", text: "Shutting down the computer properly", isCorrect: true, explanation: "Correct! Always shut down your computer properly to keep it working well." },
            { id: "q3-opt4", text: "Using the computer without taking breaks", isCorrect: false, explanation: "Taking breaks is important for your eyes and body when using a computer." }
          ],
          explanation: "Taking care of computers helps them last longer, and taking care of ourselves while using computers keeps us healthy!",
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/quiz3.mp3',
          speakText: "Let's check what you've learned about taking care of computers! Which of these is a good computer care habit?"
        }
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
        {
          type: 'learn',
          format: 'quiz',
          title: 'Chapter Quiz: Keyboard and Mouse Fun',
          description: ["Let's see what you've learned about keyboards and mice!"],
          question: "Which is the longest key on the keyboard?",
          options: [
            { id: "q4-opt1", text: "Enter key", isCorrect: false, explanation: "The Enter key is important but it's not the longest key." },
            { id: "q4-opt2", text: "Space bar", isCorrect: true, explanation: "Correct! The Space bar is the longest key on the keyboard and puts spaces between words." },
            { id: "q4-opt3", text: "Shift key", isCorrect: false, explanation: "The Shift key helps make capital letters, but it's not the longest key." },
            { id: "q4-opt4", text: "Backspace key", isCorrect: false, explanation: "The Backspace key helps delete mistakes, but it's not the longest key." }
          ],
          explanation: "The Space bar is the longest key on the keyboard. It helps us put spaces between words when we type.",
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/quiz4.mp3',
          speakText: "Let's see what you've learned about keyboards and mice! Which is the longest key on the keyboard?"
        }
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
    }
  ]
};