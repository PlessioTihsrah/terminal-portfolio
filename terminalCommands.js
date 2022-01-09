// each command modifies output element
const terminalCommands = {
  clear: (fullCommand, outputElement) => {
    if (fullCommand.split(" ").length > 1) {
      writeToOutput(["clear does not takes any arguments"], outputElement);
      return;
    }
    outputElement.innerHTML = "";
  },
  help: (fullCommand, outputElement) => {
    if (fullCommand.split(" ").length > 1) {
      writeToOutput(["help does not takes any arguments"], outputElement);
      return;
    }
    writeToOutput(
      ["Available commands are", ...Object.keys(terminalCommands)],
      outputElement
    );
  },

  "change-color": (fullCommand, outputElement) => {
    const commands = fullCommand.split(" ");
    if (commands.length != 3) {
      writeToOutput(
        [
          "Changes background and font color",
          "Usage: change-color <hex value of new background color> <hex value of new font color>",
          "Example: changebackground #ffffff #000000",
        ],
        outputElement
      );
      return;
    }

    const hexBgColor = commands[1];
    const hexFontColor = commands[2];
    const hexColorRegex = /^#[0-9A-F]{6}$/i;
    if (!hexColorRegex.test(hexBgColor) || !hexColorRegex.test(hexFontColor)) {
      // invalid color
      writeToOutput(
        ["Provide valid hex color code, example #123fff"],
        outputElement
      );
      return;
    }

    document.body.style.backgroundColor = hexBgColor;
    document.body.style.color = hexFontColor;
    const inputEl = document.querySelector("input");
    inputEl.style.color = hexFontColor;
    inputEl.style.caretColor = hexFontColor;
  },
};

function writeToOutput(outputArray, outputElement) {
  outputArray.forEach((outputLine) => {
    const outputDiv = document.createElement("div");
    outputDiv.innerText = outputLine;
    outputElement.appendChild(outputDiv);
  });
}
