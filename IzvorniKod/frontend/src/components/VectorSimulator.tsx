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
  const drawVectorsAndPolygon = (
    ctx: CanvasRenderingContext2D,
    vector: { x: number; y: number },
    xProjection: { x: number; y: number },
    yProjection: { x: number; y: number },
    canvasCenter: { x: number; y: number }
  ) => {
    const { x: cx, y: cy } = canvasCenter;

    // Točke poligona: središte, X projekcija, glavni vektor, Y projekcija
    const polygonPoints = [
      { x: cx, y: cy }, // Središte
      { x: cx + xProjection.x, y: cy - xProjection.y }, // X projekcija
      { x: cx + vector.x, y: cy - vector.y }, // Glavni vektor
      { x: cx + yProjection.x, y: cy - yProjection.y }, // Y projekcija
    ];

    // Funkcija za crtanje poligona
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);

    for (let i = 1; i < polygonPoints.length; i++) {
      ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }

    ctx.closePath();
    ctx.fillStyle = "rgba(0, 128, 255, 0.3)"; // Transparentna plava boja za poligon
    ctx.fill();

    // Crtanje rubova poligona
    ctx.strokeStyle = "rgba(0, 128, 255, 0.7)";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Inicijalno crtanje osa
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Uklanjanje prethodnih osi
    svg.selectAll(".axis").remove();

    // Funkcija za izračun presjeka osi s rubovima
    // Funkcija za izračun presjeka linija sa rubovima na temelju nagiba
    const calculateLineIntersection = (
      x1: number,
      y1: number,
      dx: number,
      dy: number,
      bounds: { xMin: number; xMax: number; yMin: number; yMax: number }
    ) => {
      const intersections = [];

      // Presjek sa gornjim rubom (y = 0)
      if (dy !== 0) {
        const t = (bounds.yMin - y1) / dy;
        const xIntersection = x1 + t * dx;
        if (xIntersection >= bounds.xMin && xIntersection <= bounds.xMax) {
          intersections.push({ x: xIntersection, y: bounds.yMin });
        }
      }

      // Presjek s donjim rubom (y = 500)
      if (dy !== 0) {
        const t = (bounds.yMax - y1) / dy;
        const xIntersection = x1 + t * dx;
        if (xIntersection >= bounds.xMin && xIntersection <= bounds.xMax) {
          intersections.push({ x: xIntersection, y: bounds.yMax });
        }
      }

      // Presjek sa lijevim rubom (x = 0)
      if (dx !== 0) {
        const t = (bounds.xMin - x1) / dx;
        const yIntersection = y1 + t * dy;
        if (yIntersection >= bounds.yMin && yIntersection <= bounds.yMax) {
          intersections.push({ x: bounds.xMin, y: yIntersection });
        }
      }

      // Presjek sa desnim rubom (x = 500)
      if (dx !== 0) {
        const t = (bounds.xMax - x1) / dx;
        const yIntersection = y1 + t * dy;
        if (yIntersection >= bounds.yMin && yIntersection <= bounds.yMax) {
          intersections.push({ x: bounds.xMax, y: yIntersection });
        }
      }

      return intersections;
    };
    //#################################################################3
    const calculateLineEndpoints = (angle: number) => {
      const rad = (angle * Math.PI) / 180; // Kut u radijanima
      const dx = Math.cos(rad);
      const dy = Math.sin(rad);

      const startX = 250; // Centar platna
      const startY = 250; // Centar platna
      const bounds = { xMin: 0, xMax: 500, yMin: 0, yMax: 500 }; // Granice platna

      // Izračun presjeka linije s rubovima
      const intersections = calculateLineIntersection(
        startX,
        startY,
        dx,
        dy,
        bounds
      );

      // Ako postoje dva presjeka, koristimo ih kao krajnje točke
      if (intersections.length >= 2) {
        return intersections.slice(0, 2);
      }

      // Ako nije pronađen dovoljan broj presjeka (ne bi trebalo biti slučaj), vraćamo centar kao fallback
      return [
        { x: startX, y: startY },
        { x: startX + dx * 100, y: startY + dy * 100 }, // Vektor u proizvoljnom smjeru
      ];
    };

    // Izračunavanje točaka za X i Y os
    const xAxisPoints = calculateLineEndpoints(xAngle);
    const yAxisPoints = calculateLineEndpoints(90 + yAngle);

    // Crtanje nove X osi
    svg
      .append("line")
      .attr("x1", xAxisPoints[0].x)
      .attr("y1", xAxisPoints[0].y)
      .attr("x2", xAxisPoints[1].x)
      .attr("y2", xAxisPoints[1].y)
      .attr("class", "axis");

    // Crtanje nove Y osi
    svg
      .append("line")
      .attr("x1", yAxisPoints[0].x)
      .attr("y1", yAxisPoints[0].y)
      .attr("x2", yAxisPoints[1].x)
      .attr("y2", yAxisPoints[1].y)
      .attr("class", "axis");
  }, [xAngle, yAngle]);
  // Funkcija za crtanje vektora
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Brisanje prethodnih vektora
    svg.selectAll(".vector-group").remove();

    // Grupa za vektore
    const vectorGroup = svg.append("g").attr("class", "vector-group");

    // Crtanje glavnog vektora (skraćena dužina zbog strelice)
    const mainVectorLength = Math.sqrt(vector.x ** 2 + vector.y ** 2);
    const adjustedX = (vector.x * (mainVectorLength - 10)) / mainVectorLength;
    const adjustedY = (vector.y * (mainVectorLength - 10)) / mainVectorLength;

    vectorGroup
      .append("line")
      .attr("class", "vector-main")
      .attr("x1", 250)
      .attr("y1", 250)
      .attr("x2", 250 + adjustedX)
      .attr("y2", 250 - adjustedY);

    vectorGroup
      .append("polygon") // Strelica na glavnom vektoru
      .attr("class", "arrow-main")
      .attr(
        "points",
        createArrowHead(250 + vector.x, 250 - vector.y, vector.x, vector.y)
      );

    // Crtanje X komponente (skraćena zbog strelice)
    const adjustedXComponent = vector.x > 0 ? vector.x - 10 : vector.x + 10;
    vectorGroup
      .append("line")
      .attr("class", "vector-x")
      .attr("x1", 250)
      .attr("y1", 250)
      .attr("x2", 250 + adjustedXComponent)
      .attr("y2", 250);

    vectorGroup
      .append("polygon") // Strelica na X komponenti
      .attr("class", "arrow-x")
      .attr("points", createArrowHead(250 + vector.x, 250, vector.x, 0));

    // Crtanje Y komponente (skraćena zbog strelice)
    const adjustedYComponent = vector.y > 0 ? vector.y - 10 : vector.y + 10;
    vectorGroup
      .append("line")
      .attr("class", "vector-y")
      .attr("x1", 250)
      .attr("y1", 250)
      .attr("x2", 250)
      .attr("y2", 250 - adjustedYComponent);

    vectorGroup
      .append("polygon") // Strelica na Y komponenti
      .attr("class", "arrow-y")
      .attr("points", createArrowHead(250, 250 - vector.y, 0, vector.y));
  }, [vector]);

  // useeffect i strelice ####################################################################################################################

  // Definiraj parametre strelice kao konstante da bude jasno
  const ARROW_LENGTH = 10; // Dužina strelice
  const ARROW_WIDTH = 6; // Širina strelice

  // Funkcija za crtanje strelice
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

  // Ažurirani efekt za crtanje vektora
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Očisti prethodne vektore
    svg.selectAll(".vector-group").remove();

    const vectorGroup = svg.append("g").attr("class", "vector-group");

    const calculateProjections = (
      vector: Vector,
      xAngle: number,
      yAngle: number
    ) => {
      const xRad = (-xAngle * Math.PI) / 180; // Pretvaranje u radijane
      const yRad = ((90 - yAngle) * Math.PI) / 180; // Ispravljen kut za Y os (rotira u pravom smjeru)

      // Jedinični vektori za X i Y osi
      const xAxis = { x: Math.cos(xRad), y: Math.sin(xRad) };
      const yAxis = { x: Math.cos(yRad), y: Math.sin(yRad) };

      // Projekcija na X os
      const xProjection =
        (vector.x * xAxis.x + vector.y * xAxis.y) /
        (xAxis.x ** 2 + xAxis.y ** 2);

      // Projekcija na Y os
      const yProjection =
        (vector.x * yAxis.x + vector.y * yAxis.y) /
        (yAxis.x ** 2 + yAxis.y ** 2);

      return {
        x: { x: xProjection * xAxis.x, y: xProjection * xAxis.y },
        y: { x: yProjection * yAxis.x, y: yProjection * yAxis.y },
      };
    };

    // Glavni vektor (prilagodba zbog strelice)
    const mainVectorLength = Math.sqrt(vector.x ** 2 + vector.y ** 2);
    const adjustedX =
      (vector.x * (mainVectorLength - ARROW_LENGTH)) / mainVectorLength;
    const adjustedY =
      (vector.y * (mainVectorLength - ARROW_LENGTH)) / mainVectorLength;

    // Crtanje glavnog vektora
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

    // Izračun projekcija
    const projections = calculateProjections(vector, xAngle, yAngle);

    // X komponenta
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

    // Y komponenta
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

  //##################################################################
  // Praćenje kretanja miša
  const handleMouseDown = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (event.button !== 0) return; // Ako nije lijevi klik, izlazimo
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (!isDragging) return; // Ako nije povlačenje, ignoriramo
    const svgRect = (svgRef.current as SVGSVGElement).getBoundingClientRect();
    const x = event.clientX - svgRect.left - 250;
    const y = 250 - (event.clientY - svgRect.top);
    setVector({ x, y });
  };
  const [vectors, setVectors] = useState([
    { start: { x: 250, y: 250 }, end: { x: 300, y: 300 } },
  ]);
  return (
    <div className="vector-simulator-container">
      {/* SVG element */}
      <svg
        ref={svgRef}
        width="500"
        height="500"
        className="vector-simulator"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {/* SVG sadržaj */}
      </svg>

      {/* Kontrole izvan SVG-a */}
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
