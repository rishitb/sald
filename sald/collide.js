function Point(x, y) {
  this.x = x;
  this.y = y;
}
var myArray = [];
var distances=[];
/* Circle vs Circle
 * INPUT: two circles specified by position and radius:
 *  c1 = {x:, y:, r:}, c2 = {x:, y:, r:}
 * RETURN VALUE:
 *  false if c1 and c2 do not intersect
 *  true if c1 and c2 do intersect
 */
function circleCircle(c1,c2) {
	var distance=Math.sqrt(Math.pow((c1.y-c2.y),2)+Math.pow((c1.x-c2.x),2))
	if(distance<(c1.r+c2.r))
		return true;
	else
		return false;
}

/* Rectangle vs Rectangle
 * INPUT: rectangles specified by their minimum and maximum extents:
 *  r = {min:{x:, y:}, max:{x:, y:}}
 * RETURN VALUE:
 *  false if r1 and r2 do not intersect
 *  true if r1 and r2 do intersect
 */
function rectangleRectangle(r1, r2) {
	if((r1.min.x<r2.max.x)&&(r1.max.x>r2.min.x)&&(r1.max.y>r2.min.y)&&(r1.min.y<r2.max.y))
	{
		return true;
	}
	else
		return false;
}

/* Convex vs Convex
 * INPUT: convex polygons as lists of vertices in CCW order
 *  p = [{x:,y:}, ..., {x:, y:}]
 * RETURN VALUE:
 *  false if p1 and p2 do not intersect
 *  true if p1 and p2 do intersect
 */
function convexConvex(p1, p2) {
	
	for(var i=0;i<p1.length;++i)
	{
		var p11=p1[i];
		var p12=p1[(i+1)%length];
		var newray={x:p11,y:p12};
		rayConvex(newray,p2);
	}
	
	for(var i=0;i<myArray.length;++i)
	{
		if(myArray[i]>0);
			return true;
			break;
	}
	return false;
}

/* Rav vs Circle
 * INPUT: ray specified as a start and end point, circle as above.
 *  ray = {start:{x:, y:}, end:{x:, y:}}
 *  c = {x:, y:, r:}
 * RETURN VALUE:
 *  null if no intersection
 *  {t:} if intersection
 *    -- NOTE: 0.0 <= t <= 1.0 gives the position of the first intersection
 */
function rayCircle(r, c) {
	var a=((r.end.x-r.start.x)*(r.end.x-r.start.x))+((r.end.y-r.start.y)*(r.end.y-r.start.y));
	var b=2*((r.end.x-r.start.x)(r.start.x-c.x)+(r.end.y-r.start.y)(r.start.y-c.y));
	var cir=(c.x*c.x)+(c.y*c.y)+(r.start.x*r.start.x)+(r.start.y*r.start.y)-2*(c.x*r.start.x+c.y*r.start.y)-c.r*c.r;
	
	var root=b*b-4*a*cir;
	
	if(root<0)
	{
		return null;		//outside=no intersection
	}
	
	else if(root==0)		//tangent
	{
		
	}
	else
	{
		var e=Math.sqrt(root);
		var root1=(-b+e)/(2*a);
		var root2=(-b-e)/(2*a);
		
		if((root1<0||root1>1)&&(root2<0||root2>1))
		{
			if((root1<0&&root2<0)||(root1>1&&root2>1))
			{
				return null;
			}
			else
			return null; 		//Line completely inside
		}
		else
		{
			if(root1>=0&&root1<=1)
				myArray.push(a1.lerp(a2,root1));
				
			if(roo21>=0&&root2<=1)
				myArray.push(a1.lerp(a2,root2));	
		}
	}
	
	return null;
}

/* Rav vs Rectangle
 * INPUT: ray as above, rectangle as above.
 *  ray = {start:{x:, y:}, end:{x:, y:}}
 * RETURN VALUE:
 *  null if no intersection
 *  {t:} if intersection
 *    -- NOTE: 0.0 <= t <= 1.0 gives the position of the first intersection
 */
function rayRectangle(r, b) {
	
	var botleft={x:b.min.x,y:b.min.y};
	var botright={x:b.max.x,y:b.min.y};
	var topleft={x:b.min.x,y:b.max.y};
	var topright={x:b.max.x,y:b.max.y};
	
	 LineLine(r.start,r.end,botleft,topleft);		//leftedge
	 LineLine(r.start,r.end,botright,topright);		//rightedge
	 LineLine(r.start,r.end,botleft,botright);		// bottomedge
	 LineLine(r.start,r.end,topleft,topright);		//topedge
	
	if(myArray.length==0)
	{
		return null;
	}
	else
	{
		for (var i=0;i<myArray.length;i++)
		{
			if(myArray[i]!=0)
			{
				var distance=Math.sqrt(Math.pow(r.start.x-(myArray[i].x),2)+Math.pow(r.start.y-(myArray[i].y),2));
				distances.push(distance);
			}
		}
	}
	var mindist=Math.min(distances[0],distances[1]);		//ray can intersect rectangle only at 2 points, taking min of that
	var raylength=Math.sqrt(Math.pow(r.start.x-r.end.x,2)+Math.pow(r.start.y-r.end.y,2));					
	var t=mindist/raylength;						//minimum distance divided by the total length of ray gives us t
	return(t);
	
}

/* Rav vs Convex
 * INPUT: ray as above, convex polygon as above.
 * RETURN VALUE:
 *  null if no intersection
 *  {t:} if intersection
 *    -- NOTE: 0.0 <= t <= 1.0 gives the position of the first intersection
 */
function rayConvex(r, p) {
	
	for(var i=0;i<p.length;++i)
	{
		var point1 = p[i];
        var point2 = p[(i+1) % p.length];
		LineLine(r.start,r.end,point1,point2);
	}
	
	if(myArray.length==0)
	{
		return null;
	}
	else
	{
		for (var i=0;i<myArray.length;i++)
		{
			if(myArray[i]!=0)
			{
				var distance=Math.sqrt(Math.pow(r.start.x-(myArray[i].x),2)+Math.pow(r.start.y-(myArray[i].y),2));
				distances.push(distance);
			}
		}
	}
	var mindist=Math.min(distances[0],distances[1]);					//ray can intersect polygon only at 2 points, taking min of that
	var raylength=Math.sqrt(Math.pow(r.start.x-r.end.x,2)+Math.pow(r.start.y-r.end.y,2));					
	var t=mindist/raylength;											//minimum distance divided by the total length of ray gives us t
	return(t);
}

//Checking intersection between two lines
function LineLine(a1,a2,b1,b2)
{
	var result;
	var num1=(b2.x-b1.x)*(a1.y-b1.y)-(b2.y - b1.y) * (a1.x - b1.x);
	var num2=(a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
	var denom=(b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
	
	if(denom!=0)
	{
		var nd1=num1/denom;
		var nd2=num2/denom;
		
		if(nd1>=0&&nd1<=1&&nd2>=0&&nd2<=1)
		{
			 myArray.push(new Point(a1.x+nd1*(a2.x-a1.x),a1.y+nd1*(a2.y-a1.y)));
		}
			else
			{myArray.push(0);}
	}
		else
		{
			if(num1==0 ||num2==0)
			{
				//co incident ?
				}
				else
				{
					myArray.push(0); // parallel==no intersection
					}
		}
		
}


module.exports = {
	circleCircle: circleCircle,
	rectangleRectangle: rectangleRectangle,
	convexConvex: convexConvex,
	rayCircle: rayCircle,
	rayRectangle: rayRectangle,
	rayConvex: rayConvex
};
