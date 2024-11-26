export const LANGUAGE_VERSIONS = {
  cpp: "10.2.0",
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
};

export const CODE_SNIPPETS = {
  javascript: `console.log("Hello World1");`,
  python: `print("Hello World")`,
  java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  cpp: `#include<iostream>\nusing namespace std;\n\nint main(){\n\n\tcout<<"Hello World";\n\n\treturn 0;\n}`,
};

export const formatTime = (time) => {
  const hours = String(Math.floor((time / (1000 * 60 * 60)) % 24)).padStart(
    2,
    "0"
  );
  const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};