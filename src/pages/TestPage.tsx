import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

type Question = {
  _id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
};

const TestPageContent = () => {
  const { testId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(
        `http://localhost:5000/api/test-questions/test/${testId}`
      );
      const data = await res.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, [testId]);

  const handleSelect = (qid: string, option: string) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const handleSubmit = async () => {
  let total = 0;

  questions.forEach((q) => {
    if (answers[q._id] === q.correctOption) {
      total += 1;
    }
  });

  setScore(total);
  setSubmitted(true);

  // ✅ SAVE TEST ATTEMPT TO BACKEND
  try {
    await fetch("http://localhost:5000/api/test-attempts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        testId,
        score: total,
        totalMarks: questions.length
      })
    });
  } catch (err) {
    console.error("Failed to save test attempt", err);
  }
};


  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Practice Test</h1>

      {questions.map((q, index) => (
        <div
          key={q._id}
          className="mb-6 p-5 border rounded-lg bg-card"
        >
          <p className="font-semibold mb-4">
            {index + 1}. {q.question}
          </p>

          <div className="space-y-2">
            {[
  { key: "A", text: q.optionA },
  { key: "B", text: q.optionB },
  { key: "C", text: q.optionC },
  { key: "D", text: q.optionD }
].map((opt) => (
  <label
    key={opt.key}
    className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted"
  >
    <input
      type="radio"
      name={q._id}
      value={opt.key}
      checked={answers[q._id] === opt.key}
      onChange={() => handleSelect(q._id, opt.key)}
    />
    <span className="text-sm font-medium">{opt.text}</span>
  </label>
))}

          </div>
        </div>
      ))}

      {!submitted ? (
        <Button onClick={handleSubmit} className="mt-4">
          Submit Test
        </Button>
      ) : (
        <div className="mt-6 text-lg font-semibold">
          ✅ Your Score: {score} / {questions.length}
        </div>
      )}
    </div>
  );
};

const TestPage = () => (
  <Layout>
    <TestPageContent />
  </Layout>
);

export default TestPage;
