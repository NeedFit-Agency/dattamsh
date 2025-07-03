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
  imageUrl?: string;
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
      title: "Introduction to Machines",
      lessonContent: [
        {
          type: "drag-drop",
          format: "drag-drop",
          title: "Sort Natural and Man-made Things",
          instruction:
            'Help me sort these pictures',
          items: [
            {
              id: "dnd-item-1",
              text: "Sun",
              type: "option-1",
              imageUrl: "/images/sun.png",
            },
            {
              id: "dnd-item-7",
              text: "chair",
              type: "option-2",
              imageUrl: "/images/chair.png",
            },
            {
              id: "dnd-item-3",
              text: "tree",
              type: "option-1",
              imageUrl: "/images/tree.png",
            },
            {
              id: "dnd-item-4",
              text: "bird",
              type: "option-1",
              imageUrl: "/images/bird.png",
            },
            {
              id: "dnd-item-5",
              text: "school",
              type: "option-2",
              imageUrl: "/images/school.png",
            },
            {
              id: "dnd-item-2",
              text: "water",
              type: "option-1",
              imageUrl: "/images/water.png",
            },
            {
              id: "dnd-item-6",
              text: "cycle",
              type: "option-2",
              imageUrl: "/images/cycle.png",
            },
            {
              id: "dnd-item-8",
              text: "blackboard",
              type: "option-2",
              imageUrl: "/images/blackboard.png",
            },
          ],
          targets: [
            { id: "naturalTarget", title: "Natural Things", type: "option-1" },
            { id: "manMadeTarget", title: "Man-made Things", type: "option-2" },
          ],
          audioSrc: "/audio/natural_manmade.mp3",
          speakText:
            "Help me sort these pictures. Drag them into the correct box: Natural Things or Man-made Things.",
        },
      ],
    },
    {
      id: 2,
      title: "All About Computers",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Match Computer Parts to Their Functions",
          instruction: "Match each computer part to what it does!",
          items: [
            {
              id: "monitor-item",
              text: "Monitor",
              type: "shows",
              imageUrl: "/images/monitor.png",
              color: "#2196f3"
            },
            {
              id: "keyboard-item",
              text: "Keyboard",
              type: "typing",
              imageUrl: "/images/keyboard.png",
              color: "#4caf50"
            },
            {
              id: "cpu-item",
              text: "CPU",
              type: "brain",
              imageUrl: "/images/cpu.png",
              color: "#9c27b0"
            },            {
              id: "mouse-item",
              text: "Mouse",
              type: "pointing",
              imageUrl: "/images/mouse.png",
              color: "#ff9800"
            },
          ],
          buckets: [
            { id: "typing-bucket", title: "set of buttons called keys", type: "typing", color: "#4caf50" },
            { id: "pointing-bucket", title: "moves the pointer on the screen", type: "pointing", color: "#ff9800" },
            { id: "brain-bucket", title: "brain of the computer", type: "brain", color: "#9c27b0" },
                        { id: "shows-bucket", title: "shows everything the computer is doing", type: "shows", color: "#2196f3" },

          ],
          successMessage: "Great job! You matched all computer parts!",
          correctMessage: "That's right!",
          tryAgainMessage: "Try a different match!",
          resetLabel: "Reset",
          playAgainLabel: "Play Again",
          audioSrc: "/audio/computer_parts.mp3",
          speakText: "Match each computer part to what it does!",
        },
      ],
    },
    {
      id: 3,
      title: "Computer Care and Safety",
      lessonContent: [
        {
          type: "sequence-match",
          format: "sequence-match",
          title: "Shutting Down the Computer",
          instruction: "Put these steps in the correct order to properly shut down a computer!",
          items: [
            { id: "step-6", content: "Switch off the power supply" },
            { id: "step-1", content: "Save your work" },
            { id: "step-2", content: "Open the Start menu" },
            { id: "step-4", content: "Select \"Shut down\"" },
            { id: "step-3", content: "Click on the power button" },
            { id: "step-5", content: "Wait for the computer to turn off" },
          ],
          correctOrder: ["step-1", "step-2", "step-3", "step-4", "step-5", "step-6"],
          dropZoneCount: 6,
          audioSrc: "/audio/computer_shutdown.mp3",
          speakText: "Put these steps in the correct order to properly shut down a computer!",
        },
      ],
    },
    {
      id: 4,
      title: "Keyboard and Mouse Fun",
      lessonContent: [
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Keyboard Key",
          riddleText: "I am the longest key on the keyboard, and I help you add spaces between words. Who am I?",
          questionText: "Which key am I?",          options: [
            { id: "option-2", text: "Enter Key", isCorrect: false, imageUrl: "/images/enter.png" },
            { id: "option-3", text: "Caps Lock Key", isCorrect: false, imageUrl: "/images/capslock.png" },
            { id: "option-1", text: "Space Bar Key", isCorrect: true, imageUrl: "/images/spacebar.png" },
            { id: "option-4", text: "Backspace Key", isCorrect: false, imageUrl: "/images/backspace.png" },
          ],
          audioSrc: "/audio/spacebar_riddle.mp3",
          speakText: "I am the longest key on the keyboard, and I help you add spaces between words. Who am I?",
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Computer Part",
          riddleText: "I have lots of buttons with letters and numbers that help you type words on a computer. Who am I?",
          questionText: "Which computer part am I?",
          options: [
            { id: "option-2", text: "Monitor", isCorrect: false, imageUrl: "/images/monitor.png" },
                        { id: "option-1", text: "Keyboard", isCorrect: true, imageUrl: "/images/keyboard.png" },

            { id: "option-3", text: "Mouse", isCorrect: false, imageUrl: "/images/mouse.png" },
            { id: "option-4", text: "Speaker", isCorrect: false, imageUrl: "/images/speaker.png" },
          ],
          audioSrc: "/audio/keyboard_riddle.mp3",
          speakText: "I have lots of buttons with letters and numbers that help you type words on a computer. Who am I?",
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Mouse Part",
          riddleText: "I am the small wheel on the mouse that helps you move up and down a page. Who am I?",
          questionText: "",          options: [
            { id: "option-2", text: "Left Button", isCorrect: false, imageUrl: "/images/left-button.svg" },
            { id: "option-3", text: "Right Button", isCorrect: false, imageUrl: "/images/right-button.svg" },
            { id: "option-4", text: "Body", isCorrect: false, imageUrl: "/images/mouse-body.svg" },
                      { id: "option-1", text: "Scroll Wheel", isCorrect: true, imageUrl: "/images/scroll-wheel.svg" },

          ],
          audioSrc: "/audio/scroll_wheel_riddle.mp3",
          speakText: "I am the small wheel on the mouse that helps you move up and down a page. Who am I?",
        }
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
