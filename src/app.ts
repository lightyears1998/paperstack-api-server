import path from "path";

function hello(stuff :string) {
  console.log(path.resolve("."));
  console.log(`Hello, ${stuff}!`);
}

let stuff: string = "world!";

hello(stuff);
