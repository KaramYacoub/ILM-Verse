import { useEffect, useState } from "react";
import StudentNavbar from "../../components/student/StudentNavbar";

const quizQuestions = [
  {
    id: 1,
    question:
      "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.",
    options: [
      "vel accumsan tellus nisi eu orci mauris lacinia sapien quis",
      "sit amet lobortis sapien sapien non mi integer ac neque duis",
      "dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante",
      "magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur",
    ],
    correctAnswer: "C",
  },
  {
    id: 2,
    question:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.",
    options: [
      "diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in",
      "vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis",
      "pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis",
      "elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac",
    ],
    correctAnswer: "C",
  },
  {
    id: 3,
    question:
      "Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    options: [
      "tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod",
      "diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut",
      "interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus",
      "arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium",
    ],
    correctAnswer: "D",
  },
  {
    id: 4,
    question:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.",
    options: [
      "iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque",
      "dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus",
      "metus aenean fermentum donec ut mauris eget massa tempor convallis",
      "quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus",
    ],
    correctAnswer: "C",
  },
  {
    id: 5,
    question:
      "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    options: [
      "nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in",
      "velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel",
      "odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus",
      "luctus ultricies eu nibh quisque id justo sit amet sapien",
    ],
    correctAnswer: "C",
  },
  {
    id: 6,
    question:
      "Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.",
    options: [
      "justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus",
      "arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac",
      "ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at",
      "justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst",
    ],
    correctAnswer: "A",
  },
  {
    id: 7,
    question:
      "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    options: [
      "turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc",
      "arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis",
      "vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi",
      "nibh ligula nec sem duis aliquam convallis nunc proin at turpis",
    ],
    correctAnswer: "B",
  },
  {
    id: 8,
    question:
      "Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.",
    options: [
      "tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra",
      "massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in",
      "turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh",
      "ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent",
    ],
    correctAnswer: "B",
  },
  {
    id: 9,
    question:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.",
    options: [
      "vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae",
      "et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum",
      "quam pede lobortis ligula sit amet eleifend pede libero quis",
      "amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit",
    ],
    correctAnswer: "C",
  },
  {
    id: 10,
    question:
      "In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.",
    options: [
      "ligula vehicula consequat morbi a ipsum integer a nibh in quis justo",
      "metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet",
      "elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc",
      "faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae",
    ],
    correctAnswer: "C",
  },
];

export default function QuizDetails() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const [timeRemaining, setTimeRemaining] = useState(0.2 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const isAnswered = (index) => {
    const questionId = quizQuestions[index].id;
    return answers[questionId] !== undefined;
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNavigateTo = (index) => {
    setCurrentQuestionIndex(index);
  };

  const deleteAnswer = (questionId) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-start pb-5">
      <StudentNavbar />
      {/* Quiz Info */}
      <div className="container mx-auto p-6">
        <p className="text-xl font-bold text-primary">Quiz name</p>

        <div className="bg-white rounded-lg p-6 mt-5 shadow-md mb-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-col font-bold gap-2">
            <p className="mt-2">Course: Course name</p>
            <p>Time Remaining: {formatTime(timeRemaining)}</p>
          </div>
          <div className="flex flex-col font-bold gap-2">
            <p>Total Questions: {totalQuestions}</p>
            <p>Points: {totalQuestions}</p>
          </div>
          <div className="">
            <button className="btn btn-secondary text-white">Submit</button>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full bg-base-100 h-10 rounded-3xl overflow-hidden mb-6 relative">
          <div
            className="bg-green-600 h-full absolute top-0 left-0 transition-all duration-300"
            style={{
              width: `${(Object.keys(answers).length / totalQuestions) * 100}%`,
            }}
          ></div>

          <div className="relative z-10 h-full flex items-center justify-center text-sm font-medium text-base-300">
            {Object.keys(answers).length} of {totalQuestions} questions answered
          </div>
        </div>

        {/* MCQ Question */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center gap-4 mb-4">
            <p className="text-lg font-semibold">{currentQuestion.question}</p>
          </div>

          <div className="ml-14 space-y-3">
            {currentQuestion.options.map((option) => (
              <div key={option} className="flex items-center gap-3">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  className="radio radio-primary"
                  value={option}
                  checked={answers[currentQuestion.id] === option}
                  onChange={() =>
                    handleOptionChange(currentQuestion.id, option)
                  }
                />
                <label className="text-base">{option}</label>
              </div>
            ))}

            {answers[currentQuestion.id] && (
              <button
                className="link-hover ml-4"
                onClick={() => deleteAnswer(currentQuestion.id)}
              >
                Delete Answer
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-base-100  p-4 rounded-lg flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-2 flex-wrap">
            {quizQuestions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => handleNavigateTo(index)}
                className={`w-10 h-10 rounded-full font-bold ${
                  currentQuestionIndex === index
                    ? "bg-primary text-white"
                    : isAnswered(index)
                    ? "bg-secondary text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="btn btn-secondary"
              disabled={currentQuestionIndex <= 0}
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="btn btn-secondary"
              disabled={currentQuestionIndex >= totalQuestions - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
