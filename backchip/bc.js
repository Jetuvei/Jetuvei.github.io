// ============================================================================
// Javascript `back-chip' Simulation
// (c) Justin Whitehouse 2017
// www.justinwhitehouse.co.uk
// ============================================================================

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------

var L_MIN = 2;
var L_MAX = 1024;
var N_MIN = 2;
var N_MAX = 512;
var a_MIN = 1;
// a_max = N;
var b_MIN = 0;

var MIN_DRAW_HEIGHT = 10;

function myTestClass()
{
	this.data = "Hello World!";
}

// ----------------------------------------------------------------------------
// Initialise Simulation
//
// Notes:
//
// -- notation:
//
//    horiz. position <--> x
//    vert. position  <--> y
//
// -- parameters:
//
//        L <--> number of sites (horizontal)
//        N <--> number of particles (and max possible height)
//        b <--> hop rate parameter
//    alpha <--> how rate parameter (default 1)
//        a <--> back-chip threshold size (default 1)
//
//        u <--> hop prob
//
// -- formulas:
//
//    u(n) = (1 + b / (n^alpha)) / ( 1 + b )
//    u(1) = 1
//
// ----------------------------------------------------------------------------
function BCsim (L, N, b, a, alpha)
{
	// debug
	console.log("DEBUG: BCsim initialisation");

	// check parameters allowed

	if ( L < L_MIN || L > L_MAX )
	{
		console.log("Invalid parameter: L");
		throw "Invald parameter: L";
	}
	if ( N < N_MIN || N > N_MAX )
	{
		throw "Invalid parameter: N";
		console.log("Invalid parameter: N");
	}
	if ( a < a_MIN || a > N )
	{
		throw "Invalid parameter: a";
		conosle.log("Invalid parameter: a");
	}
	if ( b < b_MIN )
	{
		throw "Invalid parameter: b";
		console.log("Invalid parameter: b");
	}

	// properties

	this.L = L;
	this.N = N;
	this.b = b;
	this.a = a;
	this.alpha = alpha;

	this.heights = new Array(this.L);
	this.maxOccupancy = 0;

	// constants

	this.U1 = 1 + this.b

	// initial configuration (random)

	for( var i = 0; i < this.L; i++)
	{
		this.heights[i] = 0;
	}
	for( var j = 0; j < this.N; j++)
	{
		this.heights[Math.floor(Math.random()*this.L)] += 1;
	}

	// more properties

	this.occupiedSites = this.getOccupiedSitesArray(this.heights);
	this.updateMaxOccupancy();
}

// ----------------------------------------------------------------------------
// Hop Rates
// ----------------------------------------------------------------------------

BCsim.prototype.u = function(n)
{
	return (1 + this.b / Math.pow(n,this.alpha)) / this.U1;
}

BCsim.prototype.u_ALPHA1 = function(n)
{
	return (1 + this.b / n ) / this.U1;
}

// ----------------------------------------------------------------------------
// Access
// ----------------------------------------------------------------------------

// -- set --

BCsim.prototype.setL = function(L)
{
	if ( L < L_MIN || L > L_MAX )
	{
		return false;
	}
	else
	{
		this.L = L;
		return true;
	}
}

BCsim.prototype.setN = function(N)
{
	if ( N < N_MIN || N > N_MAX )
	{
		return false;
	}
	else
	{
		this.N = N;
		return true;
	}
}

BCsim.prototype.setb = function(b)
{
	if ( b < b_MIN )
	{
		return false;
	}
	else
	{
		this.b = b;
		this.U1 = 1 + this.b;
		return true;
	}
}

BCsim.prototype.seta = function(a)
{
	console.log("set a is disabled for now.");
	return false;
}

BCsim.prototype.setalpha = function(A)
{
	console.log("set alpha is disabled for now.");
	return false;
}

BCsim.prototype.setHeight = function(site, h)
{
	this.heights[site%this.heights.length] = h;
}

BCsim.prototype.incrementHeight = function(site, incr)
{
	var index = site%this.heights.length;
	this.heights[index] += incr;
}

// -- get --

BCsim.prototype.getL = function()
{
	return this.L;
}

BCsim.prototype.getN = function()
{
	return this.N;
}

BCsim.prototype.getb = function()
{
	return this.b;
}

BCsim.prototype.geta = function()
{
	return this.a;
}

BCsim.prototype.getalpha = function()
{
	return this.alpha;
}

BCsim.prototype.getHeight = function(site)
{
	return this.heights[site];
}

BCsim.prototype.getMaxOccupancy = function()
{
	return this.maxOccupancy;
}

