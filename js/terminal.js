class Terminal {
  constructor(id, input, textHandler) {
    this.id = id;
    this.input = input;
    this.textHandler = textHandler;

    document.getElementById(this.input).addEventListener('keydown', function (e) { // Checks if the user presses the enter key and does the inputted function
      if (e.keyCode == 13) {
        e.preventDefault();

        var command = document.getElementById(input).textContent.toLowerCase();
        
        terminal.clearInput();
        if (command) {
          window[textHandler](command);  
        }
        
      }
    });
  }

  print(text) { // Prints a line or a block of text to the terminal, followed by \n, a line break
    document.getElementById(this.id).innerHTML += text + '\n';
    window.scrollTo(0, document.body.scrollHeight);
  }

  textColor(color) { // Sets the text colour of the entire terminal to the one specified
    this.color = color;
    document.getElementById(this.id).style.color = this.color;
  }

  backColor(color) { // Sets the background color of the terminal to the one specified
    this.backgroundColor = color;
    document.getElementById(this.id).style.backgroundColor = this.backgroundColor;
    document.body.style.backgroundColor = this.backgroundColor;
  }

  clear() { // Erases all the text in the terminal
    document.getElementById(this.id).textContent = '';
  }

  allowInput() { // Allows the user to type in the input box
    document.getElementById(this.input).contentEditable = true;
  }

  denyInput() {
    document.getElementById(this.input).contentEditable = false;
  }

  clearInput() { // Erases the text in the input textbox
    document.getElementById(this.input).textContent = null;
  }

  getText() {
    return document.getElementById(this.id).textContent;
  }

  setText(text) {
    document.getElementById(this.id).textContent = text;
  }

  focus() {
    document.getElementById(this.input).focus({ preventScroll: false });
  }
}
