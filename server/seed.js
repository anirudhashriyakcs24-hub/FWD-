require("dotenv").config();
const mongoose = require("mongoose");

const Subject = require("./models/Subject");
const Topic = require("./models/Topic");
const Video = require("./models/Video");
const Test = require("./models/Test");
const TestQuestion = require("./models/TestQuestion");

function getVideoForTopic(slug) {
  const videos = {
    "motion-1d": "https://www.youtube.com/watch?v=Op6u_imTdO8",
    "laws-of-motion": "https://www.youtube.com/watch?v=YzxUZzMrlfQ",
    "work-energy-power": "https://www.youtube.com/watch?v=GZ0sKp8Z4hA",
    "gravitation": "https://www.youtube.com/watch?v=0Q9Y9Z7K2sA",
    "thermodynamics-physics": "https://www.youtube.com/watch?v=1mKZ6kGJ2zU",

    "atomic-structure": "https://www.youtube.com/watch?v=8Z1e5mX2YkU",
    "periodic-table": "https://www.youtube.com/watch?v=V6ZKQ2jYx0A",
    "chemical-bonding": "https://www.youtube.com/watch?v=0kZ8kK0Qy6Q",
    "thermodynamics-chemistry": "https://www.youtube.com/watch?v=4m4d2bE3w6k",
    "equilibrium": "https://www.youtube.com/watch?v=KfU4wA2q6q8",

    "sets-relations": "https://www.youtube.com/watch?v=tyDKR4FG3Yw",
    "trigonometry": "https://www.youtube.com/watch?v=PUB0TaZ7bhA",
    "quadratic-equations": "https://www.youtube.com/watch?v=ZBalWWHYFQc",
    "permutations-combinations": "https://www.youtube.com/watch?v=QH2-TGUlwu4",
    "limits-continuity": "https://www.youtube.com/watch?v=riXcZT2ICjA"
  };

  return videos[slug];
}


