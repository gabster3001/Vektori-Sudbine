import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./VectorSimulator.css"; // Uključivanje CSS-a

interface Vector {
  x: number;
  y: number;
}

const VectorSimulator: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [vector, setVector] = useState<Vector>({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [xAngle, setXAngle] = useState(0); // Nagib X-osi
  const [yAngle, setYAngle] = useState(0); // Nagib Y-osi

  // Inicijalno crtanje osa
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Uklanjanje prethodnih osi
    svg.selectAll(".axis").remove();

    const calculateLineIntersection = (
      x1: number,
      y1: number,
      dx: number,
      dy: number,
      bounds: { xMin: number; xMax: number; yMin: number; yMax: number }
    ) => {
      const intersections = [];

      if (dy !== 0) {
        const t = (bounds.yMin - y1) / dy;
        const xIntersection = x1 + t * dx;
        if (xIntersection >= bounds.xMin && xIntersection <= bounds.xMax) {
          intersections.push({ x: xIntersection, y: bounds.yMin });
        }
      }

      if (dy !== 0) {
        const t = (bounds.yMax - y1) / dy;
        const xIntersection = x1 + t * dx;
        if (xIntersection >= bounds.xMin && xIntersection <= bounds.xMax) {
          intersections.push({ x: xIntersection, y: bounds.yMax });
        }
      }

      if (dx !== 0) {
        const t = (bounds.xMin - x1) / dx;
        const yIntersection = y1 + t * dy;
        if (yIntersection >= bounds.yMin && yIntersection <= bounds.yMax) {
          intersections.push({ x: bounds.xMin, y: yIntersection });
        }
      }

      if (dx !== 0) {
        const t = (bounds.xMax - x1) / dx;
        const yIntersection = y1 + t * dy;
        if (yIntersection >= bounds.yMin && yIntersection <= bounds.yMax) {
          intersections.push({ x: bounds.xMax, y: yIntersection });
        }
      }

      return intersections;
    };

    const calculateLineEndpoints = (angle: number) => {
      const rad = (angle * Math.PI) / 180; // Kut u radijanima
      const dx = Math.cos(rad);
      const dy = Math.sin(rad);

      const startX = 250; // Centar platna
      const startY = 250; // Centar platna
      const bounds = { xMin: 0, xMax: 500, yMin: 0, yMax: 500 }; // Granice platna

      const intersections = calculateLineIntersection(
        startX,
        startY,
        dx,
        dy,
        bounds
      );

      if (intersections.length >= 2) {
        return intersections.slice(0, 2);
      }

      return [
        { x: startX, y: startY },
        { x: startX + dx * 100, y: startY + dy * 100 },
      ];
    };

    const xAxisPoints = calculateLineEndpoints(xAngle);
    const yAxisPoints = calculateLineEndpoints(90 + yAngle);

    svg
      .append("line")
      .attr("x1", xAxisPoints[0].x)
      .attr("y1", xAxisPoints[0].y)
      .attr("x2", xAxisPoints[1].x)
      .attr("y2", xAxisPoints[1].y)
      .attr("class", "axis");

    svg
      .append("line")
      .attr("x1", yAxisPoints[0].x)
      .attr("y1", yAxisPoints[0].y)
      .attr("x2", yAxisPoints[1].x)
      .attr("y2", yAxisPoints[1].y)
      .attr("class", "axis");
  }, [xAngle, yAngle]);

  const ARROW_LENGTH = 10;
  const ARROW_WIDTH = 6;

  const createArrowHead = (x: number, y: number, dx: number, dy: number) => {
    const angle = Math.atan2(dy, dx);

    const x1 =
      x - ARROW_LENGTH * Math.cos(angle) + ARROW_WIDTH * Math.sin(angle);
    const y1 =
      y - ARROW_LENGTH * Math.sin(angle) - ARROW_WIDTH * Math.cos(angle);

    const x2 =
      x - ARROW_LENGTH * Math.cos(angle) - ARROW_WIDTH * Math.sin(angle);
    const y2 =
      y - ARROW_LENGTH * Math.sin(angle) + ARROW_WIDTH * Math.cos(angle);

    return `${x},${y} ${x1},${y1} ${x2},${y2}`;
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.selectAll(".vector-group").remove();

    const vectorGroup = svg.append("g").attr("class", "vector-group");

    const calculateProjections = (
      vector: Vector,
      xAngle: number,
      yAngle: number
    ) => {
      const alphaRad = (xAngle * Math.PI) / 180;
      const betaRad = (yAngle * Math.PI) / 180;

      const sinAlpha = Math.sin(alphaRad);
      const cosAlpha = Math.cos(alphaRad);
      const sinBeta = Math.sin(betaRad);
      const cosBeta = Math.cos(betaRad);

      const denominator = Math.sin(betaRad - alphaRad);

      const p = (vector.x * sinBeta - vector.y * cosBeta) / denominator;
      const q = (-vector.x * sinAlpha + vector.y * cosAlpha) / denominator;

      return {
        x: { x: p * cosAlpha, y: p * sinAlpha },
        y: { x: q * cosBeta, y: q * sinBeta },
      };
    };

    const mainVectorLength = Math.sqrt(vector.x ** 2 + vector.y ** 2);
    const adjustedX =
      (vector.x * (mainVectorLength - ARROW_LENGTH)) / mainVectorLength;
    const adjustedY =
      (vector.y * (mainVectorLength - ARROW_LENGTH)) / mainVectorLength;

    vectorGroup
      .append("line")
      .attr("class", "vector-main")
      .attr("x1", 250)
      .attr("y1", 250)
      .attr("x2", 250 + adjustedX)
      .attr("y2", 250 - adjustedY);

    vectorGroup
      .append("polygon")
      .attr("class", "arrow-main")
      .attr(
        "points",
        createArrowHead(250 + vector.x, 250 - vector.y, vector.x, -vector.y)
      );

    const projections = calculateProjections(vector, xAngle, yAngle);

    vectorGroup
      .append("line")
      .attr("class", "vector-x")
      .attr("x1", 250)
      .attr("y1", 250)
      .attr("x2", 250 + projections.x.x)
      .attr("y2", 250 - projections.x.y);

    vectorGroup
      .append("polygon")
      .attr("class", "arrow-x")
      .attr(
        "points",
        createArrowHead(
          250 + projections.x.x,
          250 - projections.x.y,
          projections.x.x,
          -projections.x.y
        )
      );

    vectorGroup
      .append("line")
      .attr("class", "vector-y")
      .attr("x1", 250)
      .attr("y1", 250)
      .attr("x2", 250 + projections.y.x)
      .attr("y2", 250 - projections.y.y);

    vectorGroup
      .append("polygon")
      .attr("class", "arrow-y")
      .attr(
        "points",
        createArrowHead(
          250 + projections.y.x,
          250 - projections.y.y,
          projections.y.x,
          -projections.y.y
        )
      );
  }, [vector, xAngle, yAngle]);

  const handleMouseDown = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (event.button !== 0) return;
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (!isDragging) return;
    const svgRect = (svgRef.current as SVGSVGElement).getBoundingClientRect();
    const x = event.clientX - svgRect.left - 250;
    const y = 250 - (event.clientY - svgRect.top);
    setVector({ x, y });
  };

  return (
    <div className="vector-simulator-container">
      <svg
        ref={svgRef}
        width="500"
        height="500"
        className="vector-simulator"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      ></svg>

      <div className="controls">
        <label>
          X-os nagib:
          <input
            type="range"
            min="-45"
            max="45"
            value={xAngle}
            onChange={(e) => setXAngle(Number(e.target.value))}
          />
        </label>
        <label>
          Y-os nagib:
          <input
            type="range"
            min="-45"
            max="45"
            value={yAngle}
            onChange={(e) => setYAngle(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default VectorSimulator;
