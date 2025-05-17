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
  | 'text'
  | 'types'; // Added 'types' format

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
  content?: string[]; // Added content property to fix the TypeScript error
  imageUrl?: string;
  exampleImages?: { src: string; alt: string; caption?: string }[]; // Added optional caption property
  // Format will typically be 'text', 'video', etc.
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

export interface QuizSlide extends BaseContentProps {
  type: 'learn';
  description: string | string[];
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  explanation?: string;
  imageUrl?: string;
  // Format will be 'quiz'
}

export interface TypesSlide extends BaseContentProps {
  type: 'learn';
  description: string;
  types: {
    id: string;
    name: string;
    description: string;
    icon?: string;
    imageUrl?: string;
  }[];
  // Format will be 'types'
}

export interface StepByStepSlide extends BaseContentProps {
  type: 'learn';
  description: string;
  steps: {
    id: string;
    number: number;
    instruction: string;
    visualContent?: string;
  }[];
  // Format will be 'step-by-step'
}

export type LessonContent = LearningSlide | DragDropSlide | QuizSlide | TypesSlide | StepByStepSlide;

export interface Chapter {
  id: number;
  title: string;
  lessonContent: LessonContent[];
}

export interface Standard {
  [key: string]: Chapter[];
}

export const standards: Standard = {
 

  "2": [
    {
      id: 1,
      title: "More about Computers",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'Questions to Ponder',
          description: [
            'In which places have you seen a computer being used?',
            'How does a computer listen and talk?',
            'How does a computer turn your ideas into results?'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Where do we use Computers?',
          description: [
            '1. Schools: Teachers use computers in school to teach children more about topics by showing videos. Children learn computer skills in school using computers. Computers are also used in school offices for accounting and to keep records of teachers, staff, and students.',
            '2. Shops: In shops, computers help in money transactions, check prices, and keep track of what is sold.',
            '3. Offices: In offices, people use computers to write letters, send emails, and complete important tasks efficiently. Computers are also used in offices to maintain records and to store information.',
            '4. Hospitals: Doctors use computers to store patient information. Some advanced computers also help operate machines used in medical procedures.',
            '5. Home: We use computers at home to watch our favourite cartoons, play games, type letters, draw and colour, to learn, watch videos, listen to music, etc.',
            '6. Bank: Banks use computers to keep track of customers accounts and money. They also help with withdrawing cash from ATMs.'
          ],
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Activity: List four more places where we use computers',
          description: [
            'Ask your teacher or parents to help you!',
            'Place 1: _______',
            'Place 2: _______',
            'Place 3: _______',
            'Place 4: _______'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'What is a Computer made of?',
          description: [
            'Hardware and Software are the two main components of a computer system.',
            'Hardware is the parts of the computer you can touch. Example: CPU cabinet, Keyboard, Monitor, Mouse.',
            'Software is what makes the computer work. Software is a set of instructions that tells a computer what to do. You cant touch software. Without software, the computer hardware is of no use. Example: MS Paint, Scratch, Notepad, Periwinkle App.'
          ],
          imageUrl: '/images/skeleton-hardware.png',
          exampleImages: [
            { src: '/images/skeleton-hardware.png', alt: 'Skeleton illustration of computer hardware' },
            { src: '/images/skeleton-software.png', alt: 'Skeleton illustration of computer software' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Activity: Name Hardware Parts',
          description: [
            'Can you name two other parts of computers that can be termed as Hardware? Hint: We have learnt about these parts in grade 1 as Extra parts of the Computer.'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Activity: Identify Hardware and Software',
          description: [
            'Identify the pictures. Write H for hardware and S for software.'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Input and Output Devices',
          description: [
            'Input is the instruction we give to a computer. We give instructions by typing or clicking. These instructions tell the computer what to do.',
            'Output is the result the computer provides, showing what it has done with our input. The computer provides output on the screen or on printed documents.',
            'Computers can "listen", that is, receive instructions from users using input devices. Computers can "talk", that is, give results to users using output devices.'
          ],
          imageUrl: '/images/skeleton-input-output.png',
          exampleImages: [
            { src: '/images/skeleton-input.png', alt: 'Skeleton illustration of input devices' },
            { src: '/images/skeleton-output.png', alt: 'Skeleton illustration of output devices' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Input Devices: Listening',
          description: [
            'We have already learnt about these input devices and used them: Keyboard, Mouse.',
            'More input devices are the scanner and the microphone.',
            'Scanner: A scanner is a machine that helps turn pictures and papers into digital files so you can see them on the computer.',
            'Microphone: A microphone is a device that helps record sounds and voice on to a computer. Microphones are used for talking, giving voice instructions, singing, and recording music.'
          ],
          imageUrl: '/images/skeleton-input.png',
          exampleImages: [
            { src: '/images/skeleton-keyboard.png', alt: 'Skeleton illustration of a keyboard' },
            { src: '/images/skeleton-mouse.png', alt: 'Skeleton illustration of a mouse' },
            { src: '/images/skeleton-scanner.png', alt: 'Skeleton illustration of a scanner' },
            { src: '/images/skeleton-microphone.png', alt: 'Skeleton illustration of a microphone' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Output Devices: Talking',
          description: [
            'We have already learnt about output devices and used them: Speakers, Monitor.',
            'Another output device is the printer. Printer: It puts your drawing or words from the computer onto paper.'
          ],
          imageUrl: '/images/skeleton-output.png',
          exampleImages: [
            { src: '/images/skeleton-monitor.png', alt: 'Skeleton illustration of a monitor' },
            { src: '/images/skeleton-speaker.png', alt: 'Skeleton illustration of a speaker' },
            { src: '/images/skeleton-printer.png', alt: 'Skeleton illustration of a printer' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Activity: Identifying input and output devices',
          description: [
            'Write I for input and O for output next to each device.',
            '1. Keyboard: _______',
            '2. Monitor: _______',
            '3. Microphone: _______',
            '4. Mouse: _______',
            '5. Printer: _______',
            '6. Scanner: _______'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Activity: Using a calculator',
          description: [
            'Guess whether each step is Input, Process, or Output. Use the calculator and follow the steps below. For each step, tick the correct option: input, process, or output.',
            '1. Type the numbers 5, +, and 3 on the calculator. input process output',
            '2. The calculator adds the numbers together. input process output',
            '3. The calculator shows the result, 8, on the screen. input process output',
            'Is a calculator an input device or an output device? Why?'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: "Caselet: Tina's Big Day with the Computer",
          description: [
            'Tina was excited because today her teacher, Miss Lily, was teaching the class about computers! Miss Lily asked, "Where do we use computers?" Tina raised her hand and said, "We use computers at home, in schools, and even at shops!"',
            'Miss Lily showed them different parts of the computer. She pointed to the monitor, where they could see pictures and words. Then she held up the keyboard with lots of buttons for typing and the mouse that helps us click. She also showed the speakers for sound and a printer that prints on paper.',
            'These parts are called input and output devices, explained Miss Lily. When you type or click, youre giving input. And when you see things on the monitor or hear sounds, thats the output.',
            'Finally, Miss Lily explained how computers work: input, process, and output. She said, If you want to draw, you use the mouse to give input, the computer processes it, and your picture appears on the screen as output.',
            'Tina had a lot of fun learning and couldnt wait to share what she learnt with her family.'
          ],
          imageUrl: '/images/skeleton-computer-scene.png',
          exampleImages: [
            { src: '/images/skeleton-classroom.png', alt: 'Skeleton illustration of a classroom with computers' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Questions for discussion',
          description: [
            '1. Where have you seen people using computers?',
            '2. What parts of the computer did Tina learn about?',
            "3. What's the difference between input and output?"
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Did you know?',
          description: [
            'The oldest working computer, called the Harvard Mark I, was made in 1944 and still works today.'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Points to Remember',
          description: [
            'Computers are used in schools, homes, shops, hospitals, banks, and many more places.',
            'Hardware is the part of a computer you can touch, like the monitor, keyboard, and mouse.',
            'Software is the program that tells the computer what to do, like applications and programs like Notepad, MS Paint, etc.',
            'Input devices help the computer listen, that is, instructions are given to a computer using input devices like a keyboard and mouse.',
            'Output devices help the computer talk, that is, the computer gives results to the user using output devices like monitor, printer, and speakers.',
            'You tell the computer what to do (input), it does the work (process), and then shows a result (output).',
            'The CPU processes the instructions.'
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'WORKSTATION: Who am I?',
          description: [
            'A. Who am I? Choose the correct answer from the list given below. keyboard, monitor, speakers, mouse, software',
            '1. I let you see what the computer is doing, but I do not make a sound. Who am I? _______',
            '2. I help you tell the computer what to do by clicking and moving. Who am I? _______',
            '3. I help you hear music from the computer. Who am I? _______',
            '4. I help you type letters and words into the computer. Who am I? _______',
            '5. I am inside the computer, you cannot touch me, but without me, the computer will not be useful. Who am I? _______'
          ]
        },        {
          type: 'learn',
          format: 'text',
          title: 'WORKSTATION: Circle the odd one out',
          description: [
            '1. Places where computers are used: a. school b. hospital c. tree d. library',
            '2. Not a hardware: a. keyboard b. mouse c. MS Word d. printer',
            '3. Not an output device: a. monitor b. speaker c. keyboard d. printer',
            '4. Non-computer item: a. printer b. speaker c. pencil d. scanner',
            '5. Not a software: a. whatsapp b. keyboard c. MS Paint d. notepad'
          ]
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Chapter Quiz: More about Computers',
          description: ["Let's check what you've learned about computers and their parts!"],
          question: "Which of these is an input device?",
          options: [
            { id: "q5-opt1", text: "Monitor", isCorrect: false, explanation: "A monitor is an output device that shows information to us." },
            { id: "q5-opt2", text: "Printer", isCorrect: false, explanation: "A printer is an output device that prints information on paper." },
            { id: "q5-opt3", text: "Keyboard", isCorrect: true, explanation: "Correct! A keyboard is an input device we use to type information into the computer." },
            { id: "q5-opt4", text: "Speaker", isCorrect: false, explanation: "Speakers are output devices that play sounds from the computer." }
          ],
          explanation: "Input devices like keyboards and mice help us give information to the computer. Output devices like monitors and printers show us information from the computer.",
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/quiz5.mp3',
          speakText: "Let's check what you've learned about computers and their parts! Which of these is an input device?"
        }
      ]
    }
  ],
  
  "3": [
    {
      id: 1,
      title: "Surfing the Internet",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'What is the Internet?',
          description: [
            "Let's think of the city we live in. There are many streets and roads that take you to different buildings, playgrounds, schools, and other places. The Internet is like a big city with many roads connecting different places. These roads are the connections between computers.",
            "Buildings like schools and houses are the websites. For example, YouTube is a website! There are various websites on the internet which give you different things like videos, pictures, information, items to shop, services, etc."
          ],
          imageUrl: '/images/standard3/chapter1/internet_city.png',
        },
        {
          type: 'learn',
          format: 'types',
          title: 'Uses of the Internet',
          description: "The internet is very useful! Here are some ways we use it:",
          types: [
            { id: 'use1', name: 'Learning', description: 'You can search for information, watch videos, and read articles to learn about various topics.', icon: '📚' },
            { id: 'use2', name: 'Communication', description: 'You can send emails, video call your friends, or message family members.', icon: '💬' },
            { id: 'use3', name: 'Shopping', description: 'You can buy clothes, shoes, books, toys, and many more items online, just like visiting a store in your city.', icon: '🛍️' },
            { id: 'use4', name: 'Sharing', description: 'You can share pictures, videos, and ideas with friends.', icon: '🤝' },
            { id: 'use5', name: 'Entertainment', description: 'You can play games, watch cartoons, or listen to music.', icon: '🎮' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Important Internet Terms',
          description: "Let's learn some common words you'll hear when talking about the internet:",
          content: [
            "World Wide Web (www): The World Wide Web is like the entire internet city where you will find all the websites (buildings). It's a big network that connects everything together.",
            "Website: A website is like a building in the internet city. Just like different buildings have different uses (like schools or shops), websites have different uses. For example, YouTube is a website for videos, Google is a website for searching information, Amazon is a website to shop for things.",
            "Web Page: A web page is like a room inside a building. When you visit a website, each page you see (like a room) is a web page that has different information. For example, when you visit a news website, each one page article is a separate web page.",
            "Home Page: The home page is like the front door of a house. It's the first page you see when you visit a website."
          ],
          imageUrl: '/images/standard3/chapter1/website_analogy.png'
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Understanding Web Browsers',
          description: "A web browser is like a car that helps you travel on the internet's roads. You need it to visit websites and go from one place to another.",
          content: [
            "Some popular web browsers are Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, and Opera.",
            "The browser asks you the name of the place (website) you would like to visit. You type it in a box called the address bar, and as soon as you press enter after writing the name of the website, it opens on your screen."
          ],
          exampleImages: [
            { src: '/images/standard3/chapter1/chrome_logo.png', alt: 'Google Chrome Logo', caption: 'Google Chrome' },
            { src: '/images/standard3/chapter1/firefox_logo.png', alt: 'Mozilla Firefox Logo', caption: 'Mozilla Firefox' },
            { src: '/images/standard3/chapter1/edge_logo.png', alt: 'Microsoft Edge Logo', caption: 'Microsoft Edge' },
            { src: '/images/standard3/chapter1/safari_logo.png', alt: 'Safari Logo', caption: 'Safari' },
            { src: '/images/standard3/chapter1/opera_logo.png', alt: 'Opera Logo', caption: 'Opera' }
          ]
        },
        {
          type: 'learn',
          format: 'types',
          title: 'Browser Tools: Components of Web Browsers',
          description: "Web browsers have helpful buttons and boxes. Let's see what they do:",
          types: [
            { id: 'tool1', name: 'Address bar', description: 'Type the name of the website you want to visit here. (Example: www.kiddle.co)', imageUrl: '/images/standard3/chapter1/address_bar.png' },
            { id: 'tool2', name: 'Previous page (Back button)', description: 'Takes you back to the page/website you visited before.', imageUrl: '/images/standard3/chapter1/back_button.png' },
            { id: 'tool3', name: 'Next page (Forward button)', description: 'Takes you to the next page/website you have visited (if you went back).', imageUrl: '/images/standard3/chapter1/forward_button.png' },
            { id: 'tool4', name: 'Refresh', description: 'Reloads the current page.', imageUrl: '/images/standard3/chapter1/refresh_button.png' },
            { id: 'tool5', name: 'Search bar (often part of Address Bar)', description: 'Type the topic about which you need information.', imageUrl: '/images/standard3/chapter1/search_bar_example.png' }
          ]
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'How to Find Information Online?',
          description: "Let's learn how to search for things on the internet!",
          steps: [
            { id: 's1', number: 1, instruction: 'Decide what information you are looking for on the internet.' },
            { id: 's2', number: 2, instruction: 'Choose a browser (Example: Google Chrome) and open it.', visualContent: '/images/standard3/chapter1/chrome_icon.png' },
            { id: 's3', number: 3, instruction: 'If you need to open it: Click on the Start button.', visualContent: '/images/standard3/chapter1/start_button.png' },
            { id: 's4', number: 4, instruction: 'Search the name of the browser in the search bar next to Start.', visualContent: '/images/standard3/chapter1/search_for_browser.png' },
            { id: 's5', number: 5, instruction: 'Double click on the icon to open it or click on the Open option.' },
            { id: 's6', number: 6, instruction: 'Type your question or topic in the search box (address bar or search bar) of the browser.', visualContent: '/images/standard3/chapter1/browser_search_box.png' },
            { id: 's7', number: 7, instruction: 'Press Enter on your keyboard.' },
            { id: 's8', number: 8, instruction: 'Go through the results. Click on the website link that you think will give you relevant information.' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Downloading and Uploading Files',
          description: "Sometimes you want to get things from the internet or put your things on the internet.",
          content: [
            "1. Downloading files: It is like getting a package from the internet to your computer. You can download pictures, videos, documents, books, etc. from the internet.",
            "2. Uploading files: It is like sending a package from your computer to the internet. You can upload your work, pictures, videos, presentations, documents, etc.",
            "Note: Be careful while you upload and download files. Always ask your parents/teachers before uploading or downloading any file."
          ],
          imageUrl: '/images/standard3/chapter1/download_upload_concept.png'
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Steps to Download a Picture',
          description: "Let's learn how to save a picture from the internet to your computer.",
          steps: [
            { id: 'dp1', number: 1, instruction: 'Open any browser (like Chrome, Safari, Internet Explorer etc).' },
            { id: 'dp2', number: 2, instruction: 'Type the name or some information about the picture you want to download in the search bar.' },
            { id: 'dp3', number: 3, instruction: 'Choose the Images option (usually below the search bar or as a tab).' },
            { id: 'dp4', number: 4, instruction: 'Find an image you like. Right-click on it. A menu with various options opens.' },
            { id: 'dp5', number: 5, instruction: 'Click on the "Save image as..." option. Enter the name with which you want it to be saved in the File name box. Choose the location (like Downloads folder) you want it to be saved.' },
            { id: 'dp6', number: 6, instruction: 'Click Save. Congratulations! You just downloaded an image.' }
          ]
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Where to Find Downloaded Files on the Computer?',
          description: "After downloading, where do your files go?",
          steps: [
            { id: 'df1', number: 1, instruction: 'Open File Explorer. Its icon is usually at the bottom of the screen, looking like a folder.', visualContent: '/images/standard3/chapter1/file_explorer_icon.png' },
            { id: 'df2', number: 2, instruction: 'Look for a folder named "Downloads" in File Explorer and click on it.' },
            { id: 'df3', number: 3, instruction: 'You will see all downloaded files in this folder.' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: "Online Safety: Aarush's Planet Discovery",
          description: "Aarush wanted to know more about the solar system and the planets. He asked his mom if he could use her smartphone to search for information online. His mom gave him her phone but also told him to be safe and cautious. Aarush searched about the solar system and got to know many fun facts. While searching, he came across an advertisement: Enter your name, date of birth, address, and phone number. Click for a gift. He asked his mother. His mother said, You should not enter any personal details for free gifts or prizes. Always remember sharing your personal details on any website is not safe Aarush thanked his mother and had fun learning about planets and online safety.",
          content: [
            "Questions for discussion:",
            "1. What did Aarush's mom ask him to remember?",
            "2. Why did Aarush not give his personal details to win the gift?"
          ],
          imageUrl: '/images/standard3/chapter1/aarush_online.png'
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Important Safety Tips While Using the Internet',
          description: "Staying safe online is very important! Here are some rules to follow:",
          content: [
            "Ÿ Do not communicate with unknown people while using the internet.",
            "Ÿ Be respectful to others online.",
            "Ÿ If any website makes you feel scared or uncomfortable, always tell your parents first.",
            "Ÿ Do not share your personal information such as passwords, or phone numbers with anyone while using the internet, even if they ask you nicely.",
            "Ÿ Do not click on any advertisements on the website that ask you to download or install files.",
            "Ÿ Always ask your parents before downloading anything from the internet."
          ],
          imageUrl: '/images/standard3/chapter1/online_safety_shield.png'
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Chapter Summary: Surfing the Internet',
          description: "Let's review what we've learned!",
          content: [
            "Points to Remember:",
            "Ÿ The internet is like a big city with roads connecting computers. Websites are like buildings in this city.",
            "Ÿ The internet is useful for learning, communication, entertainment, shopping, and sharing.",
            "Ÿ A web browser (like Google Chrome) helps you explore the internet.",
            "Ÿ To find information: open a browser, type your question in the search bar, press enter, and click on suitable results.",
            "Ÿ Downloading is getting files from the internet; uploading is sending files to the internet.",
            "Ÿ Always tell a parent or teacher if something online makes you uncomfortable.",
            "Ÿ Never share personal information and avoid clicking on suspicious advertisements.",
            "",
            "Did you know?",
            "Ÿ The internet was invented on January 1, 1983.",
            "Ÿ The first ever website was made in 1991 and it is still working. Its name is info.cern.ch."
          ]
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: Online Tasks',
          description: ["Let's check your understanding!"],
          question: "Which of these tasks is commonly done online using the internet?",
          options: [
            { id: 'c1q1opt1', text: "Drawing a picture in a physical book", isCorrect: false, explanation: "Drawing in a physical book does not require the internet." },
            { id: 'c1q1opt2', text: "Watching videos on YouTube", isCorrect: true, explanation: "Correct! YouTube is a website where you can watch videos online." },
            { id: 'c1q1opt3', text: "Planting a tree in your garden", isCorrect: false, explanation: "Planting a tree is a physical activity done outdoors." },
            { id: 'c1q1opt4', text: "Riding a bicycle", isCorrect: false, explanation: "Riding a bicycle is a physical activity." }
          ],
          explanation: "The internet allows us to do many things like watching videos, shopping, and sending emails."
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: Web Browsers',
          description: ["Test your knowledge about web browsers!"],
          question: "Which of the following is a popular web browser?",
          options: [
            { id: 'c1q2opt1', text: "Microsoft Word", isCorrect: false, explanation: "Microsoft Word is a word processor, not a web browser." },
            { id: 'c1q2opt2', text: "Google Chrome", isCorrect: true, explanation: "Correct! Google Chrome is a widely used web browser." },
            { id: 'c1q2opt3', text: "Notepad", isCorrect: false, explanation: "Notepad is a simple text editor." },
            { id: 'c1q2opt4', text: "Calculator", isCorrect: false, explanation: "A calculator is used for calculations." }
          ],
          explanation: "Web browsers like Google Chrome, Firefox, and Safari help us visit websites on the internet."
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: Online Safety',
          description: ["What should you do to stay safe online?"],
          question: "If a website asks for your home address to win a free gift, what should you do?",
          options: [
            { id: 'c1q3opt1', text: "Enter your address quickly to get the gift.", isCorrect: false, explanation: "Never share personal information like your address for online gifts without asking a trusted adult." },
            { id: 'c1q3opt2', text: "Ask your parents or a trusted adult before doing anything.", isCorrect: true, explanation: "Correct! Always ask a trusted adult if you are unsure or if a website asks for personal information." },
            { id: 'c1q3opt3', text: "Make up an address and enter it.", isCorrect: false, explanation: "It's best not to interact with such requests and to inform an adult." },
            { id: 'c1q3opt4', text: "Close the website and tell no one.", isCorrect: false, explanation: "You should close it, but also tell a parent or trusted adult about it." }
          ],
          explanation: "It's important to be very careful about sharing personal information online. Always ask a trusted adult for help."
        }
      ]
    },
    {
      id: 2,
      title: "Understanding Emails",
      lessonContent: [
        {
          type: 'learn',
          format: 'text',
          title: 'What is Email?',
          description: [
            "We use postal services and courier services in our real lives to send messages and things to each other. Similarly, EMAIL is the postal service used through the internet.",
            "You need a device like a phone, laptop, desktop, or tablet to send or receive an email. The full form of email is electronic mail."
          ],
          imageUrl: '/images/standard3/chapter2/email_concept.png'
        },
        {
          type: 'learn',
          format: 'type',
          title: 'Uses of Email',
          description: "Email is a very useful tool for many things:",
          types: [
            { id: 'email_use1', name: 'Reliable Communication', description: 'Allows users to send and receive documents, images, links, and other files reliably.', icon: '📄' },
            { id: 'email_use2', name: 'Personal Communication', description: 'Sending messages to friends and family.', icon: '👨‍👩‍👧‍👦' },
            { id: 'email_use3', name: 'Professional Communication', description: 'Sharing important updates or tasks with colleagues.', icon: '💼' },
            { id: 'email_use4', name: 'Business Marketing', description: 'Businesses use email for marketing, sending offers, and updates to customers.', icon: '📈' },
            { id: 'email_use5', name: 'Job Applications', description: 'Emails are also used to apply for jobs in companies.', icon: '🧑‍🏭' },
            { id: 'email_use6', name: 'Account Sign-ups', description: 'Many websites and apps need an email ID to join.', icon: '🔑' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'What You Need to Send an Email',
          description: "To send an email, you need a few things:",
          content: [
            "Ÿ A device such as a phone, laptop, desktop, or tablet",
            "Ÿ Internet connection",
            "Ÿ Email ID"
          ],
          imageUrl: '/images/standard3/chapter2/email_requirements.png'
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'How to Create an Email Account',
          description: "Let's learn how to create an email account.",
          steps: [
            { id: 'step1', number: 1, instruction: 'Choose an email service provider (like Gmail, Yahoo, or Outlook).' },
            { id: 'step2', number: 2, instruction: 'Go to the sign-up page of the email service provider.' },
            { id: 'step3', number: 3, instruction: 'Fill in the required information like your name, desired email address, password, etc.' },
            { id: 'step4', number: 4, instruction: 'Verify your account, usually by clicking on a link sent to your phone or another email.' },
            { id: 'step5', number: 5, instruction: 'Complete the setup by following any additional instructions from the email service provider.' }
          ]
        },
        {
          type: 'learn',
          format: 'step-by-step',
          title: 'Sending and Receiving Emails',
          description: "Let's learn how to send and receive emails.",
          steps: [
            { id: 'email_step1', number: 1, instruction: 'Open your email application or go to the email website.' },
            { id: 'email_step2', number: 2, instruction: 'Log in with your email ID and password.' },
            { id: 'email_step3', number: 3, instruction: 'To send an email, click on the "Compose" or "New Email" button.' },
            { id: 'email_step4', number: 4, instruction: 'Fill in the recipients email address, add a subject, and write your message.' },
            { id: 'email_step5', number: 5, instruction: 'Click "Send" to send your email.' },
            { id: 'email_step6', number: 6, instruction: 'To check for new emails, look for a "Refresh" button or simply open your inbox.' },
            { id: 'email_step7', number: 7, instruction: 'Read new emails by clicking on them.' }
          ]
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Email Etiquette',
          description: "Here are some important email etiquette rules:",
          content: [
            "Ÿ Always use a clear and relevant subject line.",
            "Ÿ Greet the recipient politely.",
            "Ÿ Be concise and to the point.",
            "Ÿ Use proper grammar and spelling.",
            "Ÿ Do not use all caps (it means you're shouting!).",
            "Ÿ Always sign off with your name."
          ],
          imageUrl: '/images/standard3/chapter2/email_etiquette.png'
        },
        {
          type: 'learn',
          format: 'text',
          title: 'Chapter Summary: Understanding Emails',
          description: "Let's review what we've learned about emails!",
          content: [
            "Ÿ Email is like a postal service but on the internet.",
            "Ÿ You need a device, internet connection, and email ID to send or receive an email.",
            "Ÿ Emails are useful for communication, sharing files, and more.",
            "Ÿ Always follow email etiquette: be clear, polite, and respectful."
          ]
        },
        {
          type: 'learn',
          format: 'quiz',
          title: 'Quiz: Email Basics',
          description: ["Let's test your knowledge about emails!"],
          question: "What do you need to send an email?",
          options: [
            { id: 'email_q1_opt1', text: "A device and internet connection", isCorrect: true, explanation: "Correct! You need a device and internet connection to send an email." },
            { id: 'email_q1_opt2', text: "A phone number", isCorrect: false, explanation: "You don't need a phone number to send an email." },
            { id: 'email_q1_opt3', text: "A postal address", isCorrect: false, explanation: "You don't need a postal address to send an email." },
            { id: 'email_q1_opt4', text: "All of the above", isCorrect: false, explanation: "You only need a device and internet connection." }
          ],
          explanation: "To send an email, you need a device like a phone or computer, and an internet connection. You don't need a phone number or postal address.",
          imageUrl: '/images/mascot.png',
          audioSrc: '/audio/quiz_email_basics.mp3',
          speakText: "Let's test your knowledge about emails! What do you need to send an email?"
        }
      ]
    },
    {
      id: 3,
      title: "Google Maps",
      lessonContent: [
        // Google Maps lesson content
      ]
    },
    {
      id: 4,
      title: "Microsoft Word (Part 1)",
      lessonContent: [
        // Microsoft Word lesson content
      ]
    }
  ]
};