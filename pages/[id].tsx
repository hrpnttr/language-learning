import React, { useState, useEffect, useMemo } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Image from "next/image";
import { SpeakerWaveIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

import { QuizzesAPI, Quizzes, Page, Choices } from "@/lib/quizzes";
import { useRouter } from "next/router";

interface User {
  id: number;
  email: string;
  full_name: string | null;
  createdAt: string;
}

const Test = () => {
  const [page, setPage] = useState<Page<Quizzes> | null>(null);
  const [q, setQ] = useState("");
  const [p, setP] = useState(0);
  const size = 10;

  const [quizzes, setQuizzes] = useState<Quizzes | null>(null);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // Pastikan id selalu string & baru jalan setelah query terisi
  const id = useMemo(() => {
    const q = router.query.id;
    return Array.isArray(q) ? q[0] : q || "";
  }, [router.query.id]);

  const [error, setError] = useState("");
  const [squence, setSquence] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState<Choices[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedIdxByQuestion, setSelectedIdxByQuestion] = useState<
    Record<number, number | null>
  >({});
  const [answered, setAnswered] = useState<
    Record<number, { text: string; is_correct: boolean }>
  >({});

  const all = quizzes?.contens.length ?? 0;

  useEffect(() => {
    const item = quizzes?.contens?.[squence];
    if (!item) return;
    const qa = item.question ?? "";
    const an = item.choices ?? [];
    setCurrentQuestion(qa);
    setCurrentAnswer(an);
  }, [quizzes, squence]);

  // currentAnswer = choices for the current question (array of { text, is_correct })
  const handleSelect = (choiceIdx: number) => {
    const prevIdx = selectedIdxByQuestion[squence] ?? null;

    // ignore if clicking the same option (no double count)
    if (prevIdx === choiceIdx) return;

    const wasCorrect =
      prevIdx != null && !!currentAnswer?.[prevIdx]?.is_correct;
    const isNowCorrect = !!currentAnswer?.[choiceIdx]?.is_correct;

    // update selection map
    setSelectedIdxByQuestion((prev) => ({ ...prev, [squence]: choiceIdx }));

    // adjust score by delta (wrong→right: +1, right→wrong: -1, else 0)
    setSelectedAnswer((c) => c + (isNowCorrect ? 1 : 0) - (wasCorrect ? 1 : 0));

    // record the picked answer for this question (used for API payload later)
    const picked = currentAnswer?.[choiceIdx];
    if (picked) {
      setAnswered((prev) => ({
        ...prev,
        [squence]: { text: picked.text, is_correct: !!picked.is_correct },
      }));
    }
  };

  const handleNext = () => {
    if (squence < all - 1) {
      setSquence((squence) => squence + 1);
    } else {
      handleSubmit();
    }
  };

  // const handleSubmit = () => {
  //   const total = selectedAnswer / all;
  //   const finalscore = total * 100;
  //   setScore(finalscore);
  //   setIsCompleted(true);
  // };

  const handleSubmit = async () => {
    try {
      const total = selectedAnswer / all; // your existing calc
      const finalscore = Math.round(total * 100); // (optional) round to int

      const answers = Object.values(answered);

      const userData = localStorage.getItem("user");

      if (userData) {
        const user = JSON.parse(userData);
        setUser(user);

        const payload = {
          studentId: user?.id,
          quiz_id: quizzes?.id, // <-- make sure you have this in scope/state
          answers, // e.g. [{ text: "sapi", is_correct: true }, ...]
          score: finalscore,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/add-quizzes`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            credentials: "include", // remove if you don't use cookies
          }
        );

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `HTTP ${res.status}`);
        }
      }

      setScore(finalscore);
      setIsCompleted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Submit failed:", message);
      // optionally setError(message)
    }
  };

  // const load = async (id: string) => {
  //   await QuizzesAPI.test(id)
  //     .then(setPage)
  //     .catch((e) => setError(e.message));
  //   return page;
  // };

  const load = async (qid: string) => {
    try {
      const data = await QuizzesAPI.test(qid);
      setQuizzes(data);
    } catch (e: unknown) {
      // <-- no 'any'
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    }
  };

  useEffect(() => {
    if (page) console.log("page (state updated)", page);
    if (!router.isReady) return; // <-- tunggu router siap
    if (!id) return; // <-- jangan call kalau id kosong
    load(id);
  }, [router.isReady, id]); // penting: depend on isReady & id

  // useEffect(() => {
  //   load(id);
  // }, [id]);

  if (error || !Test) return <div>{error || "Test not found."}</div>;
  // const answers = ["answer1", "answer2", "answer3", "answer4"];

  return (
    <div>
      <Nav />
      <div className="w-full flex justify-center">
        <Image
          src="/images/b2.jpg"
          alt="b1"
          height={6000}
          width={1440}
          className="object-contain"
        />
      </div>
      <div className="mx-auto w-[80%] text-black">
        {isCompleted ? (
          <div className="mb-8 p-6 border rounded-lg bg-white shadow mt-[2rem]">
            <h2 className="text-2xl font-bold mb-4">Test Results</h2>
            <p className="text-lg mb-2">
              You scored {score} out of {all} points.
            </p>
            <p className="text-lg mb-4">
              {score === 100
                ? "Perfect score! Excellent work!"
                : score >= 70
                ? "Great job! You passed the test."
                : "Keep practicing. You can do better next time."}
            </p>
            <Link href="/placement_test">
              <button className="bg-[#0a48f3] text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700">
                Back to Tests
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="mt-6 text-center text-gray-500">
              {squence} / {all}
              {/* atau semua */}
              {page?.content?.map((q) => (
                <h2 key={q.id}>{q.title}</h2>
              ))}
            </div>
            <h1
              className="mt-6 text-2xl font-semibold text-[#1F2937]"
              id={quizzes?.id}
            >
              {quizzes?.title}
            </h1>

            <div>
              <p className="mt-8 text-lg">{currentQuestion}</p>

              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {currentAnswer.map((a, i) => (
                  <button
                    key={i}
                    type="button"
                    className="rounded-2xl border p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:shadow-md"
                    onClick={() => handleSelect(i)}
                  >
                    {a.text}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-[2rem] text-black text-center">
              {squence} out of {all} questions answered.
            </div>
            <div className="flex items-center justify-center mt-[1.5rem]">
              <button
                className="bg-[#0a48f3] text-white px-6 py-3 rounded-md shadow-md hover:text-gray-500 mb-[2rem]"
                onClick={handleNext}
              >
                {squence < all - 1 ? "Next" : "Submit"}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Test;
