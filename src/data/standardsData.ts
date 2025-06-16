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

// Fun facts for reference (can be used in components if needed)
export const funFacts = [
  "Computers help us write stories and letters!",
  "You can draw amazing pictures on a computer!",
  "Playing games on a computer is super fun!",
  "You can watch videos and learn new things!",
];

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
        {          type: "bucket-match",
          format: "bucket-match",
          title: "Match the Colors",
          instruction: "Drag each fruit to its matching color bucket!",
          items: [
            {
              id: "apple",
              text: "Apple",
              type: "red",
              imageUrl: "/images/fruits/apple.svg",
              color: "#ff5252"
            },
            {
              id: "banana",
              text: "Banana",
              type: "yellow",
              imageUrl: "/images/fruits/banana.svg",
              color: "#ffeb3b"
            },
            {
              id: "orange",
              text: "Orange",
              type: "orange",
              imageUrl: "/images/fruits/orange.svg",
              color: "#ff9800"
            },
            {
              id: "grapes",
              text: "Grapes",
              type: "purple",
              imageUrl: "/images/fruits/grapes.svg",
              color: "#9c27b0"
            }
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
        {          type: "bucket-match",
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
};
