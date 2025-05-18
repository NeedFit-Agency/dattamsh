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

export type LessonContent = LearningSlide | DragDropSlide | QuizSlide | TypesSlide | StepByStepSlide | ApplicationSlide;

export interface Chapter {
  id: number;
  title: string;
  lessonContent: LessonContent[];
}

export interface Standard {
  [key: string]: Chapter[];
}

export const standards: Standard = {
 

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
            '1. Schools: Teachers use computers in school to teach children more about topics by showing videos. Children learn computer skills in school using computers. Computers are also used in school offices for accounting and to keep records of teachers, staff, and students.',
            '2. Shops: In shops, computers help in money transactions, check prices, and keep track of what is sold.',
            '3. Offices: In offices, people use computers to write letters, send emails, and complete important tasks efficiently. Computers are also used in offices to maintain records and to store information.',
            '4. Hospitals: Doctors use computers to store patient information. Some advanced computers also help operate machines used in medical procedures.',
            '5. Home: We use computers at home to watch our favourite cartoons, play games, type letters, draw and colour, to learn, watch videos, listen to music, etc.',
            '6. Bank: Banks use computers to keep track of customers accounts and money. They also help with withdrawing cash from ATMs.'
          ],
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Activity: List four more places where we use computers',
          description: [
            'Ask your teacher or parents to help you!',
            'Place 1: _______',
            'Place 2: _______',
            'Place 3: _______',
            'Place 4: _______'
          ]
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
            { src: '/images/skeleton-hardware.png', alt: 'Skeleton illustration of computer hardware' },
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
        },        {
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
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Chapter Quiz: More about Computers',
          description: ["Let's check what you've learned about computers and their parts!"],
          question: "Which of these is an input device?",
          options: [
            { id: "q5-opt1", text: "Monitor", isCorrect: false, explanation: "A monitor is an output device that shows information to us." },
            { id: "q5-opt2", text: "Printer", isCorrect: false, explanation: "A printer is an output device that prints information on paper." },
            { id: "q5-opt3", text: "Keyboard", isCorrect: true, explanation: "Correct! A keyboard is an input device we use to type information into the computer." },
            { id: "q5-opt4", text: "Speaker", isCorrect: false, explanation: "Speakers are output devices that play sounds from the computer." }
          ],
          explanation: "Input devices like keyboards and mice help us give information to the computer. Output devices like monitors and printers show us information from the computer.",
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/quiz5.mp3',
          speakText: "Let's check what you've learned about computers and their parts! Which of these is an input device?"
        }
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