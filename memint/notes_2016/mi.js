// ============================================================================
// Javascript Membrane-Interface Simulation
// (c) Justin Whitehouse 2016
// www.justinwhitehouse.co.uk
// ============================================================================

var L_MIN = 4;
var L_MAX = 1024;
var INITIAL_MEMBRANE_SHIFT = 0;

var DEBUG_MSG = "Hello World! Can you hear me??"
// ----------------------------------------------------------------------------
// Initialise Simulation
//
// Notes:
//
// -- notation:
//
//    slope        <--> x
//    saved height <--> h
//    true height  <--> y = h + membrane_shift
//
// -- height mapping:
//
//    index:  0 1 2 3 4 5 6 7
//    slopes: 0 1 0 1 0 1 0 1
//    heights: 1 0 1 0 1 0 1 0
// 
//    y0 = 1
//    y1 = y0 + 2*x0 - 1 = 1 + 0 - 1 = 0
//    
//    y{i+1} = y{i} + 2x{i} - 1
//
// -- L even:
//    
//    need L even for periodic boundaries. 
//
// ----------------------------------------------------------------------------
function MIsim (L,p,u)
{
	// check parameters are allowed

	if ( L%2 != 0 ){
		++ L;
	}
	if (  L < L_MIN || L > L_MAX || p < 0 || p > 1 || u < 0 || u > 1)
	{
		throw "Invalid parameter";
	}

	// properties

	this.L = L;
	this.slopes = new Array (L);
	this.heights = new Array (L);
	this.height_counts = {};
	this.membrane_shift = INITIAL_MEMBRANE_SHIFT;

	this.p = p;
	this.u = u;

	this.MEMBRANE_PROB = 1.0 / (this.L/2 + 1.0);

	// initial configuration is flat interface {0,1,0,1,0,1,0,1,...}

	for (var i = 0; i < this.L; i++)
	{
		this.slopes[i] = i%2;
		this.heights[i] = (i+1)%2;
	}
	this.height_counts[0] = this.L/2;
	this.height_counts[1] = this.L/2;

	// more properties

	this.min_h = 0;
	this.max_h = 1;

	this.sum_h = this.L/2;  // These depend on specific initial setup.
	this.sum_h2 = this.L/2; // (ditto)

    this.avg_h = this.sum_h/this.L;
    this.avg_h2 = this.sum_h2/this.L;

    this.avg_y = this.avg_h + this.membrane_shift;
    this.avg_y2 = this.avg_h2 + this.membrane_shit * (2 * this.avg_h + this.membrane_shift);

    this.sd = Math.sqrt(this.avg_y2 - this.avg_y*this.avg_y);

    // debug param
    this.debug_param = null;

}
// ----------------------------------------------------------------------------
// DEBUG
// ----------------------------------------------------------------------------
MIsim.prototype.Debug = function()
{
	alert("MIsim Debug");
}
// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------
MIsim.MIN_DRAW_HEIGHT = 10;
// ----------------------------------------------------------------------------
// Access
// ----------------------------------------------------------------------------

// -- GET heights

MIsim.prototype.getHeightCount = function(h)
{
	if (this.height_counts.hasOwnProperty(h))
	{
		return this.height_counts[h];
	}
	else
	{
		return 0;
	}
}
MIsim.prototype.getTrueHeightCount = function(y)
{
	var h = y - this.membrane_shift;
	return this.getHeightCount(h);
}
MIsim.prototype.getHeight = function(i)
{
	return this.heights[i%this.L];
}
MIsim.prototype.getTrueHeight = function(i)
{
	return this.membrane_shift + this.getHeight(i);
}
MIsim.prototype.getMaxy = function()
{
        return this.max_h + this.membrane_shift;
}
MIsim.prototype.getMiny = function()
{
        return this.min_h + this.membrane_shift;
}

// -- slopes

