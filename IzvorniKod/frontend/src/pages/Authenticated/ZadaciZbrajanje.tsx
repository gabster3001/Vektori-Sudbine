import React, { useEffect, useState } from "react";
import "../../components/Zadatak.css";
import "../../components/Zadatak.tsx";

// Tip podataka za zadatak
interface Task {
  id: number;
  type: string;
  description: string;
}

const ZadaciZbrajanje: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "http://localhost:5000/tasks?type=zbrajanje"
        );
        if (!response.ok) {
          throw new Error(
            `Greška kod dohvaćanja zadataka: ${response.statusText}`
          );
        }

        const data: Task[] = await response.json();
        setTasks(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <p>Učitavanje zadataka...</p>;
  }

  if (error) {
    return <p>Greška: {error}</p>;
  }

  if (tasks.length === 0) {
    return <p>Nema zadataka za zbrajanje.</p>;
  }

  return (
    <div>
      <h1>Zadaci za Zbrajanje</h1>
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h3>Zadatak {task.id}</h3>
          <p>Opis: {task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ZadaciZbrajanje;
