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
  steps?: { title: string; description: string; imageUrl?: string }[];
  questions?: { question: string; options: string[]; answer: number }[];
  // Format will typically be 'text', 'video', 'step-by-step', 'quiz', etc.
}

export interface QuizSlide extends BaseContentProps {
  type: 'quiz';
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  explanation?: string;
  imageUrl?: string;
  // Format will typically be 'quiz'
}

export interface DraggableItemData {
  id: string;
  text: string;
  type: 'natural' | 'man-made';
  imageUrl?: string;
}

export interface DropTargetData {
  id: 'naturalTarget' | 'manMadeTarget';
  title: string;
  type: 'natural' | 'man-made';
}

export interface DragDropSlide extends BaseContentProps {
  type: 'drag-drop';
  instruction: string;
  items: DraggableItemData[];
  targets: DropTargetData[];
  // Format will typically be 'drag-drop'
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
      title: "Introduction to Machines",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Natural and Man-made Things',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn about natural and man-made things.",
            "Natural things are those that exist in nature, like the sun, water, trees, and birds.",
            "Man-made things are created by people, like schools, bicycles, chairs, and blackboards.",
            "Let's explore these different types of things together!"
          ],
          imageUrl: '/images/natural-manmade.png',
          audioSrc: '/audio/natural_manmade.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn about natural and man-made things. Natural things are those that exist in nature, like the sun, water, trees, and birds. Man-made things are created by people, like schools, bicycles, chairs, and blackboards. Let's explore these different types of things together!"
        },
        {
          type: 'learn',
          format: 'text',
          title: 'What are Machines?',
          description: [
            "Machines are man-made things that make our work easier and save our time.",
            "Some examples of machines are pencil sharpeners, scissors, refrigerators, washing machines, and fans.",
            "Each machine has a special job. For example, a pencil sharpener helps sharpen pencils, and a refrigerator keeps food cold and fresh.",
            "Machines help us do many different tasks more quickly and easily."
          ],
          imageUrl: '/images/machines.png',
          audioSrc: '/audio/machines.mp3',
          speakText: "Machines are man-made things that make our work easier and save our time. Some examples of machines are pencil sharpeners, scissors, refrigerators, washing machines, and fans. Each machine has a special job. For example, a pencil sharpener helps sharpen pencils, and a refrigerator keeps food cold and fresh. Machines help us do many different tasks more quickly and easily."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Computer as a Super Machine',
          description: [
            "A computer is a special type of machine called a super machine.",
            "Computers help us do many things like typing stories, searching for information, watching movies, and playing games.",
            "We can also use computers to draw colorful pictures, talk to friends and family far away, and listen to music.",
            "Computers make our work easier and more fun!"
          ],
          imageUrl: '/images/computer-uses.png',
          audioSrc: '/audio/computer_uses.mp3',
          speakText: "A computer is a special type of machine called a super machine. Computers help us do many things like typing stories, searching for information, watching movies, and playing games. We can also use computers to draw colorful pictures, talk to friends and family far away, and listen to music. Computers make our work easier and more fun!"
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Natural vs Man-made',
          instruction: 'Help me sort these items into natural things and man-made things. Drag each item to the correct category.',
          items: [
            { id: 'dnd-item-1', text: 'Sun', type: 'natural', imageUrl: '/images/sun-icon.png' },
            { id: 'dnd-item-2', text: 'Computer', type: 'man-made', imageUrl: '/images/computer-icon.png' },
            { id: 'dnd-item-3', text: 'Tree', type: 'natural', imageUrl: '/images/tree-icon.png' },
            { id: 'dnd-item-4', text: 'Bicycle', type: 'man-made', imageUrl: '/images/bicycle-icon.png' },
            { id: 'dnd-item-5', text: 'Bird', type: 'natural', imageUrl: '/images/bird-icon.png' },
            { id: 'dnd-item-6', text: 'Chair', type: 'man-made', imageUrl: '/images/chair-icon.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Natural Things', type: 'natural' },
            { id: 'manMadeTarget', title: 'Man-made Things', type: 'man-made' }
          ],
          audioSrc: '/audio/natural_manmade_activity.mp3',
          speakText: 'Help me sort these items into natural things and man-made things. Drag each item to the correct category.'
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Introduction to Machines Quiz',
          question: 'Which of these is a machine?',
          options: [
            { id: 'quiz-opt-1', text: 'Tree', isCorrect: false, explanation: 'A tree is a natural thing, not a machine.' },
            { id: 'quiz-opt-2', text: 'Computer', isCorrect: true, explanation: 'A computer is a man-made machine that helps us do many tasks.' },
            { id: 'quiz-opt-3', text: 'Sun', isCorrect: false, explanation: 'The sun is a natural thing, not a machine.' },
            { id: 'quiz-opt-4', text: 'Bird', isCorrect: false, explanation: 'A bird is a natural thing, not a machine.' }
          ],
          explanation: 'Machines are man-made things that make our work easier and save time. A computer is a machine because it is made by people and helps us do many tasks more easily.',
          imageUrl: '/images/machines-quiz.png',
          audioSrc: '/audio/machines_quiz.mp3',
          speakText: 'Which of these is a machine? Is it a tree, computer, sun, or bird?'
        }
      ]
    },
    {
      id: 2,
      title: "Weather and Seasons",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Parts of a Computer',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn about the different parts of a computer.",
            "Just like our body has different parts that help us do things, a computer also has important parts that help it work.",
            "The main parts of a computer are the monitor, keyboard, mouse, CPU, and CPU cabinet.",
            "Let's learn about each of these parts!"
          ],
          imageUrl: '/images/computer-parts.png',
          audioSrc: '/audio/computer_parts.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn about the different parts of a computer. Just like our body has different parts that help us do things, a computer also has important parts that help it work. The main parts of a computer are the monitor, keyboard, mouse, CPU, and CPU cabinet. Let's learn about each of these parts!"
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Basic Parts of a Computer',
          description: [
            "Monitor: It's like a TV screen that shows everything the computer is doing.",
            "Keyboard: It has keys with letters, numbers, and symbols that you press to type.",
            "Mouse: A small device that moves the arrow (pointer) on the screen and helps you select things.",
            "CPU (Central Processing Unit): This is the 'brain' of the computer that helps it do everything you want it to do.",
            "CPU Cabinet: This holds the CPU and other important parts inside it, connecting everything together."
          ],
          exampleImages: [
            { src: '/images/monitor.png', alt: 'Monitor' },
            { src: '/images/keyboard.png', alt: 'Keyboard' },
            { src: '/images/mouse.png', alt: 'Mouse' },
            { src: '/images/cpu.png', alt: 'CPU' }
          ],
          audioSrc: '/audio/basic_parts.mp3',
          speakText: "Monitor: It's like a TV screen that shows everything the computer is doing. Keyboard: It has keys with letters, numbers, and symbols that you press to type. Mouse: A small device that moves the arrow (pointer) on the screen and helps you select things. CPU (Central Processing Unit): This is the 'brain' of the computer that helps it do everything you want it to do. CPU Cabinet: This holds the CPU and other important parts inside it, connecting everything together."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Types of Computers',
          description: [
            "There are different types of computers based on their size, shape, and use.",
            "Desktop: A computer that stays in one place, usually on a desk or table.",
            "Laptop: A portable computer that you can carry with you. It's usually the size of an adult's lap.",
            "Tablet: A small, flat computer with a touchscreen that you can carry around easily.",
            "Did you know that a long time ago, computers were as big as a whole room? Now we have computers that can fit in our pockets!"
          ],
          imageUrl: '/images/computer-types.png',
          audioSrc: '/audio/computer_types.mp3',
          speakText: "There are different types of computers based on their size, shape, and use. Desktop: A computer that stays in one place, usually on a desk or table. Laptop: A portable computer that you can carry with you. It's usually the size of an adult's lap. Tablet: A small, flat computer with a touchscreen that you can carry around easily. Did you know that a long time ago, computers were as big as a whole room? Now we have computers that can fit in our pockets!"
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Computer Parts',
          instruction: 'Help me match these computer parts with what they do. Drag each part to its correct function.',
          items: [
            { id: 'dnd-item-1', text: 'Monitor', type: 'natural', imageUrl: '/images/monitor-icon.png' },
            { id: 'dnd-item-2', text: 'Keyboard', type: 'natural', imageUrl: '/images/keyboard-icon.png' },
            { id: 'dnd-item-3', text: 'Mouse', type: 'natural', imageUrl: '/images/mouse-icon.png' },
            { id: 'dnd-item-4', text: 'CPU', type: 'natural', imageUrl: '/images/cpu-icon.png' },
            { id: 'dnd-item-5', text: 'Speakers', type: 'natural', imageUrl: '/images/speakers-icon.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Computer Parts', type: 'natural' }
          ],
          audioSrc: '/audio/computer_parts_activity.mp3',
          speakText: 'Help me match these computer parts with what they do. Drag each part to its correct function.'
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Computer Parts Quiz',
          question: 'Which part of the computer is called the "brain"?',
          options: [
            { id: 'quiz-opt-1', text: 'Monitor', isCorrect: false, explanation: 'The monitor is like a TV screen that shows what the computer is doing.' },
            { id: 'quiz-opt-2', text: 'Keyboard', isCorrect: false, explanation: 'The keyboard has keys that you press to type letters, numbers, and symbols.' },
            { id: 'quiz-opt-3', text: 'CPU', isCorrect: true, explanation: 'The CPU (Central Processing Unit) is called the brain of the computer because it helps the computer do everything you want it to do.' },
            { id: 'quiz-opt-4', text: 'Mouse', isCorrect: false, explanation: 'The mouse helps you point to and select things on the screen.' }
          ],
          explanation: 'The CPU (Central Processing Unit) is called the brain of the computer because it processes information and controls all the other parts, just like how our brain controls our body.',
          imageUrl: '/images/computer-parts-quiz.png',
          audioSrc: '/audio/computer_parts_quiz.mp3',
          speakText: 'Which part of the computer is called the "brain"? Is it the monitor, keyboard, CPU, or mouse?'
        }
      ]
    },
  
    {
      id: 3,
      title: "Computer Care and Safety",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',

          title: 'Taking Care of Yourself',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn how to take care of ourselves while using a computer.",
            "Just like we take care of our toys and games, it's important to take care of ourselves when using a computer.",
            "Using a computer for too long can make our eyes tired and our body stiff.",
            "Let's learn some ways to stay healthy while using a computer!"
          ],
          imageUrl: '/images/computer-care-self.png',
          audioSrc: '/audio/computer_care_self.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn how to take care of ourselves while using a computer. Just like we take care of our toys and games, it's important to take care of ourselves when using a computer. Using a computer for too long can make our eyes tired and our body stiff. Let's learn some ways to stay healthy while using a computer!"
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Healthy Computer Habits',
          description: [
            "Take Regular Breaks: Don't sit in front of the computer for more than 30 minutes at a time. Get up and move around.",
            "Maintain Good Posture: Keep your back straight while using a computer.",
            "Blink Often: Blinking keeps your eyes moist and reduces dryness from staring at the screen.",
            "Adjust Screen Brightness: Make sure the screen is not too bright or too dim.",
            "Stretch Regularly: Stand up and stretch your body every hour to keep your muscles relaxed."
          ],
          exampleImages: [
            { src: '/images/take-breaks.png', alt: 'Taking Breaks' },
            { src: '/images/good-posture.png', alt: 'Good Posture' }
          ],
          audioSrc: '/audio/healthy_habits.mp3',
          speakText: "Take Regular Breaks: Don't sit in front of the computer for more than 30 minutes at a time. Get up and move around. Maintain Good Posture: Keep your back straight while using a computer. Blink Often: Blinking keeps your eyes moist and reduces dryness from staring at the screen. Adjust Screen Brightness: Make sure the screen is not too bright or too dim. Stretch Regularly: Stand up and stretch your body every hour to keep your muscles relaxed."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Taking Care of the Computer',
          description: [
            "Keep it Clean: Regularly clean your computer's keyboard, screen, and small gaps to prevent dust from building up.",
            "Avoid Overheating: Computers need proper air around them so they don't get too hot. Use your computer on a table, not on a bed or sofa.",
            "Handle with Care: Don't drop or bump your computer. If you have a laptop, always lift it from the base, not the screen.",
            "Avoid Eating and Drinking near Computers: Spills can damage the computer.",
            "Shut Down Properly: Always turn off your computer the right way to prevent problems or damage."
          ],
          imageUrl: '/images/computer-care.png',
          audioSrc: '/audio/computer_care.mp3',
          speakText: "Keep it Clean: Regularly clean your computer's keyboard, screen, and small gaps to prevent dust from building up. Avoid Overheating: Computers need proper air around them so they don't get too hot. Use your computer on a table, not on a bed or sofa. Handle with Care: Don't drop or bump your computer. If you have a laptop, always lift it from the base, not the screen. Avoid Eating and Drinking near Computers: Spills can damage the computer. Shut Down Properly: Always turn off your computer the right way to prevent problems or damage."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',

          title: 'Activity: Computer Care',
          instruction: 'Help me identify good computer habits. Drag each habit to the correct category.',
          items: [
            { id: 'dnd-item-1', text: 'Taking regular breaks', type: 'natural', imageUrl: '/images/breaks-icon.png' },
            { id: 'dnd-item-2', text: 'Eating snacks over the keyboard', type: 'man-made', imageUrl: '/images/snacks-icon.png' },
            { id: 'dnd-item-3', text: 'Keeping the computer clean', type: 'natural', imageUrl: '/images/clean-icon.png' },
            { id: 'dnd-item-4', text: 'Using the computer on a bed', type: 'man-made', imageUrl: '/images/bed-icon.png' },
            { id: 'dnd-item-5', text: 'Shutting down properly', type: 'natural', imageUrl: '/images/shutdown-icon.png' },
            { id: 'dnd-item-6', text: 'Sitting with good posture', type: 'natural', imageUrl: '/images/posture-icon.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Good Habits', type: 'natural' },
            { id: 'manMadeTarget', title: 'Bad Habits', type: 'man-made' }
          ],
          audioSrc: '/audio/computer_care_activity.mp3',
          speakText: 'Help me identify good computer habits. Drag each habit to the correct category.'
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Computer Care Quiz',
          question: 'What should you do if you have been using the computer for 30 minutes?',
          options: [
            { id: 'quiz-opt-1', text: 'Continue using it for another hour', isCorrect: false, explanation: 'Using a computer for too long without breaks can make your eyes tired and your body stiff.' },
            { id: 'quiz-opt-2', text: 'Take a break and stretch', isCorrect: true, explanation: 'Taking regular breaks helps keep your body healthy when using a computer.' },
            { id: 'quiz-opt-3', text: 'Turn up the brightness', isCorrect: false, explanation: 'Turning up the brightness too high can strain your eyes.' },
            { id: 'quiz-opt-4', text: 'Move to a softer surface like a bed', isCorrect: false, explanation: 'Using a computer on soft surfaces like beds can cause it to overheat.' }
          ],
          explanation: 'It is important to take regular breaks when using a computer. After about 30 minutes, you should stand up, stretch, and rest your eyes. This helps keep your body and eyes healthy.',
          imageUrl: '/images/computer-care-quiz.png',
          audioSrc: '/audio/computer_care_quiz.mp3',
          speakText: 'What should you do if you have been using the computer for 30 minutes? Should you continue using it for another hour, take a break and stretch, turn up the brightness, or move to a softer surface like a bed?'
        }
      ]
    },
    {
      id: 4,
      title: "Keyboard and Mouse Fun",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',

          title: 'Introduction to Keyboard',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn about the keyboard and mouse.",
            "We use pencils or pens to write in a notebook, but how do we write on a computer? We use a keyboard!",
            "A keyboard is a board with many buttons called keys. We press these keys to write text on the computer.",
            "When we type on the keyboard, the text appears on the monitor. A blinking line called the cursor shows where the text will appear."
          ],
          imageUrl: '/images/keyboard-intro.png',
          audioSrc: '/audio/keyboard_intro.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn about the keyboard and mouse. We use pencils or pens to write in a notebook, but how do we write on a computer? We use a keyboard! A keyboard is a board with many buttons called keys. We press these keys to write text on the computer. When we type on the keyboard, the text appears on the monitor. A blinking line called the cursor shows where the text will appear."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Types of Keys',
          description: [
            "There are different types of keys on a keyboard:",
            "Alphabet Keys: These include letters from A to Z and help us write words and sentences.",
            "Number Keys: These include numbers from 0 to 9 and help us type numbers.",
            "Special Keys: These include the Space Bar (creates spaces between words), Enter key (moves to a new line), Caps Lock key (makes letters capital), Backspace key (deletes text to the left), and Delete key (removes text to the right).",
            "Direction Keys: Also known as arrow keys, these help move the cursor in different directions on the screen."
          ],
          exampleImages: [
            { src: '/images/alphabet-keys.png', alt: 'Alphabet Keys' },
            { src: '/images/special-keys.png', alt: 'Special Keys' }
          ],
          audioSrc: '/audio/key_types.mp3',
          speakText: "There are different types of keys on a keyboard: Alphabet Keys: These include letters from A to Z and help us write words and sentences. Number Keys: These include numbers from 0 to 9 and help us type numbers. Special Keys: These include the Space Bar (creates spaces between words), Enter key (moves to a new line), Caps Lock key (makes letters capital), Backspace key (deletes text to the left), and Delete key (removes text to the right). Direction Keys: Also known as arrow keys, these help move the cursor in different directions on the screen."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Introduction to Mouse',
          description: [
            "A mouse is a very important part of a computer.",
            "Just like we point to things with our finger, we use a mouse to point to things on a computer screen.",
            "When you move the mouse on your desk, the pointer (arrow) on the screen moves too.",
            "A mouse has different parts: Left Button (used to select or click things), Right Button (opens special menus), Scroll Wheel (helps move up and down on a page), and the Body (the main part you hold)."
          ],
          imageUrl: '/images/mouse-intro.png',
          audioSrc: '/audio/mouse_intro.mp3',
          speakText: "A mouse is a very important part of a computer. Just like we point to things with our finger, we use a mouse to point to things on a computer screen. When you move the mouse on your desk, the pointer (arrow) on the screen moves too. A mouse has different parts: Left Button (used to select or click things), Right Button (opens special menus), Scroll Wheel (helps move up and down on a page), and the Body (the main part you hold)."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Keyboard and Mouse Parts',
          instruction: 'Help me identify the parts of a keyboard and mouse. Drag each label to the correct part.',
          items: [
            { id: 'dnd-item-1', text: 'Space Bar', type: 'natural', imageUrl: '/images/spacebar-icon.png' },
            { id: 'dnd-item-2', text: 'Enter Key', type: 'natural', imageUrl: '/images/enter-icon.png' },
            { id: 'dnd-item-3', text: 'Left Mouse Button', type: 'natural', imageUrl: '/images/left-button-icon.png' },
            { id: 'dnd-item-4', text: 'Scroll Wheel', type: 'natural', imageUrl: '/images/scroll-wheel-icon.png' },
            { id: 'dnd-item-5', text: 'Arrow Keys', type: 'natural', imageUrl: '/images/arrow-keys-icon.png' },
            { id: 'dnd-item-6', text: 'Right Mouse Button', type: 'natural', imageUrl: '/images/right-button-icon.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Keyboard and Mouse Parts', type: 'natural' }
          ],
          audioSrc: '/audio/keyboard_mouse_activity.mp3',
          speakText: 'Help me identify the parts of a keyboard and mouse. Drag each label to the correct part.'
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Keyboard and Mouse Quiz',
          question: 'Which key creates a space between words?',
          options: [
            { id: 'quiz-opt-1', text: 'Enter Key', isCorrect: false, explanation: 'The Enter key moves the cursor to a new line.' },
            { id: 'quiz-opt-2', text: 'Space Bar', isCorrect: true, explanation: 'The Space Bar is the longest key on the keyboard and creates spaces between words.' },
            { id: 'quiz-opt-3', text: 'Caps Lock Key', isCorrect: false, explanation: 'The Caps Lock key makes letters capital when you type.' },
            { id: 'quiz-opt-4', text: 'Backspace Key', isCorrect: false, explanation: 'The Backspace key deletes text to the left of the cursor.' }
          ],
          explanation: 'The Space Bar is the longest key on the keyboard. When you press it, it creates a space between words, which is very important for making your writing clear and readable.',
          imageUrl: '/images/keyboard-mouse-quiz.png',
          audioSrc: '/audio/keyboard_mouse_quiz.mp3',
          speakText: 'Which key creates a space between words? Is it the Enter Key, Space Bar, Caps Lock Key, or Backspace Key?'
        }
      ]
    }
  ],
  "4": [
    {
      id: 1,

      title: "Microsoft Word (Part 2)",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',

          title: 'Insert Tab Features',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn about Microsoft Word's Insert Tab.",
            "The Insert tab in Microsoft Word has many useful features that help make your documents more interesting and organized.",
            "You can add pictures, tables, headers, footers, and many other elements to make your document look better.",
            "Let's explore some of these features together!"
          ],
          imageUrl: '/images/word-insert-tab.png',
          audioSrc: '/audio/word_insert_tab.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn about Microsoft Word's Insert Tab. The Insert tab in Microsoft Word has many useful features that help make your documents more interesting and organized. You can add pictures, tables, headers, footers, and many other elements to make your document look better. Let's explore some of these features together!"
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Adding Tables',
          description: [
            "Tables help organize information in rows and columns, like a grid.",
            "To create a table: Go to the Insert tab, click on Table, and select the number of rows and columns you want.",
            "You can also use Quick Tables which are pre-designed table formats for things like calendars.",
            "After creating your table, you can add colors, borders, and merge cells to make it look nice."
          ],
          imageUrl: '/images/word-tables.png',
          audioSrc: '/audio/word_tables.mp3',
          speakText: "Tables help organize information in rows and columns, like a grid. To create a table: Go to the Insert tab, click on Table, and select the number of rows and columns you want. You can also use Quick Tables which are pre-designed table formats for things like calendars. After creating your table, you can add colors, borders, and merge cells to make it look nice."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Headers and Footers',
          description: [
            "Headers and footers are special areas at the top and bottom of each page in your document.",
            "Header: The space at the top of each page where you can add your name or the document title.",
            "Footer: The space at the bottom of each page where you can add page numbers or the date.",
            "To add a header or footer: Go to the Insert tab, click on Header or Footer, and choose a style you like."
          ],
          imageUrl: '/images/word-header-footer.png',
          audioSrc: '/audio/word_header_footer.mp3',
          speakText: "Headers and footers are special areas at the top and bottom of each page in your document. Header is the space at the top of each page where you can add your name or the document title. Footer is the space at the bottom of each page where you can add page numbers or the date. To add a header or footer: Go to the Insert tab, click on Header or Footer, and choose a style you like."
        },
        {
          type: 'learn',
          format: 'text',

          title: 'Adding Images and SmartArt',
          description: [
            "You can make your document more interesting by adding pictures and SmartArt.",
            "To insert an image: Go to the Insert tab, click on Pictures, find the picture on your computer, and click to insert it.",
            "SmartArt helps you create diagrams and visual representations of information, like life cycles or processes.",
            "To add SmartArt: Go to the Insert tab, click on SmartArt, choose a design, and add your text."
          ],
          exampleImages: [
            { src: '/images/insert-image.png', alt: 'Inserting an Image' },
            { src: '/images/smartart-example.png', alt: 'SmartArt Example' }
          ],
          audioSrc: '/audio/word_images_smartart.mp3',
          speakText: "You can make your document more interesting by adding pictures and SmartArt. To insert an image: Go to the Insert tab, click on Pictures, find the picture on your computer, and click to insert it. SmartArt helps you create diagrams and visual representations of information, like life cycles or processes. To add SmartArt: Go to the Insert tab, click on SmartArt, choose a design, and add your text."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Word Insert Features',
          instruction: 'Help me match these Word features with their correct descriptions. Drag the features to their descriptions.',
          items: [
            { id: 'dnd-item-1', text: 'Table', type: 'natural', imageUrl: '/images/table-icon.png' },
            { id: 'dnd-item-2', text: 'Header', type: 'natural', imageUrl: '/images/header-icon.png' },
            { id: 'dnd-item-3', text: 'Footer', type: 'natural', imageUrl: '/images/footer-icon.png' },
            { id: 'dnd-item-4', text: 'SmartArt', type: 'natural', imageUrl: '/images/smartart-icon.png' },
            { id: 'dnd-item-5', text: 'Page Number', type: 'natural', imageUrl: '/images/page-number-icon.png' },
            { id: 'dnd-item-6', text: 'Watermark', type: 'natural', imageUrl: '/images/watermark-icon.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Word Insert Features', type: 'natural' }
          ],
          audioSrc: '/audio/word_insert_activity.mp3',
          speakText: 'Help me match these Word features with their correct descriptions. Drag the features to their descriptions.'
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Microsoft Word Insert Tab Quiz',
          question: 'Where would you add your name so it appears on every page of your document?',
          options: [
            { id: 'quiz-opt-1', text: 'In the Header', isCorrect: true, explanation: 'The Header appears at the top of every page and is a good place to put your name.' },
            { id: 'quiz-opt-2', text: 'In the Table', isCorrect: false, explanation: 'Tables are used to organize data, not to display information on every page.' },
            { id: 'quiz-opt-3', text: 'In the SmartArt', isCorrect: false, explanation: 'SmartArt is used for diagrams and visual representations, not for displaying text on every page.' },
            { id: 'quiz-opt-4', text: 'In the Watermark', isCorrect: false, explanation: 'Watermarks are faint background images or text, not typically used for names.' }
          ],
          explanation: 'The Header is the space at the top of each page in a document. It appears on every page automatically, making it a perfect place to put your name or the document title.',
          imageUrl: '/images/word-insert-quiz.png',
          audioSrc: '/audio/word_insert_quiz.mp3',
          speakText: 'Where would you add your name so it appears on every page of your document? Is it in the Header, Table, SmartArt, or Watermark?'
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
            "Hello friends! I'm Zippy! Today we're going to learn about Windows.",
            "Windows is an operating system made by Microsoft that helps manage everything on your computer.",
            "It provides a user-friendly interface that lets you perform tasks like opening programs, playing games, and browsing the internet.",
            "Windows is popular because it's easy to use and works on many different devices."
          ],
          imageUrl: '/images/windows-intro.png',
          audioSrc: '/audio/windows_intro.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn about Windows. Windows is an operating system made by Microsoft that helps manage everything on your computer. It provides a user-friendly interface that lets you perform tasks like opening programs, playing games, and browsing the internet. Windows is popular because it's easy to use and works on many different devices."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Understanding the Desktop',
          description: [
            "The Desktop is like an office desk where you keep things you use often.",
            "It displays icons (small pictures) that are shortcuts to open apps, folders, and files.",
            "Some basic icons you'll see are: This PC, Recycle Bin, Downloads Folder, and Settings.",
            "You can add your own icons and organize them however you like."
          ],
          imageUrl: '/images/windows-desktop.png',
          audioSrc: '/audio/windows_desktop.mp3',
          speakText: "The Desktop is like an office desk where you keep things you use often. It displays icons (small pictures) that are shortcuts to open apps, folders, and files. Some basic icons you'll see are: This PC, Recycle Bin, Downloads Folder, and Settings. You can add your own icons and organize them however you like."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Creating and Organizing Folders',
          description: [
            "Folders help you organize your files, just like folders in a filing cabinet.",
            "To create a folder: Right-click on your Desktop or in any folder, choose 'New', then 'Folder', and give it a name.",
            "You can put files inside folders to keep them organized by subject or type.",
            "For example, you might have folders for 'School Work', 'Games', or 'Pictures'."
          ],
          exampleImages: [
            { src: '/images/create-folder.png', alt: 'Creating a Folder' },
            { src: '/images/organize-files.png', alt: 'Organizing Files' }
          ],
          audioSrc: '/audio/windows_folders.mp3',
          speakText: "Folders help you organize your files, just like folders in a filing cabinet. To create a folder: Right-click on your Desktop or in any folder, choose 'New', then 'Folder', and give it a name. You can put files inside folders to keep them organized by subject or type. For example, you might have folders for 'School Work', 'Games', or 'Pictures'."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'CPU and Multitasking',
          description: [
            "The CPU (Central Processing Unit) is the brain of your computer that helps it run programs.",
            "CPU speed is measured in GHz (gigahertz), which tells you how many billions of instructions it can handle in a second.",
            "Windows allows multitasking, which means you can run multiple programs at the same time.",
            "You can switch between open programs using the alt+tab keyboard shortcut."
          ],
          imageUrl: '/images/cpu-multitasking.png',
          audioSrc: '/audio/windows_cpu.mp3',
          speakText: "The CPU (Central Processing Unit) is the brain of your computer that helps it run programs. CPU speed is measured in GHz (gigahertz), which tells you how many billions of instructions it can handle in a second. Windows allows multitasking, which means you can run multiple programs at the same time. You can switch between open programs using the alt+tab keyboard shortcut."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Windows Icons',
          instruction: 'Help me match these Windows icons with their names. Drag the icons to their correct names.',
          items: [
            { id: 'dnd-item-1', text: 'This PC', type: 'natural', imageUrl: '/images/this-pc-icon.png' },
            { id: 'dnd-item-2', text: 'Recycle Bin', type: 'natural', imageUrl: '/images/recycle-bin-icon.png' },
            { id: 'dnd-item-3', text: 'Downloads Folder', type: 'natural', imageUrl: '/images/downloads-icon.png' },
            { id: 'dnd-item-4', text: 'Settings', type: 'natural', imageUrl: '/images/settings-icon.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Windows Icons', type: 'natural' }
          ],
          audioSrc: '/audio/windows_icons_activity.mp3',
          speakText: 'Help me match these Windows icons with their names. Drag the icons to their correct names.'
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Windows Quiz',
          question: 'Which keyboard shortcut helps you quickly switch between open programs in Windows?',
          options: [
            { id: 'quiz-opt-1', text: 'ctrl + Z', isCorrect: false, explanation: 'ctrl + Z is used to undo an action, not to switch between programs.' },
            { id: 'quiz-opt-2', text: 'alt + tab', isCorrect: true, explanation: 'alt + tab allows you to quickly switch between open applications.' },
            { id: 'quiz-opt-3', text: 'ctrl + S', isCorrect: false, explanation: 'ctrl + S is used to save a document, not to switch between programs.' },
            { id: 'quiz-opt-4', text: 'alt + F4', isCorrect: false, explanation: 'alt + F4 is used to close the current program, not to switch between programs.' }
          ],
          explanation: 'The alt + tab keyboard shortcut in Windows allows you to quickly switch between open applications, making multitasking easier.',
          imageUrl: '/images/windows-quiz.png',
          audioSrc: '/audio/windows_quiz.mp3',
          speakText: 'Which keyboard shortcut helps you quickly switch between open programs in Windows? Is it ctrl + Z, alt + tab, ctrl + S, or alt + F4?'
        }
      ]
    },
    {
      id: 3,
      title: "Operating Systems",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'What is an Operating System?',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn about operating systems.",
            "An operating system (OS) is like the 'boss' of the computer, helping organize and manage its resources.",
            "It connects users with hardware, enabling smooth operation of applications.",
            "The OS provides a user-friendly interface for easy navigation and manages tasks, ensuring each program gets the resources it needs."
          ],
          imageUrl: '/images/os-intro.png',
          audioSrc: '/audio/os_intro.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn about operating systems. An operating system (OS) is like the 'boss' of the computer, helping organize and manage its resources. It connects users with hardware, enabling smooth operation of applications. The OS provides a user-friendly interface for easy navigation and manages tasks, ensuring each program gets the resources it needs."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Different Types of Operating Systems',
          description: [
            "There are several types of operating systems used on different devices:",
            "Windows: Used on many computers, known for its user-friendly interface and extensive software support.",
            "iOS: Runs on Apple mobile devices; known for its simplicity and security.",
            "Android: Used on mobile devices, known for its customizable interface and vast app availability.",
            "Linux: Open-source OS with many different distributions."
          ],
          exampleImages: [
            { src: '/images/windows-os.png', alt: 'Windows OS' },
            { src: '/images/ios-os.png', alt: 'iOS' },
            { src: '/images/android-os.png', alt: 'Android' },
            { src: '/images/linux-os.png', alt: 'Linux' }
          ],
          audioSrc: '/audio/os_types.mp3',
          speakText: "There are several types of operating systems used on different devices: Windows: Used on many computers, known for its user-friendly interface and extensive software support. iOS: Runs on Apple mobile devices; known for its simplicity and security. Android: Used on mobile devices, known for its customizable interface and vast app availability. Linux: Open-source OS with many different distributions."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'System Utilities',
          description: [
            "System utilities are special tools in the operating system that help keep your computer in good shape.",
            "They can clean up your computer, protect it from viruses, and help make it run faster.",
            "Examples include antivirus software that protects your computer from harmful files and tools like 'Disk Cleanup' that help free up space by deleting unnecessary files.",
            "These utilities are like a toolbox for fixing problems with your computer."
          ],
          imageUrl: '/images/system-utilities.png',
          audioSrc: '/audio/system_utilities.mp3',
          speakText: "System utilities are special tools in the operating system that help keep your computer in good shape. They can clean up your computer, protect it from viruses, and help make it run faster. Examples include antivirus software that protects your computer from harmful files and tools like 'Disk Cleanup' that help free up space by deleting unnecessary files. These utilities are like a toolbox for fixing problems with your computer."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Match Operating Systems',
          instruction: 'Help me match these operating systems with the devices they are commonly used on. Drag the operating systems to their devices.',
          items: [
            { id: 'dnd-item-1', text: 'Windows', type: 'natural', imageUrl: '/images/windows-logo.png' },
            { id: 'dnd-item-2', text: 'iOS', type: 'natural', imageUrl: '/images/ios-logo.png' },
            { id: 'dnd-item-3', text: 'Android', type: 'natural', imageUrl: '/images/android-logo.png' },
            { id: 'dnd-item-4', text: 'Linux', type: 'natural', imageUrl: '/images/linux-logo.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Operating Systems', type: 'natural' }
          ],
          audioSrc: '/audio/os_match_activity.mp3',
          speakText: 'Help me match these operating systems with the devices they are commonly used on. Drag the operating systems to their devices.'
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Operating Systems Quiz',
          question: 'What would happen if there was no operating system on a computer?',
          options: [
            { id: 'quiz-opt-1', text: 'The computer would run faster', isCorrect: false, explanation: 'Without an OS, the computer would not be able to run at all.' },
            { id: 'quiz-opt-2', text: 'Only one program could run at a time', isCorrect: true, explanation: 'Without an OS, multitasking would not be possible, and only one program could run at a time, if at all.' },
            { id: 'quiz-opt-3', text: 'The computer would have more storage space', isCorrect: false, explanation: 'The OS is necessary for managing storage, without it, storage would not be accessible.' },
            { id: 'quiz-opt-4', text: 'Nothing would change', isCorrect: false, explanation: 'The OS is essential for the computer to function, so many things would change without it.' }
          ],
          explanation: 'Without an operating system, a computer would not be able to perform basic functions. Multitasking would not be possible, and only one program could run at a time, if at all. The OS is essential for managing hardware, running software, and providing a user interface.',
          imageUrl: '/images/os-quiz.png',
          audioSrc: '/audio/os_quiz.mp3',
          speakText: 'What would happen if there was no operating system on a computer? Would the computer run faster, only one program could run at a time, the computer would have more storage space, or nothing would change?'
        }
      ]
    },
    {
      id: 4,
      title: "Different File Types",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Introduction to File Types',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn about different file types.",
            "A file is a collection of data that gives a complete set of information about a certain item.",
            "Just like we use different boxes for different things at home, computers use different types of files to store information.",
            "The 'file type' tells the computer and user what kind of information is inside that file."
          ],
          imageUrl: '/images/file-types-intro.png',
          audioSrc: '/audio/file_types_intro.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn about different file types. A file is a collection of data that gives a complete set of information about a certain item. Just like we use different boxes for different things at home, computers use different types of files to store information. The 'file type' tells the computer and user what kind of information is inside that file."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Common File Types',
          description: [
            "Here are some common file types you might use:",
            "Text files (.txt): Used for writing and reading words.",
            "Image files (.jpg, .png): Used for storing pictures.",
            "Audio files (.mp3): Used for storing music and sounds.",
            "Video files (.mp4): Used for storing videos.",
            "Document files (.docx): Used for Microsoft Word documents.",
            "PDF files (.pdf): Used for documents that look the same on any device."
          ],
          exampleImages: [
            { src: '/images/text-file.png', alt: 'Text File' },
            { src: '/images/image-file.png', alt: 'Image File' },
            { src: '/images/audio-file.png', alt: 'Audio File' },
            { src: '/images/video-file.png', alt: 'Video File' },
            { src: '/images/document-file.png', alt: 'Document File' },
            { src: '/images/pdf-file.png', alt: 'PDF File' }
          ],
          audioSrc: '/audio/common_file_types.mp3',
          speakText: "Here are some common file types you might use: Text files (.txt): Used for writing and reading words. Image files (.jpg, .png): Used for storing pictures. Audio files (.mp3): Used for storing music and sounds. Video files (.mp4): Used for storing videos. Document files (.docx): Used for Microsoft Word documents. PDF files (.pdf): Used for documents that look the same on any device."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Why We Need Different File Types',
          description: [
            "We need different file types because each type of information is unique.",
            "A picture needs to be saved differently from a song, and a text document is different from a video.",
            "If all information was stored the same way, the computer would get confused!",
            "Different file types help the computer know how to open and use the information correctly."
          ],
          imageUrl: '/images/file-types-why.png',
          audioSrc: '/audio/why_file_types.mp3',
          speakText: "We need different file types because each type of information is unique. A picture needs to be saved differently from a song, and a text document is different from a video. If all information was stored the same way, the computer would get confused! Different file types help the computer know how to open and use the information correctly."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Match File Types',
          instruction: 'Help me match these file extensions with what they store. Drag the file extensions to their correct categories.',
          items: [
            { id: 'dnd-item-1', text: '.txt', type: 'natural', imageUrl: '/images/txt-icon.png' },
            { id: 'dnd-item-2', text: '.jpg', type: 'natural', imageUrl: '/images/jpg-icon.png' },
            { id: 'dnd-item-3', text: '.mp3', type: 'natural', imageUrl: '/images/mp3-icon.png' },
            { id: 'dnd-item-4', text: '.mp4', type: 'natural', imageUrl: '/images/mp4-icon.png' },
            { id: 'dnd-item-5', text: '.docx', type: 'natural', imageUrl: '/images/docx-icon.png' },
            { id: 'dnd-item-6', text: '.pdf', type: 'natural', imageUrl: '/images/pdf-icon.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'File Types', type: 'natural' }
          ],
          audioSrc: '/audio/file_types_activity.mp3',
          speakText: 'Help me match these file extensions with what they store. Drag the file extensions to their correct categories.'
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'File Types Quiz',
          question: 'Why do we need different file types?',
          options: [
            { id: 'quiz-opt-1', text: 'To make computers work faster', isCorrect: false, explanation: 'Different file types don\'t necessarily make computers work faster.' },
            { id: 'quiz-opt-2', text: 'To store more files', isCorrect: false, explanation: 'Different file types don\'t allow you to store more files, just different kinds of information.' },
            { id: 'quiz-opt-3', text: 'To help the computer know how to open and use each file', isCorrect: true, explanation: 'Different file types tell the computer what kind of information is in the file and how to open and use it correctly.' },
            { id: 'quiz-opt-4', text: 'To make files smaller', isCorrect: false, explanation: 'While some file types are more compressed than others, the main purpose of different file types is not to make files smaller.' }
          ],
          explanation: 'We need different file types because each type of information (text, images, audio, video) is unique and needs to be stored differently. Different file types help the computer know how to open and use each file correctly.',
          imageUrl: '/images/file-types-quiz.png',
          audioSrc: '/audio/file_types_quiz.mp3',
          speakText: 'Why do we need different file types? Is it to make computers work faster, to store more files, to help the computer know how to open and use each file, or to make files smaller?'
        }
      ]
    }
  ],
  "3": [
    {
      id: 1,
      title: "Microsoft Word",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Introduction to Microsoft Word',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn about Microsoft Word.",
            "A Word Processor is a computer program used for writing, editing, and formatting text.",
            "It helps you type, change, and organize your work. You can also add pictures, change colors, and make the text look how you want.",
            "With Microsoft Word, writing has become easier. Now, we can easily type, edit, and update documents without the trouble of flipping through pages or rewriting everything."
          ],
          imageUrl: '/images/word-intro.png',
          audioSrc: '/audio/word_intro.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn about Microsoft Word. A Word Processor is a computer program used for writing, editing, and formatting text. It helps you type, change, and organize your work. You can also add pictures, change colors, and make the text look how you want."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Components of Word Window',
          description: [
            "Let's look at the different parts of Microsoft Word:",
            "1. Title bar: Present on top of the window. It displays the name of the document.",
            "2. Quick Access Toolbar: Contains commonly used buttons like Redo, Undo, and Save.",
            "3. Ribbon: The group of tools and tabs at the top of the screen.",
            "4. Text/Document Area: Where you type your text.",
            "5. Status bar: The rectangular box at the bottom showing page number and word count.",
            "6. Cursor: The blinking vertical line showing where your text will appear."
          ],
          imageUrl: '/images/word-components.png',
          audioSrc: '/audio/word_components.mp3',
          speakText: "Let's look at the different parts of Microsoft Word: Title bar at the top displays the document name. Quick Access Toolbar has buttons like Redo, Undo, and Save. The Ribbon has tools and tabs. The Text Area is where you type. The Status bar at the bottom shows page number and word count. The Cursor is the blinking line showing where your text will appear."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Formatting Text in Word',
          description: [
            "In Microsoft Word, you can make your text look different in many ways:",
            "1. Font style: You can choose different styles to make your words look fancy, funny, or serious.",
            "2. Bold, Italics, Underline: Make your words stronger, slanted, or underlined.",
            "3. Text alignment: Align your text to the left, right, center, or justify it.",
            "4. Font size: Make your text bigger or smaller.",
            "5. Font color: Change the color of your text."
          ],
          exampleImages: [
            { src: '/images/font-style.png', alt: 'Font Styles' },
            { src: '/images/text-formatting.png', alt: 'Text Formatting' },
            { src: '/images/text-alignment.png', alt: 'Text Alignment' },
            { src: '/images/font-color.png', alt: 'Font Color' }
          ],
          audioSrc: '/audio/word_formatting.mp3',
          speakText: "In Microsoft Word, you can make your text look different in many ways: You can choose different font styles, make your words bold, italic, or underlined, align your text in different ways, change the size of your text, and even change the color of your text."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Save and Open Documents',
          description: [
            "After creating your document, you need to save it so you can find it later:",
            "To save a document: Click on the File tab, select Save as, choose a location, write a file name, and click Save.",
            "To open a saved document: Open Word, click on Open from the File menu, find your document, and click on it."
          ],
          imageUrl: '/images/word-save-open.png',
          audioSrc: '/audio/word_save_open.mp3',
          speakText: "After creating your document, you need to save it so you can find it later: To save a document: Click on the File tab, select Save as, choose a location, write a file name, and click Save. To open a saved document: Open Word, click on Open from the File menu, find your document, and click on it."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Word Components',
          instruction: 'Help me identify the parts of Microsoft Word. Drag the names to the correct components.',
          items: [
            { id: 'dnd-item-1', text: 'Title Bar', type: 'natural', imageUrl: '/images/title-bar.png' },
            { id: 'dnd-item-2', text: 'Ribbon', type: 'natural', imageUrl: '/images/ribbon.png' },
            { id: 'dnd-item-3', text: 'Text Area', type: 'natural', imageUrl: '/images/text-area.png' },
            { id: 'dnd-item-4', text: 'Status Bar', type: 'natural', imageUrl: '/images/status-bar.png' },
            { id: 'dnd-item-5', text: 'Quick Access Toolbar', type: 'natural', imageUrl: '/images/quick-access.png' },
            { id: 'dnd-item-6', text: 'Cursor', type: 'natural', imageUrl: '/images/cursor.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Word Components', type: 'natural' }
          ],
          audioSrc: '/audio/word_components_activity.mp3',
          speakText: 'Help me identify the parts of Microsoft Word. Drag the names to the correct components.'
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Microsoft Word Quiz',
          question: 'Which of these is NOT a text formatting option in Microsoft Word?',
          options: [
            { id: 'quiz-opt-1', text: 'Bold', isCorrect: false, explanation: 'Bold is a formatting option that makes text thicker and darker.' },
            { id: 'quiz-opt-2', text: 'Italics', isCorrect: false, explanation: 'Italics is a formatting option that slants text.' },
            { id: 'quiz-opt-3', text: 'Underline', isCorrect: false, explanation: 'Underline is a formatting option that puts a line under text.' },
            { id: 'quiz-opt-4', text: 'Animate', isCorrect: true, explanation: 'Animate is not a basic text formatting option in Microsoft Word.' }
          ],
          explanation: 'Microsoft Word offers many text formatting options including Bold, Italics, and Underline, but Animate is not a basic text formatting option.',
          imageUrl: '/images/word-quiz.png',
          audioSrc: '/audio/word_quiz.mp3',
          speakText: 'Which of these is NOT a text formatting option in Microsoft Word? Is it Bold, Italics, Underline, or Animate?'
        }
      ]
    },
    {
      id: 2,
      title: "Understanding Emails",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'What is Email?',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn about email.",
            "Email stands for Electronic Mail. It's like sending a letter, but through the internet!",
            "We use email to send messages, pictures, and documents to people anywhere in the world.",
            "You need a device like a phone, laptop, or tablet with internet connection to send or receive emails."
          ],
          imageUrl: '/images/email-intro.png',
          audioSrc: '/audio/email_intro.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn about email. Email stands for Electronic Mail. It's like sending a letter, but through the internet! We use email to send messages, pictures, and documents to people anywhere in the world. You need a device like a phone, laptop, or tablet with internet connection to send or receive emails."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Parts of an Email Address',
          description: [
            "An email address has two main parts separated by the @ symbol:",
            "1. Username: This is your unique name (before the @ symbol).",
            "2. Domain name: This is the email service provider (after the @ symbol).",
            "For example: zippy@gmail.com - 'zippy' is the username and 'gmail.com' is the domain name.",
            "We read this as 'zippy at gmail dot com'."
          ],
          imageUrl: '/images/email-address.png',
          audioSrc: '/audio/email_address.mp3',
          speakText: "An email address has two main parts separated by the @ symbol: Username, which is your unique name before the @ symbol, and Domain name, which is the email service provider after the @ symbol. For example: zippy@gmail.com - 'zippy' is the username and 'gmail.com' is the domain name. We read this as 'zippy at gmail dot com'."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Components of Email',
          description: [
            "When you write an email, it has several important parts:",
            "1. To: The email address of the person you're sending the email to.",
            "2. Subject: A short description of what your email is about.",
            "3. Body: The main message you want to send.",
            "4. Attachments: Files like pictures or documents you want to send with your email.",
            "5. Send Button: Click this when you're ready to send your email."
          ],
          imageUrl: '/images/email-components.png',
          audioSrc: '/audio/email_components.mp3',
          speakText: "When you write an email, it has several important parts: To: The email address of the person you're sending the email to. Subject: A short description of what your email is about. Body: The main message you want to send. Attachments: Files like pictures or documents you want to send with your email. Send Button: Click this when you're ready to send your email."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Email Safety Tips',
          description: [
            "Here are some important safety tips for using email:",
            "1. Never share your password with anyone except your parents.",
            "2. Don't open emails from people you don't know.",
            "3. Ask your parents before clicking on links in emails.",
            "4. Be polite and use proper spelling and grammar in your emails.",
            "5. Always check your email before sending it."
          ],
          imageUrl: '/images/email-safety.png',
          audioSrc: '/audio/email_safety.mp3',
          speakText: "Here are some important safety tips for using email: Never share your password with anyone except your parents. Don't open emails from people you don't know. Ask your parents before clicking on links in emails. Be polite and use proper spelling and grammar in your emails. Always check your email before sending it."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Valid or Invalid Email Addresses',
          instruction: 'Help me sort these email addresses. Drag them into the correct box: "Valid Email Address" or "Invalid Email Address".',
          items: [
            { id: 'dnd-item-1', text: 'john.doe@gmail.com', type: 'natural', imageUrl: '/images/valid-email.png' },
            { id: 'dnd-item-2', text: 'mary@yahoo..com', type: 'man-made', imageUrl: '/images/invalid-email.png' },
            { id: 'dnd-item-3', text: 'student@school.edu', type: 'natural', imageUrl: '/images/valid-email.png' },
            { id: 'dnd-item-4', text: 'teacher@outlook.com', type: 'natural', imageUrl: '/images/valid-email.png' },
            { id: 'dnd-item-5', text: 'hello..world@gmail.com', type: 'man-made', imageUrl: '/images/invalid-email.png' },
            { id: 'dnd-item-6', text: 'user/name@mail.com', type: 'man-made', imageUrl: '/images/invalid-email.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Valid Email Address', type: 'natural' },
            { id: 'manMadeTarget', title: 'Invalid Email Address', type: 'man-made' }
          ],
          audioSrc: '/audio/email_activity.mp3',
          speakText: 'Help me sort these email addresses. Drag them into the correct box: Valid Email Address or Invalid Email Address.'
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Email Quiz',
          question: 'What does the @ symbol in an email address mean?',
          options: [
            { id: 'quiz-opt-1', text: 'At', isCorrect: true, explanation: 'The @ symbol means "at" and separates the username from the domain name.' },
            { id: 'quiz-opt-2', text: 'About', isCorrect: false, explanation: 'The @ symbol does not mean "about" in an email address.' },
            { id: 'quiz-opt-3', text: 'Around', isCorrect: false, explanation: 'The @ symbol does not mean "around" in an email address.' },
            { id: 'quiz-opt-4', text: 'And', isCorrect: false, explanation: 'The @ symbol does not mean "and" in an email address.' }
          ],
          explanation: 'In an email address, the @ symbol means "at" and separates the username from the domain name. For example, in student@school.edu, we read it as "student at school dot edu".',
          imageUrl: '/images/email-quiz.png',
          audioSrc: '/audio/email_quiz.mp3',
          speakText: 'What does the @ symbol in an email address mean? Is it At, About, Around, or And?'
        }
      ]
    },
    {
      id: 3,
      title: "Internet Safety",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Staying Safe Online',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn about staying safe on the internet.",
            "The internet is amazing and helps us learn, play, and talk to friends, but we need to be careful while using it.",
            "Just like we follow safety rules in real life, we need to follow safety rules online too.",
            "Let's learn some important rules to stay safe while using the internet!"
          ],
          imageUrl: '/images/internet-safety-intro.png',
          audioSrc: '/audio/internet_safety_intro.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn about staying safe on the internet. The internet is amazing and helps us learn, play, and talk to friends, but we need to be careful while using it. Just like we follow safety rules in real life, we need to follow safety rules online too. Let's learn some important rules to stay safe while using the internet!"
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Internet Safety Rules',
          description: [
            "Here are some important rules to follow when using the internet:",
            "1. Never share personal information like your full name, address, or phone number.",
            "2. Always ask a grown-up before downloading anything.",
            "3. Be kind to others online, just like you would in real life.",
            "4. Tell a grown-up if something online makes you feel uncomfortable.",
            "5. Don't talk to strangers online without a grown-up's permission.",
            "6. Don't click on pop-up ads or strange links."
          ],
          imageUrl: '/images/internet-safety-rules.png',
          audioSrc: '/audio/internet_safety_rules.mp3',
          speakText: "Here are some important rules to follow when using the internet: Never share personal information like your full name, address, or phone number. Always ask a grown-up before downloading anything. Be kind to others online, just like you would in real life. Tell a grown-up if something online makes you feel uncomfortable. Don't talk to strangers online without a grown-up's permission. Don't click on pop-up ads or strange links."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Downloading and Uploading Files',
          description: [
            "When using the internet, we sometimes need to download or upload files:",
            "Downloading is like getting a package from the internet to your computer.",
            "Uploading is like sending a package from your computer to the internet.",
            "Always ask your parents or teachers before downloading or uploading any files."
          ],
          exampleImages: [
            { src: '/images/downloading.png', alt: 'Downloading Files' },
            { src: '/images/uploading.png', alt: 'Uploading Files' }
          ],
          audioSrc: '/audio/download_upload.mp3',
          speakText: "When using the internet, we sometimes need to download or upload files: Downloading is like getting a package from the internet to your computer. Uploading is like sending a package from your computer to the internet. Always ask your parents or teachers before downloading or uploading any files."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Safe or Not Safe?',
          instruction: 'Help me sort these online activities. Drag them into the correct box: "Safe Online" or "Not Safe Online".',
          items: [
            { id: 'dnd-item-1', text: 'Sharing homework with classmates', type: 'natural', imageUrl: '/images/sharing-homework.png' },
            { id: 'dnd-item-2', text: 'Telling a stranger your home address', type: 'man-made', imageUrl: '/images/sharing-address.png' },
            { id: 'dnd-item-3', text: 'Asking parents before downloading a game', type: 'natural', imageUrl: '/images/ask-parents.png' },
            { id: 'dnd-item-4', text: 'Sharing your password with a friend', type: 'man-made', imageUrl: '/images/sharing-password.png' },
            { id: 'dnd-item-5', text: 'Using kid-friendly websites', type: 'natural', imageUrl: '/images/kid-website.png' },
            { id: 'dnd-item-6', text: 'Clicking on pop-up ads', type: 'man-made', imageUrl: '/images/popup-ad.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Safe Online', type: 'natural' },
            { id: 'manMadeTarget', title: 'Not Safe Online', type: 'man-made' }
          ],
          audioSrc: '/audio/internet_safety_activity.mp3',
          speakText: 'Help me sort these online activities. Drag them into the correct box: Safe Online or Not Safe Online.'
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Internet Safety Quiz',
          question: 'What should you do before downloading a game from the internet?',
          options: [
            { id: 'quiz-opt-1', text: 'Download it right away', isCorrect: false, explanation: 'Downloading without permission can be dangerous.' },
            { id: 'quiz-opt-2', text: 'Ask a grown-up first', isCorrect: true, explanation: 'Always ask a grown-up before downloading anything from the internet.' },
            { id: 'quiz-opt-3', text: 'Share your password', isCorrect: false, explanation: 'Never share your password with anyone except your parents.' },
            { id: 'quiz-opt-4', text: 'Click on all the ads', isCorrect: false, explanation: 'Clicking on ads can lead to unsafe websites.' }
          ],
          explanation: 'Always ask a grown-up before downloading anything from the internet. They can help make sure it is safe.',
          imageUrl: '/images/internet-safety-quiz.png',
          audioSrc: '/audio/internet_safety_quiz.mp3',
          speakText: 'What should you do before downloading a game from the internet?'
        }
      ]
    },
    {
      id: 4,
      title: "Google Maps",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Introduction to Google Maps',
          description: [
            "Hello explorers! I'm Zippy! Today we're going to learn about Google Maps.",
            "A map is a diagram that shows an area of land or water and helps us understand where things are located.",
            "Google Maps is an app that helps you find places and the best routes to reach a place by car, walking, or public transport.",
            "Let's discover how to use Google Maps together!"
          ],
          imageUrl: '/images/google-maps-intro.png',
          audioSrc: '/audio/google_maps_intro.mp3',
          speakText: "Hello explorers! I'm Zippy! Today we're going to learn about Google Maps. A map is a diagram that shows an area of land or water and helps us understand where things are located. Google Maps is an app that helps you find places and the best routes to reach a place by car, walking, or public transport. Let's discover how to use Google Maps together!"
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Features of Google Maps',
          description: [
            "Google Maps has many helpful features:",
            "1. Directions: Helps you find the best route to reach a destination.",
            "2. Layers: Shows different views like Map, Satellite, Traffic, and Terrain.",
            "3. Search: Helps you find places like restaurants, hospitals, or schools near you.",
            "4. Street View: Gives you a 360-degree view of streets and places."
          ],
          exampleImages: [
            { src: '/images/directions.png', alt: 'Directions Feature' },
            { src: '/images/layers.png', alt: 'Layers Feature' },
            { src: '/images/search.png', alt: 'Search Feature' },
            { src: '/images/street-view.png', alt: 'Street View Feature' }
          ],
          audioSrc: '/audio/google_maps_features.mp3',
          speakText: "Google Maps has many helpful features: Directions helps you find the best route to reach a destination. Layers shows different views like Map, Satellite, Traffic, and Terrain. Search helps you find places like restaurants, hospitals, or schools near you. Street View gives you a 360-degree view of streets and places."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'How to Get Directions',
          description: [
            "Here's how to get directions using Google Maps:",
            "1. Open Google Maps.",
            "2. Enter the name of the place in the search bar.",
            "3. Click on Directions and enter the starting location.",
            "4. Choose your mode of transport (car, walking, public transport).",
            "5. Follow the route shown on the map."
          ],
          imageUrl: '/images/get-directions.png',
          audioSrc: '/audio/get_directions.mp3',
          speakText: "Here's how to get directions using Google Maps: Open Google Maps. Enter the name of the place in the search bar. Click on Directions and enter the starting location. Choose your mode of transport like car, walking, or public transport. Follow the route shown on the map."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Match the Icons',
          instruction: 'Help me match these Google Maps icons with what they represent. Drag the icons to their correct meanings.',
          items: [
            { id: 'dnd-item-1', text: 'Restaurant Icon', type: 'natural', imageUrl: '/images/restaurant-icon.png' },
            { id: 'dnd-item-2', text: 'Hospital Icon', type: 'natural', imageUrl: '/images/hospital-icon.png' },
            { id: 'dnd-item-3', text: 'School Icon', type: 'natural', imageUrl: '/images/school-icon.png' },
            { id: 'dnd-item-4', text: 'Petrol Pump Icon', type: 'natural', imageUrl: '/images/petrol-icon.png' },
            { id: 'dnd-item-5', text: 'ATM Icon', type: 'natural', imageUrl: '/images/atm-icon.png' },
            { id: 'dnd-item-6', text: 'Live Location Icon', type: 'natural', imageUrl: '/images/live-location-icon.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Google Maps Icons', type: 'natural' }
          ],
          audioSrc: '/audio/google_maps_icons.mp3',
          speakText: 'Help me match these Google Maps icons with what they represent. Drag the icons to their correct meanings.'
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Google Maps Quiz',
          question: 'Which feature of Google Maps helps you find the best route to a place?',
          options: [
            { id: 'quiz-opt-1', text: 'Layers', isCorrect: false, explanation: 'Layers show different views of the map, not routes.' },
            { id: 'quiz-opt-2', text: 'Directions', isCorrect: true, explanation: 'The Directions feature helps you find the best route to reach a destination.' },
            { id: 'quiz-opt-3', text: 'Street View', isCorrect: false, explanation: 'Street View gives you a 360-degree view of streets, but doesn\'t show routes.' },
            { id: 'quiz-opt-4', text: 'Search', isCorrect: false, explanation: 'Search helps you find places, not routes.' }
          ],
          explanation: 'The Directions feature in Google Maps helps you find the best route to reach a destination. It provides step-by-step directions for driving, walking, biking, or using public transportation.',
          imageUrl: '/images/google-maps-quiz.png',
          audioSrc: '/audio/google_maps_quiz.mp3',
          speakText: 'Which feature of Google Maps helps you find the best route to a place? Is it Layers, Directions, Street View, or Search?'
        }
      ]
    }
  ],
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
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Test Your Knowledge',
          question: 'Which of these is a natural thing?',
          options: [
            { id: 'quiz-opt-1', text: 'Chair', isCorrect: false, explanation: 'A chair is made by people, so it is man-made.' },
            { id: 'quiz-opt-2', text: 'Tree', isCorrect: true, explanation: 'A tree grows in nature without people making it.' },
            { id: 'quiz-opt-3', text: 'Bicycle', isCorrect: false, explanation: 'A bicycle is built by people, so it is man-made.' },
            { id: 'quiz-opt-4', text: 'Blackboard', isCorrect: false, explanation: 'A blackboard is created by people, so it is man-made.' },
          ],
          explanation: 'Natural things are found in nature and not made by people. Trees, birds, and the sun are all natural things.',
          imageUrl: '/images/quiz-nature.png',
          audioSrc: '/audio/quiz_natural.mp3',
          speakText: 'Which of these is a natural thing? Is it a chair, a tree, a bicycle, or a blackboard?',
        },
      ],
    },
    {
      id: 2,
      title: "Introduction to Computers",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'What is a Computer?',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn about computers.",
            'A computer is a machine that can do many different tasks very quickly.',
            'Computers help us learn, play games, talk to friends, and do our work.',
            "Let's explore the world of computers together!",
          ],
          imageUrl: '/images/computer-intro.png',
          audioSrc: '/audio/computer_intro.mp3',
          speakText:
            "Hello friends! I'm Zippy! Today we're going to learn about computers. A computer is a machine that can do many different tasks very quickly. Computers help us learn, play games, talk to friends, and do our work. Let's explore the world of computers together!",
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Parts of a Computer',
          description: [
            "A computer has many important parts that work together. Let's look at some of them!",
          ],
          exampleImages: [
            { src: '/images/monitor.png', alt: 'Computer Monitor' },
            { src: '/images/keyboard.png', alt: 'Keyboard' },
            { src: '/images/mouse.png', alt: 'Mouse' },
            { src: '/images/cpu.png', alt: 'CPU' },
          ],
          audioSrc: '/audio/computer_parts.mp3',
          speakText:
            "A computer has many important parts that work together. Let's look at some of them! The monitor shows us pictures and text. The keyboard helps us type letters and numbers. The mouse helps us point and click. The CPU is the brain of the computer that does all the thinking.",
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Computer Parts',
          instruction:
            'Can you help me sort these computer parts? Drag them into the correct box: "Input Devices" or "Output Devices".',
          items: [
            { id: 'dnd-item-1', text: 'Keyboard', type: 'man-made', imageUrl: '/images/keyboard.png' },
            { id: 'dnd-item-2', text: 'Monitor', type: 'man-made', imageUrl: '/images/monitor.png' },
            { id: 'dnd-item-3', text: 'Mouse', type: 'man-made', imageUrl: '/images/mouse.png' },
            { id: 'dnd-item-4', text: 'Speakers', type: 'man-made', imageUrl: '/images/speakers.png' },
            { id: 'dnd-item-5', text: 'Microphone', type: 'man-made', imageUrl: '/images/microphone.png' },
            { id: 'dnd-item-6', text: 'Printer', type: 'man-made', imageUrl: '/images/printer.png' },
          ],
          targets: [
            { id: 'naturalTarget', title: 'Input Devices', type: 'natural' },
            { id: 'manMadeTarget', title: 'Output Devices', type: 'man-made' },
          ],
          audioSrc: '/audio/computer_dnd_instruction.mp3',
          speakText:
            'Can you help me sort these computer parts? Drag them into the correct box: Input Devices or Output Devices.',
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Computer Quiz',
          question: 'What is the brain of the computer called?',
          options: [
            { id: 'quiz-opt-1', text: 'Monitor', isCorrect: false, explanation: 'The monitor is an output device that displays information.' },
            { id: 'quiz-opt-2', text: 'Keyboard', isCorrect: false, explanation: 'The keyboard is an input device used to type information.' },
            { id: 'quiz-opt-3', text: 'CPU', isCorrect: true, explanation: 'The CPU (Central Processing Unit) is the brain of the computer that processes information.' },
            { id: 'quiz-opt-4', text: 'Mouse', isCorrect: false, explanation: 'The mouse is an input device used to point and click.' },
          ],
          explanation: 'The CPU (Central Processing Unit) is the brain of the computer. It processes all the instructions and performs calculations.',
          imageUrl: '/images/cpu-quiz.png',
          audioSrc: '/audio/computer_quiz.mp3',
          speakText: 'What is the brain of the computer called? Is it the monitor, keyboard, CPU, or mouse?',
        },
      ],
    },
    {
      id: 3,
      title: "Internet Safety",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Staying Safe Online',
          description: [
            "Hi friends! I'm Zippy! The internet is amazing, but we need to stay safe while using it.",
            'Today we will learn some important rules to follow when we use the internet.',
            'These rules will help keep us safe while we learn and have fun online.',
          ],
          imageUrl: '/images/internet-safety.png',
          audioSrc: '/audio/internet_safety_intro.mp3',
          speakText:
            "Hi friends! I'm Zippy! The internet is amazing, but we need to stay safe while using it. Today we will learn some important rules to follow when we use the internet. These rules will help keep us safe while we learn and have fun online.",
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Internet Safety Rules',
          description: [
            "Here are some important rules to remember when using the internet:",
            "1. Never share personal information like your full name, address, or phone number.",
            "2. Always ask a grown-up before downloading anything.",
            "3. Be kind to others online, just like you would in real life.",
            "4. Tell a grown-up if something online makes you feel uncomfortable.",
            "5. Don't talk to strangers online without a grown-up's permission.",
          ],
          audioSrc: '/audio/internet_safety_rules.mp3',
          speakText:
            "Here are some important rules to remember when using the internet: 1. Never share personal information like your full name, address, or phone number. 2. Always ask a grown-up before downloading anything. 3. Be kind to others online, just like you would in real life. 4. Tell a grown-up if something online makes you feel uncomfortable. 5. Don't talk to strangers online without a grown-up's permission.",
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Safe or Not Safe?',
          instruction:
            'Help me sort these actions. Drag them into the correct box: "Safe Online" or "Not Safe Online".',
          items: [
            { id: 'dnd-item-1', text: 'Sharing your homework with classmates', type: 'natural', imageUrl: '/images/sharing-homework.png' },
            { id: 'dnd-item-2', text: 'Telling a stranger your home address', type: 'man-made', imageUrl: '/images/sharing-address.png' },
            { id: 'dnd-item-3', text: 'Asking parents before downloading a game', type: 'natural', imageUrl: '/images/ask-parents.png' },
            { id: 'dnd-item-4', text: 'Sharing your password with a friend', type: 'man-made', imageUrl: '/images/sharing-password.png' },
            { id: 'dnd-item-5', text: 'Using kid-friendly websites', type: 'natural', imageUrl: '/images/kid-website.png' },
            { id: 'dnd-item-6', text: 'Clicking on pop-up ads', type: 'man-made', imageUrl: '/images/popup-ad.png' },
          ],
          targets: [
            { id: 'naturalTarget', title: 'Safe Online', type: 'natural' },
            { id: 'manMadeTarget', title: 'Not Safe Online', type: 'man-made' },
          ],
          audioSrc: '/audio/internet_safety_dnd.mp3',
          speakText:
            'Help me sort these actions. Drag them into the correct box: Safe Online or Not Safe Online.',
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Internet Safety Quiz',
          question: 'What should you do before downloading a game from the internet?',
          options: [
            { id: 'quiz-opt-1', text: 'Download it right away', isCorrect: false, explanation: 'Downloading without permission can be dangerous.' },
            { id: 'quiz-opt-2', text: 'Ask a grown-up first', isCorrect: true, explanation: 'Always ask a grown-up before downloading anything from the internet.' },
            { id: 'quiz-opt-3', text: 'Share your password', isCorrect: false, explanation: 'Never share your password with anyone except your parents.' },
            { id: 'quiz-opt-4', text: 'Click on all the ads', isCorrect: false, explanation: 'Clicking on ads can lead to unsafe websites.' },
          ],
          explanation: 'Always ask a grown-up before downloading anything from the internet. They can help make sure it is safe.',
          imageUrl: '/images/internet-safety-quiz.png',
          audioSrc: '/audio/internet_safety_quiz.mp3',
          speakText: 'What should you do before downloading a game from the internet?',
        },
      ],
    },
    {
      id: 4,
      title: "Coding Basics",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'What is Coding?',
          description: [
            "Hello coders! I'm Zippy! Today we're going to learn about coding.",
            'Coding is how we tell computers what to do. Its like giving instructions to a robot!',
            'When we code, we write special instructions that computers can understand.',
            'Coding helps us make games, websites, and many other cool things!',
          ],
          imageUrl: '/images/coding-intro.png',
          audioSrc: '/audio/coding_intro.mp3',
          speakText:
            "Hello coders! I'm Zippy! Today we're going to learn about coding. Coding is how we tell computers what to do. It's like giving instructions to a robot! When we code, we write special instructions that computers can understand. Coding helps us make games, websites, and many other cool things!",
        },
        {
          type: 'learn',
          format: 'code',
          title: 'Simple Coding Example',
          description: [
            "Let's look at a simple coding example. This code will make a character move forward and then turn right.",
            "Each line is an instruction that the computer will follow in order.",
          ],
          exampleImages: [
            { src: '/images/code-example.png', alt: 'Simple Code Example' },
          ],
          audioSrc: '/audio/coding_example.mp3',
          speakText:
            "Let's look at a simple coding example. This code will make a character move forward and then turn right. Each line is an instruction that the computer will follow in order. First, the character moves forward. Then, the character turns right. Finally, the character moves forward again. That's how we give instructions through code!",
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Code Sequence',
          instruction:
            'Help me put these coding instructions in the right order to guide the robot to the star!',
          items: [
            { id: 'dnd-item-1', text: 'Start', type: 'natural', imageUrl: '/images/code-start.png' },
            { id: 'dnd-item-2', text: 'Move Forward', type: 'natural', imageUrl: '/images/code-forward.png' },
            { id: 'dnd-item-3', text: 'Turn Right', type: 'natural', imageUrl: '/images/code-right.png' },
            { id: 'dnd-item-4', text: 'Move Forward', type: 'natural', imageUrl: '/images/code-forward.png' },
            { id: 'dnd-item-5', text: 'Turn Left', type: 'natural', imageUrl: '/images/code-left.png' },
            { id: 'dnd-item-6', text: 'Move Forward', type: 'natural', imageUrl: '/images/code-forward.png' },
          ],
          targets: [
            { id: 'naturalTarget', title: 'Code Sequence', type: 'natural' },
          ],
          audioSrc: '/audio/coding_sequence.mp3',
          speakText:
            'Help me put these coding instructions in the right order to guide the robot to the star!',
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Coding Quiz',
          question: 'What is coding?',
          options: [
            { id: 'quiz-opt-1', text: 'Drawing pictures', isCorrect: false, explanation: 'Drawing pictures is art, not coding.' },
            { id: 'quiz-opt-2', text: 'Playing video games', isCorrect: false, explanation: 'Playing games is fun, but it is not coding.' },
            { id: 'quiz-opt-3', text: 'Giving instructions to a computer', isCorrect: true, explanation: 'Coding is writing instructions that tell a computer what to do.' },
            { id: 'quiz-opt-4', text: 'Building a robot', isCorrect: false, explanation: 'Building a robot is engineering, though robots often use code.' },
          ],
          explanation: 'Coding is how we give instructions to computers. Its like writing a recipe that tells the computer exactly what to do.',
          imageUrl: '/images/coding-quiz.png',
          audioSrc: '/audio/coding_quiz.mp3',
          speakText: 'What is coding? Is it drawing pictures, playing video games, giving instructions to a computer, or building a robot?',
        },
      ],
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
          title: 'Where do we use Computers?',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn more about computers.",
            "Computers are used in many places around us. Let's explore where we can find them!",
            "We use computers at home, in schools, shops, offices, hospitals, and banks."
          ],
          imageUrl: '/images/computers-places.png',
          audioSrc: '/audio/computers_places.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn more about computers. Computers are used in many places around us. Let's explore where we can find them! We use computers at home, in schools, shops, offices, hospitals, and banks."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'What is a Computer made of?',
          description: [
            "A computer has two main parts: Hardware and Software.",
            "Hardware is the parts of the computer you can touch, like the monitor, keyboard, mouse, and CPU cabinet.",
            "Software is what makes the computer work. You can't touch software, but it tells the computer what to do."
          ],
          exampleImages: [
            { src: '/images/hardware.png', alt: 'Computer Hardware' },
            { src: '/images/software.png', alt: 'Computer Software' }
          ],
          audioSrc: '/audio/hardware_software.mp3',
          speakText: "A computer has two main parts: Hardware and Software. Hardware is the parts of the computer you can touch, like the monitor, keyboard, mouse, and CPU cabinet. Software is what makes the computer work. You can't touch software, but it tells the computer what to do."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Input and Output Devices',
          description: [
            "Computers can 'listen' using input devices and 'talk' using output devices.",
            "Input devices include keyboard, mouse, scanner, and microphone.",
            "Output devices include monitor, speakers, and printer."
          ],
          exampleImages: [
            { src: '/images/input-devices.png', alt: 'Input Devices' },
            { src: '/images/output-devices.png', alt: 'Output Devices' }
          ],
          audioSrc: '/audio/input_output.mp3',
          speakText: "Computers can 'listen' using input devices and 'talk' using output devices. Input devices include keyboard, mouse, scanner, and microphone. Output devices include monitor, speakers, and printer."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Input, Process, and Output',
          description: [
            "When we use a computer, three things happen: Input, Process, and Output.",
            "Input is when we tell the computer what to do by typing or clicking.",
            "Process is when the computer works on our instructions. The CPU does this work.",
            "Output is when the computer shows us the result on the screen or through a printer."
          ],
          imageUrl: '/images/input-process-output.png',
          audioSrc: '/audio/input_process_output.mp3',
          speakText: "When we use a computer, three things happen: Input, Process, and Output. Input is when we tell the computer what to do by typing or clicking. Process is when the computer works on our instructions. The CPU does this work. Output is when the computer shows us the result on the screen or through a printer."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Sort the Devices',
          instruction: 'Help me sort these computer parts. Drag them into the correct box: "Input Devices" or "Output Devices".',
          items: [
            { id: 'dnd-item-1', text: 'Keyboard', type: 'natural', imageUrl: '/images/keyboard.png' },
            { id: 'dnd-item-2', text: 'Monitor', type: 'man-made', imageUrl: '/images/monitor.png' },
            { id: 'dnd-item-3', text: 'Mouse', type: 'natural', imageUrl: '/images/mouse.png' },
            { id: 'dnd-item-4', text: 'Speakers', type: 'man-made', imageUrl: '/images/speakers.png' },
            { id: 'dnd-item-5', text: 'Microphone', type: 'natural', imageUrl: '/images/microphone.png' },
            { id: 'dnd-item-6', text: 'Printer', type: 'man-made', imageUrl: '/images/printer.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Input Devices', type: 'natural' },
            { id: 'manMadeTarget', title: 'Output Devices', type: 'man-made' }
          ],
          audioSrc: '/audio/sort_devices.mp3',
          speakText: 'Help me sort these computer parts. Drag them into the correct box: Input Devices or Output Devices.'
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Computer Quiz',
          question: 'Which of these is NOT a hardware?',
          options: [
            { id: 'quiz-opt-1', text: 'Keyboard', isCorrect: false, explanation: 'A keyboard is a hardware device that you can touch.' },
            { id: 'quiz-opt-2', text: 'Monitor', isCorrect: false, explanation: 'A monitor is a hardware device that displays information.' },
            { id: 'quiz-opt-3', text: 'MS Paint', isCorrect: true, explanation: 'MS Paint is a software program, not a hardware device.' },
            { id: 'quiz-opt-4', text: 'Mouse', isCorrect: false, explanation: 'A mouse is a hardware device that you can touch.' }
          ],
          explanation: 'Hardware is the physical parts of a computer that you can touch. Software is the programs that tell the computer what to do.',
          imageUrl: '/images/hardware-software-quiz.png',
          audioSrc: '/audio/hardware_software_quiz.mp3',
          speakText: 'Which of these is NOT a hardware? Is it the keyboard, monitor, MS Paint, or mouse?'
        }
      ]
    },
    {
      id: 2,
      title: "Smartphones: Pocket Computers",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'What can Smartphones do?',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn about smartphones.",
            "Smartphones are like small computers that fit in your pocket.",
            "They can do many things like make phone calls, send messages, take pictures, play games, and help people find their way with maps."
          ],
          imageUrl: '/images/smartphone-intro.png',
          audioSrc: '/audio/smartphone_intro.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn about smartphones. Smartphones are like small computers that fit in your pocket. They can do many things like make phone calls, send messages, take pictures, play games, and help people find their way with maps."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'How are Smartphones like Computers?',
          description: [
            "Smartphones and computers are similar in many ways.",
            "Both can send messages and emails, play games, show videos, and help us search for information on the internet.",
            "The main difference is that smartphones are smaller and can go with you anywhere!"
          ],
          imageUrl: '/images/smartphone-computer.png',
          audioSrc: '/audio/smartphone_computer.mp3',
          speakText: "Smartphones and computers are similar in many ways. Both can send messages and emails, play games, show videos, and help us search for information on the internet. The main difference is that smartphones are smaller and can go with you anywhere!"
        },
        {
          type: 'learn',
          format: 'text',
          title: 'YouTube and other Smartphone Apps',
          description: [
            "Smartphones have many apps that help us do different things.",
            "YouTube is an app where you can watch videos like cartoons, rhymes, and educational videos.",
            "Other apps include WhatsApp for messaging, Google Maps for finding places, and educational apps like Periwinkle for learning."
          ],
          exampleImages: [
            { src: '/images/youtube-app.png', alt: 'YouTube App' },
            { src: '/images/whatsapp-app.png', alt: 'WhatsApp App' },
            { src: '/images/maps-app.png', alt: 'Maps App' },
            { src: '/images/periwinkle-app.png', alt: 'Periwinkle App' }
          ],
          audioSrc: '/audio/smartphone_apps.mp3',
          speakText: "Smartphones have many apps that help us do different things. YouTube is an app where you can watch videos like cartoons, rhymes, and educational videos. Other apps include WhatsApp for messaging, Google Maps for finding places, and educational apps like Periwinkle for learning."
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Smartphone Quiz',
          question: 'Which of these can a smartphone do?',
          options: [
            { id: 'quiz-opt-1', text: 'Cook food', isCorrect: false, explanation: 'Smartphones cannot cook food.' },
            { id: 'quiz-opt-2', text: 'Take pictures', isCorrect: true, explanation: 'Smartphones have cameras that can take pictures.' },
            { id: 'quiz-opt-3', text: 'Drive a car', isCorrect: false, explanation: 'Smartphones cannot drive a car.' },
            { id: 'quiz-opt-4', text: 'Fly in the air', isCorrect: false, explanation: 'Smartphones cannot fly in the air.' }
          ],
          explanation: 'Smartphones can do many things like make calls, send messages, take pictures, play games, and help us find places with maps.',
          imageUrl: '/images/smartphone-quiz.png',
          audioSrc: '/audio/smartphone_quiz.mp3',
          speakText: 'Which of these can a smartphone do? Can it cook food, take pictures, drive a car, or fly in the air?'
        }
      ]
    },
    {
      id: 3,
      title: "Introduction to Notepad",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Keyboard Practice with Notepad App',
          description: [
            "Hello friends! I'm Zippy! Today we're going to learn about Notepad.",
            "Notepad is like a notebook on your computer where you can write stories and make notes.",
            "Instead of using pencils or pens, you use the keyboard to type your words."
          ],
          imageUrl: '/images/notepad-intro.png',
          audioSrc: '/audio/notepad_intro.mp3',
          speakText: "Hello friends! I'm Zippy! Today we're going to learn about Notepad. Notepad is like a notebook on your computer where you can write stories and make notes. Instead of using pencils or pens, you use the keyboard to type your words."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Components of Notepad',
          description: [
            "Notepad has different parts that help us use it:",
            "1. Title Bar: This is the top part that shows the name of your file.",
            "2. Menu Bar: This has options like File, Edit, and View to help you do different things.",
            "3. Text Area: This is the big blank space where you type your words and sentences."
          ],
          imageUrl: '/images/notepad-components.png',
          audioSrc: '/audio/notepad_components.mp3',
          speakText: "Notepad has different parts that help us use it: 1. Title Bar: This is the top part that shows the name of your file. 2. Menu Bar: This has options like File, Edit, and View to help you do different things. 3. Text Area: This is the big blank space where you type your words and sentences."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Type and Save the File',
          description: [
            "After typing your story or notes in Notepad, you need to save it so you can see it later.",
            "To save your work: Click on 'File' menu, choose 'Save As', give your file a name, and click 'Save'.",
            "Now your story is safely stored on the computer!"
          ],
          imageUrl: '/images/notepad-save.png',
          audioSrc: '/audio/notepad_save.mp3',
          speakText: "After typing your story or notes in Notepad, you need to save it so you can see it later. To save your work: Click on 'File' menu, choose 'Save As', give your file a name, and click 'Save'. Now your story is safely stored on the computer!"
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Notepad Quiz',
          question: 'What do we use to type in Notepad?',
          options: [
            { id: 'quiz-opt-1', text: 'Pencil', isCorrect: false, explanation: 'We do not use pencils to type in Notepad.' },
            { id: 'quiz-opt-2', text: 'Keyboard', isCorrect: true, explanation: 'We use the keyboard to type words in Notepad.' },
            { id: 'quiz-opt-3', text: 'Mouse', isCorrect: false, explanation: 'While we use the mouse to click on menus, we type with the keyboard.' },
            { id: 'quiz-opt-4', text: 'Pen', isCorrect: false, explanation: 'We do not use pens to type in Notepad.' }
          ],
          explanation: 'We use the keyboard to type words, sentences, and stories in Notepad. The keyboard has keys for letters, numbers, and special characters.',
          imageUrl: '/images/notepad-quiz.png',
          audioSrc: '/audio/notepad_quiz.mp3',
          speakText: 'What do we use to type in Notepad? Is it a pencil, keyboard, mouse, or pen?'
        }
      ]
    },
    {
      id: 4,
      title: "Drawing with MS Paint (Part 2)",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Exploring Lines, Curves, and Brushes',
          description: [
            "Hello artists! I'm Zippy! Today we're going to explore more features of MS Paint.",
            "MS Paint has many tools in the Ribbon at the top of the screen.",
            "The Line tool helps you draw straight lines, the Curve tool makes wavy lines, and the Brushes tool lets you paint with different strokes."
          ],
          imageUrl: '/images/paint-tools.png',
          audioSrc: '/audio/paint_tools.mp3',
          speakText: "Hello artists! I'm Zippy! Today we're going to explore more features of MS Paint. MS Paint has many tools in the Ribbon at the top of the screen. The Line tool helps you draw straight lines, the Curve tool makes wavy lines, and the Brushes tool lets you paint with different strokes."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Add Words to Pictures',
          description: [
            "In MS Paint, you can add words to your pictures using the Text tool.",
            "The Text tool looks like the letter 'A' in the Tools section.",
            "Click on the Text tool, then click where you want to add words, type your text, and click outside the text box when you're done."
          ],
          exampleImages: [
            { src: '/images/text-tool.png', alt: 'Text Tool' },
            { src: '/images/text-example.png', alt: 'Text Example' }
          ],
          audioSrc: '/audio/paint_text.mp3',
          speakText: "In MS Paint, you can add words to your pictures using the Text tool. The Text tool looks like the letter 'A' in the Tools section. Click on the Text tool, then click where you want to add words, type your text, and click outside the text box when you're done."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Fixing Mistakes in MS Paint',
          description: [
            "Everyone makes mistakes sometimes! In MS Paint, there are ways to fix them:",
            "1. Use the Eraser tool to erase parts of your drawing.",
            "2. Click the Undo button (curved arrow pointing left) to undo your last action.",
            "3. Click the Redo button (curved arrow pointing right) if you want to bring back what you undid."
          ],
          exampleImages: [
            { src: '/images/eraser-tool.png', alt: 'Eraser Tool' },
            { src: '/images/undo-redo.png', alt: 'Undo and Redo Buttons' }
          ],
          audioSrc: '/audio/paint_mistakes.mp3',
          speakText: "Everyone makes mistakes sometimes! In MS Paint, there are ways to fix them: 1. Use the Eraser tool to erase parts of your drawing. 2. Click the Undo button (curved arrow pointing left) to undo your last action. 3. Click the Redo button (curved arrow pointing right) if you want to bring back what you undid."
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'MS Paint Quiz',
          question: 'Which tool would you use to write your name on your drawing?',
          options: [
            { id: 'quiz-opt-1', text: 'Line tool', isCorrect: false, explanation: 'The Line tool is used to draw straight lines, not to add text.' },
            { id: 'quiz-opt-2', text: 'Text tool', isCorrect: true, explanation: 'The Text tool is used to add words to your pictures.' },
            { id: 'quiz-opt-3', text: 'Eraser tool', isCorrect: false, explanation: 'The Eraser tool is used to erase parts of your drawing, not to add text.' },
            { id: 'quiz-opt-4', text: 'Curve tool', isCorrect: false, explanation: 'The Curve tool is used to draw curved lines, not to add text.' }
          ],
          explanation: 'The Text tool, which looks like the letter "A" in the Tools section, is used to add words to your pictures in MS Paint.',
          imageUrl: '/images/paint-quiz.png',
          audioSrc: '/audio/paint_quiz.mp3',
          speakText: 'Which tool would you use to write your name on your drawing? Is it the Line tool, Text tool, Eraser tool, or Curve tool?'
        }
      ]
    },
    {
      id: 5,
      title: "Digital Art",
      lessonContent: [
        { 
          type: 'learn',
          format: 'text',
          title: 'Introduction to Digital Art',
          description: [
            "Hello artists! I'm Zippy! Today we're going to explore digital art.",
            'Digital art is artwork created using computers and digital tools.',
            'We can draw, paint, and create amazing pictures using special programs!',
            "Let's discover how to make beautiful digital art together!",
          ],
          imageUrl: '/images/digital-art-intro.png',
          audioSrc: '/audio/digital_art_intro.mp3',
          speakText:
            "Hello artists! I'm Zippy! Today we're going to explore digital art. Digital art is artwork created using computers and digital tools. We can draw, paint, and create amazing pictures using special programs! Let's discover how to make beautiful digital art together!",
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Digital Art Tools',
          description: [
            "Here are some tools we use to create digital art:",
          ],
          exampleImages: [
            { src: '/images/digital-pen.png', alt: 'Digital Pen' },
            { src: '/images/drawing-tablet.png', alt: 'Drawing Tablet' },
            { src: '/images/art-software.png', alt: 'Art Software' },
            { src: '/images/color-palette.png', alt: 'Digital Color Palette' },
          ],
          audioSrc: '/audio/digital_art_tools.mp3',
          speakText:
            "Here are some tools we use to create digital art: A digital pen helps us draw on the computer. A drawing tablet is a special surface we can draw on. Art software gives us brushes, colors, and shapes to use. A digital color palette lets us choose from millions of colors!",
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Digital vs Traditional Art',
          instruction:
            'Help me sort these art tools. Drag them into the correct box: "Digital Art Tools" or "Traditional Art Tools".',
          items: [
            { id: 'dnd-item-1', text: 'Drawing Tablet', type: 'man-made', imageUrl: '/images/drawing-tablet.png' },
            { id: 'dnd-item-2', text: 'Paint Brush', type: 'man-made', imageUrl: '/images/paint-brush.png' },
            { id: 'dnd-item-3', text: 'Art Software', type: 'man-made', imageUrl: '/images/art-software.png' },
            { id: 'dnd-item-4', text: 'Watercolor Paints', type: 'man-made', imageUrl: '/images/watercolor.png' },
            { id: 'dnd-item-5', text: 'Digital Pen', type: 'man-made', imageUrl: '/images/digital-pen.png' },
            { id: 'dnd-item-6', text: 'Colored Pencils', type: 'man-made', imageUrl: '/images/colored-pencils.png' },
          ],
          targets: [
            { id: 'naturalTarget', title: 'Digital Art Tools', type: 'natural' },
            { id: 'manMadeTarget', title: 'Traditional Art Tools', type: 'man-made' },
          ],
          audioSrc: '/audio/digital_art_dnd.mp3',
          speakText:
            'Help me sort these art tools. Drag them into the correct box: Digital Art Tools or Traditional Art Tools.',
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Digital Art Quiz',
          question: 'What makes digital art different from traditional art?',
          options: [
            { id: 'quiz-opt-1', text: 'Digital art uses a computer', isCorrect: true, explanation: 'Digital art is created using computers and digital tools.' },
            { id: 'quiz-opt-2', text: 'Digital art can only be blue', isCorrect: false, explanation: 'Digital art can be any color, just like traditional art.' },
            { id: 'quiz-opt-3', text: 'Digital art is always 3D', isCorrect: false, explanation: 'Digital art can be 2D or 3D, depending on the tools used.' },
            { id: 'quiz-opt-4', text: 'Digital art cannot be printed', isCorrect: false, explanation: 'Digital art can be printed and displayed just like traditional art.' },
          ],
          explanation: 'Digital art is created using computers and digital tools like drawing tablets and art software. Traditional art uses physical materials like paint and paper.',
          imageUrl: '/images/digital-art-quiz.png',
          audioSrc: '/audio/digital_art_quiz.mp3',
          speakText: 'What makes digital art different from traditional art?',
        },
      ]
    },
    {
      id: 2,
      title: "Animation Basics",
      lessonContent: [
        { 
          type: 'learn',
          format: 'text',
          title: 'Introduction to Animation',
          description: [
            "Hi animators! I'm Zippy! Today we're learning about animation.",
            'Animation is making pictures that seem to move and tell a story.',
            'It works by showing many pictures very quickly, one after another!',
            "Let's discover how to create simple animations together!",
          ],
          imageUrl: '/images/animation-intro.png',
          audioSrc: '/audio/animation_intro.mp3',
          speakText:
            "Hi animators! I'm Zippy! Today we're learning about animation. Animation is making pictures that seem to move and tell a story. It works by showing many pictures very quickly, one after another! Let's discover how to create simple animations together!",
        },
        {
          type: 'learn',
          format: 'video',
          title: 'How Animation Works',
          description: [
            "Let's watch a short video to see how animation works!",
            "This video shows how a simple animation is created by drawing slightly different pictures and showing them quickly.",
          ],
          imageUrl: '/images/animation-video-thumbnail.png',
          audioSrc: '/audio/animation_video_intro.mp3',
          speakText:
            "Let's watch a short video to see how animation works! This video shows how a simple animation is created by drawing slightly different pictures and showing them quickly.",
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Activity: Animation Sequence',
          instruction:
            'Help me put these animation frames in the correct order to make a ball bounce!',
          items: [
            { id: 'dnd-item-1', text: 'Ball at top', type: 'natural', imageUrl: '/images/ball-top.png' },
            { id: 'dnd-item-2', text: 'Ball moving down', type: 'natural', imageUrl: '/images/ball-down1.png' },
            { id: 'dnd-item-3', text: 'Ball near ground', type: 'natural', imageUrl: '/images/ball-down2.png' },
            { id: 'dnd-item-4', text: 'Ball touching ground', type: 'natural', imageUrl: '/images/ball-ground.png' },
            { id: 'dnd-item-5', text: 'Ball moving up', type: 'natural', imageUrl: '/images/ball-up1.png' },
            { id: 'dnd-item-6', text: 'Ball rising higher', type: 'natural', imageUrl: '/images/ball-up2.png' },
          ],
          targets: [
            { id: 'naturalTarget', title: 'Animation Sequence', type: 'natural' },
          ],
          audioSrc: '/audio/animation_sequence.mp3',
          speakText:
            'Help me put these animation frames in the correct order to make a ball bounce!',
        },
        {
          type: 'quiz',
          format: 'quiz',
          title: 'Animation Quiz',
          question: 'How does animation work?',
          options: [
            { id: 'quiz-opt-1', text: 'By taking photos of real things', isCorrect: false, explanation: 'Taking photos is photography, not animation.' },
            { id: 'quiz-opt-2', text: 'By showing many pictures quickly', isCorrect: true, explanation: 'Animation works by showing many slightly different pictures very quickly.' },
            { id: 'quiz-opt-3', text: 'By using only one picture', isCorrect: false, explanation: 'Animation needs multiple pictures to create the illusion of movement.' },
            { id: 'quiz-opt-4', text: 'By moving real objects', isCorrect: false, explanation: 'Moving real objects is puppetry, though stop-motion animation is similar.' },
          ],
          explanation: 'Animation works by showing many pictures very quickly, one after another. Each picture is slightly different, which creates the illusion of movement.',
          imageUrl: '/images/animation-quiz.png',
          audioSrc: '/audio/animation_quiz.mp3',
          speakText: 'How does animation work? Is it by taking photos of real things, showing many pictures quickly, using only one picture, or moving real objects?',
        },
      ]
    }
  ]
};
