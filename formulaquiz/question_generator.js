// ==============================================================
// Question Generator
// (c) Justin Whitehouse 2016
// www.justinwhitehouse.co.uk
// ==============================================================
//
// DEPENDENCIES:
//
// formula.js
//

// --------------------------------------------------------------
// QUESTION OBJECT

function Question(formula)
{
	this.formula=formula;

	this.answer_choices = this.formula.getShuffledList();
	this.correct_key = this.findCorrectKey();

};

Question.prototype.findCorrectIndex = function()
{
	var idx = null;

	for(i=0; i < this.answer_choices.length; i++)
	{
		if(this.answer_choices[i] === this.formula.correct_formula)
		{
			idx = i;
			break;
		}
	}

	return idx;
};

Question.prototype.findCorrectKey = function()
{
	var key = null;
	switch(this.findCorrectIndex())
	{
		case 0:
			key = "A";
			break;
		case 1:
			key = "B";
			break;
		case 2:
			key = "C";
			break;
		case 3:
			key = "D";
			break;
		case null:
			console.log("WARNING (Question.prototype.findCorrectKey()): Question.log.findCorrectIndex() failed!");
			break;
		default:
			console.log("WARNING (Question.prototype.findCorrectKey()): Hit Switch default!");

	}
	return key;
};

Question.prototype.getAnswerKey = function() // is this method superfluous??
{
	return this.correct_key;
};

Question.prototype.getQuestionText = function()
{
	var vmk = this.formuala.variable_map.keys();


	var q = "What is the formula which links ";
	for( k=0; k < vmk.length-1; k++)
	{
		q += this.formula.variable_map[vmk[k]] + " (" + vmk[k] + "), ";
	}
	q += "and " + this.formula.variable_map[vmk[vmk.length-1]] + " (" + vmk[vmk.length-1] + ").";

	return q;
};

Question.prototype.getAnswerText = function()
{
	var txt = "Answer: " + this.correct_key;
	return txt;
};

// --------------------------------------------------------------
// QUESTION GENERATOR OBJECT

function QuestionGenerator()
{
	this.formula_list = getShuffledFormulas();
	this.formula_pointer = 0;
	this.active_formula = null;
};

QuestionGenerator.prototype.debugFunction = function()
{
	console.log("QuestionGenerator: debugFunction");
}

QuestionGenerator.prototype.nextFormula = function()
{
	this.active_formula = this.formula_list[this.formula_pointer];
	this.formula_pointer = (this.formula_pointer + 1 ) % this.formula_list.length;
};

QuestionGenerator.prototype.nextQuestion = function()
{
	this.nextFormula();
	return new Question(this.active_formula);
};