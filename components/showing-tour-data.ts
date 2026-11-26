import firstHome from "../public/images/showing-real-people.jpg";
import firstHomeClose from "../public/images/showing-real-people-close.jpg";
import apartment from "../public/images/showing-apartment.jpg";
import newHome from "../public/images/showing-new-home.jpg";

// The photographs are licensed stock; names and conversations are fictional demo characters.
export const showingPhotos = [
  {
    src: firstHome,
    alt: "An agent holding a clipboard points out a home's features to a buyer.",
    position: "53% 42%",
    mobilePosition: "53% 42%",
  },
  {
    src: firstHomeClose,
    alt: "A closer view of the same agent and buyer looking around the home.",
    position: "43% 42%",
    mobilePosition: "43% 42%",
  },
  {
    src: apartment,
    alt: "A couple in tan and green coats views an apartment with an agent holding a folder.",
    position: "50% 43%",
    mobilePosition: "50% 45%",
  },
  {
    src: newHome,
    alt: "An agent in a dark suit leads a couple through a bright unfinished home.",
    position: "50% 46%",
    mobilePosition: "72% 46%",
  },
];

export const showingFrames = [
  {
    photo: 0,
    scene: "A place to gather",
    name: "Jordan",
    role: "Buyer",
    words: "I love how open this space feels. We’d spend so much time here.",
    left: "5%",
    top: "34%",
    mobileLeft: "4%",
    mobileTop: "40%",
    tail: "right",
    mobileTail: "top",
    pointer: "32%",
    mobilePointer: "32%",
  },
  {
    photo: 1,
    scene: "A place to gather",
    name: "Maya",
    role: "Agent",
    words:
      "What else would make this feel like home? I’ll keep those details together.",
    left: "4%",
    top: "20%",
    mobileLeft: "4%",
    mobileTop: "55%",
    tail: "bottom",
    mobileTail: "top",
    pointer: "18%",
    mobilePointer: "18%",
  },
  {
    photo: 2,
    scene: "Room for everyday life",
    name: "Marcus",
    role: "Buyer",
    words:
      "We both work from home. A quiet space for an office really matters to us.",
    left: "4%",
    top: "49%",
    mobileLeft: "4%",
    mobileTop: "40%",
    tail: "top",
    mobileTail: "top",
    pointer: "78%",
    mobilePointer: "40%",
  },
  {
    photo: 2,
    scene: "Room for everyday life",
    name: "Daniel",
    role: "Agent",
    words:
      "Let’s look at the space by the window. I’ll add the office to your must-haves.",
    left: "65%",
    top: "51%",
    mobileLeft: "23%",
    mobileTop: "44%",
    tail: "top",
    mobileTail: "top",
    pointer: "70%",
    mobilePointer: "80%",
  },
  {
    photo: 3,
    scene: "Seeing the possibilities",
    name: "Chris",
    role: "Buyer",
    words:
      "There’s a lot of potential here. Could we come back on Saturday for another look?",
    left: "20%",
    top: "34%",
    mobileLeft: "4%",
    mobileTop: "12%",
    tail: "right",
    mobileTail: "bottom",
    pointer: "66%",
    mobilePointer: "46%",
  },
  {
    photo: 3,
    scene: "Seeing the possibilities",
    name: "Elena",
    role: "Agent",
    words:
      "I’ll check availability and send a recap of what stood out, so we’re ready for the next visit.",
    left: "69%",
    top: "59%",
    mobileLeft: "23%",
    mobileTop: "44%",
    tail: "top",
    mobileTail: "top",
    pointer: "25%",
    mobilePointer: "65%",
  },
] as const;
