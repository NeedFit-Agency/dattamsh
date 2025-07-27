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
  audioSrc?: string;
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
  audioSrc?: string;
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
          title: "Help me sort natural things or man made things",
          instruction:
            '',
          items: [
            {
              id: "dnd-item-1",
              text: "Sun",
              type: "option-1",
              imageUrl: "/images/sun.svg",
            },
            {
              id: "dnd-item-7",
              text: "chair",
              type: "option-2",
              imageUrl: "/images/chairr.svg",
            },
            {
              id: "dnd-item-3",
              text: "tree",
              type: "option-1",
              imageUrl: "/images/tree.svg",
            },
            {
              id: "dnd-item-4",
              text: "bird",
              type: "option-1",
              imageUrl: "/images/bird.svg",
            },
            {
              id: "dnd-item-5",
              text: "school",
              type: "option-2",
              imageUrl: "/images/school.svg",
            },
            {
              id: "dnd-item-2",
              text: "water",
              type: "option-1",
              imageUrl: "/images/water.svg",
            },
            {
              id: "dnd-item-6",
              text: "cycle",
              type: "option-2",
              imageUrl: "/images/cycle.svg",
            },
            {
              id: "dnd-item-8",
              text: "blackboard",
              type: "option-2",
              imageUrl: "/images/blackboard.svg",
            },
          ],
          targets: [
            { id: "naturalTarget", title: "Natural Things", type: "option-1" },
            { id: "manMadeTarget", title: "Man-made Things", type: "option-2" },
          ],
          audioSrc: "/voice/1.1.m4a",
          speakText:
            "Help me sort natural things or man made things",
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
            { id: "typing-bucket", title: "set of buttons called keys", type: "typing", color: "#4caf50", audioSrc: "/voice/2.2.m4a" },
            { id: "pointing-bucket", title: "moves the pointer on the screen", type: "pointing", color: "#ff9800", audioSrc: "/voice/2.3.m4a" },
            { id: "brain-bucket", title: "brain of the computer", type: "brain", color: "#9c27b0", audioSrc: "/voice/2.4.m4a" },
            { id: "shows-bucket", title: "shows everything the computer is doing", type: "shows", color: "#2196f3", audioSrc: "/voice/2.5.m4a" },
          ],
          successMessage: "Great job! You matched all computer parts!",
          correctMessage: "That's right!",
          tryAgainMessage: "Try a different match!",
          resetLabel: "Start Over",
          playAgainLabel: "Play Again",
          audioSrc: "/voice/2.1.m4a",
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
          title: "The steps to turn off the computer are all mixed up! Can you drag the steps from Column B and put them in the correct order in Column A?",
          instruction: "Put these steps in the correct order to properly shut down a computer!",
          items: [
            { id: "step-6", content: "Switch off the power supply", audioSrc: "/voice/3.2.m4a" },
            { id: "step-1", content: "Save your work", audioSrc: "/voice/3.3.m4a" },
            { id: "step-2", content: "Open the Start menu", audioSrc: "/voice/3.4.m4a" },
            { id: "step-4", content: "Select \"Shut down\"", audioSrc: "/voice/3.5.m4a" },
            { id: "step-3", content: "Click on the power button", audioSrc: "/voice/3.6.m4a" },
            { id: "step-5", content: "Wait for the computer to turn off", audioSrc: "/voice/3.7.m4a" },
          ],
          correctOrder: ["step-1", "step-2", "step-3", "step-4", "step-5", "step-6"],
          dropZoneCount: 6,
          audioSrc: "/voice/3.1.m4a",
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
          questionText: "",          options: [
            { id: "option-2", text: "Enter Key", isCorrect: false, imageUrl: "/images/enter.png" },
            { id: "option-3", text: "Caps Lock Key", isCorrect: false, imageUrl: "/images/capslock.png" },
            { id: "option-1", text: "Space Bar Key", isCorrect: true, imageUrl: "/images/spacebar.png" },
            { id: "option-4", text: "Backspace Key", isCorrect: false, imageUrl: "/images/backspace.png" },
          ],
          audioSrc: "/voice/4.2.m4a",
          speakText: "I am the longest key on the keyboard, and I help you add spaces between words. Who am I?",
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Computer Part",
          riddleText: "I have lots of buttons with letters and numbers that help you type words on a computer. Who am I?",
          questionText: "",
          options: [
            { id: "option-2", text: "Monitor", isCorrect: false, imageUrl: "/images/monitor.png" },
                        { id: "option-1", text: "Keyboard", isCorrect: true, imageUrl: "/images/keyboard.png" },

            { id: "option-3", text: "Mouse", isCorrect: false, imageUrl: "/images/mouse.png" },
            { id: "option-4", text: "Speaker", isCorrect: false, imageUrl: "/images/speaker.png" },
          ],
          audioSrc: "/voice/4.3.m4a",
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
          audioSrc: "/voice/4.4.m4a",
          speakText: "I am the small wheel on the mouse that helps you move up and down a page. Who am I?",
        }
      ],
    },
  ],
  "2": [
    {
      id: 1,
      title: "Computer Parts and Functions",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Match each computer part to what it does!",
          instruction: "Match each computer part to what it does!",
          items: [
            {
              id: "scanner",
              text: "Scanner",
              type: "scanner",
              imageUrl: "/images/scanner.png",
              color: "#2196f3"
            },
            {
              id: "microphone",
              text: "Microphone",
              type: "microphone",
              imageUrl: "/images/microphone.png",
              color: "#4caf50"
            },
            {
              id: "speakers",
              text: "Speakers",
              type: "speakers",
              imageUrl: "/images/speaker.png",
              color: "#9c27b0"
            },
            {
              id: "printer",
              text: "Printer",
              type: "printer",
              imageUrl: "/images/printer.png",
              color: "#ff9800"
            }
          ],
          buckets: [
            { 
              id: "printer-bucket", 
              title: "Prints what you see on the monitor on to paper", 
              type: "printer", 
              color: "#ff9800", 
              audioSrc: "/voice/grade2/1.5.m4a" 
            },
            { 
              id: "microphone-bucket", 
              title: "Used for talking, giving voice instructions, singing, and recording music", 
              type: "microphone", 
              color: "#4caf50", 
              audioSrc: "/voice/grade2/1.3.m4a" 
            },
            { 
              id: "scanner-bucket", 
              title: "Turn pictures and papers into digital files so you can see them on the computer", 
              type: "scanner", 
              color: "#2196f3", 
              audioSrc: "/voice/grade2/1.2.m4a" 
            },
            { 
              id: "speakers-bucket", 
              title: "Listen to a variety of sounds", 
              type: "speakers", 
              color: "#9c27b0", 
              audioSrc: "/voice/grade2/1.4.m4a" 
            }
          ],
          successMessage: "Excellent! You matched all computer parts correctly!",
          correctMessage: "Perfect match!",
          tryAgainMessage: "Try a different match!",
          resetLabel: "Start Over",
          playAgainLabel: "Play Again",
          audioSrc: "/voice/grade2/1.1.m4a",
          speakText: "Match each computer part to what it does!",
        },
      ],
    },
    {
      id: 2,
      title: "Smartphone Capabilities",
      lessonContent: [
        {
          type: "drag-drop",
          format: "drag-drop",
          title: "Help me sort the tasks a smartphone can do?",
          instruction: "Sort these tasks into what smartphones can do and what they cannot do",
          items: [
            {
              id: "dnd-item-1",
              text: "Listen to music",
              type: "option-1",
              imageUrl: "/images/standard2/chapter2/listen-music.png",
            },
            {
              id: "dnd-item-2",
              text: "Search for information on the internet",
              type: "option-1",
              imageUrl: "/images/standard2/chapter2/search-internet.png",
            },
            {
              id: "dnd-item-3",
              text: "Take pictures",
              type: "option-1",
              imageUrl: "/images/standard2/chapter2/take-pictures.png",
            },
            {
              id: "dnd-item-4",
              text: "Help people find their way with maps",
              type: "option-1",
              imageUrl: "/images/standard2/chapter2/maps.png",
            },
            {
              id: "dnd-item-5",
              text: "Eat food",
              type: "option-2",
              imageUrl: "/images/standard2/chapter2/eat-food.png",
            },
            {
              id: "dnd-item-6",
              text: "Play cricket on the ground",
              type: "option-2",
              imageUrl: "/images/standard2/chapter2/play-cricket.png",
            },
            {
              id: "dnd-item-7",
              text: "Washing clothes",
              type: "option-2",
              imageUrl: "/images/standard2/chapter2/washing-clothes.png",
            },
            {
              id: "dnd-item-8",
              text: "Build houses",
              type: "option-2",
              imageUrl: "/images/standard2/chapter2/build-houses.png",
            },
          ],
          targets: [
            { id: "canDoTarget", title: "Tasks smartphones can do", type: "option-1" },
            { id: "cannotDoTarget", title: "Tasks smartphones can't do", type: "option-2" },
          ],
          audioSrc: "/voice/grade2/2.1.m4a",
          speakText: "Help me sort the tasks a smartphone can do?",
        },
      ],
    },
    {
      id: 3,
      title: "Notepad File Operations",
      lessonContent: [
        {
          type: "sequence-match",
          format: "sequence-match",
          title: "The steps to type and save a file in Notepad are all mixed up! Can you drag the steps from Column B and put them in the correct order in Column A?",
          instruction: "Put these steps in the correct order to type and save a file in Notepad!",
          items: [
            { id: "step-1", content: "Type the content", audioSrc: "/voice/grade2/3.2.m4a" },
            { id: "step-2", content: "Click on the \"File\" menu at the top", audioSrc: "/voice/grade2/3.3.m4a" },
            { id: "step-3", content: "Choose \"Save As\"", audioSrc: "/voice/grade2/3.4.m4a" },
            { id: "step-4", content: "Give your file a name, like \"MyStory\"", audioSrc: "/voice/grade2/3.5.m4a" },
            { id: "step-5", content: "Click \"Save\"", audioSrc: "/voice/grade2/3.6.m4a" },
          ],
          correctOrder: ["step-1", "step-2", "step-3", "step-4", "step-5"],
          dropZoneCount: 5,
          audioSrc: "/voice/grade2/3.1.m4a",
          speakText: "Put these steps in the correct order to type and save a file in Notepad!",
        },
      ],
    },
    {
      id: 4,
      title: "Drawing Tools Identification",
      lessonContent: [
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Drawing Tool",
          riddleText: "I help you draw shapes like squares, circles and many more. Which tool am I?",
          questionText: "Which drawing tool am I?",
          options: [
            { id: "option-1", text: "Shape Tools", isCorrect: true, imageUrl: "/images/standard2/chapter4/shape-tools.png" },
            { id: "option-2", text: "Brush Tool", isCorrect: false, imageUrl: "/images/standard2/chapter4/brush-tool.png" },
            { id: "option-3", text: "Eraser Tool", isCorrect: false, imageUrl: "/images/standard2/chapter4/eraser-tool.png" },
            { id: "option-4", text: "Curve Tool", isCorrect: false, imageUrl: "/images/standard2/chapter4/curve-tool.png" },
          ],
          audioSrc: "/voice/grade2/4.2.m4a",
          speakText: "I help you draw shapes like squares, circles and many more. Which tool am I?",
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Drawing Tool",
          riddleText: "I am a tool that can draw curved and wavy lines. Which tool am I?",
          questionText: "Which drawing tool am I?",
          options: [
            { id: "option-1", text: "Shape Tools", isCorrect: false, imageUrl: "/images/standard2/chapter4/shape-tools.png" },
            { id: "option-2", text: "Brush Tool", isCorrect: false, imageUrl: "/images/standard2/chapter4/brush-tool.png" },
            { id: "option-3", text: "Eraser Tool", isCorrect: false, imageUrl: "/images/standard2/chapter4/eraser-tool.png" },
            { id: "option-4", text: "Curve Tool", isCorrect: true, imageUrl: "/images/standard2/chapter4/curve-tool.png" },
          ],
          audioSrc: "/voice/grade2/4.3.m4a",
          speakText: "I am a tool that can draw curved and wavy lines. Which tool am I?",
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Drawing Tool",
          riddleText: "I have different strokes and styles and can help you apply colour to an image. Which tool am I?",
          questionText: "Which drawing tool am I?",
          options: [
            { id: "option-1", text: "Shape Tools", isCorrect: false, imageUrl: "/images/standard2/chapter4/shape-tools.png" },
            { id: "option-2", text: "Brush Tool", isCorrect: true, imageUrl: "/images/standard2/chapter4/brush-tool.png" },
            { id: "option-3", text: "Eraser Tool", isCorrect: false, imageUrl: "/images/standard2/chapter4/eraser-tool.png" },
            { id: "option-4", text: "Curve Tool", isCorrect: false, imageUrl: "/images/standard2/chapter4/curve-tool.png" },
          ],
          audioSrc: "/voice/grade2/4.4.m4a",
          speakText: "I have different strokes and styles and can help you apply colour to an image. Which tool am I?",
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Drawing Tool",
          riddleText: "I help you fix your mistakes, and you can adjust my size with the help of a scroll. Which tool am I?",
          questionText: "Which drawing tool am I?",
          options: [
            { id: "option-1", text: "Shape Tools", isCorrect: false, imageUrl: "/images/standard2/chapter4/shape-tools.png" },
            { id: "option-2", text: "Brush Tool", isCorrect: false, imageUrl: "/images/standard2/chapter4/brush-tool.png" },
            { id: "option-3", text: "Eraser Tool", isCorrect: true, imageUrl: "/images/standard2/chapter4/eraser-tool.png" },
            { id: "option-4", text: "Curve Tool", isCorrect: false, imageUrl: "/images/standard2/chapter4/curve-tool.png" },
          ],
          audioSrc: "/voice/grade2/4.5.m4a",
          speakText: "I help you fix your mistakes, and you can adjust my size with the help of a scroll. Which tool am I?",
        }
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
          audioSrc: "/voice/3.1.m4a",
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
              color: "#ff5252",
              audioSrc: "/voice/3.3.m4a"
            },
            {
              id: "attachment-bucket",
              title: "Files you send with email",
              type: "attachment",
              color: "#ffeb3b",
              audioSrc: "/voice/3.4.m4a"
            },
            {
              id: "recipient-bucket",
              title: "Main person you're writing to",
              type: "recipient",
              color: "#ff9800",
              audioSrc: "/voice/3.5.m4a"
            },
            {
              id: "cc-bucket",
              title: "People who get copies",
              type: "cc",
              color: "#9c27b0",
              audioSrc: "/voice/3.6.m4a"
            }
          ],
          audioSrc: "/voice/3.2.m4a",
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
              content: "Ask an adult before sharing any information online",
              audioSrc: "/voice/grade2/3.1.m4a"
            },
            {
              id: "step2",
              content: "Create a strong password using letters, numbers, and symbols",
              audioSrc: "/voice/grade2/3.2.m4a"
            },
            {
              id: "step3",
              content: "Only visit websites approved by your parents or teachers",
              audioSrc: "/voice/grade2/3.3.m4a"
            },
            {
              id: "step4",
              content: "Tell an adult if something makes you uncomfortable online",
              audioSrc: "/voice/grade2/3.4.m4a"
            }
          ],
          correctOrder: ["step1", "step3", "step2", "step4"],
          dropZoneCount: 4,
          audioSrc: "/voice/3.3.m4a",
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
          audioSrc: "/voice/3.4.m4a",
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
              color: "#e91e63",
              audioSrc: "/voice/4.2.m4a"
            },
            {
              id: "desktop-bucket",
              title: "Desktop Computers",
              type: "desktop",
              color: "#3f51b5",
              audioSrc: "/voice/4.3.m4a"
            }
          ],
          audioSrc: "/voice/4.1.m4a",
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
          audioSrc: "/voice/4.2.m4a",
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
          audioSrc: "/voice/4.3.m4a",
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
              content: "Click on the Insert tab in the ribbon",
              audioSrc: "/voice/grade2/4.1.m4a"
            },
            {
              id: "step2",
              content: "Click the Table button",
              audioSrc: "/voice/grade2/4.2.m4a"
            },
            {
              id: "step3",
              content: "Select the number of rows and columns you need",
              audioSrc: "/voice/grade2/4.3.m4a"
            },
            {
              id: "step4",
              content: "Click to insert the table into your document",
              audioSrc: "/voice/grade2/4.4.m4a"
            }
          ],
          correctOrder: ["step1", "step2", "step3", "step4"],
          dropZoneCount: 4,
          audioSrc: "/voice/4.4.m4a",
          speakText: "Put these steps in the correct order to insert a table in Microsoft Word!",
        }
      ]
    }
  ],
};
