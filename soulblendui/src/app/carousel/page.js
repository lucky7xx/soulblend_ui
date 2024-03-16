"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const QuestionsComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [failedQuestionIds, setFailedQuestionIds] = useState([]);
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // Then, use accessToken in your fetch request

  const router = useRouter();

  useEffect(() => {
    // Fetch sequence from the API endpoint with the access token in the header
    fetch("http://192.168.29.132:8000/sequence/1", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch sequence");
        }
        return response.json();
      })
      .then((data) => {
        const sequence = data.seq.split(",").map(Number);
        fetchQuestions(sequence); // Call fetchQuestions with the sequence
      })
      .catch((error) => {
        setError("Failed to fetch sequence");
        console.error("Error fetching sequence:", error);
      });
  }, []); // Run only once when the component mounts

  const fetchQuestions = async (sequence) => {
    try {
      let tempQuestions = []; // Temporary array to store fetched questions
      const failedIds = []; // Array to store failed question IDs
      await Promise.all(
        sequence.map(async (id) => {
          try {
            const response = await fetch(
              `http://192.168.29.132:8000/questions/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch question with ID ${id}`);
            }
            const question = await response.json();
            console.log("Question data:", question.question);
            tempQuestions.push(question); // Add fetched question to temporary array
          } catch (error) {
            console.error(`Error fetching question with ID ${id}:`, error);
            failedIds.push(id); // Add failed question ID to the array
          }
        })
      );

      setQuestions(tempQuestions); // Update state with all fetched questions
      if (failedIds.length > 0) {
        setFailedQuestionIds(failedIds); // Update state with failed question IDs
      }
    } catch (error) {
      setError("Failed to fetch questions");
      console.error("Error fetching questions:", error);
    }
  };

  const handleLogout = () => {
    router.push("/login");
  };

  // Carousel settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {failedQuestionIds.length > 0 && (
        <p>
          Failed to fetch questions with IDs: {failedQuestionIds.join(", ")}
        </p>
      )}
      <h2>Questions</h2>
      <Slider {...settings} style={carouselStyle}>
        {questions.map((question, index) => (
          <div key={index} style={slideStyle}>
            <h3 style={questionStyle}>{question.question}</h3>
            {/* Add any additional content for each question */}
          </div>
        ))}
      </Slider>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Inline styles
const carouselStyle = {
  maxWidth: "800px", // Adjust the maximum width as needed
  margin: "0 auto",
};

const slideStyle = {
  backgroundColor: "#f0f0f0", // Set background color
  borderRadius: "8px", // Add border radius for rounded corners
  padding: "20px", // Add padding for content
  border: "3px",
};

const questionStyle = {
  marginBottom: "10px", // Add some margin below the question title
  fontSize: "20px", // Increase font size for the question title
  color: "#333", // Set text color
};

export default QuestionsComponent;
