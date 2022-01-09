class Terminal {
  constructor(inputElement, outputElement) {
    this.inputElement = inputElement; // input of terminal
    this.outputElement = outputElement; // output of terminal
    inputElement.addEventListener("keydown", this.handleInput);
    this.commands = {
      help: ["Available commands are:", "clear", "help"],
      clear: "",
    };
    this.history = []; // for arrow up and down
    this.historyIndex = 0;
    inputElement.addEventListener("focusout", () => inputElement.focus()); // always keep input in focus
    inputElement.focus(); // focus input by default
  }

  handleInput = (e) => {
    const value = e.target.value;
    switch (e.keyCode) {
      case 13: // enter pressed
        e.target.value = "";
        this.handleCommand(value);
        this.addToHistory(value);
        break;
      case 38: // up arrow pressed
        e.target.value = this.moveHistoryUp();
        break;
      case 40: // down arrow pressed
        e.target.value = this.moveHistoryDown();
        break;
      case 9: // tab pressed
        e.preventDefault();
        const suggestions = this.getTabSuggestions(value);
        if (suggestions.length > 0) {
          e.target.value = suggestions[0];
        }
        break;
    }
  };

  handleCommand = (command) => {
    command = command.toLowerCase().trim(); // handle lowercase
    const divEl = document.createElement("div"); // previous command on output
    divEl.innerText = "[hp@harshitpal] $ " + command;
    this.outputElement.appendChild(divEl);

    if (command.toLowerCase() === "clear") {
      this.outputElement.innerHTML = "";
    } else if (this.commands[command.toLowerCase()]) {
      // valid command
      this.commands[command.toLowerCase()].forEach((outputLine) => {
        const outputDiv = document.createElement("div");
        outputDiv.innerText = outputLine;
        this.outputElement.appendChild(outputDiv);
      });
    } else if (command.length > 0) {
      const outputDiv = document.createElement("div");
      outputDiv.innerText = command + " is not a valid command";
      this.outputElement.appendChild(outputDiv);
    }
    this.inputElement.scrollIntoView();
  };

  getTabSuggestions(command) {
    const suggestions = [];
    const commandLower = command.toLowerCase();
    for (const key in this.commands) {
      if (key.startsWith(commandLower)) {
        suggestions.push(key);
      }
    }
    return suggestions;
  }

  moveHistoryUp = () => {
    if (this.historyIndex < this.history.length) {
      this.historyIndex++;
    }
    return this.history[this.history.length - this.historyIndex] || "";
  };

  moveHistoryDown = () => {
    if (this.historyIndex > 0) {
      this.historyIndex--;
    }
    return this.history[this.history.length - this.historyIndex] || "";
  };

  addToHistory = (value) => {
    if (value.trim().length > 0) {
      // don't add empty commands to history
      this.history.push(value);
    }
    this.historyIndex = 0;
  };
}
