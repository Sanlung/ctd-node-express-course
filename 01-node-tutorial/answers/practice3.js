const {writeFile} = require("fs").promises;

const makeFile = async () => {
  try {
    let i = 0;
    await writeFile(
      "./content/practice2.txt",
      new Array(10)
        .fill("")
        .map((el) => el + `This is line ${++i}`)
        .join("/n")
    );
  } catch (err) {
    console.log(err);
  }
};

makeFile();
