$(document).ready(function() {
	let cfg = new CFG();

    $("#stackSymbolParam").on("change", function(){
        
        let symbol = $(this).val();
        $("#pdaImage img").attr("src", "img/pda-"+symbol+".png"); 
        
        
    });
    
    /**
     * run simulation button's click event handler
     */
    $("#runSimBTN").on("click", function() {
        let inputStringParam = $("#inputStringParam").val();
        let stackSymbolParam = $("#stackSymbolParam").val();
        let simDelayParam = $("#simDelayParam").val();

        if(isPartOfAlphabet(inputStringParam))
        {
            if(isPositiveInteger(simDelayParam))
            {
				cfg.reset();
				cfg.simulate(inputStringParam);
				
                console.log("input string: \"" + inputStringParam + "\"");
                console.log("stack symbol: " + stackSymbolParam);
                console.log("simulation delay: " + simDelayParam + " ms.");
            }
            else
            {
                let errorMsg = "<p>The simulation delay must be a positive integer.</p>";
                showErrorMsg(errorMsg);            
            }
        }
        else
        {
            let errorMsg = "<p>The input string contains characters that don't belong to the alphabet. The alphabet only supports {0, 1}</p>";
            showErrorMsg(errorMsg);
        }
    });
});

/**
 * checks if the given string only contains characters in this machine's alphabet.
 * @param {string} str - the string to check.
 * @returns true if the given string only contains {0, 1}, false otherwise
 */
function isPartOfAlphabet(str)
{
    for(let i = 0; i < str.length; i++)
    {
        if(str[i] !== '0' && str[i] !== '1')
        {
            return false;
        }
    }

    return true;
}
 /**
  * checks if the given string is a positive integer.
  * @param {string} num - the string to be parsed into an integer
  * @returns true if the given string is a positive integer, false otherwise
  */
function isPositiveInteger(num)
{
    let number = Number(num);

    if(Number.isInteger(number) && number >= 0)
        return true;
    else
        return false;
}

/**
 * shows a modal window with the given error message.
 * @param {string} msg - the error message to display in the modal window
 */
function showErrorMsg(msg)
{
    $("#errorModal .modal-body").html(msg);
    $("#errorModal").modal("show");
}