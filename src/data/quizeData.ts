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
    }
  ],
  "3": [
    {
      id: 1,
      title: "3rd Quiz",
      questions: [
        {
          id: 1,
          prompt: 'What is the capital of France?',
          options: ['Paris', 'London', 'Berlin', 'Madrid'],
          correctAnswer: 0,
          explanation: 'Paris is the capital of France.'
        } 
      ]
    }
  ]
};
