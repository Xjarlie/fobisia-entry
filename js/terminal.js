class Terminal {
    constructor(id, input, textHandler) {
        this.id = id;
        this.input = input;
        this.textHandler = textHandler;

        document.getElementById(this.input).addEventListener('keydown', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();

                var command = document.getElementById(input).textContent;
                window[textHandler](command);
            }
        });
    }

    print(text) {
        document.getElementById(this.id).textContent += text + '\n';
    }

    textColor(color) {
        this.color = color;
        document.getElementById(this.id).style.color = this.color;
    }

    backColor(color) {
        this.backgroundColor = color;
        document.getElementById(this.id).style.backgroundColor = this.backgroundColor;
        document.body.style.backgroundColor = this.backgroundColor;
    }

    clear() {
        document.getElementById(this.id).textContent = '';
    }

    allowInput() {
        document.getElementById(this.input).contentEditable = true;
    }

    clearInput() {
        document.getElementById(this.input).textContent = null;
    }
}