MIsim.prototype.getSlope = function(i)
{
        while(i<0)
        {
	    i += this.L;
	}
        return this.slopes[i%this.L];
}
MIsim.prototype.setSlope = function(i,s)
{
    while(i<0)
    {
	i += this.L;
    }
    this.slopes[i%this.L] = s;
}

// -- SET probs 

MIsim.prototype.Setp = function(p)
{
	if(p < 0 || p > 1){
		return false;
	}
	else{
		this.p = p;
		return true;
	}
}
MIsim.prototype.Setu = function(u)
{
	if(u < 0 || u > 1){
		return false;
	}
	else{
		this.u = u;
		return true;
	}
}

// -- DEBUG

MIsim.prototype.setDebugParam = function(set_as)
{
	this.debug_param = set_as;
}
MIsim.prototype.getDebugParam = function()
{
	return this.debug_param;
}
// ----------------------------------------------------------------------------
// Update height counts
// ----------------------------------------------------------------------------
MIsim.prototype.UpdateCounts = function(h_add, h_remove)
{

	// h_add

	if (h_add > this.max_h)
	{
		this.max_h = h_add;
		this.height_counts [h_add] = 1;
	}
	else if (h_add < this.min_h)
	{
		this.min_h = h_add;
		this.height_counts [h_add] = 1;
	}
	else{
		++ this.height_counts [h_add];
	}

	// h_reduce

    if ((-- this.height_counts [h_remove]) == 0)
    {
        if (h_remove == this.min_h)
        {
            ++ this.min_h;
            delete this.height_counts [h_remove];
        }
        else if (h_remove == this.max_h)
        {
            -- this.max_h;
            delete this.height_counts [h_remove];
        }
    }

    // sum h and sum h^2

    this.sum_h += h_add - h_remove;
    this.sum_h2 += h_add * h_add - h_remove * h_remove;

}
// ----------------------------------------------------------------------------
// Update averages
// ----------------------------------------------------------------------------
MIsim.prototype.UpdateAverages = function()
{
        this.avg_h = this.sum_h*1.0/this.L;
        this.avg_h2 = this.sum_h2*1.0/this.L;

        this.avg_y = this.avg_h +  this.membrane_shift;
        this.avg_y2 = this.avg_h2 + this.membrane_shift*(2*this.avg_h + this.membrane_shift);

        this.sd = Math.sqrt(this.avg_y2 - this.avg_y*this.avg_y);
}
// ----------------------------------------------------------------------------
// Iterate
//
// Notes:
// 
// -- hops:
// 
//    y[i+1] = y[i] + 2x[i] - 1
//    
//    so:
//    if particle at i hops FORWARDS: y[i+1] -= 1
//    if particle at i hops BACKWARDS: y[i] += 1
// ----------------------------------------------------------------------------
MIsim.prototype.DoIterations = function(num_iters)
{

	for (var i = 0; i < num_iters; i++)
	{

		// membrane event
		if (Math.random() < this.MEMBRANE_PROB)
		{
			// up
			if (Math.random() < this.u){
				++ this.membrane_shift;				
			}

			// down
			else{
				if (this.getTrueHeightCount(0) == 0) {
					-- this.membrane_shift;
				}
			}
		}

		// interface event
		else
		{
			// select a particle in slopes array

			var active_site = Math.floor (Math.random() * this.L);
			while(this.slopes[active_site]==0)
			{
				active_site = Math.floor (Math.random() * this.L);
			}

			// generate a hop

			// --> backwards
			if (Math.random() >= this.p)
			{
				if (this.getSlope(active_site-1) == 0)
				{
					this.setSlope(active_site,0);
					this.setSlope(active_site-1,1);

					var old_h = this.heights[active_site];
					var new_h = old_h + 2;

					this.heights[active_site] = new_h;

					this.UpdateCounts(new_h,old_h);
				}
			}

			// --> forwards
			else{
				if(this.slopes[(active_site+1)%this.L] == 0 && this.getTrueHeight(active_site+1) > 1) // can i optimize with slightly differnt logic?
				{
					
					this.slopes[active_site] = 0;
					this.slopes[(active_site+1)%this.L] = 1;

					var old_h = this.heights[(active_site+1)%this.L];
					var new_h = old_h - 2;

					this.heights[(active_site+1)%this.L] = new_h;

					this.UpdateCounts(new_h,old_h);
				}
			}
		}
	}
}
// ============================================================================
// DRAW
// ============================================================================
MIsim.prototype.Draw = function(picture)
{
    this.UpdateAverages();

    picture.innerHTML = this.MIToSVG();
}
// ----------------------------------------------------------------------------
// Draw functions
//
// Rectangle, Line, Dashed Line (c) John Whitehouse 2015
// ----------------------------------------------------------------------------

