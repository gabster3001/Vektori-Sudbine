import React, { useRef, useState, useEffect, MouseEvent } from "react";

interface Point {
    x: number;
    y: number;
}

interface Vector {
    start: Point;
    end: Point;
}

interface InteractiveCanvasProps {
    width: number; // Width of the canvas
    height: number; // Height of the canvas
    onVectorsChange?: (vectors: Vector[]) => void; // Callback when vectors change
}

export default function InteractiveCanvas({
    width,
    height,
    onVectorsChange,
}: InteractiveCanvasProps) {
    const [points, setPoints] = useState<Point[]>([]); // State to track points
    const [vectors, setVectors] = useState<Vector[]>([]); // State to track vectors
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Handle canvas click
    const handleCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = e.target as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (points.length === 0) {
            setPoints([{ x, y }]); // Add the first point
        } else if (points.length === 1) {
            const start = points[0];
            const end = { x, y };
            const newVector = { start, end };
            const updatedVectors = [...vectors, newVector];
            setVectors(updatedVectors); // Add a new vector
            setPoints([]); // Clear points

            // Notify parent about vector changes
            if (onVectorsChange) {
                onVectorsChange(updatedVectors);
            }
        }
    };

    // Function to draw vectors on canvas
    const drawVectors = (ctx: CanvasRenderingContext2D) => {
        vectors.forEach(({ start, end }) => {
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw arrowhead
            const arrowHeadLength = 10;
            const angle = Math.atan2(end.y - start.y, end.x - start.x);
            ctx.beginPath();
            ctx.moveTo(end.x, end.y);
            ctx.lineTo(
                end.x - arrowHeadLength * Math.cos(angle - Math.PI / 6),
                end.y - arrowHeadLength * Math.sin(angle - Math.PI / 6)
            );
            ctx.lineTo(
                end.x - arrowHeadLength * Math.cos(angle + Math.PI / 6),
                end.y - arrowHeadLength * Math.sin(angle + Math.PI / 6)
            );
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();
        });
    };

    // UseEffect to update the canvas whenever vectors change
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                // Get device pixel ratio
                const dpr = window.devicePixelRatio || 1;

                // Set the canvas size for high-resolution rendering
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;

                // Scale the drawing context
                ctx.scale(dpr, dpr);

                // Clear and redraw vectors
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawVectors(ctx);
            }
        }
    }, [vectors]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onClick={handleCanvasClick}
            style={{
                width: `${width}px`, // CSS width
                height: `${height}px`, // CSS height
                border: "2px solid gray",
                cursor: "pointer",
            }}
        />
    );
}
