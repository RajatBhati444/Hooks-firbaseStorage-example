import React, { useState, useEffect } from "react";
import { async } from "q";

const UseEffect = () => {
  const [count, setCount] = useState(0);
  const [person, setPerson] = useState(null);

  useEffect(async () => {
    const response = await fetch("https://api.randomuser.me/");
    const data = await response.json();
    const [item] = data.results;
    setPerson(item);
  }, []);

  return (
    <div>
      <p> you clicked {count} times </p>
      <button onClick={() => setCount(count + 1)}>click me</button>
      {person && <div>{person.name.first} </div>}
    </div>
  );
};

export default UseEffect;
