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

export type LessonContent = LearningSlide | DragDropSlide;

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
        },
        {
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
    },
    {
      id: 2,
      title: "All About Computers",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Introduction',
          description: [
            "2nd chapter! Hi there! I'm Zippy! We see so many things around us every day.",
            'Some things, like trees and birds, are found in nature.',
            'Other things, like chairs and cars, are made by people.',
            "Let's learn the difference together!",
          ],
        }
      ]
    },
    {
      id: 3,
      title: "All About Computers",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Introduction',
          description: [
            "3rd chapter! Hi there! I'm Zippy! We see so many things around us every day.",
            'Some things, like trees and birds, are found in nature.',
            'Other things, like chairs and cars, are made by people.',
            "Let's learn the difference together!",
          ],
        }
      ]
    },
    {
      id: 4,
      title: "All About Computers",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Introduction',
          description: [
            "4th chapter! Hi there! I'm Zippy! We see so many things around us every day.",
            'Some things, like trees and birds, are found in nature.',
            'Other things, like chairs and cars, are made by people.',
            "Let's learn the difference together!",
          ],
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
            '🏫 School: Learn new things, watch videos, and keep records.',
            '🛒 Shop: Help with billing and checking prices.',
            '🏢 Office: Write letters, send emails, and store information.',
            '🏥 Hospital: Store patient info and help doctors.',
            '🏠 Home: Watch cartoons, play games, and learn.',
            '🏦 Bank: Keep track of money and help with ATMs.'
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
          imageUrl: '/images/skeleton-hardware.png',
          exampleImages: [
            { src: '/images/hardware.png', alt: 'Computer hardware' },
            { src: '/images/skeleton-software.png', alt: 'Skeleton illustration of computer software' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Activity: Name Hardware Parts',
          description: [
            'Can you name two other parts of computers that can be termed as Hardware? Hint: We have learnt about these parts in grade 1 as Extra parts of the Computer.'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Activity: Identify Hardware and Software',
          description: [
            'Identify the pictures. Write H for hardware and S for software.'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Input and Output Devices',
          description: [
            'Input is the instruction we give to a computer. We give instructions by typing or clicking. These instructions tell the computer what to do.',
            'Output is the result the computer provides, showing what it has done with our input. The computer provides output on the screen or on printed documents.',
            'Computers can "listen", that is, receive instructions from users using input devices. Computers can "talk", that is, give results to users using output devices.'
          ],
          imageUrl: '/images/skeleton-input-output.png',
          exampleImages: [
            { src: '/images/skeleton-input.png', alt: 'Skeleton illustration of input devices' },
            { src: '/images/skeleton-output.png', alt: 'Skeleton illustration of output devices' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Input Devices: Listening',
          description: [
            'We have already learnt about these input devices and used them: Keyboard, Mouse.',
            'More input devices are the scanner and the microphone.',
            'Scanner: A scanner is a machine that helps turn pictures and papers into digital files so you can see them on the computer.',
            'Microphone: A microphone is a device that helps record sounds and voice on to a computer. Microphones are used for talking, giving voice instructions, singing, and recording music.'
          ],
          imageUrl: '/images/skeleton-input.png',
          exampleImages: [
            { src: '/images/skeleton-keyboard.png', alt: 'Skeleton illustration of a keyboard' },
            { src: '/images/skeleton-mouse.png', alt: 'Skeleton illustration of a mouse' },
            { src: '/images/skeleton-scanner.png', alt: 'Skeleton illustration of a scanner' },
            { src: '/images/skeleton-microphone.png', alt: 'Skeleton illustration of a microphone' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Output Devices: Talking',
          description: [
            'We have already learnt about output devices and used them: Speakers, Monitor.',
            'Another output device is the printer. Printer: It puts your drawing or words from the computer onto paper.'
          ],
          imageUrl: '/images/skeleton-output.png',
          exampleImages: [
            { src: '/images/skeleton-monitor.png', alt: 'Skeleton illustration of a monitor' },
            { src: '/images/skeleton-speaker.png', alt: 'Skeleton illustration of a speaker' },
            { src: '/images/skeleton-printer.png', alt: 'Skeleton illustration of a printer' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Activity: Identifying input and output devices',
          description: [
            'Write I for input and O for output next to each device.',
            '1. Keyboard: _______',
            '2. Monitor: _______',
            '3. Microphone: _______',
            '4. Mouse: _______',
            '5. Printer: _______',
            '6. Scanner: _______'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Activity: Using a calculator',
          description: [
            'Guess whether each step is Input, Process, or Output. Use the calculator and follow the steps below. For each step, tick the correct option: input, process, or output.',
            '1. Type the numbers 5, +, and 3 on the calculator. input process output',
            '2. The calculator adds the numbers together. input process output',
            '3. The calculator shows the result, 8, on the screen. input process output',
            'Is a calculator an input device or an output device? Why?'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: "Caselet: Tina's Big Day with the Computer",
          description: [
            'Tina was excited because today her teacher, Miss Lily, was teaching the class about computers! Miss Lily asked, "Where do we use computers?" Tina raised her hand and said, "We use computers at home, in schools, and even at shops!"',
            'Miss Lily showed them different parts of the computer. She pointed to the monitor, where they could see pictures and words. Then she held up the keyboard with lots of buttons for typing and the mouse that helps us click. She also showed the speakers for sound and a printer that prints on paper.',
            'These parts are called input and output devices, explained Miss Lily. When you type or click, youre giving input. And when you see things on the monitor or hear sounds, thats the output.',
            'Finally, Miss Lily explained how computers work: input, process, and output. She said, If you want to draw, you use the mouse to give input, the computer processes it, and your picture appears on the screen as output.',
            'Tina had a lot of fun learning and couldnt wait to share what she learnt with her family.'
          ],
          imageUrl: '/images/skeleton-computer-scene.png',
          exampleImages: [
            { src: '/images/skeleton-classroom.png', alt: 'Skeleton illustration of a classroom with computers' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Questions for discussion',
          description: [
            '1. Where have you seen people using computers?',
            '2. What parts of the computer did Tina learn about?',
            "3. What's the difference between input and output?"
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Did you know?',
          description: [
            'The oldest working computer, called the Harvard Mark I, was made in 1944 and still works today.'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Points to Remember',
          description: [
            'Computers are used in schools, homes, shops, hospitals, banks, and many more places.',
            'Hardware is the part of a computer you can touch, like the monitor, keyboard, and mouse.',
            'Software is the program that tells the computer what to do, like applications and programs like Notepad, MS Paint, etc.',
            'Input devices help the computer listen, that is, instructions are given to a computer using input devices like a keyboard and mouse.',
            'Output devices help the computer talk, that is, the computer gives results to the user using output devices like monitor, printer, and speakers.',
            'You tell the computer what to do (input), it does the work (process), and then shows a result (output).',
            'The CPU processes the instructions.'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'WORKSTATION: Who am I?',
          description: [
            'A. Who am I? Choose the correct answer from the list given below. keyboard, monitor, speakers, mouse, software',
            '1. I let you see what the computer is doing, but I do not make a sound. Who am I? _______',
            '2. I help you tell the computer what to do by clicking and moving. Who am I? _______',
            '3. I help you hear music from the computer. Who am I? _______',
            '4. I help you type letters and words into the computer. Who am I? _______',
            '5. I am inside the computer, you cannot touch me, but without me, the computer will not be useful. Who am I? _______'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'WORKSTATION: Circle the odd one out',
          description: [
            '1. Places where computers are used: a. school b. hospital c. tree d. library',
            '2. Not a hardware: a. keyboard b. mouse c. MS Word d. printer',
            '3. Not an output device: a. monitor b. speaker c. keyboard d. printer',
            '4. Non-computer item: a. printer b. speaker c. pencil d. scanner',
            '5. Not a software: a. whatsapp b. keyboard c. MS Paint d. notepad'
          ]
        }
      ]
    }
  ]
};