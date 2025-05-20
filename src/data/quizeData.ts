export interface Question {
  id: number;
  imageUrl?: string;
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizChapter {
  id: number;
  title: string;
  questions: Question[];
}

export interface QuizStandard {
  [standardId: string]: QuizChapter[];
}

export const quizzes: QuizStandard = {
  "1": [
    {
      id: 1,
      title: "Introduction to Nature and Man-made",
      questions: [
        {
          id: 1,
          prompt: 'Which of these is a NATURAL thing?',
          options: ['Chair', 'Sun', 'Scissors', 'Washing Machine'],
          correctAnswer: 1,
          explanation: 'The Sun is a natural object - it exists in nature and was not made by humans.'
        },
        {
          id: 2,
          prompt: 'What are machines?',
          options: [
            'Things that grow in nature',
            'Man-made things that help us do work easily',
            'Things that are always electronic',
            'Only large factory equipment'
          ],
          correctAnswer: 1,
          explanation: 'Machines are man-made things that help us do our work easily and save time.'
        },
        {
          id: 3,
          imageUrl: '/images/washing-machine.png',
          prompt: 'What does this machine help us do?',
          options: ['Wash clothes', 'Keep food cold', 'Cut paper', 'Sharpen pencils'],
          correctAnswer: 0,
          explanation: 'A washing machine helps us wash clothes quickly with less manual effort.'
        },
        {
          id: 4,
          prompt: 'Which of these is a MAN-MADE thing?',
          options: ['Sun', 'Bird', 'Water', 'Scissors'],
          correctAnswer: 3,
          explanation: 'Scissors are man-made tools designed to cut things like paper and cloth.'
        },
        {
          id: 5,
          imageUrl: '/images/scissors.png',
          prompt: 'What is this machine used for?',
          options: ['Washing clothes', 'Keeping food cold', 'Cutting things', 'Making air move'],
          correctAnswer: 2,
          explanation: 'Scissors are used for cutting things like paper, cloth, and other materials.'
        },
        {
          id: 6,
          prompt: 'Which of these is NOT a machine?',
          options: ['Fan', 'Washing Machine', 'Sun', 'Sharpener'],
          correctAnswer: 2,
          explanation: 'The Sun is a natural object, not a machine. All other options are machines made by people.'
        }
      ]
    }, 
    {
      id: 2,
      title: "2nd chapter quize",
      questions: [
        {
          id: 1,
          prompt: 'test 2nd chapter?',
          options: ['A device for playing games', 'A device for listening to music', 'A device for writing', 'A device for reading'],
          correctAnswer: 1,
          explanation: 'A computer is a device for playing games.'
        }
      ]
    },
    {
      id: 3,
      title: "3rd chapter quize",
      questions: [
        {
          id: 1,
          prompt: 'test 3rd chapter?',
          options: ['A device for playing games', 'A device for listening to music', 'A device for writing', 'A device for reading'],
          correctAnswer: 2,
          explanation: 'A computer is a device for playing games.'
        }
      ]
    },
    {
      id: 4,
      title: "4th chapter quize",
      questions: [
        {
          id: 1,
          prompt: 'test 4th chapter?',
          options: ['A device for playing games', 'A device for listening to music', 'A device for writing', 'A device for reading'],
          correctAnswer: 3,
          explanation: 'A computer is a device for playing games.'
        }
      ]
    }
  ],
  "2": [
    {
      id: 1,
      title: "More about Computers",
      questions: [
        {
          id: 1,
          prompt: 'Which of these is a hardware part of a computer?',
          options: ['MS Paint', 'Monitor', 'Notepad', 'Scratch'],
          correctAnswer: 1,
          explanation: 'Monitor is a hardware part you can touch. The others are software.'
        },
        {
          id: 2,
          prompt: 'What is software?',
          options: [
            'A part of the computer you can touch',
            'A set of instructions that tells the computer what to do',
            'A type of input device',
            'A type of output device'
          ],
          correctAnswer: 1,
          explanation: 'Software is a set of instructions that tells the computer what to do.'
        },
        {
          id: 3,
          prompt: 'Which of these is an input device?',
          options: ['Printer', 'Monitor', 'Keyboard', 'Speaker'],
          correctAnswer: 2,
          explanation: 'Keyboard is an input device. Printer, monitor, and speaker are output devices.'
        },
        {
          id: 4,
          prompt: 'Where can you find computers being used?',
          options: ['Schools', 'Hospitals', 'Banks', 'All of the above'],
          correctAnswer: 3,
          explanation: 'Computers are used in all these places and more!'
        },
        {
          id: 5,
          prompt: 'What is the correct order for how a computer works?',
          options: ['Output → Input → Process', 'Input → Process → Output', 'Process → Output → Input', 'Input → Output → Process'],
          correctAnswer: 1,
          explanation: 'The correct order is Input → Process → Output.'
        },
        {
          id: 6,
          prompt: 'Which of these is NOT a hardware part?',
          options: ['Mouse', 'CPU cabinet', 'MS Paint', 'Monitor'],
          correctAnswer: 2,
          explanation: 'MS Paint is software, not hardware.'
        },
        {
          id: 7,
          prompt: 'What does a printer do?',
          options: ['Shows pictures on screen', 'Prints on paper', 'Records sound', 'Stores information'],
          correctAnswer: 1,
          explanation: 'A printer puts your drawing or words from the computer onto paper.'
        },
        {
          id: 8,
          prompt: 'Which of these is an example of software?',
          options: ['Keyboard', 'Monitor', 'Scratch', 'Mouse'],
          correctAnswer: 2,
          explanation: 'Scratch is a software application. The others are hardware.'
        }
      ]
    },
    {
      id: 2,
      title: "Smartphones: Pocket Computers",
      questions: [
        {
          id: 1,
          prompt: 'Why are smartphones called "pocket computers"?',
          options: [
            'Because they are small',
            'Because they can do many things like computers',
            'Because they have screens',
            'Because they have batteries'
          ],
          correctAnswer: 1,
          explanation: 'Smartphones are called "pocket computers" because they can perform many functions similar to computers, such as accessing the internet, running apps, and more.'
        },
        {
          id: 2,
          prompt: 'What is YouTube?',
          options: [
            'A game',
            'A place to watch videos',
            'A shopping app',
            'A messaging app'
          ],
          correctAnswer: 1,
          explanation: 'YouTube is a platform where you can watch and share videos.'
        },
        {
          id: 3,
          prompt: 'What can a smartphone do that a regular phone cannot?',
          options: [
            'Make phone calls',
            'Send text messages',
            'Access the internet',
            'Turn on and off'
          ],
          correctAnswer: 2,
          explanation: 'Unlike regular phones, smartphones can access the internet, allowing you to browse websites and use apps.'
        }
      ]
    },
    {
      id: 3,
      title: "Introduction to Notepad",
      questions: [
        {
          id: 1,
          prompt: 'What is Notepad?',
          options: [
            'A game',
            'A drawing program',
            'A text editor',
            'A web browser'
          ],
          correctAnswer: 2,
          explanation: 'Notepad is a simple text editor where you can write and save text files.'
        },
        {
          id: 2,
          prompt: 'How do you save a file in Notepad?',
          options: [
            'Click "File" then "Save As"',
            'Close the window',
            'Press the power button',
            'Click "Edit" then "Save"'
          ],
          correctAnswer: 0,
          explanation: 'To save a file in Notepad, you click "File" and then "Save As" to choose a name and location for your file.'
        },
        {
          id: 3,
          prompt: 'What is the Text Area in Notepad?',
          options: [
            'Where you type your text',
            'The top bar',
            'The menu options',
            'The settings panel'
          ],
          correctAnswer: 0,
          explanation: 'The Text Area is the large blank space where you type your words and sentences.'
        }
      ]
    },
    {
      id: 4,
      title: "Drawing with MS Paint (Part 2)",
      questions: [
        {
          id: 1,
          prompt: 'Which tool would you use to draw a straight line in MS Paint?',
          options: [
            'Brush tool',
            'Line tool',
            'Curve tool',
            'Text tool'
          ],
          correctAnswer: 1,
          explanation: 'The Line tool is specifically designed to draw straight lines in MS Paint.'
        },
        {
          id: 2,
          prompt: 'What does the Undo button do in MS Paint?',
          options: [
            'Adds colors',
            'Fixes a mistake by removing the last action',
            'Makes your drawing bigger',
            'Adds text'
          ],
          correctAnswer: 1,
          explanation: 'The Undo button reverses the last action you performed, helping you correct mistakes.'
        },
        {
          id: 3,
          prompt: 'How do you add words to your picture in MS Paint?',
          options: [
            'Use the Line tool',
            'Use the Text tool',
            'Use the Eraser',
            'Use the Brush tool'
          ],
          correctAnswer: 1,
          explanation: 'The Text tool allows you to add words or labels to your drawing in MS Paint.'
        }
      ]
    }
  ]
};