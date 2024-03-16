import React from "react";
import Slider from "react-slick";

const QuestionCarousel = ({ questions }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <p>Level: {question.level}</p>
          {/* Additional content for each question */}
        </div>
      ))}
    </Slider>
  );
};

export default QuestionCarousel;
