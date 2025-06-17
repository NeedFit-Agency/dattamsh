export type FormatType =
  | "drag-drop"
  | "bucket-match"
  | "sequence-match"
  | "who-am-i";

export interface BaseContentProps {
  type: string;
  title: string;
  format: FormatType;
  audioSrc?: string;
  speakText?: string;
}

export interface DraggableItemData {
  id: string;
  text: string;
  type: string;
  imageUrl?: string;
}

export interface DropTargetData {
  id: string;
  title: string;
  type: string;
}

export interface DragDropSlide extends BaseContentProps {
  type: "drag-drop";
  instruction: string;
  items: DraggableItemData[];
  targets: DropTargetData[];
}

export interface BucketMatchItem {
  id: string;
  text: string;
  type: string;
  imageUrl?: string;
  color?: string;
}

export interface BucketData {
  id: string;
  title: string;
  type: string;
  color?: string;
}

export interface BucketMatchSlide extends BaseContentProps {
  type: "bucket-match";
  format: "bucket-match";
  instruction: string;
  items: BucketMatchItem[];
  buckets: BucketData[];
  successMessage?: string;
  correctMessage?: string;
  tryAgainMessage?: string;
  resetLabel?: string;
  playAgainLabel?: string;
}

export interface SequenceMatchItem {
  id: string;
  content: string;
}

export interface SequenceMatchSlide extends BaseContentProps {
  type: "sequence-match";
  format: "sequence-match";
  instruction: string;
  items: SequenceMatchItem[];
  correctOrder: string[];
  dropZoneCount: number;
}

export interface WhoAmIOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface WhoAmISlide extends BaseContentProps {
  type: "who-am-i";
  format: "who-am-i";
  riddleText: string;
  questionText: string;
  options: WhoAmIOption[];
}

