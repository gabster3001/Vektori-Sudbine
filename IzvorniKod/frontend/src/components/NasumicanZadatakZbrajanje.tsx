import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./NasumicanZadatakZbrajanje.css";

const NasumicanZadatakZbrajanje: React.FC = () => {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [vectorLabels, setVectorLabels] = useState<string[]>([]);
  const [vectorColors, setVectorColors] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const labels = Array.from({ length: 3 }, () =>
      alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    );
    setVectorLabels(labels);

    const availableColors = [
      "#6a5acd",
      "#c71585",
      "#00c700",
      "#41bce5",
      "#00008b",
    ];
    const randomColors = availableColors
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setVectorColors(randomColors);

    const startPoint = {
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
    };
    const vectorA = {
      x: Math.random() * 100 + 50,
      y: Math.random() * 100 + 50,
    };
    const vectorB = {
      x: Math.random() * 100 + 50,
      y: Math.random() * 100 + 50,
    };

    const endPointA = {
      x: startPoint.x + vectorA.x,
      y: startPoint.y + vectorA.y,
    };
    const endPointB = {
      x: endPointA.x + vectorB.x,
      y: endPointA.y + vectorB.y,
    };

    setPoints([startPoint, endPointA, endPointB]);

    // Točan odgovor uvijek mora biti A + B = C
    const generatedAnswers = [
      `${labels[0]} + ${labels[1]} = ${labels[2]}`,
      `${labels[0]} + ${labels[2]} = ${labels[1]}`,
      `${labels[1]} + ${labels[2]} = ${labels[0]}`,
    ];
    const correctIndex = 0; // Prvi odgovor je uvijek točan prije miješanja
    setAnswers(shuffleAnswers(generatedAnswers, correctIndex));
  }, []);

  const shuffleAnswers = (answers: string[], correctIndex: number) => {
    const correctAnswer = answers[correctIndex];
    const shuffled = answers
      .map((answer) => ({ answer, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item) => item.answer);

    const newCorrectIndex = shuffled.indexOf(correctAnswer);
    setCorrectAnswer(newCorrectIndex); // Spremaj novi indeks točnog odgovora
    return shuffled;
  };

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
  };

  const renderVectors = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
  ) => {
    svg.selectAll("line").remove();
    svg.selectAll("text").remove();
    svg.selectAll("defs").remove();

    vectorColors.forEach((color, index) => {
      svg
        .append("defs")
        .append("marker")
        .attr("id", `arrow-${index}`)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("refX", 9)
        .attr("refY", 3)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,0 L0,6 L9,3 z")
        .style("fill", color);
    });

    points.forEach((point, i) => {
      if (i < points.length - 1) {
        svg
          .append("line")
          .attr("x1", points[i].x)
          .attr("y1", points[i].y)
          .attr("x2", points[i + 1].x)
          .attr("y2", points[i + 1].y)
          .attr("stroke-width", 2)
          .attr("marker-end", `url(#arrow-${i})`)
          .style("stroke", vectorColors[i]);

        svg
          .append("text")
          .attr("x", (points[i].x + points[i + 1].x) / 2)
          .attr("y", (points[i].y + points[i + 1].y) / 2 - 10)
          .attr("text-anchor", "middle")
          .attr("font-size", "14px")
          .text(vectorLabels[i]);
      }
    });

    // Crtanje trećeg vektora bez skraćivanja
    svg
      .append("line")
      .attr("x1", points[0].x) // Početna točka vektora z
      .attr("y1", points[0].y)
      .attr("x2", points[2].x) // Krajnja točka je ista kao za prethodni vektor
      .attr("y2", points[2].y)
      .attr("stroke-width", 2)
      .attr("marker-end", `url(#arrow-2)`) // Strelica za treći vektor
      .style("stroke", vectorColors[2]);

    svg
      .append("text")
      .attr("x", (points[2].x + points[0].x) / 2)
      .attr("y", (points[2].y + points[0].y) / 2 - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text(vectorLabels[2]);
  };

  useEffect(() => {
    const svg = d3.select("#vector-simulator") as unknown as d3.Selection<
      SVGSVGElement,
      unknown,
      null,
      undefined
    >;

    if (points.length === 3 && vectorColors.length === 3) {
      renderVectors(svg);
    }
  }, [points, vectorColors]);

  return (
    <div style={{ textAlign: "center" }}>
      <svg
        id="vector-simulator"
        width="500"
        height="500"
        className="vector-simulator"
      />
      <div style={{ marginTop: "20px" }}>
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            className={
              selectedAnswer === index
                ? index === correctAnswer
                  ? "correct"
                  : "incorrect"
                : ""
            }
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NasumicanZadatakZbrajanje;
