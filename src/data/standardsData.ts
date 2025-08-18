export type FormatType =
  | "drag-drop"
  | "bucket-match"
  | "sequence-match"
  | "who-am-i"
  | "code-analysis"
  | "sql-query-builder";

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

export interface CodeAnalysisSlide extends BaseContentProps {
  type: "code-analysis";
  format: "code-analysis";
  instruction: string;
  codeComponent: string;
  items: BucketMatchItem[];
  buckets: BucketData[];
}

export interface SQLQueryBuilderItem {
  id: string;
  content: string;
  category?: 'DDL' | 'DML' | 'DQL' | 'DCL' | 'TCL';
  audioSrc?: string;
}

export interface SQLQueryBuilderSlide extends BaseContentProps {
  type: "sql-query-builder";
  format: "sql-query-builder";
  instruction: string;
  items: SQLQueryBuilderItem[];
  correctOrder: string[];
}

export type LessonContent =
  | DragDropSlide
  | BucketMatchSlide
  | SequenceMatchSlide
  | WhoAmISlide
  | CodeAnalysisSlide
  | SQLQueryBuilderSlide;

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
          instruction: "Match each computer part to what it does.",
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
          speakText: "Match each computer part to what it does.",
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
          title: "Match each computer part to what it does.",
          instruction: "Match each computer part to what it does.",
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
          speakText: "Match each computer part to what it does.",
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
              imageUrl: "/images/standard3/chrome_logo.png",
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
              imageUrl: "/images/standard3/email_concept.png",
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
              imageUrl: "/images/standard3/browser_search_box.png",
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
              imageUrl: "/images/standard3/chapter2/subject.svg",
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
              imageUrl: "/images/standard3/recipient.png",
              color: "#ff9800"
            },
            {
              id: "cc",
              text: "CC",
              type: "cc",
              imageUrl: "/images/standard3/cc.png",
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
          type: "who-am-i",
          format: "who-am-i",
          title: "Choose the correct option",
          riddleText: "I run on many mobile devices, like smartphones and tablets. I am made by Google. Which Operating system am I?",
          questionText: "Which Operating system am I?",
          options: [
            { id: "android", text: "Android", isCorrect: true },
            { id: "ios", text: "iOS", isCorrect: false },
            { id: "linux", text: "Linux", isCorrect: false },
            { id: "windows", text: "Windows", isCorrect: false }
          ],
          audioSrc: "/voice/4.1.m4a",
          speakText: "I run on many mobile devices, like smartphones and tablets. I am made by Google. Which Operating system am I?",
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Choose the correct option",
          riddleText: "I run on Apple's mobile devices, like iPhones and iPads. Which Operating system am I?",
          questionText: "Which Operating system am I?",
          options: [
            { id: "android", text: "Android", isCorrect: false },
            { id: "ios", text: "iOS", isCorrect: true },
            { id: "linux", text: "Linux", isCorrect: false },
            { id: "windows", text: "Windows", isCorrect: false }
          ],
          audioSrc: "/voice/4.2.m4a",
          speakText: "I run on Apple's mobile devices, like iPhones and iPads. Which Operating system am I?",
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Choose the correct option",
          riddleText: "I am a free operating system used by computer experts and known for being stable and secure.",
          questionText: "Which Operating system am I?",
          options: [
            { id: "android", text: "Android", isCorrect: false },
            { id: "ios", text: "iOS", isCorrect: false },
            { id: "linux", text: "Linux", isCorrect: true },
            { id: "windows", text: "Windows", isCorrect: false }
          ],
          audioSrc: "/voice/4.3.m4a",
          speakText: "I am a free operating system used by computer experts and known for being stable and secure.",
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Choose the correct option",
          riddleText: "I am known for being stylish, easy to use and good for graphic design, video editing and music production. Which Operating system am I?",
          questionText: "Which Operating system am I?",
          options: [
            { id: "android", text: "Android", isCorrect: false },
            { id: "ios", text: "iOS", isCorrect: false },
            { id: "linux", text: "Linux", isCorrect: false },
            { id: "macos", text: "macOS", isCorrect: true }
          ],
          audioSrc: "/voice/4.4.m4a",
          speakText: "I am known for being stylish, easy to use and good for graphic design, video editing and music production. Which Operating system am I?",
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Choose the correct option",
          riddleText: "I am made by Microsoft, run on various desktops and laptops. Which Operating system am I?",
          questionText: "Which Operating system am I?",
          options: [
            { id: "android", text: "Android", isCorrect: false },
            { id: "ios", text: "iOS", isCorrect: false },
            { id: "linux", text: "Linux", isCorrect: false },
            { id: "windows", text: "Windows", isCorrect: true }
          ],
          audioSrc: "/voice/4.5.m4a",
          speakText: "I am made by Microsoft, run on various desktops and laptops. Which Operating system am I?",
        }
      ]
    },
    {
      id: 2,
      title: "Introduction to Windows",
      lessonContent: [
        {
          type: "sequence-match",
          format: "sequence-match",
          title: "Sequence the steps",
          instruction: "Sourabh wants to create a Word document named 'Lesson 1 Homework' and keep it safely in a new folder on his desktop. Help him by arranging the steps in the correct order.",
          items: [
            {
              id: "step1",
              content: "Right-click on the desktop, select New and choose the Folder option.",
              audioSrc: "/voice/4.1.m4a"
            },
            {
              id: "step2",
              content: "Type a name for the new folder and press Enter.",
              audioSrc: "/voice/4.2.m4a"
            },
            {
              id: "step3",
              content: "Double-click on the folder to open it.",
              audioSrc: "/voice/4.3.m4a"
            },
            {
              id: "step4",
              content: "Right-click on an empty area inside the folder. From the menu, select New and then click on Microsoft Word Document.",
              audioSrc: "/voice/4.4.m4a"
            },
            {
              id: "step5",
              content: "Name the document as 'Lesson 1 Homework' and press enter.",
              audioSrc: "/voice/4.5.m4a"
            }
          ],
          correctOrder: ["step1", "step2", "step3", "step4", "step5"],
          dropZoneCount: 5,
          audioSrc: "/voice/4.2.m4a",
          speakText: "Sourabh wants to create a Word document named 'Lesson 1 Homework' and keep it safely in a new folder on his desktop. Help him by arranging the steps in the correct order.",
        }
      ]
    },
    {
      id: 3,
      title: "Different File Types",
      lessonContent: [
        {
          type: "drag-drop",
          format: "drag-drop",
          title: "Drag and drop",
          instruction: "Drag each file extension into the correct category based on the type of file it represents.",
          items: [
            {
              id: "txt",
              text: ".txt",
              type: "text",
              imageUrl: "/images/standard4/chapter3/text_file.png",
            },
            {
              id: "docx",
              text: ".docx",
              type: "text",
              imageUrl: "/images/standard4/chapter3/word_document.png",
            },
            {
              id: "pdf",
              text: ".pdf",
              type: "text",
              imageUrl: "/images/standard4/chapter3/pdf_document.png",
            },
            {
              id: "jpg",
              text: ".jpg",
              type: "image",
              imageUrl: "/images/standard4/chapter3/image_file.png",
            },
            {
              id: "png",
              text: ".png",
              type: "image",
              imageUrl: "/images/standard4/chapter3/image_file.png",
            },
            {
              id: "gif",
              text: ".gif",
              type: "image",
              imageUrl: "/images/standard4/chapter3/image_file.png",
            },
            {
              id: "mp4",
              text: ".mp4",
              type: "video",
              imageUrl: "/images/standard4/chapter3/video_file.png",
            },
            {
              id: "avi",
              text: ".avi",
              type: "video",
              imageUrl: "/images/standard4/chapter3/video_file.png",
            },
            {
              id: "mkv",
              text: ".mkv",
              type: "video",
              imageUrl: "/images/standard4/chapter3/video_file.png",
            }
          ],
          targets: [
            { id: "textTarget", title: "Text files", type: "text" },
            { id: "imageTarget", title: "Image files", type: "image" },
            { id: "videoTarget", title: "Video files", type: "video" },
          ],
          audioSrc: "/voice/4.3.m4a",
          speakText: "Drag each file extension into the correct category based on the type of file it represents.",
        }
      ]
    },
    {
      id: 4,
      title: "Microsoft Word (Part 2)",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Match the term related to Microsoft Word with its correct description",
          instruction: "Match the term related to Microsoft Word with its correct description.",
          items: [
            {
              id: "header",
              text: "Header",
              type: "header",
              imageUrl: "/images/standard4/chapter4/header_icon.png",
            },
            {
              id: "footer",
              text: "Footer",
              type: "footer",
              imageUrl: "/images/standard4/chapter4/footer_icon.png",
            },
            {
              id: "watermark",
              text: "Watermark",
              type: "watermark",
              imageUrl: "/images/standard4/chapter4/watermark_icon.png",
            },
            {
              id: "chart",
              text: "Chart",
              type: "chart",
              imageUrl: "/images/standard4/chapter4/chart_icon.png",
            }
          ],
          buckets: [
            { 
              id: "headerTarget", 
              title: "Space at the top of each page where you can add your name or the document title.", 
              type: "header"
            },
            { 
              id: "footerTarget", 
              title: "Space at the bottom of each page where you can add page numbers or notes.", 
              type: "footer"
            },
            { 
              id: "watermarkTarget", 
              title: "A light image or text that appears behind the main text in a document.", 
              type: "watermark"
            },
            { 
              id: "chartTarget", 
              title: "Insert various charts to visualise data.", 
              type: "chart"
            }
          ],
          audioSrc: "/voice/4.4.m4a",
          speakText: "Match the term related to Microsoft Word with its correct description.",
        }
      ]
    }
  ],
  "5": [
    {
      id: 1,
      title: "Data Storage",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Match the Storage Units with Their Descriptions",
          instruction: "Drag each storage unit to its correct description! (Hint: Use the byte clues)",
          items: [
            { id: "byte", text: "Byte (B)", type: "unit" },
            { id: "kilobyte", text: "Kilobyte (KB)", type: "unit" },
            { id: "megabyte", text: "Megabyte (MB)", type: "unit" },
            { id: "gigabyte", text: "Gigabyte (GB)", type: "unit" },
            { id: "terabyte", text: "Terabyte (TB)", type: "unit" }
          ],
          buckets: [
            {
              id: "desc-byte",
              title: "A tiny unit of data that can store a single letter or symbol, made up of 8 smaller parts called bits.",
              type: "desc"
            },
            {
              id: "desc-kilobyte",
              title: "Used to store simple text files, small pictures, made up of about 1024 bytes.",
              type: "desc"
            },
            {
              id: "desc-megabyte",
              title: "Commonly used for documents, images, or emails, holds about 1024 kilobytes.",
              type: "desc"
            },
            {
              id: "desc-gigabyte",
              title: "Stores long videos, around 500 photos, and games.",
              type: "desc"
            },
            {
              id: "desc-terabyte",
              title: "Huge storage used in hard drives or cloud, holds around 1000 gigabytes.",
              type: "desc"
            }
          ],
          audioSrc: undefined,
          speakText: "Drag each storage unit to its correct description! (Hint: Use the byte clues)"
        }
      ]
    },
    {
      id: 2,
      title: "Cyber Security",
      lessonContent: [
        {
          type: "drag-drop",
          format: "drag-drop",
          title: "Cyber Security Threats",
          instruction: "Read each situation. Drag and drop it into the correct category: 'Cyber Security Threat' or 'Not a Threat'.",
          items: [
            { id: "s1", text: "While streaming cartoons, a message leaps onto the screen: 'Congratulations, you've won a brand‑new phone! Click here to claim your prize.'", type: "threat", imageUrl: "/images/standard5/fake_prize_popup.png" },
            { id: "s2", text: "You open an email that looks like it's from your bank teacher and asks you to 'confirm your password' on a strange link.", type: "threat", imageUrl: "/images/standard5/phishing_email.png" },
            { id: "s3", text: "Your friend shares a USB stick with 'cool free games.' After you install one, your computer slows down and files vanish.", type: "threat", imageUrl: "/images/standard5/malicious_usb.png" },
            { id: "s4", text: "A full‑screen warning suddenly appears: 'All your files are locked. Pay 50 coins to get them back.'", type: "threat", imageUrl: "/images/standard5/ransomware_warning.png" },
            { id: "s5", text: "You find a 'FREE wallpaper changer' on an unknown website. After installing it, the computer starts deleting photos.", type: "threat", imageUrl: "/images/standard5/malicious_software.png" },
            { id: "s6", text: "You visit your school's official website to download this week's homework PDF, and it opens normally.", type: "not-threat", imageUrl: "/images/standard5/safe_school_website.png" },
            { id: "s7", text: "You click the Update button inside your trusted antivirus program to get the latest protection.", type: "not-threat", imageUrl: "/images/standard5/antivirus_update.png" },
            { id: "s8", text: "In class, you log into Google Classroom through the teacher's bookmarked link to submit an assignment.", type: "not-threat", imageUrl: "/images/standard5/google_classroom.png" },
            { id: "s9", text: "A science video plays from the verified YouTube Kids channel with comments turned off.", type: "not-threat", imageUrl: "/images/standard5/youtube_kids.png" },
            { id: "s10", text: "You right‑click the desktop and choose Change Background to set a new picture already saved on your computer.", type: "not-threat", imageUrl: "/images/standard5/desktop_background.png" }
          ],
          targets: [
            { id: "threat", title: "Cyber Security Threat", type: "threat" },
            { id: "not-threat", title: "Not a Threat", type: "not-threat" }
          ],
          audioSrc: undefined,
          speakText: "Read each situation. Drag and drop it into the correct category: 'Cyber Security Threat' or 'Not a Threat'."
        }
      ]
    },
    {
      id: 3,
      title: "Online shopping made easy",
      lessonContent: [
        {
          type: "sequence-match",
          format: "sequence-match",
          title: "Steps to Buy a Book Online",
          instruction: "Arrange the steps Ria follows to buy Harry Potter books online in the correct order!",
          items: [
            { id: "A", content: "Once you place the order, wait for the delivery person to bring the product to your doorstep." },
            { id: "B", content: "Click on a product to view its details, images, and description." },
            { id: "C", content: "After adding items to cart, click on the 'Proceed to Buy' button. Enter delivery address, and then choose a payment method (Example: credit card, UPI, or cash on delivery). Click on 'Place your order.'" },
            { id: "D", content: "If you like the product, click the 'Add to Cart' button. After adding, you can view your selected items by clicking on the shopping cart icon." },
            { id: "E", content: "Use the Search Bar to find the product that is, 'Harry Potter books.'" },
            { id: "F", content: "Open a shopping website like www.amazon.in" }
          ],
          correctOrder: ["F", "E", "B", "D", "C", "A"],
          dropZoneCount: 6,
          audioSrc: undefined,
          speakText: "Arrange the steps Ria follows to buy Harry Potter books online in the correct order!"
        }
      ]
    },
    {
      id: 4,
      title: "MS Excel and spreadsheets (part 2)",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Identify the Excel Function",
          instruction: "Match each description to the correct Excel function name!",
          items: [
            { id: "min", text: "Finds the smallest number in a range.", type: "desc", imageUrl: "/images/standard5/min_function.png" },
            { id: "count", text: "Counts how many numbers are in a range.", type: "desc", imageUrl: "/images/standard5/count_function.png" },
            { id: "round", text: "Rounds a number to a specified number of decimal places.", type: "desc", imageUrl: "/images/standard5/round_function.png" },
            { id: "average", text: "Finds the average of numbers in a range.", type: "desc", imageUrl: "/images/standard5/average_function.png" },
            { id: "len", text: "Counts how many characters are in a text string.", type: "desc", imageUrl: "/images/standard5/len_function.png" }
          ],
          buckets: [
            { id: "bucket-min", title: "MIN", type: "func" },
            { id: "bucket-count", title: "COUNT", type: "func" },
            { id: "bucket-round", title: "ROUND", type: "func" },
            { id: "bucket-average", title: "AVERAGE", type: "func" },
            { id: "bucket-len", title: "LEN", type: "func" }
          ],
          audioSrc: undefined,
          speakText: "Match each description to the correct Excel function name!"
        }
      ]
    }
  ],
  "6": [
    {
      id: 1,
      title: "Programming Language Fundamentals",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Match Programming Terms to Their Explanations",
          instruction: "Drag each programming term to its correct explanation!",
          items: [
            { id: "syntax", text: "Syntax", type: "term", imageUrl: "/images/standard6/syntax_programming.png" },
            { id: "keywords", text: "Keywords", type: "term", imageUrl: "/images/standard6/keywords_programming.png" },
            { id: "operators", text: "Operators", type: "term", imageUrl: "/images/standard6/operators_programming.png" },
            { id: "control-structures", text: "Control structures", type: "term", imageUrl: "/images/standard6/control_structures_programming.png" }
          ],
          buckets: [
            {
              id: "explanation-syntax",
              title: "Python has specific syntax rules that dictate how code must be written. If these rules are not followed, the computer won’t understand the instructions and will raise an error.",
              type: "explanation"
            },
            {
              id: "explanation-keywords",
              title: "Python reserves specific words like if, while, def, and import for particular purposes. These guide the computer in understanding what actions to perform.",
              type: "explanation"
            },
            {
              id: "explanation-operators",
              title: "Python uses symbols like +, -, *, /, and others to perform calculations and operations on data.",
              type: "explanation"
            },
            {
              id: "explanation-control-structures",
              title: "Python includes tools like loops (for, while) and conditional statements (if, elif, else) to control the flow of the program. These structures allow you to make decisions and repeat actions based on conditions.",
              type: "explanation"
            }
          ],
          audioSrc: undefined,
          speakText: "Drag each programming term to its correct explanation!"
        }
      ]
    },
    {
      id: 2,
      title: "PowerPoint Features (Who am I?)",
      lessonContent: [
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Who am I? (PowerPoint Feature)",
          riddleText: "I help add and format text and images to support content and make slides more engaging.",
          questionText: "Which PowerPoint feature am I?",
          options: [
            { id: "text-image-insertion", text: "Text and Image Insertion", isCorrect: true },
            { id: "smartart", text: "SmartArt and Charts", isCorrect: false },
            { id: "presenter-view", text: "Presenter View", isCorrect: false },
            { id: "transitions", text: "Transitions and Animations", isCorrect: false }
          ],
          audioSrc: undefined,
          speakText: "I help add and format text and images to support content and make slides more engaging."
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Who am I? (PowerPoint Feature)",
          riddleText: "I visually represent data and relationships, making complex information easier to understand, thus enhancing the presentation.",
          questionText: "Which feature of PowerPoint am I?",
          options: [
            { id: "text-image-insertion", text: "Text and Image Insertion", isCorrect: false },
            { id: "smartart", text: "SmartArt and Charts", isCorrect: true },
            { id: "presenter-view", text: "Presenter View", isCorrect: false },
            { id: "transitions", text: "Transitions and Animations", isCorrect: false }
          ],
          audioSrc: undefined,
          speakText: "I visually represent data and relationships, making complex information easier to understand, thus enhancing the presentation."
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Who am I? (PowerPoint Feature)",
          riddleText: "I let presenters view notes and upcoming slides privately, while the audience sees only the current slide. Found under 'Use Presenter View' in the Slide Show tab.",
          questionText: "Which PowerPoint feature am I?",
          options: [
            { id: "text-image-insertion", text: "Text and Image Insertion", isCorrect: false },
            { id: "smartart", text: "SmartArt and Charts", isCorrect: false },
            { id: "presenter-view", text: "Presenter View", isCorrect: true },
            { id: "transitions", text: "Transitions and Animations", isCorrect: false }
          ],
          audioSrc: undefined,
          speakText: "I let presenters view notes and upcoming slides privately, while the audience sees only the current slide. Found under 'Use Presenter View' in the Slide Show tab."
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Who am I? (PowerPoint Feature)",
          riddleText: "I create smooth changes between slides and control how elements appear to keep the audience interested.",
          questionText: "Which PowerPoint feature am I?",
          options: [
            { id: "text-image-insertion", text: "Text and Image Insertion", isCorrect: false },
            { id: "smartart", text: "SmartArt and Charts", isCorrect: false },
            { id: "presenter-view", text: "Presenter View", isCorrect: false },
            { id: "transitions", text: "Transitions and Animations", isCorrect: true }
          ],
          audioSrc: undefined,
          speakText: "I create smooth changes between slides and control how elements appear to keep the audience interested."
        }
      ]
    },
    {
      id: 3,
      title: "Flowchart Sequence",
      lessonContent: [
        {
          type: "sequence-match",
          format: "sequence-match",
          title: "Arrange the Flowchart Steps (Even/Odd)",
          instruction: "Arrange the flowchart symbols in the correct order to check if a number is even or odd.",
          items: [
            { id: "start", content: "Start" },
            { id: "input", content: "Input Number" },
            { id: "decision", content: "Is Number % 2 == 0?" },
            { id: "even", content: "Print 'Number is Even'" },
            { id: "odd", content: "Print 'Number is Odd'" },
            { id: "end", content: "End" }
          ],
          correctOrder: ["start", "input", "decision", "even", "odd", "end"],
          dropZoneCount: 6,
          audioSrc: undefined,
          speakText: "Arrange the flowchart symbols in the correct order to check if a number is even or odd."
        }
      ]
    },
    {
      id: 4,
      title: "Operator Sorting",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Sort the Operators by Type",
          instruction: "Drag each operator to its correct type bucket!",
          items: [
            { id: "plus", text: "+ Addition", type: "arithmetic", imageUrl: "/images/standard6/data_types_programming.png" },
            { id: "modulus", text: "% Modulus", type: "arithmetic", imageUrl: "/images/standard6/data_types_programming.png" },
            { id: "exponential", text: "** Exponential", type: "arithmetic", imageUrl: "/images/standard6/data_types_programming.png" },
            { id: "assign", text: "= Assignment", type: "assignment", imageUrl: "/images/standard6/data_types_programming.png" },
            { id: "mul-assign", text: "*= Multiplication assignment", type: "assignment", imageUrl: "/images/standard6/data_types_programming.png" },
            { id: "floordiv-assign", text: "//= Floor division assignment", type: "assignment", imageUrl: "/images/standard6/data_types_programming.png" },
            { id: "equal", text: "== Equal", type: "relational", imageUrl: "/images/standard6/data_types_programming.png" },
            { id: "greater", text: "> Greater than", type: "relational", imageUrl: "/images/standard6/data_types_programming.png" },
            { id: "less-equal", text: "<= Less than or equal to", type: "relational", imageUrl: "/images/standard6/data_types_programming.png" },
            { id: "and", text: "and: And", type: "logical", imageUrl: "/images/standard6/data_types_programming.png" },
            { id: "or", text: "or: Or", type: "logical", imageUrl: "/images/standard6/data_types_programming.png" },
            { id: "not", text: "not: Not", type: "logical", imageUrl: "/images/standard6/data_types_programming.png" }
          ],
          buckets: [
            { id: "bucket-arithmetic", title: "Arithmetic operators", type: "arithmetic" },
            { id: "bucket-assignment", title: "Assignment operators", type: "assignment" },
            { id: "bucket-relational", title: "Relational operators", type: "relational" },
            { id: "bucket-logical", title: "Logical operators", type: "logical" }
          ],
          audioSrc: undefined,
          speakText: "Drag each operator to its correct type bucket!"
        }
      ]
    }
  ],
  "7": [
    {
      id: 1,
      title: "Computer Networks - I",
      lessonContent: [
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Types of Computer Networks",
          riddleText: "Read the situation carefully. If you were in this situation, which type of network would you choose?",
          questionText: "Which type of network is best for this scenario?",
          options: [
            { id: "pan", text: "PAN (Personal Area Network)", isCorrect: true, imageUrl: "/images/standard7/pan_network.png" },
            { id: "lan", text: "LAN (Local Area Network)", isCorrect: false, imageUrl: "/images/standard7/lan_network.png" },
            { id: "man", text: "MAN (Metropolitan Area Network)", isCorrect: false, imageUrl: "/images/standard7/man_network.png" },
            { id: "wan", text: "WAN (Wide Area Network)", isCorrect: false, imageUrl: "/images/standard7/wan_network.png" }
          ],
          audioSrc: undefined,
          speakText: "You and your friend are preparing for a science project in your room. You need to transfer a video from your phone to your friend's tablet, and also connect your wireless headphones to check the sound quality."
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Types of Computer Networks",
          riddleText: "Read the situation carefully. If you were in this situation, which type of network would you choose?",
          questionText: "Which type of network is best for this scenario?",
          options: [
            { id: "lan", text: "LAN (Local Area Network)", isCorrect: true, imageUrl: "/images/standard7/lan_network.png" },
            { id: "pan", text: "PAN (Personal Area Network)", isCorrect: false, imageUrl: "/images/standard7/pan_network.png" },
            { id: "wan", text: "WAN (Wide Area Network)", isCorrect: false, imageUrl: "/images/standard7/wan_network.png" },
            { id: "man", text: "MAN (Metropolitan Area Network)", isCorrect: false, imageUrl: "/images/standard7/man_network.png" }
          ],
          audioSrc: undefined,
          speakText: "Your school computer lab has 20 computers that need to exchange files quickly, share the same internet connection and printer."
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Types of Computer Networks",
          riddleText: "Read the situation carefully. If you were in this situation, which type of network would you choose?",
          questionText: "Which type of network is best for this scenario?",
          options: [
            { id: "man", text: "MAN (Metropolitan Area Network)", isCorrect: true, imageUrl: "/images/standard7/man_network.png" },
            { id: "wan", text: "WAN (Wide Area Network)", isCorrect: false, imageUrl: "/images/standard7/wan_network.png" },
            { id: "pan", text: "PAN (Personal Area Network)", isCorrect: false, imageUrl: "/images/standard7/pan_network.png" },
            { id: "lan", text: "LAN (Local Area Network)", isCorrect: false, imageUrl: "/images/standard7/lan_network.png" }
          ],
          audioSrc: undefined,
          speakText: "A city library wants all its branches across different parts of the city to have access to the same e-book database. The buildings are far apart but still within the city, and fast data sharing is required."
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Types of Computer Networks",
          riddleText: "Read the situation carefully. If you were in this situation, which type of network would you choose?",
          questionText: "Which type of network is best for this scenario?",
          options: [
            { id: "wan", text: "WAN (Wide Area Network)", isCorrect: true, imageUrl: "/images/standard7/wan_network.png" },
            { id: "man", text: "MAN (Metropolitan Area Network)", isCorrect: false, imageUrl: "/images/standard7/man_network.png" },
            { id: "lan", text: "LAN (Local Area Network)", isCorrect: false, imageUrl: "/images/standard7/lan_network.png" },
            { id: "pan", text: "PAN (Personal Area Network)", isCorrect: false, imageUrl: "/images/standard7/pan_network.png" }
          ],
          audioSrc: undefined,
          speakText: "Your cousin in another country is helping you build a coding project. You both need to work on the same files in real-time using cloud storage, even though you're thousands of kilometers apart."
        }
      ]
    },
    {
      id: 2,
      title: "Digital Marketing Concepts",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Match Digital Marketing Concepts",
          instruction: "XYZ Marketing Company has been hired to promote ChocoBlast, a new chocolate milkshake brand. Here's what their team did to make the campaign a success. You need to match each task to the correct key concept of digital marketing.",
          items: [
            { id: "ab-testing", text: "Made two online ads, one with a blue 'Order Now' button and another with a green 'Get Yours Today' button, to see which got more clicks.", type: "ab-testing", imageUrl: "/images/standard7/ab_testing.png" },
            { id: "keyword-optimization", text: "Researched searches like 'best chocolate milkshake near me' and used them in the website and ads.", type: "keyword-optimization", imageUrl: "/images/standard7/keyword_optimization.png" },
            { id: "seo", text: "Improved the website with clear headings, tasty photos, and faster loading, so it ranks higher on search engines.", type: "seo", imageUrl: "/images/standard7/seo_marketing.png" },
            { id: "ctr", text: "Measured how many saw the ad versus how many clicked it, then calculated the percentage.", type: "ctr", imageUrl: "/images/standard7/ctr_analysis.png" }
          ],
          buckets: [
            { id: "bucket-ab-testing", title: "A/B Testing (Split Testing)", type: "ab-testing", color: "#4ECDC4" },
            { id: "bucket-keyword-optimization", title: "Keyword Optimization", type: "keyword-optimization", color: "#45B7D1" },
            { id: "bucket-seo", title: "SEO (Search Engine Optimization)", type: "seo", color: "#96CEB4" },
            { id: "bucket-ctr", title: "CTR (Click-through Rate)", type: "ctr", color: "#FFEAA7" }
          ],
          audioSrc: undefined,
          speakText: "Match each digital marketing task to its correct concept."
        }
      ]
    },
    {
      id: 3,
      title: "PowerPoint Transitions",
      lessonContent: [
        {
          type: "sequence-match",
          format: "sequence-match",
          title: "Arrange PowerPoint Transition Steps",
          instruction: "You are creating a school project in Microsoft PowerPoint. You want to add transitions to your slides so your presentation flows smoothly. Below are the steps you followed, but they are in the wrong order. Arrange them in the correct order.",
          items: [
            { id: "step1", content: "Open Microsoft PowerPoint on your computer." },
            { id: "step2", content: "Create a presentation with a sufficient number of slides." },
            { id: "step3", content: "Select the slide you want to apply the transition to." },
            { id: "step4", content: "Choose a transition effect from the Transitions tab." },
            { id: "step5", content: "Adjust the transition's speed or direction." },
            { id: "step6", content: "Preview the transition to check how it looks." },
            { id: "step7", content: "Apply the same transition to all slides for consistency (optional)." }
          ],
          correctOrder: ["step1", "step2", "step3", "step4", "step5", "step6", "step7"],
          dropZoneCount: 7,
          audioSrc: undefined,
          speakText: "Arrange the PowerPoint transition steps in the correct order."
        }
      ]
    },
    {
      id: 4,
      title: "HTML and CSS Analysis",
      lessonContent: [
        {
          type: "code-analysis",
          format: "code-analysis",
          title: "Categorize HTML and CSS Elements",
          instruction: "Observe the code below and categorize the elements based on whether they are inside the <div> element and whether they have the highlight class applied.",
          codeComponent: "CodeAnalysis",
          items: [
            { id: "color", text: "color: red", type: "highlight-class" },
            { id: "background-color", text: "background-color: yellow", type: "highlight-class" },
            { id: "font-size", text: "font-size: 20px", type: "highlight-class" },
            { id: "paragraph", text: "<p> – Paragraph", type: "inside-div" },
            { id: "heading", text: "<h3> – Heading level 3", type: "inside-div" },
            { id: "ordered-list", text: "<ol> – Ordered list (with <li>)", type: "inside-div" }
          ],
          buckets: [
            { id: "bucket-highlight-class", title: "Elements inside class highlight", type: "highlight-class", color: "#FF6B6B" },
            { id: "bucket-inside-div", title: "Elements inside div", type: "inside-div", color: "#4ECDC4" }
          ],
          speakText: "Categorize the HTML and CSS elements based on their location and class."
        }
      ]
    }
  ],
  "8": [
    {
      id: 1,
      title: "Computer Network Components",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Match Network Components",
          instruction: "Your school is setting up a new computer lab that needs to be connected to the internet and to the school's central database. The school technician explains how all the parts of the network will work together. Match each component to its correct description.",
          items: [
            { id: "switches", text: "Switches", type: "switches", imageUrl: "/images/standard8/switches.png" },
            { id: "routers", text: "Routers", type: "routers", imageUrl: "/images/standard8/routers.png" },
            { id: "protocols", text: "Protocols", type: "protocols", imageUrl: "/images/standard8/protocols.png" },
            { id: "server", text: "Server", type: "server", imageUrl: "/images/standard8/server.png" }
          ],
          buckets: [
            { 
              id: "bucket-switches", 
              title: "B: Connect multiple devices to the same network and ensure data is sent to the correct destination", 
              type: "switches", 
              color: "#4ECDC4",
              audioSrc: "/voice/grade2/1.2.m4a"
            },
            { 
              id: "bucket-routers", 
              title: "C: Connect different networks together and manage data traffic between them", 
              type: "routers", 
              color: "#45B7D1",
              audioSrc: "/voice/grade2/1.3.m4a"
            },
            { 
              id: "bucket-protocols", 
              title: "D: Agreed-upon rules for communication to ensure every device speaks the same digital language", 
              type: "protocols", 
              color: "#96CEB4",
              audioSrc: "/voice/grade2/1.4.m4a"
            },
            { 
              id: "bucket-server", 
              title: "E: A powerful computer that provides data and services to other devices", 
              type: "server", 
              color: "#FFEAA7",
              audioSrc: "/voice/grade2/1.5.m4a"
            }
          ],
          audioSrc: "/voice/grade2/1.1.m4a",
          speakText: "Match each network component to its correct description."
        }
      ]
    },
    {
      id: 2,
      title: "Ethical vs Unethical Data Use",
      lessonContent: [
        {
          type: "drag-drop",
          format: "drag-drop",
          title: "Sort Data Use Scenarios",
          instruction: "Read each scenario and decide if it shows Ethical Use or Unethical Use of data. Sort them into the correct category.",
          items: [
            { id: "scenario1", text: "A school collects students' test scores after asking for permission from parents and explains how the data will be used to improve teaching methods.", type: "ethical" },
            { id: "scenario2", text: "A company sells customer email addresses to another business without informing the customers.", type: "unethical" },
            { id: "scenario3", text: "Police officers collect data about crime patterns in a city to decide where to increase patrols, ensuring the data is collected legally and respects people's rights.", type: "ethical" },
            { id: "scenario4", text: "A social media platform changes your news feed so you only see posts that match your political views, without telling you.", type: "unethical" },
            { id: "scenario5", text: "A hospital asks patients before collecting health data, removes personal identifiers like their names, and uses it to develop better treatments.", type: "ethical" },
            { id: "scenario6", text: "A bank uses an algorithm for loan approvals that unfairly rejects people based on their gender.", type: "unethical" },
            { id: "scenario7", text: "A clothing store sends a survey to customers but only uses the results from those who agreed to participate, removing personal information before analysis.", type: "ethical" },
            { id: "scenario8", text: "Hackers steal someone's personal information to open bank accounts in their name.", type: "unethical" }
          ],
          targets: [
            { id: "ethical", title: "Ethical Use", type: "ethical" },
            { id: "unethical", title: "Unethical Use", type: "unethical" }
          ],
          audioSrc: "/voice/grade2/2.1.m4a",
          speakText: "Sort each scenario into the correct category: Ethical Use or Unethical Use of data."
        }
      ]
    },
    {
      id: 3,
      title: "Types of Applications",
      lessonContent: [
        {
          type: "drag-drop",
          format: "drag-drop",
          title: "Match App Types",
          instruction: "Read the descriptions and examples carefully and choose the correct app type.",
          items: [
            { id: "native", text: "Built for a specific platform (Android/iOS), it offers high performance and full access to the device's built-in features. Example: WhatsApp, Google Maps", type: "native" },
            { id: "web", text: "Runs in a web browser without installation, works on any device with internet access. Example: Google Docs, Gmail", type: "web" },
            { id: "hybrid", text: "Combines native and web elements, runs on both Android and iOS from the same codebase. Example: Instagram, Uber", type: "hybrid" },
            { id: "pwa", text: "A web app that looks and feels like a native app can work offline or in low internet connectivity. Example: Pinterest, Starbucks app", type: "pwa" }
          ],
          targets: [
            { id: "native", title: "Native Apps", type: "native" },
            { id: "web", title: "Web Apps", type: "web" },
            { id: "hybrid", title: "Hybrid Apps", type: "hybrid" },
            { id: "pwa", title: "Progressive Web Apps", type: "pwa" }
          ],
          audioSrc: "/voice/grade2/3.1.m4a",
          speakText: "Match each app description to its correct type."
        }
      ]
    },
    {
      id: 4,
      title: "Advanced SQL Database Operations",
      lessonContent: [
        {
          type: "sql-query-builder",
          format: "sql-query-builder",
          title: "Professional SQL Query Builder",
          instruction: "You are a database administrator tasked with building a comprehensive Student Management System. Your school needs to create a database, populate it with student data, perform updates after grade corrections, remove records for transferred students, and generate reports. Use the SQL Query Builder to construct the proper sequence of database operations. Each command type is color-coded: Blue for DDL (Data Definition), Green for DML (Data Manipulation), and Purple for DQL (Data Query Language).",
          items: [
            { 
              id: "step1", 
              content: "CREATE TABLE students (Id INT PRIMARY KEY, Name VARCHAR(50) NOT NULL, Marks INT CHECK (Marks >= 0 AND Marks <= 100), Class VARCHAR(10), AdmissionDate DATE);",
              category: "DDL"
            },
            { 
              id: "step2", 
              content: "INSERT INTO students (Id, Name, Marks, Class, AdmissionDate) VALUES (1, 'John Smith', 85, '8A', '2024-01-15'), (2, 'Omkar Patel', 42, '8B', '2024-01-15'), (3, 'Jiya Sharma', 57, '8A', '2024-01-15'), (4, 'Vikram Singh', 41, '8B', '2024-01-15'), (5, 'Sofia Rodriguez', 68, '8A', '2024-01-15');",
              category: "DML"
            },
            { 
              id: "step3", 
              content: "UPDATE students SET Marks = 86 WHERE Name = 'Omkar Patel'; UPDATE students SET Marks = 77 WHERE Name = 'Jiya Sharma'; UPDATE students SET Class = '8A' WHERE Name = 'Omkar Patel';",
              category: "DML"
            },
            { 
              id: "step4", 
              content: "DELETE FROM students WHERE Name = 'Vikram Singh'; DELETE FROM students WHERE Name = 'Sofia Rodriguez';",
              category: "DML"
            },
            { 
              id: "step5", 
              content: "SELECT Name, Class, Marks FROM students WHERE Marks < 65 ORDER BY Marks ASC; SELECT COUNT(*) as TotalStudents, AVG(Marks) as AverageMarks FROM students;",
              category: "DQL"
            }
          ],
          correctOrder: ["step1", "step2", "step3", "step4", "step5"],
          audioSrc: "/voice/grade2/4.1.m4a",
          speakText: "Build a professional SQL database management system using the Query Builder. Understand DDL, DML, and DQL operations for comprehensive database administration."
        }
      ]
    }
  ]
};
