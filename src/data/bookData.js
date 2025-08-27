// src/data/bookData.js
import coverbook1 from "../assets/cover-book1.jpg";
import coverbook2 from "../assets/cover-book2.jpg";
import coverbook3 from "../assets/cover-book3.jpg";
import coverbook4 from "../assets/cover-book4.jpg";
import coverbook5 from "../assets/cover-book5.jpg";
import coverbook6 from "../assets/cover-book6.jpg";

export const topBooks = [
  {
    id: 1,
    title: "Be a Game Changer",
    desc: "Buku inspiratif yang mendorong kamu untuk berani tampil beda dan menciptakan perubahan positif dalam hidup maupun kariermu.",
    img: coverbook1,
    price: 150000,
    author: "Muhammad Husnul",
    category: "Motivasi",
  },
  {
    id: 2,
    title: "Mindset Is Everything",
    desc: "Temukan kekuatan pola pikir dalam meraih kesuksesan. Buku ini membantumu membentuk cara pandang yang lebih produktif dan penuh harapan.",
    img: coverbook2,
    price: 170000,
    author: "Muhammad Husnul",
    category: "Self Development",
  },
  {
    id: 3,
    title: "Focus On The Best",
    desc: "Pelajari cara memfokuskan energi dan perhatian hanya pada hal-hal terbaik dalam hidupmu, demi hasil yang maksimal dan lebih bermakna.",
    img: coverbook3,
    price: 130000,
    author: "Muhammad Husnul",
    category: "Produktivitas",
  },
];

export const allBooks = [
  ...topBooks,
  {
    id: 4,
    title: "World Chess Day",
    desc: "Panduan lengkap untuk memahami sejarah dan strategi dalam permainan catur dunia.",
    img: coverbook4,
    price: 180000,
    author: "Muhammad Husnul",
    category: "Chess Strategy",
  },
  {
    id: 5,
    title: "Halls Checkmate",
    desc: "Teknik-teknik checkmate yang efektif untuk meningkatkan kemampuan bermain catur Anda.",
    img: coverbook5,
    price: 190000,
    author: "Muhammad Husnul",
    category: "Chess Tactics",
  },
  {
    id: 6,
    title: "Chess Game",
    desc: "Dasar-dasar permainan catur yang mudah dipahami untuk pemula hingga menengah.",
    img: coverbook6,
    price: 150000,
    author: "Muhammad Husnul",
    category: "Chess Basics",
  },
];
