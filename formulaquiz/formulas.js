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
};

// --------------------------------------------------------------
// FORMULA CLASS

function Formula(var_map, cf, if_list, d)
{
	// initialise class properties

	this.variable_map=var_map;
	this.correct_formula=cf;
	this.incorrect_formula_list=if_list;
	this.explanation=d;
};

Formula.prototype.getShuffledList = function()
{
	f_list = this.incorrect_formula_list.concat([this.correct_formula]);
	return shuffle(f_list);
};

// --------------------------------------------------------------
// SPECIFIC FORMULAS
// (prefix "F" in variable names for "Formula")

var F_GPE = new Formula
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
	 
	 " (<a href=\"http://www.bbc.co.uk/education/guides/z4yj6sg/revision/2\" target=\"_blank\">bbc bitesize</a>) If you increase m, g or h you increase E<sub>p</sub>. This means that the equation for E<sub>p</sub> is: E<sub>p</sub> = m x g x h."
);

var F_KE = new Formula
(
	{"E<sub>k</sub>":"Kinetic Energy",
	 "m": "mass",
	 "v": "speed"
	},

	"E<sub>k</sub> = mv<sup>2</sup>/2",

	["E<sub>k</sub> = 2mv<sup>2</sup>",
	 "E<sub>k</sub> = vm<sup>2</sup>/2",
	 "E<sub>k</sub> = 2mv"
	 ],

	"(<a href=\"http://www.bbc.co.uk/education/guides/z4yj6sg/revision/1\" target=\"_blank\">bbc bitesize</a>) Kinetic energy is the energy an object possesses by virtue of its movement. The amount of kinetic energy possessed by a moving object depends on the mass of the object and its speed. The greater the mass and the speed of the object the greater its kinetic energy."
);

var F_WEIGHT = new Formula
(
	{"W":"weight",
	 "m":"mass",
	 "g":"gravitational acceleration"
	},

	"W = mg",

	["W = g/m",
	 "W = m/g",
	 "W = m + g"],

	 "(bbc bitesize: <a href=\"http://www.bbc.co.uk/education/guides/z4yj6sg/revision/2\" target=\"_blank\">here</a> and <a href=\"http://www.bbc.co.uk/education/guides/zgn82hv/revision/6\" target=\"_blank\">here</a>) The weight <i>W</i> of an object is a downward force of size <i>mg</i>. In lifting the object, you would have to pull upwards on it with a force equal in size to its weight: <i>mg</i>."
);

var F_NEWTON_2 = new Formula
(
	{"F":"Force",
	 "m":"mass",
	 "a":"acceleration"
	},

	"F = ma",

	["F = a/m",
	 "F = m/a",
	 "F = m + a",
	 ],

	"(<a href=\"http://www.bbc.co.uk/education/guides/zgn82hv/revision/4\" target=\"_blank\">bbc bitesize</a>) Newton's Second Law is concerned with unbalanced forces. Unbalanced forces produce acceleration. The greater the unbalanced force the greater the acceleration. This law is usually written as an equation: <i>F=ma</i>"
);

var F_Work = new Formula
(
	{"E_<sub>W</sub>":"Work done",
	 "F":"Force",
	 "d":"distance"
	},

	"E_<sub>W</sub> = Fd",

	["E_<sub>W</sub> = F/d",
	 "E_<sub>W</sub> = F+d",
	 "E_<sub>W</sub> = d/F"
	 ],

	 "(bbc bitesize: <a href=\"http://www.bbc.co.uk/education/guides/zgn82hv/revision/2\" target=\"_blank\">here</a> and <a href=\"http://www.bbc.co.uk/education/guides/z4yj6sg/revision/2\" target=\"_blank\">here</a>) When you move an object some distance, the amount of energy used is called the \"Work done\" and is the force used times the distance moved."
);

