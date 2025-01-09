import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./VectorSimulator.css"; 

interface Vector {
  x: number;
  y: number;
}

const VectorSimulator: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [vector, setVector] = useState<Vector>({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Inicijalno crtanje osa
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Crtanje osi (X i Y)
    svg
      .append("line")
      .attr("x1", 250)
      .attr("y1", 0)
      .attr("x2", 250)
      .attr("y2", 500)
      .attr("class", "axis");

    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", 250)
      .attr("x2", 500)
      .attr("y2", 250)
      .attr("class", "axis");
  }, []);

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

    // Prilagođavanje krajnjih koordinata linije glavnog vektora
    const mainVectorLength = Math.sqrt(vector.x ** 2 + vector.y ** 2);
    const adjustedX =
      (vector.x * (mainVectorLength - ARROW_LENGTH)) / mainVectorLength;
    const adjustedY =
      (vector.y * (mainVectorLength - ARROW_LENGTH)) / mainVectorLength;

    // Glavni vektor (linija)
    vectorGroup
      .append("line")
      .attr("class", "vector-main")
      .attr("x1", 250)
      .attr("y1", 250)
      .attr("x2", 250 + adjustedX)
      .attr("y2", 250 - adjustedY);

    // Glavni vektor (strelica)
    vectorGroup
      .append("polygon")
      .attr("class", "arrow-main")
      .attr(
        "points",
        createArrowHead(250 + vector.x, 250 - vector.y, vector.x, -vector.y)
      );

    // X komponenta (prilagodba)
    const adjustedXComponent =
      vector.x > 0 ? vector.x - ARROW_LENGTH : vector.x + ARROW_LENGTH;

    vectorGroup
      .append("line")
      .attr("class", "vector-x")
      .attr("x1", 250)
      .attr("y1", 250)
      .attr("x2", 250 + adjustedXComponent)
      .attr("y2", 250);

    // X komponenta (strelica)
    vectorGroup
      .append("polygon")
      .attr("class", "arrow-x")
      .attr("points", createArrowHead(250 + vector.x, 250, vector.x, 0));

    // Y komponenta (prilagodba)
    const adjustedYComponent =
      vector.y > 0 ? vector.y - ARROW_LENGTH : vector.y + ARROW_LENGTH;

    vectorGroup
      .append("line")
      .attr("class", "vector-y")
      .attr("x1", 250)
      .attr("y1", 250)
      .attr("x2", 250)
      .attr("y2", 250 - adjustedYComponent);

    // Y komponenta (strelica)
    vectorGroup
      .append("polygon")
      .attr("class", "arrow-y")
      .attr("points", createArrowHead(250, 250 - vector.y, 0, -vector.y));
  }, [vector]);

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

  return (
    <svg
      ref={svgRef}
      width="500"
      height="500"
      className="vector-simulator"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    />
  );
};

export default VectorSimulator;
