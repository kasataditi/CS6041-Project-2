class PDA
{
    constructor()
    {
        this.pdaSection = $("#pdaSection");
        this.pdaImage = $("#pdaImage");
        this.pdaOutput = $("#pdaOutput");
        this.pdaStack = $("#pdaStack");
        this.stack = [];
        this.state = "q0";
    }

    simulate(str, symbol, delay)
    {
        this.updateImage(symbol);
        this.state = "q0";

        let mappedSymbol = this.mapSymbol(symbol);

        this.pdaOutput.append("<div>Starting PDA simulation of \"" + str + "\" at state q0...</div>");

        if(str.length === 0)
        {
            this.state = "q1";
            this.pdaOutput.append("<div>Empty string...transitioned to q1.</div>");
        }
        else
        {
            for(let i = 0; i < str.length; i++)
            {
                let stop = this.nextAction(i, str[i], mappedSymbol, str);
    
                if(stop)
                    return false;
    
                // TODO delay execution
            }
        }

        if(this.state === "q1" && this.stack.length === 0)
        {
            this.pdaOutput.append("<div>End of string. Final state is q1 and the stack is empty, so the input string \"" + str + "\" was accepted.</div>");
            return true;
        }
        else
        {
            this.pdaOutput.append("<div>End of string. Either the final state is not q1 or the stack is not empty, so the input string \"" + str + "\" was rejected.</div>");
            return false;
        }
    }

    /**
     * performs the next action for the PDA with the given parameters, and indicates whether or not to stop the simulation.
     * @param {*} index - the index of the current character input
     * @param {*} inputChar - the current character input
     * @param {*} mappedSymbol - the symbol to push or pop from the stack
     * @param {*} inputStr - the full input string to output
     * @returns true to stop the simulation or false to continue the simulation
     */
    nextAction(index, inputChar, mappedSymbol, inputStr)
    {
        let stop = false;

        if(this.state === "q0" && inputChar === '0')
        {
            this.pdaOutput.append("<div class='mt-2'>" + this.getCharacterCount(index) + " character = '0'...looped and stayed at q0.</div>");
            this.pdaOutput.append("<div>Push a " + mappedSymbol + " into the stack.</div>");
            this.stack.push(mappedSymbol);
            this.pdaStack.prepend('<div style="display: none;" class="new-symbol">' + mappedSymbol + '</div>');
            this.pdaStack.find(".new-symbol:first").slideDown("fast");
        }
        else if(this.state === "q0" && inputChar === '1')
        {
            this.state = "q1";
            this.pdaOutput.append("<div class='mt-2'>" + this.getCharacterCount(index) + " character = '1'...transitioned to q1.</div>");

            let poppedSymbol = this.stack.pop();
            
            if(poppedSymbol === mappedSymbol)
            {
                this.pdaOutput.append("<div>Pop a " + mappedSymbol + " from the stack.</div>");
                this.pdaStack.find(".new-symbol:first").slideUp("fast", function() {
                    $(this).remove();
                });
            }
            else
            {
                this.pdaOutput.append("<div>Early termination. Tried to pop a " + mappedSymbol + " from an empty stack, so the input string \"" + inputStr + "\" was rejected.</div>");

                stop = true;
            }
        }
        else if(this.state === "q1" && inputChar === '0')
        {
            this.pdaOutput.append("<div class='mt-2'>" + this.getCharacterCount(index) + " character = '0'...no transition available.</div>");
            this.pdaOutput.append("<div>Early termination. Character '1' followed by '0', so the input string \"" + inputStr + "\" was rejected.</div>");

            stop = true;
        }
        else if(this.state === "q1" && inputChar === '1')
        {
            let poppedSymbol = this.stack.pop();
            
            if(poppedSymbol === mappedSymbol)
            {
                this.pdaOutput.append("<div class='mt-2'>" + this.getCharacterCount(index) + " character = '1'...looped and stayed at q1.</div>");
                this.pdaOutput.append("<div>Pop a " + mappedSymbol + " from the stack.</div>");
                this.pdaStack.find(".new-symbol:first").slideUp("fast", function() {
                    $(this).remove();
                });
            }
            else
            {
                this.pdaOutput.append("<div class='mt-2'>" + this.getCharacterCount(index) + " character = '1'...looped and stayed at q1.</div>");
                this.pdaOutput.append("<div>Early termination. Tried to pop a " + mappedSymbol + " from an empty stack, so the input string \"" + inputStr + "\" was rejected.</div>");
                
                stop = true;
            }
        }

        return stop;
    }

    /**
     * hides the pda section and empties the pda output and stack.
     */
    reset()
    {
        this.pdaSection.hide(function() {
            this.pdaOutput.empty();
            this.pdaStack.empty();
        });
    }

    /**
     * updates the pda's image to use the selected symbol.
     * @param {string} symbol 
     */
    updateImage(symbol)
    {
        this.pdaImage.attr("src", "pda-" + symbol + ".png");
    }

    /**
     * maps the given string to its symbol representation.
     * @param {string} symbol - the string to map to a symbol
     * @returns the symbol representation of the given string
     */
    mapSymbol(symbol)
    {
        switch(symbol)
        {
            case "dollar":
                return "&#36;";
            case "euro":
                return "&euro;";
            case "yen":
                return "&yen;";
            case "won":
                return "&#8361;";
            case "heart":
                return "&#10084;";
            default:
                return "&#36;";
        }
    }

    /**
     * gets a string representation when counting the character at the given index.
     * @param {integer} index - the index of the character to count
     */
    getCharacterCount(index)
    {
        var number = index + 1;

        var tenth = number % 10;
        var hundreth = parseInt(((number % 100) / 10.0).toString().split('.')[0]);

        if(tenth === 1 && hundreth !== 1)
            return number + "st";
        else if(tenth === 2 && hundreth !== 1)
            return number + "nd";
        else if(tenth === 3 && hundreth !== 1)
            return number + "rd";
        else
            return number + "th";
    }
}