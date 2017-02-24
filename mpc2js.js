// JavaScript Document
var micIn;
var LogMessage;
var GameMessage;
var gtarInitSize = document.getElementById("gtarhead").Height;
var gtarInitFontSize = document.getElementById("string1").style.fontSize;;
var gtarCurrentSize;

// Note & String Arrays, Octave Colour Array
var noteArray = new Array("C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B");
var StringNotes = new Array(4,9,14,19,23,28);
var OctColours = new Array("maroon","red","yellow","limegreen","green");

// EVENT LISTENERS ------------


	// IF RESIZE -------
addEventListener('resize', function(){
	document.getElementById("tuner").height = document.getElementById("gtarhead").height;
	document.getElementById("tuner").width = document.getElementById("tuner").width;
	console.log("lit")
	});


// TUNING SELECT
	document.getElementById("tuningDropbox").addEventListener("change", function(){
	
	//Set newTuning vals
	switch(document.getElementById("tuningDropbox").value) {
		case "1": 
			var	newTuning = new Array(4,9,14,19,23,28); // Standard
			break;
		case "2":
			var	newTuning = new Array(4,7,14,14,19,26); // Open Repetitive
			break;
		case "3":
			var	newTuning = new Array(2,9,14,19,23,28); // Dropped
			break;
		case "4":
			var	newTuning = new Array(2,9,14,14,21,26); // Four n Twenty
			break;
	}
	
	console.log(newTuning);
	
	//Update StringArray
	for(var x=1;x<7;x++)
	{
	StringNotes[x-1] = newTuning[x-1];
	console.log("X " + StringNotes);
	NoteChange(x,0);
	}
	 
	});

// ADDITIONAL FUNCTIONS -------

	
// MUTE / UNMUTE
	var micMute = 0;
function muteButton() {
	console.log("AudioCheck called");
	
	if(micMute == 0) 			// THIS CHECKBOX WORKS YAY
	{
		document.getElementById("MuteButton").value="Unmute Mic";
		document.getElementById("MuteButton").style.background="-webkit-linear-gradient(lightblue, #69AFFF, #69AFFF)";
		micMute = 1;
	}
	else
	{
		document.getElementById("MuteButton").value="Mute Mic";
		document.getElementById("MuteButton").style.background="-webkit-linear-gradient(#69AFFF, white)";
		micMute = 0;	
	}
}

// MUTE / UNMUTE AUDIO
function GetToneCheck() {
	console.log("AudioCheck called");

	var includeTone = document.getElementById("toneCheck").checked;
	
	if(includeTone == 1) 			// THIS CHECKBOX WORKS YAY
	{
		LogMessage='tonecheck checked';
	}
	else
	{
		LogMessage="tonecheck unchecked";
	}
}

// MODE SELECTION
function StartTuner() {
	document.getElementById("tuner").style.zIndex=3;
	document.getElementById("tunegame").style.zIndex=2;

	LogMessage="Tuner loaded"
}

function StartGame() {
	document.getElementById("tunegame").style.zIndex=3;
	document.getElementById("tuner").style.zIndex=2;

	LogMessage="Game loaded"
}


// TUNER SCRIPTS -----------------
function NoteChange(whatstring, increment) {
	
	var stringElements = new Array( document.getElementById("string1note"),
									document.getElementById("string2note"),
									document.getElementById("string3note"),
									document.getElementById("string4note"),
									document.getElementById("string5note"),
									document.getElementById("string6note"));
	whatstring--;
	
	var thisNote = StringNotes[whatstring] + increment;	
	if (thisNote==1) 
	{ thisNote++; }
	if (thisNote==61) 
	{ thisNote--; }
	StringNotes[whatstring] = thisNote;
	
	var octVal  = Math.floor(thisNote / 12); // Get INTEGER divison
	var noteVal = thisNote % 12; // Get Remainder
	
	console.log("thisNote " + thisNote);
	console.log("noteVal " + noteVal);
	
	//Superscript sharps
	var finalNote = noteArray[noteVal];
	var semiNote = " ";
	if(finalNote.length==2) 
	{
		var semiNote = finalNote.charAt(1);
	}
		
	stringElements[whatstring].innerHTML = finalNote.charAt(0) + semiNote.sup();
	stringElements[whatstring].style.color = OctColours[octVal];
	
	console.log("string: " + whatstring + "noteVal: " + thisNote);

}

function playNote(whatstring) {
	
	var whatNote = StringNotes[whatstring];
    	whatNote = "mp3/" + whatNote + ".mp3";

	var player = new Tone.Player({
								"url" : whatNote,
								"autostart" : true
								}).toMaster();
	console.log("Tone loaded");
	
	player.autostart=true;
}

function noPropagation() {
  event.stopPropagation();
  console.log("event propagation halted.");
}




/* LOG FUNCTIONS ------------

// UPDATE GAMELOG
function GameLog() {
	var oldLog=document.getElementById("sessionLog").value;
		document.getElementById("sessionLog").value= GameMessage + "\n" + oldLog;
	
}

// UPDATE (DEBUG) LOG
function LogUpdate() {
	var today = new Date();
	var oldLog=document.getElementById("sessionLog").value;
	var time = TimeFormat(today.getHours()) + ":" + TimeFormat(today.getMinutes()) + ":" + TimeFormat(today.getSeconds());
	
	document.getElementById("sessionLog").value= "[" + time + "]: \n" + LogMessage + "\n" + oldLog;
}

function TimeFormat(n) { // TIME FORMATTING
    return n > 9 ? "" + n: "0" + n;
}

*/

/* Fixes / Optimizations

Opt 001 - Analysed notes as a continuous scale ie not 1-12 repeating.
>>>> Code removed from the NoteChange() function;
		
		if (thisNote==12 && StringOcts[whatstring]!=4)
		{
			thisNote=0;
			StringOcts[whatstring] = StringOcts[whatstring] + 1;
		}
		else if (thisNote==-1 && StringOcts[whatstring]!=0)
		{
			thisNote=11;
			StringOcts[whatstring] = StringOcts[whatstring] - 1;
		}
<<<<

*/


