export type FormatType =
  | "sort"
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
  type: "sort";
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
          type: "sort",
          format: "sort",
          title: "Sort Natural and Man-made Things",
          instruction: "Help me sort these pictures",
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
          title: "Match each computer part to what it does!",
          instruction:
            "Drag each computer part to its matching description bucket!",
          items: [
            {
              id: "monitor-item",
              text: "Monitor",
              type: "shows",
              imageUrl: "/images/monitor.png",
              color: "#2196f3",
            },
            {
              id: "keyboard-item",
              text: "Keyboard",
              type: "typing",
              imageUrl: "/images/keyboard.png",
              color: "#4caf50",
            },
            {
              id: "cpu-item",
              text: "CPU",
              type: "brain",
              imageUrl: "/images/cpu.png",
              color: "#9c27b0",
            },
            {
              id: "mouse-item",
              text: "Mouse",
              type: "pointing",
              imageUrl: "/images/mouse.png",
              color: "#ff9800",
            },
          ],
          buckets: [
            {
              id: "typing-bucket",
              title: "set of buttons called keys",
              type: "typing",
              color: "#4caf50",
            },
            {
              id: "pointing-bucket",
              title: "moves the pointer on the screen",
              type: "pointing",
              color: "#ff9800",
            },
            {
              id: "brain-bucket",
              title: "brain of the computer",
              type: "brain",
              color: "#9c27b0",
            },
            {
              id: "shows-bucket",
              title: "shows everything the computer is doing",
              type: "shows",
              color: "#2196f3",
            },
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
          instruction:
            "Put these steps in the correct order to properly shut down a computer!",
          items: [
            { id: "step-6", content: "Switch off the power supply" },
            { id: "step-1", content: "Save your work" },
            { id: "step-2", content: "Open the Start menu" },
            { id: "step-4", content: 'Select "Shut down"' },
            { id: "step-3", content: "Click on the power button" },
            { id: "step-5", content: "Wait for the computer to turn off" },
          ],
          correctOrder: [
            "step-1",
            "step-2",
            "step-3",
            "step-4",
            "step-5",
            "step-6",
          ],
          dropZoneCount: 6,
          audioSrc: "/audio/computer_shutdown.mp3",
          speakText:
            "Put these steps in the correct order to properly shut down a computer!",
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
          riddleText:
            "I am the longest key on the keyboard, and I help you add spaces between words. Who am I?",
          questionText: "Which key am I?",
          options: [
            {
              id: "option-2",
              text: "Enter Key",
              isCorrect: false,
              imageUrl: "/images/enter.png",
            },
            {
              id: "option-3",
              text: "Caps Lock Key",
              isCorrect: false,
              imageUrl: "/images/capslock.png",
            },
            {
              id: "option-1",
              text: "Space Bar Key",
              isCorrect: true,
              imageUrl: "/images/spacebar.png",
            },
            {
              id: "option-4",
              text: "Backspace Key",
              isCorrect: false,
              imageUrl: "/images/backspace.png",
            },
          ],
          audioSrc: "/audio/spacebar_riddle.mp3",
          speakText:
            "I am the longest key on the keyboard, and I help you add spaces between words. Who am I?",
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Computer Part",
          riddleText:
            "I have lots of buttons with letters and numbers that help you type words on a computer. Who am I?",
          questionText: "Which computer part am I?",
          options: [
            {
              id: "option-2",
              text: "Monitor",
              isCorrect: false,
              imageUrl: "/images/monitor.png",
            },
            {
              id: "option-1",
              text: "Keyboard",
              isCorrect: true,
              imageUrl: "/images/keyboard.png",
            },

            {
              id: "option-3",
              text: "Mouse",
              isCorrect: false,
              imageUrl: "/images/mouse.png",
            },
            {
              id: "option-4",
              text: "Speaker",
              isCorrect: false,
              imageUrl: "/images/speaker.png",
            },
          ],
          audioSrc: "/audio/keyboard_riddle.mp3",
          speakText:
            "I have lots of buttons with letters and numbers that help you type words on a computer. Who am I?",
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Mouse Part",
          riddleText:
            "I am the small wheel on the mouse that helps you move up and down a page. Who am I?",
          questionText: "",
          options: [
            {
              id: "option-2",
              text: "Left Button",
              isCorrect: false,
              imageUrl: "/images/left-button.svg",
            },
            {
              id: "option-3",
              text: "Right Button",
              isCorrect: false,
              imageUrl: "/images/right-button.svg",
            },
            {
              id: "option-4",
              text: "Body",
              isCorrect: false,
              imageUrl: "/images/mouse-body.svg",
            },
            {
              id: "option-1",
              text: "Scroll Wheel",
              isCorrect: true,
              imageUrl: "/images/scroll-wheel.svg",
            },
          ],
          audioSrc: "/audio/scroll_wheel_riddle.mp3",
          speakText:
            "I am the small wheel on the mouse that helps you move up and down a page. Who am I?",
        },
      ],
    },
  ],
  "2": [
    {
      id: 1,
      title: "School Supplies Sorting",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Sort School Supplies",
          instruction: "Put each school supply in the correct category bucket!",
          items: [
            {
              id: "Scanner",
              text: "Scanner",
              type: "Scanner",
              imageUrl: "/images/Scanner.png",
            },
            {
              id: "Microphone",
              text: "Microphone",
              type: "Microphone",
              imageUrl: "/images/Microphone.png",
            },
            {
              id: "Speakers",
              text: "Speakers",
              type: "Speakers",
              imageUrl: "/images/speaker.png",
            },
            {
              id: "Printer",
              text: "Printer",
              type: "Printer",
              imageUrl: "/images/Printer.png",
            },
          ],
          buckets: [
            {
              id: "scanner-bucket",
              title:
                "Turn pictures and papers into digital files so you can see them on the computer.",
              type: "Scanner",
            },
            {
              id: "microphone-bucket",
              title:
                "Used for talking, giving voice instructions, singing, and recording music.",
              type: "Microphone",
            },
            {
              id: "speakers-bucket",
              title: "Listen to a variety of sounds.",
              type: "Speakers",
            },
            {
              id: "printer-bucket",
              title: "Prints what you see on the monitor on to paper.",
              type: "Printer",
            },
          ],
          successMessage: "Amazing! You have sorted all the school supplies!",
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
      id: 2,
      title: "Help me sort the tasks a smartphone can do?",
      lessonContent: [
        {
          type: "sort",
          format: "sort",
          title: "Help me sort the tasks a smartphone can do?",
          instruction:
            "Help me sort these computer items. Drag them into the correct box: Tasks smartphones can do or Tasks smartphones can not do.",
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
              imageUrl: "/images/1st_standard/keyboard.png",
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
            {
              id: "hardwareTarget",
              title: "Tasks smartphones can do ",
              type: "option-1",
            },
            {
              id: "softwareTarget",
              title: "Tasks smartphones can not do",
              type: "option-2",
            },
          ],
          audioSrc: "/audio/smartphone_tasks.mp3",
          speakText:
            "Help me sort these computer items. Drag them into the correct box: Tasks smartphones can do or Tasks smartphones can not do.",
        },
      ],
    },
    {
      id: 3,
      title: "Type and Save a File in Notepad",
      lessonContent: [
        {
          type: "sequence-match",
          format: "sequence-match",
          title: "Type and Save a File in Notepad",
          instruction:
            "The steps to type and save a file in Notepad are all mixed up! Can you drag the steps from Column B and put them in the correct order in Column A?",
          items: [
            { id: "step-2", content: 'Click on the "File" menu at the top.' },
            { id: "step-4", content: 'Give your file a name, like "MyStory".' },
            { id: "step-1", content: "Type the content." },
            { id: "step-3", content: 'Choose "Save As".' },
            { id: "step-5", content: 'Click "Save".' },
          ],
          correctOrder: ["step-1", "step-2", "step-3", "step-4", "step-5"],
          dropZoneCount: 5,
          audioSrc: "/audio/notepad_save_steps.mp3",
          speakText:
            "The steps to type and save a file in Notepad are all mixed up! Can you drag the steps from Column B and put them in the correct order in Column A?",
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
          title: "Guess the Computer Tool",
          riddleText:
            "I help you draw shapes like squares, circles and many more. Which tool am I?",
          questionText: "Which tool am I?",
          options: [
            { id: "option-1", text: "Shape Tools", isCorrect: true },
            { id: "option-2", text: "Brushes", isCorrect: false },
            { id: "option-3", text: "Eraser", isCorrect: false },
            { id: "option-4", text: "Curve Tool", isCorrect: false },
          ],
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Computer Tool",
          riddleText:
            "I am a tool that can draw curved and wavy lines. Which tool am I?",
          questionText: "Which tool am I?",
          options: [
            { id: "option-1", text: "Shape Tools", isCorrect: false },
            { id: "option-2", text: "Brushes", isCorrect: false },
            { id: "option-3", text: "Eraser", isCorrect: false },
            { id: "option-4", text: "Curve Tool", isCorrect: true },
          ],
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Computer Tool",
          riddleText:
            "I have different strokes and styles and can help you apply colour to an image. Which tool am I?",
          questionText: "Which tool am I?",
          options: [
            { id: "option-1", text: "Shape Tools", isCorrect: false },
            { id: "option-2", text: "Brushes", isCorrect: true },
            { id: "option-3", text: "Eraser", isCorrect: false },
            { id: "option-4", text: "Curve Tool", isCorrect: false },
          ],
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Computer Tool",
          riddleText:
            "I help you fix your mistakes, and you can adjust my size with the help of a scroll. Who am I?",
          questionText: "Who am I?",
          options: [
            { id: "option-1", text: "Shape Tools", isCorrect: false },
            { id: "option-2", text: "Brushes", isCorrect: false },
            { id: "option-3", text: "Eraser", isCorrect: true },
            { id: "option-4", text: "Curve Tool", isCorrect: false },
          ],
        },
      ],
    },
  ],
  "3": [
    {
      id: 1,
      title: "Chapter 1: Surfing the Internet",
      lessonContent: [
        {
          type: "sort",
          format: "sort",
          title: "Help Rina stay safe while using the internet!",
          instruction:
            "Read each situation and help her decide if it is Safe or Unsafe.",
          items: [
            {
              id: "situation-1",
              text: "Rina tells her best friend her email password so they can play a game together.",
              type: "unsafe",
            },
            {
              id: "situation-2",
              text: "Rina asks her parents before downloading a fun drawing app from the internet.",
              type: "safe",
            },
            {
              id: "situation-3",
              text: "Rina clicks on a flashy advertisement that says 'Win a Free Phone!!!! Click Here!'",
              type: "unsafe",
            },
            {
              id: "situation-4",
              text: "A stranger messages Rina online, and she replies with her name and school name.",
              type: "unsafe",
            },
            {
              id: "situation-5",
              text: "Rina feels scared after visiting a website and immediately tells her parents.",
              type: "safe",
            },
            {
              id: "situation-6",
              text: "Rina shares a kind comment on her friend's artwork in an online classroom.",
              type: "safe",
            },
            {
              id: "situation-7",
              text: "Rina sees a pop-up asking her to download a file, and she clicks on it without asking.",
              type: "unsafe",
            },
            {
              id: "situation-8",
              text: "Rina wants a new game and tells her parents before installing it from the internet.",
              type: "safe",
            },
          ],
          targets: [
            { id: "safeTarget", title: "Safe", type: "safe" },
            { id: "unsafeTarget", title: "Unsafe", type: "unsafe" },
          ],
          audioSrc: "/audio/internet_safety.mp3",
          speakText:
            "Read each situation and help Rina decide if it is Safe or Unsafe.",
        },
      ],
    },
    {
      id: 2,
      title: "Understanding Emails",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Match the Email Component with Its Description",
          instruction:
            "Drag each email component to its correct description bucket!",
          items: [
            {
              id: "to",
              text: "To",
              type: "to",
              color: "#2196f3",
            },
            {
              id: "subject-line",
              text: "Subject Line",
              type: "subject-line",
              color: "#4caf50",
            },
            {
              id: "body",
              text: "Body",
              type: "body",
              color: "#ff9800",
            },
            {
              id: "attachments",
              text: "Attachments",
              type: "attachments",
              color: "#9c27b0",
            },
            {
              id: "send-button",
              text: "Send Button",
              type: "send-button",
              color: "#ff5252",
            },
          ],
          buckets: [
            {
              id: "to-bucket",
              title: "The email ID of the person you are sending the email to.",
              type: "to",
              color: "#2196f3",
            },
            {
              id: "subject-line-bucket",
              title: "A short line that tells what the email is about.",
              type: "subject-line",
              color: "#4caf50",
            },
            {
              id: "body-bucket",
              title:
                "The area that contains the text or information you want to send.",
              type: "body",
              color: "#ff9800",
            },
            {
              id: "attachments-bucket",
              title:
                "Files like photos or documents sent with your email using a paper clip icon.",
              type: "attachments",
              color: "#9c27b0",
            },
            {
              id: "send-button-bucket",
              title: "Click this to deliver your email.",
              type: "send-button",
              color: "#ff5252",
            },
          ],
          audioSrc: "/audio/email_components.mp3",
          speakText:
            "Drag each email component to its correct description bucket!",
        },
      ],
    },
    {
      id: 3,
      title: "Chapter 3: Google Maps",
      lessonContent: [
        {
          type: "sequence-match",
          format: "sequence-match",
          title: "Help Srujan Find a Medical Shop Using Google Maps",
          instruction:
            "Arrange the steps in the correct order to help Srujan find medical shops near him using Google Maps!",
          items: [
            {
              id: "step-1",
              content: "Open Google Maps.",
            },
            {
              id: "step-2",
              content:
                "In the search bar, enter 'Medical shops near me' and click on the search icon (🔍).",
            },
            {
              id: "step-3",
              content:
                "Choose the shop based on reviews, distance from his current location.",
            },
            {
              id: "step-4",
              content: "Check if the shop is open.",
            },
            {
              id: "step-5",
              content: "Click on the 'Directions' option.",
            },
            {
              id: "step-6",
              content:
                "Choose the 'Your location' option to get directions from his current location.",
            },
            {
              id: "step-7",
              content: "Choose the mode of transport.",
            },
          ],
          correctOrder: [
            "step-1",
            "step-2",
            "step-3",
            "step-4",
            "step-5",
            "step-6",
            "step-7",
          ],
          dropZoneCount: 7,
          audioSrc: "/audio/google_maps_steps.mp3",
          speakText:
            "Arrange the steps in the correct order to help Srujan find medical shops near him using Google Maps!",
        },
      ],
    },
    {
      id: 4,
      title: "Browser Identification",
      lessonContent: [
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Guess the Web Browser",
          riddleText:
            "I have a colorful circle logo with red, yellow, green, and blue. I'm made by Google and help you search the web. Who am I?",
          questionText: "Which web browser am I?",
          options: [
            { id: "chrome", text: "Google Chrome", isCorrect: true },
            { id: "edge", text: "Microsoft Edge", isCorrect: false },
            { id: "firefox", text: "Mozilla Firefox", isCorrect: false },
            { id: "safari", text: "Safari", isCorrect: false },
          ],
          audioSrc: "/audio/browser_riddle.mp3",
          speakText:
            "I have a colorful circle logo with red, yellow, green, and blue. I'm made by Google and help you search the web. Who am I?",
        },
      ],
    },
  ],
  "4": [
    {
      id: 1,
      title: "Operating Systems",
      lessonContent: [
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Choose the correct option.",
          riddleText:
            "I run on many mobile devices, like smartphones and tablets. I am made by Google. Which Operating system am I?",
          questionText: "Which Operating system am I?",
          options: [
            { id: "android", text: "Android", isCorrect: true },
            { id: "ios", text: "iOS", isCorrect: false },
            { id: "linux", text: "Linux", isCorrect: false },
            { id: "windows", text: "Windows", isCorrect: false },
          ],
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Choose the correct option.",
          riddleText:
            "I run on Apple's mobile devices, like iPhones and iPads. Which Operating system am I?",
          questionText: "Which Operating system am I?",
          options: [
            { id: "android", text: "Android", isCorrect: false },
            { id: "ios", text: "iOS", isCorrect: true },
            { id: "linux", text: "Linux", isCorrect: false },
            { id: "windows", text: "Windows", isCorrect: false },
          ],
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Choose the correct option.",
          riddleText:
            "I am a free operating system used by computer experts and known for being stable and secure. Which Operating system am I?",
          questionText: "Which Operating system am I?",
          options: [
            { id: "android", text: "Android", isCorrect: false },
            { id: "ios", text: "iOS", isCorrect: false },
            { id: "linux", text: "Linux", isCorrect: true },
            { id: "windows", text: "Windows", isCorrect: false },
          ],
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Choose the correct option.",
          riddleText:
            "I am known for being stylish, easy to use and good for graphic design, video editing and music production. Which Operating system am I?",
          questionText: "Which Operating system am I?",
          options: [
            { id: "android", text: "Android", isCorrect: false },
            { id: "linux", text: "Linux", isCorrect: false },
            { id: "macos", text: "macOS", isCorrect: true },
            { id: "windows", text: "Windows", isCorrect: false },
          ],
        },
        {
          type: "who-am-i",
          format: "who-am-i",
          title: "Choose the correct option.",
          riddleText:
            "I am made by Microsoft, run on various desktops and laptops. Which Operating system am I?",
          questionText: "Which Operating system am I?",
          options: [
            { id: "android", text: "Android", isCorrect: false },
            { id: "ios", text: "iOS", isCorrect: false },
            { id: "linux", text: "Linux", isCorrect: false },
            { id: "windows", text: "Windows", isCorrect: true },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Chapter 2: Introduction to Windows",
      lessonContent: [
        {
          type: "sequence-match",
          format: "sequence-match",
          title: "Sequence the steps",
          instruction:
            'Sourabh wants to create a Word document named "Lesson 1 Homework" and keep it safely in a new folder on his desktop. Help him by arranging the steps in the correct order.',
          items: [
            {
              id: "step-1",
              content: "Right-click on the desktop, select New and choose the Folder option.",
            },
            {
              id: "step-2",
              content: "Type a name for the new folder and press Enter.",
            },
            {
              id: "step-3",
              content: "Double-click on the folder to open it.",
            },
            {
              id: "step-4",
              content: "Right-click on an empty area inside the folder. From the menu, select New and then click on Microsoft Word Document.",
            },
            {
              id: "step-5",
              content: "Name the document as \"Lesson 1 Homework\" and press enter.",
            },
          ],
          correctOrder: [
            "step-1",
            "step-2",
            "step-3",
            "step-4",
            "step-5",
          ],
          dropZoneCount: 5,
          audioSrc: undefined,
          speakText:
            'Sourabh wants to create a Word document named "Lesson 1 Homework" and keep it safely in a new folder on his desktop. Help him by arranging the steps in the correct order.',
        },
      ],
    },
    {
      id: 3,
      title: "Windows Components",
      lessonContent: [
        {
          type: "sort",
          format: "sort",
          title: "Chapter 3: Different File Types",
          instruction:
            "Drag each file extension into the correct category based on the type of file it represents.",
          items: [
            { id: "file-txt", text: ".txt", type: "text" },
            { id: "file-docx", text: ".docx", type: "text" },
            { id: "file-pdf", text: ".pdf", type: "text" },
            { id: "file-jpg", text: ".jpg", type: "image" },
            { id: "file-png", text: ".png", type: "image" },
            { id: "file-gif", text: ".gif", type: "image" },
            { id: "file-mp4", text: ".mp4", type: "video" },
            { id: "file-avi", text: ".avi", type: "video" },
            { id: "file-mkv", text: ".mkv", type: "video" },
          ],
          targets: [
            { id: "text-files", title: "Text files", type: "text" },
            { id: "image-files", title: "Image files", type: "image" },
            { id: "video-files", title: "Video files", type: "video" },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Chapter 4: Microsoft Word (Part 2)",
      lessonContent: [
        {
          type: "bucket-match",
          format: "bucket-match",
          title: "Match the term related to Microsoft Word with its correct description.",
          instruction: "Match the term related to Microsoft Word with its correct description.",
          items: [
            {
              id: "header",
              text: "Header",
              type: "header",
              imageUrl: "/images/header.png",
            },
            {
              id: "footer",
              text: "Footer",
              type: "footer",
              imageUrl: "/images/footer.png",
            },
            {
              id: "watermark",
              text: "Watermark",
              type: "watermark",
              imageUrl: "/images/watermark.png",
            },
            {
              id: "chart",
              text: "Chart",
              type: "chart",
              imageUrl: "/images/chart.png",
            },
          ],
          buckets: [
            {
              id: "header-bucket",
              title: "Space at the top of each page where you can add your name or the document title.",
              type: "header",
            },
            {
              id: "footer-bucket",
              title: "Space at the bottom of each page where you can add page numbers or notes.",
              type: "footer",
            },
            {
              id: "watermark-bucket",
              title: "A light image or text that appears behind the main text in a document.",
              type: "watermark",
            },
            {
              id: "chart-bucket",
              title: "Insert various charts to visualise data.",
              type: "chart",
            },
          ],
          audioSrc: undefined,
          speakText: "Match the term related to Microsoft Word with its correct description.",
        },
      ],
    },
  ],
};
