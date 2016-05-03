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
	 
	 "If you increase m, g or h you increase E<sub>p</sub>.</br>This means that the equation for E<sub>p</sub></br> is: E<sub>p</sub> = m x g x h."
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

	DEFAULT_EXPLANATION
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

	 DEFAULT_EXPLANATION
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

	DEFAULT_EXPLANATION
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

	 DEFAULT_EXPLANATION
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

	 DEFAULT_EXPLANATION
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

	 DEFAULT_EXPLANATION
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

	 DEFAULT_EXPLANATION
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

	DEFAULT_EXPLANATION
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

	DEFAULT_EXPLANATION
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

	DEFAULT_EXPLANATION
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

	DEFAULT_EXPLANATION
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

	DEFAULT_EXPLANATION
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

	 DEFAULT_EXPLANATION
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