var F_QIt = new Formula
(
	{"Q":"Charge",
	 "I":"Current",
	 "t":"Time (duration)"
	},

	"Q = It",

	["Q = I/t",
	 "Q = t/I",
	 "Q = I + t"
	 ],

	 "(<a href=\"http://www.bbc.co.uk/education/guides/z9vqtfr/revision/2\" target=\"_blank\">bbc bitesize</a>) Current is defined by how much charge has been transferred per second, giving the relationship: <i>I=Q/t</i>. This can be rearranged to get <i>Q=It</i>"
);

var F_OHM_LAW = new Formula
(
	{"V":"Voltage",
	 "I":"Current",
	 "R":"Resistance"
	},

	"V = IR",

	["V = I/R",
	 "V = R/I",
	 "V = I+R"
	 ],

	 "(<a href=\"http://www.bbc.co.uk/education/guides/z8b2pv4/revision/1\" target=\"_blank\">bbc bitesize</a>) This known as Ohm's Law, and there is a nice explanation on the bbc bitesize page."
);

var F_PEt = new Formula
(
	{"P":"Power",
	 "E":"Energy",
	 "t":"Time (duration)"
	},

	"P = E/t",

	["P = Et",
	 "P = t/E",
	 "P = E + t"
	 ],

	 "(<a href=\"http://www.bbc.co.uk/education/guides/zdgmn39/revision/1\" target=\"_blank\">bbc bitesize</a>) The rate at which energy is transferred (or changed) is called Power: how much energy is used per second."
);

var F_PIV = new Formula
(
	{"P":"Power",
	 "I":"Current",
	 "V":"Voltage"
	},

	"P = IV",

	["P = I/V",
	 "P = V/I",
	 "P = I + t"
	 ],

	"(<a href=\"http://www.bbc.co.uk/education/guides/zdgmn39/revision/1\" target=\"_blank\">bbc bitesize</a>) The electrical energy transferred each second is found by multiplying voltage by current."
);

var F_PI2R = new Formula
(
	{"P":"Power",
	 "I":"Current",
	 "R":"Resistance"
	},

	"P = I<sup>2</sup>R",

	["P = IR",
	 "P = IR<sup>2</sup>",
	 "P = (IR)<sup>2</sup>"
	 ],

	"(<a href=\"http://www.bbc.co.uk/education/guides/zdgmn39/revision/1\" target=\"_blank\">bbc bitesize</a>) The electrical energy transferred each second is found by multiplying voltage by current: <i>P=IV</i>. If we don't know the voltage, we can use Ohm's Law <i>V = IR</i> with <i>P=IV</i> to get <i>P = I<sup>2</sup>R.</i>"
);

var F_PV2R = new Formula
(
	{"P":"Power",
	 "V":"Voltage",
	 "R":"Resistance"
	},

	"P = V<sup>2</sup>/R",

	["P = V/R",
	 "P = VR",
	 "P = V/R<sup>2</sup>"
	 ],

	"(<a href=\"http://www.bbc.co.uk/education/guides/zdgmn39/revision/1\" target=\"_blank\">bbc bitesize</a>) The electrical energy transferred each second is found by multiplying voltage by current: <i>P=IV</i>. If we don't know the Current, we can use Ohm's Law <i>V = IR</i> with <i>P=IV</i> to get <i>P = V<sup>2</sup>/R</i>"
);

var F_EmcDT = new Formula
(
	{"E<sub>h</sub>":"Heat Energy",
	 "m":"mass",
	 "c":"specific heat capacity",
	 "&Delta;T":"Temperature change"
	},

	"E<sub>h</sub> = mc&Delta;T",

	["E<sub>h</sub> = mc/&Delta;T",
	 "E<sub>h</sub> = &Delta;T/mc",
	 "E<sub>h</sub> = (m+c)&Delta;T"
	],

	"(<a href=\"http://www.bbc.co.uk/education/guides/zwrxsbk/revision/1\" target=\"_blank\">bbc bitesize</a>) When an object is heated or cooled, its temperature change depends on the mass of the object and the material it is made from. Heavier objects need more energy to raise their temperature, and the specific heat capacity tells us how difficult it is to raise the temperature of the material."
);