// -- Rectangle

MIsim.RectToSVG = function (x, y, w, h, fill, stroke)
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

// -- Line

MIsim.LineToSVG = function (x1, y1, x2, y2, stroke)
{
    var svg = "<line ";
    svg += " x1=\"" + x1 + "\"";
    svg += " y1=\"" + y1 + "\"";
    svg += " x2=\"" + x2 + "\"";
    svg += " y2=\"" + y2 + "\"";
    svg += " stroke=\"" + stroke + "\" stroke-width=\"1\" vector-effect=\"non-scaling-stroke\"";
    svg += "/>\n";

    return svg;
}

// -- Dashed Line

MIsim.DashedLineToSVG = function (x1, y1, x2, y2, stroke)
{
    var svg = "<line ";
    svg += " x1=\"" + x1 + "\"";
    svg += " y1=\"" + y1 + "\"";
    svg += " x2=\"" + x2 + "\"";
    svg += " y2=\"" + y2 + "\"";
    svg += " stroke=\"" + stroke + "\" stroke-width=\"1\" stroke-dasharray=\"5,5\" vector-effect=\"non-scaling-stroke\"";
    svg += "/>\n";

    return svg;
}
//------------------------------------------------------------------------------
// Draw MI
//
// NOTES:
//
// -- Convert to SVG
// -- we fit the whole pattern into a 640 x 256 image
//
// -- coordinate system:
//
//    @-----------------> x
//    |
//    |
//    |
//    |
//    v
//    y
//------------------------------------------------------------------------------
MIsim.prototype.MIToSVG = function ()
{
    var membrane_draw_width = 2;
    var draw_ymin = 0;
    var draw_ymax = this.getMaxy() + membrane_draw_width;
    var draw_height = Math.max(draw_ymax - draw_ymin, MIsim.MIN_DRAW_HEIGHT);

    // Physical size

    var svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"640\" height=\"256\"";

    // Data range: x y width height

    svg += "viewBox=\"0," + draw_ymin + "," + this.L + "," + draw_height + "\" preserveAspectRatio=\"none\">";
    svg += MIsim.RectToSVG (0, draw_ymin, this.L, draw_height, "none", "black");

    // the membrane block

    svg += MIsim.RectToSVG (0, 0, this.L, membrane_draw_width, "green", "black");

    // the interface

    svg += "<polyline stroke=\"black\" fill=\"none\" stroke-width=\"1\" vector-effect=\"non-scaling-stroke\" points=\"";
    svg += "0," + String(membrane_draw_width + this.getTrueHeight(0));

    for (var i = 1 ; i < this.L ; ++i)
    {
        svg += "," + i + "," + String(membrane_draw_width + this.getTrueHeight(i));
    }
    svg += "\"/>";

    // average y

    var draw_avg_y = membrane_draw_width + this.avg_y

    svg += MIsim.LineToSVG (0, draw_avg_y, this.L, draw_avg_y, "red");

    var r1 = membrane_draw_width + this.avg_y + this.sd;
    var r2 = membrane_draw_width + this.avg_y - this.sd;

    svg += MIsim.DashedLineToSVG (0, r1, this.L, r1, "red");
    svg += MIsim.DashedLineToSVG (0, r2, this.L, r2, "red");

    svg += "</svg>";
    return svg;
}
