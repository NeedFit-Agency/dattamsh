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
          title: 'Introduction',
          description: [
            "Hi ! I'm Owlbert! We see so many things around us every day.",
            'Some things, like trees and birds, are found in nature.',
            'Other things, like chairs and cars, are made by people.',
            "Let's learn the difference together!",
          ],
          imageUrl: '/images/intro-scene.png',
          audioSrc: '/audio/01_intro.mp3',
          speakText:
            "Hi there! I'm Owlbert! We see so many things around us every day. Some things, like trees and birds, are found in nature. Other things, like chairs and cars, are made by people. Let's learn the difference together!",
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
      title: "Weather and Seasons",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Introduction to Weather',
          description: [
            "Hello friends! I'm Owlbert, your weather guide!",
            "Weather is what's happening outside right now - is it sunny, rainy, windy, or snowy?",
            "Weather changes all the time, sometimes even in the same day!",
            "Let's learn about different types of weather together!"
          ],
          imageUrl: '/images/weather-intro.png',
          audioSrc: '/audio/weather_intro.mp3',
          speakText: "Hello friends! I'm Owlbert, your weather guide! Weather is what's happening outside right now - is it sunny, rainy, windy, or snowy? Weather changes all the time, sometimes even in the same day! Let's learn about different types of weather together!"
        },
        {
          type: 'learn',
          format: 'video',
          title: 'Types of Weather',
          description: [
            "There are many different types of weather. Let's watch this video to learn about them!"
          ],
          exampleImages: [
            { src: '/images/sunny.png', alt: 'Sunny day with bright sun' },
            { src: '/images/rainy.png', alt: 'Rainy day with umbrella' },
            { src: '/images/snowy.png', alt: 'Snowy winter scene' },
            { src: '/images/windy.png', alt: 'Windy day with blowing leaves' }
          ],
          imageUrl: '/images/weather-video-thumbnail.png',
          audioSrc: '/audio/weather_types.mp3',
          speakText: "There are many different types of weather. Let's look at some of them! On sunny days, the sun shines brightly. On rainy days, water falls from clouds. On snowy days, white snowflakes fall and cover the ground. On windy days, the air moves quickly and can blow things around."
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'The Four Seasons',
          description: [
            "The weather changes throughout the year because of the four seasons.",
            "Let's learn about each season in order!"
          ],
          steps: [
            {
              title: "Step 1: Spring",
              description: "In Spring, flowers bloom and it starts to get warmer. Days become longer and plants begin to grow.",
              imageUrl: '/images/spring.png'
            },
            {
              title: "Step 2: Summer",
              description: "In Summer, it's hot and sunny - perfect for the beach! This is the warmest season with the longest days.",
              imageUrl: '/images/summer.png'
            },
            {
              title: "Step 3: Fall (Autumn)",
              description: "In Fall, leaves change colors and fall from trees. The weather gets cooler and days become shorter.",
              imageUrl: '/images/fall.png'
            },
            {
              title: "Step 4: Winter",
              description: "In Winter, it gets cold and sometimes snows. Many animals hibernate and days are the shortest.",
              imageUrl: '/images/winter.png'
            }
          ],
          audioSrc: '/audio/seasons.mp3',
          speakText: "The weather changes throughout the year because of the four seasons. Spring, Summer, Fall, and Winter each bring different types of weather. Let's learn about each season! In Spring, flowers bloom and it starts to get warmer. In Summer, it's hot and sunny - perfect for the beach! In Fall, leaves change colors and fall from trees. In Winter, it gets cold and sometimes snows."
        }
      ]
    },
  
    {
      id: 4,
      title: "Animals Around Us",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Amazing Animals',
          description: [
            "Hoot hoot! I'm Owlbert, and I love learning about animals!",
            "Animals are living things that come in all shapes and sizes.",
            "Some have fur, some have feathers, and some have scales.",
            "Let's discover the wonderful world of animals together!"
          ],
          imageUrl: '/images/animals-intro.png',
          audioSrc: '/audio/animals_intro.mp3',
          speakText: "Hoot hoot! I'm Owlbert, and I love learning about animals! Animals are living things that come in all shapes and sizes. Some have fur, some have feathers, and some have scales. Let's discover the wonderful world of animals together!"
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Where Animals Live',
          description: [
            "Animals live in different places called habitats.",
            "Some live in forests, some in oceans, and some in deserts.",
            "Let's test what you know about animal habitats!"
          ],
          exampleImages: [
            { src: '/images/forest.png', alt: 'Forest habitat with deer and birds' },
            { src: '/images/ocean.png', alt: 'Ocean habitat with fish and whales' },
            { src: '/images/desert.png', alt: 'Desert habitat with cactus and lizards' }
          ],
          questions: [
            {
              question: "Which animal lives in the ocean?",
              options: ["Bear", "Fish", "Bird", "Lizard"],
              answer: 1
            },
            {
              question: "Where would you find a cactus?",
              options: ["Forest", "Ocean", "Desert", "Mountain"],
              answer: 2
            },
            {
              question: "Which animal might you see in a forest?",
              options: ["Whale", "Camel", "Shark", "Deer"],
              answer: 3
            }
          ],
          audioSrc: '/audio/animal_habitats.mp3',
          speakText: "Animals live in different places called habitats. Some live in forests, some in oceans, and some in deserts. The place where an animal lives gives them food and shelter. In forests, you might find deer and birds. In oceans, there are fish and whales. In deserts, you can find lizards and camels."
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Match Animals to Their Homes',
          instruction: 'Help Owlbert match each animal to where it lives! Drag the animals to their correct habitats.',
          items: [
            { id: 'animal-1', text: 'Fish', type: 'natural', imageUrl: '/images/fish.png' },
            { id: 'animal-2', text: 'Bear', type: 'natural', imageUrl: '/images/bear.png' },
            { id: 'animal-3', text: 'Camel', type: 'natural', imageUrl: '/images/camel.png' },
            { id: 'animal-4', text: 'Bird', type: 'natural', imageUrl: '/images/bird.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Water Animals', type: 'natural' },
            { id: 'manMadeTarget', title: 'Land Animals', type: 'man-made' }
          ],
          audioSrc: '/audio/match_animals.mp3',
          speakText: 'Help me match each animal to where it lives! Drag the animals to their correct habitats.'
        }
      ]
    },
    {
      id: 5,
      title: "Healthy Habits",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Staying Healthy',
          description: [
            "Hi friends! I'm Owlbert, and I want to help you stay healthy and strong!",
            "Staying healthy means taking care of your body every day.",
            "When we have healthy habits, we feel good and have energy to learn and play!",
            "Let's learn some healthy habits together!"
          ],
          imageUrl: '/images/healthy-intro.png',
          audioSrc: '/audio/healthy_intro.mp3',
          speakText: "Hi friends! I'm Owlbert, and I want to help you stay healthy and strong! Staying healthy means taking care of your body every day. When we have healthy habits, we feel good and have energy to learn and play! Let's learn some healthy habits together!"
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Healthy Food Choices',
          description: [
            "Eating healthy foods gives your body energy and helps you grow strong.",
            "Follow these steps to make healthy food choices every day!"
          ],
          steps: [
            {
              title: "Step 1: Eat Colorful Fruits",
              description: "Try to eat different colored fruits like apples, bananas, and berries. They give you vitamins to stay healthy!",
              imageUrl: '/images/fruits.png'
            },
            {
              title: "Step 2: Add Vegetables",
              description: "Vegetables like carrots, broccoli, and spinach help your body grow strong. Try to eat them at lunch and dinner.",
              imageUrl: '/images/vegetables.png'
            },
            {
              title: "Step 3: Choose Whole Grains",
              description: "Whole grains like bread, rice, and pasta give you energy to learn and play all day long.",
              imageUrl: '/images/grains.png'
            },
            {
              title: "Step 4: Include Protein",
              description: "Protein foods like eggs, beans, and chicken help build strong muscles in your body.",
              imageUrl: '/images/protein.png'
            }
          ],
          audioSrc: '/audio/healthy_foods.mp3',
          speakText: "Eating healthy foods gives your body energy and helps you grow strong. Try to eat lots of different colored fruits and vegetables every day! Here are some healthy foods that help your body: Fruits like apples and bananas, vegetables like carrots and broccoli, whole grains like bread and rice, and protein foods like eggs and beans."
        },
        {
          type: 'learn',
          format: 'video',
          title: 'Exercise and Sleep',
          description: [
            "Moving your body and getting enough sleep are important for staying healthy!",
            "Watch this video to learn why exercise and sleep help you grow strong and smart!"
          ],
          imageUrl: '/images/exercise-sleep.png',
          audioSrc: '/audio/exercise_sleep.mp3',
          speakText: "Moving your body and getting enough sleep are important for staying healthy! Try to be active every day - you can run, jump, dance, or play games. Your body also needs rest. Kids should get 9-12 hours of sleep each night. When you sleep, your body grows and your brain remembers what you learned!"
        }
      ]
    }
  ],

  "2": [
    {
      id: 1,
      title: "Introduction to Computers",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'What is a Computer?',
          description: [
            "Hello friends! I'm Owlbert, your tech guide!",
            "Today we're going to learn about computers - amazing machines that help us work and play!",
            "A computer is an electronic device that can store, process, and display information.",
            "Let's explore the wonderful world of computers together!"
          ],
          imageUrl: '/images/computer-intro.png',
          audioSrc: '/audio/computer_intro.mp3',
          speakText: "Hello friends! I'm Owlbert, your tech guide! Today we're going to learn about computers - amazing machines that help us work and play! A computer is an electronic device that can store, process, and display information. Let's explore the wonderful world of computers together!"
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Parts of a Computer',
          description: [
            "Every computer has important parts that work together. Let's learn about them step by step!"
          ],
          steps: [
            {
              title: "Step 1: The Monitor",
              description: "The monitor is like a TV screen. It shows pictures, videos, and text so you can see what the computer is doing.",
              imageUrl: '/images/monitor.png'
            },
            {
              title: "Step 2: The Keyboard",
              description: "The keyboard has letters, numbers, and special buttons. You use it to type words and tell the computer what to do.",
              imageUrl: '/images/keyboard.png'
            },
            {
              title: "Step 3: The Mouse",
              description: "The mouse helps you point to things on the screen. You can click on buttons and move things around with it.",
              imageUrl: '/images/mouse.png'
            },
            {
              title: "Step 4: The CPU",
              description: "The CPU is the brain of the computer. You can't see it working, but it's thinking very fast to make everything happen!",
              imageUrl: '/images/cpu.png'
            }
          ],
          audioSrc: '/audio/computer_parts.mp3',
          speakText: "Every computer has important parts that work together. Let's learn about them! The monitor shows pictures and text. The keyboard is for typing letters and numbers. The mouse helps move things on screen. And the CPU is the brain of the computer!"
        },
        {
          type: 'drag-drop',
          format: 'drag-drop',
          title: 'Match Computer Parts',
          instruction: 'Help Owlbert match each computer part with what it does! Drag the items to the correct target.',
          items: [
            { id: 'comp-item-1', text: 'Monitor', type: 'man-made', imageUrl: '/images/monitor.png' },
            { id: 'comp-item-2', text: 'Keyboard', type: 'natural', imageUrl: '/images/keyboard.png' },
            { id: 'comp-item-3', text: 'Mouse', type: 'natural', imageUrl: '/images/mouse.png' },
            { id: 'comp-item-4', text: 'CPU', type: 'man-made', imageUrl: '/images/cpu.png' }
          ],
          targets: [
            { id: 'naturalTarget', title: 'Input Devices', type: 'natural' },
            { id: 'manMadeTarget', title: 'Output/Processing Devices', type: 'man-made' }
          ],
          audioSrc: '/audio/match_parts.mp3',
          speakText: 'Help me match each computer part with what it does! Drag the items to the correct target.'
        }
      ]
    },
    {
      id: 2,
      title: "Using Computers Safely",
      lessonContent: [
        {
          type: 'learn',
          format: 'video',
          title: 'Computer Safety Rules',
          description: [
            "Hoot hoot! Using computers is fun, but we need to be safe!",
            "Let's watch this video to learn some important rules to follow when using computers."
          ],
          imageUrl: '/images/computer-safety.png',
          audioSrc: '/audio/computer_safety.mp3',
          speakText: "Hoot hoot! Using computers is fun, but we need to be safe! Let's learn some important rules to follow when using computers."
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Safety Rules',
          description: [
            "1. Always ask a grown-up before going online",
            "2. Never share personal information like your address",
            "3. Be kind when talking to others online",
            "4. Tell a grown-up if something makes you feel uncomfortable",
            "5. Take breaks to rest your eyes and body"
          ],
          exampleImages: [
            { src: '/images/ask-adult.png', alt: 'Ask an adult for help' },
            { src: '/images/take-breaks.png', alt: 'Take regular breaks' }
          ],
          audioSrc: '/audio/safety_rules.mp3',
          speakText: "Here are five important safety rules: Always ask a grown-up before going online. Never share personal information like your address. Be kind when talking to others online. Tell a grown-up if something makes you feel uncomfortable. Take breaks to rest your eyes and body."
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Safety Quiz',
          description: [
            "Let's see what you've learned about computer safety!",
            "Answer these questions to test your knowledge."
          ],
          imageUrl: '/images/safety-quiz.png',
          questions: [
            {
              question: "What should you do before going online?",
              options: ["Eat a snack", "Ask a grown-up", "Turn off the lights", "Close your eyes"],
              answer: 1
            },
            {
              question: "What information should you NOT share online?",
              options: ["Your favorite color", "Your address", "Your favorite animal", "Your favorite game"],
              answer: 1
            },
            {
              question: "Why should you take breaks when using a computer?",
              options: ["To make the computer happy", "To rest your eyes and body", "To make the computer faster", "To save electricity"],
              answer: 1
            }
          ],
          audioSrc: '/audio/safety_quiz.mp3',
          speakText: "Let's see what you've learned about computer safety! Answer these questions to test your knowledge."
        }
      ]
    },
    {
      id: 3,
      title: "Fun with Computers",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Amazing Computer Activities',
          description: [
            "Computers can help us do so many fun things!",
            "We can play games, draw pictures, watch videos, and learn new things.",
            "What do you like to do on a computer?"
          ],
          imageUrl: '/images/computer-fun.png',
          audioSrc: '/audio/computer_fun.mp3',
          speakText: "Computers can help us do so many fun things! We can play games, draw pictures, watch videos, and learn new things. What do you like to do on a computer?"
        },
        {
          type: 'learn',
          format: 'application',
          title: 'Let\'s Draw!',
          description: [
            "One fun thing to do on a computer is to draw pictures!",
            "You can use different colors and tools to create amazing art.",
            "Let's try using this drawing application together!"
          ],
          exampleImages: [
            { src: '/images/drawing-app.png', alt: 'Drawing application' },
            { src: '/images/sample-drawing.png', alt: 'Sample drawing' }
          ],
          imageUrl: '/images/drawing-app-interface.png',
          audioSrc: '/audio/drawing_app.mp3',
          speakText: "One fun thing to do on a computer is to draw pictures! You can use different colors and tools to create amazing art. Let's try drawing something together!"
        },
        {
          type: 'learn',
          format: 'code',
          title: 'Simple Coding',
          description: [
            "Did you know you can tell a computer what to do?",
            "That's called coding or programming!",
            "With coding, you can make games, animations, and more!",
            "Let's try some simple coding commands together."
          ],
          steps: [
            {
              title: "Step 1: Move Forward",
              description: "Type 'move()' to make the character move forward one step."
            },
            {
              title: "Step 2: Turn Right",
              description: "Type 'turnRight()' to make the character turn to the right."
            },
            {
              title: "Step 3: Turn Left",
              description: "Type 'turnLeft()' to make the character turn to the left."
            },
            {
              title: "Step 4: Repeat Commands",
              description: "Type 'repeat(3) { move() }' to make the character move forward three times."
            }
          ],
          imageUrl: '/images/simple-coding.png',
          audioSrc: '/audio/simple_coding.mp3',
          speakText: "Did you know you can tell a computer what to do? That's called coding or programming! With coding, you can make games, animations, and more! Let's learn some simple coding together."
        }
      ]
    }
  ]
};
