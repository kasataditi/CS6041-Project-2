

class CFG
{
    constructor()
    {
        this.cfgSection = $("#cfgSection");
		this.cfgTable = $("#cfgTable");
	
		
    }

    simulate(str)
    {
		let letter = "S";
		this.cfgTable.append("<tr><td> Starting CFG simulation of \"" + str + "\" </td> <td>\""+ letter + "\" </td> </tr> ");
		for(let i = 0; i < str.length/2; i++)
		{
			letter = letter.replace("S","0S1");
			this.cfgTable.append("<tr><td> Use rule1 </td> <td>\"" + letter + "\" </td> </tr> ");
			
		}
		
		letter = letter.replace("S","");
		this.cfgTable.append("<tr><td> Use rule2 </td> <td>\"" + letter + "\" </td> </tr> ");
		this.cfgTable.append("<tr><td colspan = '2'> Finished generating the input string \"" + str + "\" </td> </tr> ");

    }

    reset()
    {
		this.cfgTable.empty();

    }
}