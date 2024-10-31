"use client";
import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

// Pre-defined colors to be used for randomizer
const tailwindColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
];

const sizes = ["12", "20", "40"];

// TODO: According to this type, add these functions to this component to be used within the parent component.
// Hint: useImperativeHandle
type MagicBoxHandle = {
  changeColor: () => void;
  resize?: () => void;
  wiggle: () => void;
};

type MagicBoxRef = MagicBoxHandle & HTMLDivElement;

// eslint-disable-next-line react/display-name
const MagicBox = forwardRef<MagicBoxHandle>((_, ref) => {
  useImperativeHandle(
    ref,
    () => {
      return {
        changeColor: randomColor,
        wiggle,
        resize,
      };
    },
    []
  );
  const boxRef = useRef<MagicBoxRef>(null);
  // TODO: Can use either state or ref to maintain this value
  const [color, setColor] = useState("bg-white");
  const [size, setSize] = useState("12");
  let index = 0;

  // Random color generator
  function randomColor() {
    const rand = Math.floor(Math.random() * tailwindColors.length);

    // TODO: Get a random color from tailwindColors
    const foo = tailwindColors[rand];
    console.log({ foo });
    setColor(foo);
  }

  console.log({ color, size });

  const wiggle = () => {
    // TODO: Add and then remove an animation from the classlist of a component
    boxRef.current?.classList.add("animate-wiggle");
    setTimeout(() => boxRef.current?.classList.remove("animate-wiggle"), 2000);
  };

  const resize = () => {
    //this shit has a mind of its own and only works sometimes
    const newIndex = index + 1;
    // if index is 3, we get 0 again
    index = newIndex % sizes.length;

    setSize(sizes[index]);
  };

  console.log({ size });

  return (
    <div
      ref={boxRef}
      className={
        /*TODO: Update the styles to work for more variables*/ `w-20 h-${size} ${color}`
      }
    />
  );
});

// Parent Component
function MagicBoxParent() {
  const magicBoxRef = useRef<MagicBoxHandle>(null);

  const callChangeColor = () => {
    if (magicBoxRef.current) {
      console.log("calling it");
      magicBoxRef.current.changeColor();
    } else {
      console.log("not calling it");
    }
  };

  return (
    <div className="App">
      <h1>Magic Box!</h1>
      <button onClick={callChangeColor} className="m-4 border">
        Change Color
      </button>
      <button
        className="m-4 border"
        onClick={() => magicBoxRef.current?.resize?.()}
      >
        Resize
      </button>
      <button
        className="m-4 border"
        onClick={() => magicBoxRef.current?.wiggle()}
      >
        Wiggle
      </button>
      <MagicBox ref={magicBoxRef} />
    </div>
  );
}

export default MagicBoxParent;
