// ==============================================================
// Formula Object
// (c) Justin Whitehouse 2016
// www.justinwhitehouse.co.uk
// ==============================================================

// INFO:
//
// A formula object for use with my formula quiz!
//
// Formula Objects need to have the following 4 properties:
//
// 1. Mapping of variable names to symbols
// 2. String representation of CORRECT FORMULA
// 3. List of three INCORRECT formulas
// 4. A explanation of the formula
//

// --------------------------------------------------------------
// SOME 'GLOBALS'/DEFAULTS:

var DEFAULT_EXPLANATION = "Explanation Coming Soon!";

// --------------------------------------------------------------
// SHUFFLE FUNCTION:
// (copied verbatim from: https://bost.ocks.org/mike/shuffle/)

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

// --------------------------------------------------------------
// FORMULA CLASS

function Formula(var_map, cf, if_list, d)
{
	// initialise class properties

	this.variable_map=var_map;
	this.correct_formula=cf;
	this.incorrect_formula_list=if_list;
	this.explanation=d;
}

Function.prototype.getShuffledList = function()
{
	f_list = this.incorrect_formula_list.concat([this.correct_formula]);
	return shuffle(f_list);
}

// --------------------------------------------------------------
// SPECIFIC FORMULAS
// (prefix "F" in variable names for "Formula")

var F_GPE = new Formala
(
	{"E<sub>p</sub>":"Gravitational Potential Energy",
	 "m":"Mass",
	 "g":"Gravitational Acceleration",
	 "h":"Height"
	},

	"E<sub>p</sub> = mgh",

	["E<sub>p</sub> = (mg)/h",
	 "E<sub>p</sub> = m/(gh)",
	 "E<sub>p</sub> = (m/g)h"],
	 
	 DEFAULT_EXPLANATION
);

// --------------------------------------------------------------
// ACTIVE FORMULA LIST

ACTIVE_FORMULAS = [F_GPE];

var getShuffledFormulas = function()
{
	return shuffle(ACTIVE_FORMULAS);
}