export type LessonContent =
  | DragDropSlide
  | BucketMatchSlide
  | SequenceMatchSlide
  | WhoAmISlide;

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
      title: "Natural vs Man-made Sorting",
      lessonContent: [
        {
          type: "drag-drop",
          format: "drag-drop",
          title: "Sort Them Out!",
          instruction:
            'Help me sort these pictures. Drag them into the correct box: "Natural Things" or "Man-made Things".',
          items: [
            {
              id: "dnd-item-1",
              text: "Tree",
              type: "option-1",
              imageUrl: "/images/tree.png",
            },
            {
              id: "dnd-item-2",
              text: "Chair",
              type: "option-2",
              imageUrl: "/images/chair.png",
            },
            {
              id: "dnd-item-3",
              text: "Bird",
              type: "option-1",
              imageUrl: "/images/bird.png",
            },
            {
              id: "dnd-item-4",
              text: "Cycle",
              type: "option-2",
              imageUrl: "/images/cycle.png",
            },
            {
              id: "dnd-item-5",
              text: "Sun",
              type: "option-1",
              imageUrl: "/images/sun.png",
            },
            {
              id: "dnd-item-6",
              text: "Blackboard",
              type: "option-2",
              imageUrl: "/images/blackboard.png",
            },
          ],
          targets: [
            { id: "naturalTarget", title: "Natural Things", type: "option-1" },
            { id: "manMadeTarget", title: "Man-made Things", type: "option-2" },
          ],
          audioSrc: "/audio/04_dnd_instruction.mp3",
          speakText:
            "Help me sort these pictures. Drag them into the correct box: Natural Things or Man-made Things.",
        },
      ],
    },
    {
      id: 2,
      title: "Color Matching",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Match the Colors",
          instruction: "Drag each fruit to its matching color bucket!",
          items: [
            {
              id: "banana",
              text: "Banana",
              type: "yellow",
              imageUrl: "/images/fruits/banana.png",
              color: "#ffeb3b"
            },
            {
              id: "apple",
              text: "Apple",
              type: "red",
              imageUrl: "/images/fruits/apple.png",
              color: "#ff5252"
            },
            {
              id: "grapes",
              text: "Grapes",
              type: "purple",
              imageUrl: "/images/fruits/grapes.png",
              color: "#9c27b0"
            },
            {
              id: "orange",
              text: "Orange",
              type: "orange",
              imageUrl: "/images/fruits/orange.png",
              color: "#ff9800"
            },
          ],
          buckets: [
            { id: "red-bucket", title: "Red", type: "red", color: "#ff5252" },
            { id: "yellow-bucket", title: "Yellow", type: "yellow", color: "#ffeb3b" },
            { id: "orange-bucket", title: "Orange", type: "orange", color: "#ff9800" },
            { id: "purple-bucket", title: "Purple", type: "purple", color: "#9c27b0" }
          ],
          successMessage: "Great job! You matched all the colors!",
          correctMessage: "That's right!",
          tryAgainMessage: "Try a different match!",
          resetLabel: "Start Over",
          playAgainLabel: "Play Again",
          audioSrc: "/audio/match-colors.mp3",
          speakText: "Drag each fruit to its matching color bucket!",
        },
      ],
    },
    {
      id: 3,
      title: "Computer Setup Steps",
      lessonContent: [
        {
          type: "sequence-match",
          format: "sequence-match",
          title: "Computer Startup Steps",
          instruction: "Put these steps in the correct order to turn on a computer!",
          items: [
            { id: "step-1", content: "Plug in the computer" },
            { id: "step-2", content: "Press the power button" },
            { id: "step-3", content: "Wait for the screen to turn on" },
            { id: "step-4", content: "See the desktop appear" },
          ],
          correctOrder: ["step-1", "step-2", "step-3", "step-4"],
          dropZoneCount: 4,
          audioSrc: "/audio/computer_startup.mp3",
          speakText: "Put these steps in the correct order to turn on a computer!",
        },
      ],
    },
    {
      id: 4,
      title: "Computer Parts Mystery",
      lessonContent: [
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Computer Part",
          riddleText: "I help you see everything the computer shows. Without me, you can't watch videos or play games. I have a screen that displays colorful pictures and text. What am I?",
          questionText: "Which computer part am I?",
          options: [
            { id: "option-1", text: "Monitor", isCorrect: true },
            { id: "option-2", text: "Keyboard", isCorrect: false },
            { id: "option-3", text: "Mouse", isCorrect: false },
            { id: "option-4", text: "Speaker", isCorrect: false },
          ],
          audioSrc: "/audio/computer_riddle.mp3",
          speakText: "I help you see everything the computer shows. Without me, you can't watch videos or play games. I have a screen that displays colorful pictures and text. What am I?",
        },
      ],
    },
  ],
  "2": [
    {
      id: 1,
      title: "Hardware vs Software",
      lessonContent: [
        {
          type: "drag-drop",
          format: "drag-drop",
          title: "Sort Computer Items",
          instruction:
            'Help me sort these computer items. Drag them into the correct box: "Hardware" or "Software".',
          items: [
            {
              id: "dnd-item-1",
              text: "Monitor",
              type: "option-1",
              imageUrl: "/images/monitor.png",
            },
            {
              id: "dnd-item-2",
              text: "Paint Program",
              type: "option-2",
              imageUrl: "/images/software.png",
            },
            {
              id: "dnd-item-3",
              text: "Keyboard",
              type: "option-1",
              imageUrl: "/images/keyboard.png",
            },
            {
              id: "dnd-item-4",
              text: "Calculator App",
              type: "option-2",
              imageUrl: "/images/software.png",
            },
            {
              id: "dnd-item-5",
              text: "Printer",
              type: "option-1",
              imageUrl: "/images/printer.png",
            },
            {
              id: "dnd-item-6",
              text: "Game",
              type: "option-2",
              imageUrl: "/images/software.png",
            },
          ],
          targets: [
            { id: "hardwareTarget", title: "Hardware", type: "option-1" },
            { id: "softwareTarget", title: "Software", type: "option-2" },
          ],
          audioSrc: "/audio/hardware_software.mp3",
          speakText:
            "Help me sort these computer items. Drag them into the correct box: Hardware or Software.",
        },
      ],
    },
    {
      id: 2,
      title: "School Supplies Sorting",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Sort School Supplies",
          instruction: "Put each school supply in the correct category bucket!",
          items: [
            {
              id: "pencil",
              text: "Pencil",
              type: "writing",
              imageUrl: "/images/pencil.png",
            },
            {
              id: "scissors",
              text: "Scissors",
              type: "cutting",
              imageUrl: "/images/scissors.png",
            },
            {
              id: "pen",
              text: "Pen",
              type: "writing",
              imageUrl: "/images/pen.png",
            },
            {
              id: "glue",
              text: "Glue",
              type: "sticking",
              imageUrl: "/images/glue.png",
            }
          ],
          buckets: [
            { id: "writing-bucket", title: "Writing Tools", type: "writing" },
            { id: "cutting-bucket", title: "Cutting Tools", type: "cutting" },
            { id: "sticking-bucket", title: "Sticking Tools", type: "sticking" }
          ],
          successMessage: "Amazing! You've sorted all the school supplies!",
          correctMessage: "Perfect match!",
          tryAgainMessage: "Not quite right, try again!",
          resetLabel: "Clear All",
          playAgainLabel: "Play Again",
          audioSrc: "/audio/school_supplies.mp3",
          speakText: "Put each school supply in the correct category bucket!",
        },
      ],
    },
    {
      id: 3,
      title: "Daily School Routine",
      lessonContent: [
        {
          type: "sequence-match",
          format: "sequence-match",
          title: "Daily School Routine",
          instruction: "Put these daily school activities in the correct order!",
          items: [
            { id: "school-1", content: "Wake up in the morning" },
            { id: "school-2", content: "Get ready for school" },
            { id: "school-3", content: "Go to school" },
            { id: "school-4", content: "Come back home" },
          ],
          correctOrder: ["school-1", "school-2", "school-3", "school-4"],
          dropZoneCount: 4,
          audioSrc: "/audio/school_routine.mp3",
          speakText: "Put these daily school activities in the correct order!",
        },
      ],
    },
    {
      id: 4,
      title: "School Place Mystery",
      lessonContent: [
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the School Place",
          riddleText: "I am a place where children come to learn every day. I have many classrooms, teachers, and students. You can find books, blackboards, and desks here. Children make friends and play games in my playground. What am I?",
          questionText: "Which place am I?",
          options: [
            { id: "option-1", text: "School", isCorrect: true },
            { id: "option-2", text: "Hospital", isCorrect: false },
            { id: "option-3", text: "Market", isCorrect: false },
            { id: "option-4", text: "Park", isCorrect: false },
          ],
          audioSrc: "/audio/school_riddle.mp3",
          speakText: "I am a place where children come to learn every day. I have many classrooms, teachers, and students. You can find books, blackboards, and desks here. Children make friends and play games in my playground. What am I?",
        },
      ],
    },
  ],
  "3": [
    {
      id: 1,
      title: "Internet Tools",
      lessonContent: [
        {
          type: "drag-drop",
          format: "drag-drop",
          title: "Internet vs Non-Internet",
          instruction:
            'Sort these items. Drag them into the correct box: "Internet Tools" or "Non-Internet Tools".',
          items: [
            {
              id: "dnd-item-1",
              text: "Web Browser",
              type: "option-1",
              imageUrl: "/images/standard3/chapter1/chrome_logo.png",
            },
            {
              id: "dnd-item-2",
              text: "Compass",
              type: "option-2",
              imageUrl: "/images/standard3/compass.png",
            },
            {
              id: "dnd-item-3",
              text: "Email",
              type: "option-1",
              imageUrl: "/images/standard3/chapter2/email_concept.png",
            },
            {
              id: "dnd-item-4",
              text: "Calculator",
              type: "option-2",
              imageUrl: "/images/standard3/calculator.png",
            },
            {
              id: "dnd-item-5",
              text: "Search Engine",
              type: "option-1",
              imageUrl: "/images/standard3/chapter1/browser_search_box.png",
            },
            {
              id: "dnd-item-6",
              text: "Ruler",
              type: "option-2",
              imageUrl: "/images/standard3/ruler.png",
            },
          ],
          targets: [
            { id: "internetTarget", title: "Internet Tools", type: "option-1" },
            { id: "nonInternetTarget", title: "Non-Internet Tools", type: "option-2" },
          ],
          audioSrc: "/audio/internet_tools.mp3",
          speakText:
            "Sort these items. Drag them into the correct box: Internet Tools or Non-Internet Tools.",
        },
      ],
    },
    {
      id: 2,
      title: "Email Components",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Match Email Components",
          instruction: "Drag each email component to its matching description bucket!",
          items: [
            {
              id: "subject",
              text: "Subject Line",
              type: "subject",
              imageUrl: "/images/standard3/chapter2/subject.png",
              color: "#ff5252"
            },
            {
              id: "attachment",
              text: "Attachment",
              type: "attachment",
              imageUrl: "/images/standard3/chapter2/attachment.png",
              color: "#ffeb3b"
            },
            {
              id: "recipient",
              text: "To Field",
              type: "recipient",
              imageUrl: "/images/standard3/chapter2/recipient.png",
              color: "#ff9800"
            },
            {
              id: "cc",
              text: "CC",
              type: "cc",
              imageUrl: "/images/standard3/chapter2/cc.png",
              color: "#9c27b0"
            }
          ],
          buckets: [
            {
              id: "subject-bucket",
              title: "Title of your email",
              type: "subject",
              color: "#ff5252"
            },
            {
              id: "attachment-bucket",
              title: "Files you send with email",
              type: "attachment",
              color: "#ffeb3b"
            },
            {
              id: "recipient-bucket",
              title: "Main person you're writing to",
              type: "recipient",
              color: "#ff9800"
            },
            {
              id: "cc-bucket",
              title: "People who get copies",
              type: "cc",
              color: "#9c27b0"
            }
          ],
          audioSrc: "/audio/email_components.mp3",
          speakText: "Drag each email component to its matching description bucket.",
        }
      ]
    },
    {
      id: 3,
      title: "Online Safety Steps",
      lessonContent: [
        {
          type: "sequence-match",
          format: "sequence-match",
          title: "Steps for Online Safety",
          instruction: "Put these online safety steps in the correct order!",
          items: [
            {
              id: "step1",
              content: "Ask an adult before sharing any information online"
            },
            {
              id: "step2",
              content: "Create a strong password using letters, numbers, and symbols"
            },
            {
              id: "step3",
              content: "Only visit websites approved by your parents or teachers"
            },
            {
              id: "step4",
              content: "Tell an adult if something makes you uncomfortable online"
            }
          ],
          correctOrder: ["step1", "step3", "step2", "step4"],
          dropZoneCount: 4,
          audioSrc: "/audio/online_safety.mp3",
          speakText: "Put these online safety steps in the correct order!",
        }
      ]
    },
    {
      id: 4,
      title: "Browser Identification",
      lessonContent: [
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Web Browser",
          riddleText: "I have a colorful circle logo with red, yellow, green, and blue. I'm made by Google and help you search the web. Who am I?",
          questionText: "Which web browser am I?",
          options: [
            { id: "chrome", text: "Google Chrome", isCorrect: true },
            { id: "edge", text: "Microsoft Edge", isCorrect: false },
            { id: "firefox", text: "Mozilla Firefox", isCorrect: false },
            { id: "safari", text: "Safari", isCorrect: false }
          ],
          audioSrc: "/audio/browser_riddle.mp3",
          speakText: "I have a colorful circle logo with red, yellow, green, and blue. I'm made by Google and help you search the web. Who am I?",
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
          type: "bucket-match",
          format: "bucket-match",
          title: "Match OS to Device",
          instruction: "Drag each operating system to its matching device type!",
          items: [
            {
              id: "android",
              text: "Android",
              type: "mobile",
              imageUrl: "/images/standard4/chapter1/android_logo.png",
              color: "#a4c639"
            },
            {
              id: "windows",
              text: "Windows",
              type: "desktop",
              imageUrl: "/images/standard4/chapter1/windows_logo.png",
              color: "#0078d4"
            },
            {
              id: "ios",
              text: "iOS",
              type: "mobile",
              imageUrl: "/images/standard4/chapter1/ios_logo.png",
              color: "#000000"
            },
            {
              id: "macos",
              text: "macOS",
              type: "desktop",
              imageUrl: "/images/standard4/chapter1/macos_logo.png",
              color: "#999999"
            }
          ],
          buckets: [
            {
              id: "mobile-bucket",
              title: "Mobile Devices",
              type: "mobile",
              color: "#e91e63"
            },
            {
              id: "desktop-bucket",
              title: "Desktop Computers",
              type: "desktop",
              color: "#3f51b5"
            }
          ],
          audioSrc: "/audio/match_os_device.mp3",
          speakText: "Drag each operating system to its matching device type!",
        }
      ]
    },
    {
      id: 2,
      title: "Windows Components",
      lessonContent: [
        {
          type: "drag-drop",
          format: "drag-drop",
          title: "Identify Windows Components",
          instruction:
            'Drag these Windows components to their correct category: "User Interface" or "System Utility".',
          items: [
            {
              id: "dnd-item-1",
              text: "Taskbar",
              type: "option-1",
              imageUrl: "/images/standard4/chapter2/windows_desktop_overview.png",
            },
            {
              id: "dnd-item-2",
              text: "Disk Cleanup",
              type: "option-2",
              imageUrl: "/images/standard4/chapter2/disk_cleanup.png",
            },
            {
              id: "dnd-item-3",
              text: "Desktop Icons",
              type: "option-1",
              imageUrl: "/images/standard4/chapter2/this_pc_icon.png",
            },
            {
              id: "dnd-item-4",
              text: "Task Manager",
              type: "option-2",
              imageUrl: "/images/standard4/chapter2/task_manager.png",
            },
            {
              id: "dnd-item-5",
              text: "Start Menu",
              type: "option-1",
              imageUrl: "/images/standard4/chapter2/start_button.png",
            },
            {
              id: "dnd-item-6",
              text: "Antivirus",
              type: "option-2",
              imageUrl: "/images/standard4/chapter2/antivirus.png",
            },
          ],
          targets: [
            { id: "uiTarget", title: "User Interface", type: "option-1" },
            { id: "utilityTarget", title: "System Utility", type: "option-2" },
          ],
          audioSrc: "/audio/windows_components.mp3",
          speakText:
            "Drag these Windows components to their correct category: User Interface or System Utility.",
        },
      ]
    },
    {
      id: 3,
      title: "File Types",
      lessonContent: [
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the File Type",
          riddleText: "I store photos and pictures. My name starts with 'J' and I'm very common on the internet. Who am I?",
          questionText: "Which file type am I?",
          options: [
            { id: "jpg", text: ".jpg / .jpeg", isCorrect: true },
            { id: "txt", text: ".txt", isCorrect: false },
            { id: "mp3", text: ".mp3", isCorrect: false },
            { id: "doc", text: ".doc", isCorrect: false }
          ],
          audioSrc: "/audio/file_type_riddle.mp3",
          speakText: "I store photos and pictures. My name starts with 'J' and I'm very common on the internet. Who am I?",
        }
      ]
    },
    {
      id: 4,
      title: "MS Word Elements",
      lessonContent: [
        {
          type: "sequence-match",
          format: "sequence-match",
          title: "Steps to Insert a Table in MS Word",
          instruction: "Put these steps in the correct order to insert a table in Microsoft Word!",
          items: [
            {
              id: "step1",
              content: "Click on the Insert tab in the ribbon"
            },
            {
              id: "step2",
              content: "Click the Table button"
            },
            {
              id: "step3",
              content: "Select the number of rows and columns you need"
            },
            {
              id: "step4",
              content: "Click to insert the table into your document"
            }
          ],
          correctOrder: ["step1", "step2", "step3", "step4"],
          dropZoneCount: 4,
          audioSrc: "/audio/word_table_steps.mp3",
          speakText: "Put these steps in the correct order to insert a table in Microsoft Word!",
        }
      ]
    }
  ],
};