BCsim.prototype.updateMaxOccupancy = function()
{
	this.maxOccupancy = 0;
	for(var i = 0; i < this.occupiedSites.length; i++)
	{
		if(this.heights[this.occupiedSites[i]] > this.maxOccupancy)
		{
			this.maxOccupancy = this.heights[this.occupiedSites[i]];
		}
	}
	var success = false;
	if(this.maxOccupancy > 0)
	{
		success = true;
	}
	else
	{
		success = false;
	}
	return success;
}

// ----------------------------------------------------------------------------
// Occupied sites array
// ----------------------------------------------------------------------------

BCsim.prototype.getOccupiedSitesArray = function(sites_array)
{
	var num_sites = sites_array.length;
	var occupiedSites = [];

	for (var i = 0; i < num_sites; i++)
	{
		if(sites_array[i] != 0){
			occupiedSites.push(i);
		}
	}

	return occupiedSites;
}


/** what is the function of the occupiedSites array?
 */	
BCsim.prototype.updateOccupiedSitesArray = function(updatePos, isBackchip)
{
	if (! isBackchip)
	{
		if(this.occupiedSites[updatePos] + 1 != this.occupiedSites[updatePos+1])
		{
			this.occupiedSites[updatePos] += 1;	
		}
		else
		{
			this.occupiedSites.pop(updatePos); // check this is right when you next have internet access!
		}
	}
	else
	{
		if(this.occupiedSites[updatePos] + 1 != this.occupiedSites[updatePos+1])
		{
			this.occupiedSites.splice(updatePos + 1, 0, this.occupiedSites[updatePos] + 1);
		}
		//else: pass
	}
}

// ----------------------------------------------------------------------------
// Iterate
// ----------------------------------------------------------------------------

BCsim.prototype.DoIterations = function(num_iters)
{
	console.log("DEBUG: hit BCsim.DoIterations!");

	for (var i = 0; i < num_iters; i++)
	{
		// 1. pick a site at random 
		var updateSite = Math.floor(Math.random() * this.heights.length);
		var n = this.heights[updateSite];

		// 2. try a hop from this site
		// 3. if hop, update occupied sites list.
		if(n > 0){
			if (n == 1) // extension: n <= a
			{	
				// remember: u(1) = 1
				this.incrementHeight(updateSite, -1);
				this.incrementHeight(updateSite + 1, 1);
				
				this.updateOccupiedSitesArray(updateSite, false);
			}
			else
			{	
				var hopRand = Math.random();
				console.log("DEBUG: n = " + n.toString());
				console.log("DEBUG: u(n) = " + this.u(n).toString());
				console.log("DEBUG: hopRand = " + hopRand.toString());

				if (hopRand < this.u(n))
				{
					this.incrementHeight(updateSite, -(n-1));
					this.incrementHeight(updateSite + 1, (n-1));
				
					this.updateOccupiedSitesArray(updateSite, true);
				}
				else
				{
					console.log("DEBUG: occupied but no hop.");
				}
			}	
		}
	}
	var debug_str = "";
	for(var i =0; i < this.heights.length; i++)
	{
		debug_str += this.heights[i].toString() + ".";
	}
	console.log(debug_str);
}

// ============================================================================
// DRAW
// ============================================================================

BCsim.prototype.Draw = function(picture)
{
	console.log("DEBUG: hit BCsim.Draw!")
    picture.innerHTML = this.BCtoSVG();
}

BCsim.prototype.BCtoSVG = function()
{
	var draw_ymin = 0;
    var draw_ymax = this.N;

	// Physical size

    var svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"640\" height=\"256\"";

    // Data range: x y width height

    svg += "viewBox=\"0," + draw_ymin + "," + this.L + "," + draw_ymax + "\" preserveAspectRatio=\"none\">";
    svg += BCsim.RectToSVG (0, draw_ymin, this.L, draw_ymax, "none", "black");

    // Draw occupancies of sites

    for(var i = 0; i < this.L; i++)
    {
    	svg += BCsim.RectToSVG (i, draw_ymax-this.heights[i], 1, this.heights[i], "blue", "black");	
    }
    
    svg += "</svg>";
    return svg;
}

// ----------------------------------------------------------------------------
// Draw functions
//
// Rectangle (c) John Whitehouse 2015
// ----------------------------------------------------------------------------

// -- Rectangle

BCsim.RectToSVG = function (x, y, w, h, fill, stroke)
{
    var svg = "<rect stroke-width=\"1\" vector-effect=\"non-scaling-stroke\"";

    svg += " fill=\"" + fill + "\"";
    svg += " stroke=\"" + stroke + "\"" ;
    svg += " x=\"" + x + "\"" ;
    svg += " y=\"" + y + "\"" ;
    svg += " width=\"" + w + "\"" ;
    svg += " height=\"" + h + "\"" ;
    svg += "/>";

    return svg;
}