/* ✅ QUESTION BANK (YOUR LOGIC IS GOOD) */
function getQuestionsForTopic(subjectSlug, topicName) {
  if (subjectSlug === "physics") {
    return [
      {
        question: `Which statement best describes ${topicName}?`,
        options: ["Law of motion", "Chemical reaction", "Mathematical identity", "Biological process"],
        correct: "A"
      },
      {
        question: "Newton’s first law is also known as?",
        options: ["Law of inertia", "Law of momentum", "Law of energy", "Law of gravity"],
        correct: "A"
      },
      {
        question: "Force is defined as?",
        options: ["Mass × acceleration", "Energy per unit time", "Rate of change of velocity", "Work done"],
        correct: "A"
      },
      {
        question: "SI unit of force is?",
        options: ["Newton", "Joule", "Watt", "Pascal"],
        correct: "A"
      },
      {
        question: "Which quantity is a vector?",
        options: ["Force", "Energy", "Work", "Power"],
        correct: "A"
      }
    ];
  }

  if (subjectSlug === "chemistry") {
    return [
      {
        question: `What does ${topicName} mainly deal with?`,
        options: ["Structure of matter", "Motion of bodies", "Number systems", "Wave optics"],
        correct: "A"
      },
      {
        question: "Number of protons defines?",
        options: ["Atomic number", "Mass number", "Valency", "Isotope"],
        correct: "A"
      },
      {
        question: "Electron was discovered by?",
        options: ["J.J. Thomson", "Rutherford", "Bohr", "Chadwick"],
        correct: "A"
      },
      {
        question: "Atomic mass unit is based on?",
        options: ["Carbon-12", "Hydrogen", "Oxygen", "Nitrogen"],
        correct: "A"
      },
      {
        question: "Which particle has a negative charge?",
        options: ["Electron", "Proton", "Neutron", "Nucleus"],
        correct: "A"
      }
    ];
  }

  // Mathematics
  return [
    {
      question: `Which concept is central to ${topicName}?`,
      options: ["Mathematical relations", "Chemical bonding", "Force interaction", "Thermal energy"],
      correct: "A"
    },
    {
      question: "sin²θ + cos²θ equals?",
      options: ["1", "0", "2", "sinθ"],
      correct: "A"
    },
    {
      question: "Value of tan 45° is?",
      options: ["1", "0", "√2", "∞"],
      correct: "A"
    },
    {
      question: "Quadratic equation has maximum how many roots?",
      options: ["2", "1", "3", "Infinite"],
      correct: "A"
    },
    {
      question: "Which branch deals with limits?",
      options: ["Calculus", "Algebra", "Geometry", "Statistics"],
      correct: "A"
    }
  ];
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Subject.deleteMany({});
    await Topic.deleteMany({});
    await Video.deleteMany({});
    await Test.deleteMany({});
    await TestQuestion.deleteMany({});

    const physics = await Subject.create({ name: "Physics", slug: "physics" });
    const chemistry = await Subject.create({ name: "Chemistry", slug: "chemistry" });
    const mathematics = await Subject.create({ name: "Mathematics", slug: "mathematics" });

    const physicsTopics = await Topic.insertMany([
      { subject: physics._id, name: "Motion in One Dimension", slug: "motion-1d" },
      { subject: physics._id, name: "Laws of Motion", slug: "laws-of-motion" },
      { subject: physics._id, name: "Work Energy Power", slug: "work-energy-power" },
      { subject: physics._id, name: "Gravitation", slug: "gravitation" },
      { subject: physics._id, name: "Thermodynamics", slug: "thermodynamics-physics" }
    ]);

    const chemistryTopics = await Topic.insertMany([
      { subject: chemistry._id, name: "Atomic Structure", slug: "atomic-structure" },
      { subject: chemistry._id, name: "Periodic Table", slug: "periodic-table" },
      { subject: chemistry._id, name: "Chemical Bonding", slug: "chemical-bonding" },
      { subject: chemistry._id, name: "Thermodynamics", slug: "thermodynamics-chemistry" },
      { subject: chemistry._id, name: "Equilibrium", slug: "equilibrium" }
    ]);

    const mathTopics = await Topic.insertMany([
      { subject: mathematics._id, name: "Sets & Relations", slug: "sets-relations" },
      { subject: mathematics._id, name: "Trigonometry", slug: "trigonometry" },
      { subject: mathematics._id, name: "Quadratic Equations", slug: "quadratic-equations" },
      { subject: mathematics._id, name: "Permutations & Combinations", slug: "permutations-combinations" },
      { subject: mathematics._id, name: "Limits & Continuity", slug: "limits-continuity" }
    ]);

    const allTopics = [...physicsTopics, ...chemistryTopics, ...mathTopics];

    for (const topic of allTopics) {
      await Video.create({
        topic: topic._id,
        title: `${topic.name} – Concept Explanation`,
        youtubeUrl: getVideoForTopic(topic.slug),
        description: `Explanation of ${topic.name}`
      });

      const test = await Test.create({
        topic: topic._id,
        title: `${topic.name} – Practice Test`,
        totalMarks: 5
      });

      const subjectSlug =
        topic.subject.toString() === physics._id.toString()
          ? "physics"
          : topic.subject.toString() === chemistry._id.toString()
          ? "chemistry"
          : "mathematics";

      const questions = getQuestionsForTopic(subjectSlug, topic.name);

      await TestQuestion.insertMany(
        questions.map((q, i) => ({
          test: test._id,
          question: q.question,
          optionA: q.options[0],
          optionB: q.options[1],
          optionC: q.options[2],
          optionD: q.options[3],
          correctOption: q.correct,
          marks: 1,
          orderIndex: i + 1
        }))
      );
    }

    console.log("✅ SEED SUCCESSFUL");
    process.exit();
  } catch (err) {
    console.error("❌ SEED FAILED", err);
    process.exit(1);
  }
}

seed();
