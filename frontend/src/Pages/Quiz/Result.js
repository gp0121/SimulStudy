import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Result(props) {
  const { id } = useParams();
  const [result, setResult] = useState();
  const [loading, setIsLoading] = useState(true);

  function calculateResult(result) {}

  useEffect(async () => {
    const resp = await fetch("/quiz-results/" + id, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        setIsLoading(false);
        setResult(resp);
      });
  }, []);
  if (loading) {
    return <div>...loading</div>;
  }

  return <div>Hello</div>;
}
