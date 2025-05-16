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
          prompt: 'test test?',
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
          prompt: 'test test?',
          options: ['A device for playing games', 'A device for listening to music', 'A device for writing', 'A device for reading'],
          correctAnswer: 2,
          explanation: 'A computer is a device for playing games.'
        }
      ]
    }
  ],
  "2": [
    {
      id: 1,
      title: "2nd Quiz",
      questions: [
        {
          id: 1,
          prompt: 'What is the capital of France?',
          options: ['Paris', 'London', 'Berlin', 'Madrid'],
          correctAnswer: 0,
          explanation: 'Paris is the capital of France.'
        },
        {
          id: 2,
          prompt: 'question 2',
          options: ['option 1', 'option 2', 'option 3', 'option 4'],
          correctAnswer: 0,
          explanation: 'explanation 2'
        },
        {
          id: 3,
          prompt: 'question 3',
          options: ['option 1', 'option 2', 'option 3', 'option 4'],
          correctAnswer: 0,
          explanation: 'explanation 3'
        }
      ]
    }
  ]
};