var F_pFA = new Formula
(
	{"p":"Pressure",
	 "F":"Force",
	 "A":"Area"
	},

	"p = F/A",

	["p = FA",
	 "p = A/F",
	 "p = F + A"
	],

	"(<a href=\"http://www.bbc.co.uk/education/guides/zjc6fg8/revision/1\" target=\"+_blank\">bbc bitesize</a>) Pressure is the force per unit area. This means that the pressure a solid object exerts on another solid surface is its weight in newtons divided by its area in square metres."
);

var F_pVT = new Formula
(
	{"p":"Pressure",
	 "V":"Volume",
	 "T":"Temperature"
	},

	"pV/T = constant",

	["pVT = constant",
	 "p/(VT) = constant",
	 "VT/p = constant"
	],

	DEFAULT_EXPLANATION
);

  // some other p,V,T ones can go here...

var F_dvt = new Formula
(
	{"d":"distance",
	 "v":"speed",
	 "t":"time"
	},

	"d = vt",

	["d = v/t",
	 "d = t/v",
	 "d = v + t"
	 ],

	 "(<a href=\"http://www.bbc.co.uk/education/guides/zbpk7ty/revision/1\" target=\"_blank\">bbc bitesize</a>) The distance you travel is how fast you travel time how long you travel for. If you travel for a longer time you will go a greater distance, and if you travel faster you will also go a greater distance."
);

var F_vflambda = new Formula
(
	{"v":"speed",
	 "f":"frequency",
	 "&lambda;":"wavelength"
	},

	"v = f&lambda;",

	["v = f/&lambda;",
	 "v = &lambda;/f",
	 "v = f+&lambda;"
	],

	DEFAULT_EXPLANATION
);

var F_Tf = new Formula
(
	{"T":"Period",
	 "f":"frequency"
	},

	"T = 1/f",

	["T = f",
	 "T = 1-f",
	 "T = f<sup>2</sup>"
	],

	DEFAULT_EXPLANATION
);

var F_ANt = new Formula
(
	{"A":"Activity",
	 "N":"Number of counts/decays/ionisations",
	 "t":"Time (taken to measure counts)"
	},

	"A = N/t",

	["A = Nt",
	 "A = t/N",
	 "A = N+t"
	 ],

	 DEFAULT_EXPLANATION
);

var F_DEm = new Formula
(
	{"D":"Absorbed Dose",
	 "E":"Energy Absorbed",
	 "m":"Mass"
	},

	"D = E/m",

	["D = Em",
	 "D = m/E",
	 "D = E + m"
	 ],

	DEFAULT_EXPLANATION
);

var F_HDw = new Formula
(
	{"H":"Equivalent Dose",
	 "D":"Absorbed Dose",
	 "w<sub>R</sub>":"Radiation weighting factor",
	},

	"H = Dw<sub>R</sub>",

	["H = D+w<sub>R</sub>",
	 "H = D/w<sub>R</sub>",
	 "H = w<sub>R</sub>/D"
	 ],

	 DEFAULT_EXPLANATION
);

// --------------------------------------------------------------
// ACTIVE FORMULA LIST

ACTIVE_FORMULAS = [F_GPE, 
				   F_KE,
				   F_WEIGHT,
				   F_NEWTON_2,
				   F_Work,
				   F_QIt,
				   F_OHM_LAW,
				   F_PEt,
				   F_PIV,
				   F_PI2R,
				   F_PV2R,
				   F_EmcDT,
				   F_pFA,
				   F_pVT,
				   F_dvt,
				   F_vflambda,
				   F_Tf,
				   F_ANt,
				   F_DEm,
				   F_HDw
				   ];

var getShuffledFormulas = function()
{
	return shuffle(ACTIVE_FORMULAS);
};