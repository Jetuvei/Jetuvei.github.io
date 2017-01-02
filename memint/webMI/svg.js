



// Methods below  adapted from code (c) John Whitehouse 2015

//-------------------------------------------------------------------------------------------------
// Draw text to draw rectangle
//-------------------------------------------------------------------------------------------------
RectToSVG = function (x, y, w, h, fill, stroke)
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
//-------------------------------------------------------------------------------------------------
// SVG text to draw a line
//-------------------------------------------------------------------------------------------------
LineToSVG = function (x1, y1, x2, y2, stroke)
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

//-------------------------------------------------------------------------------------------------
// SVG text to draw a line
//-------------------------------------------------------------------------------------------------
DashedLineToSVG = function (x1, y1, x2, y2, stroke)
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