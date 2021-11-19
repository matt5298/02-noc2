	/*
							 animate a sine wave
							 creates two separate sine waves
							 and then a third that's the addition of the others.
							 
							 can modify for each primary wave:
							 -y axis center on display
							 -frequency
							 -speed scrolling accross display 
							 
							 */

							//variables
							var y = 0;
							var y2 = 0;
							var y3 = 0;
							var y4 = 0;
							var angle=0;
							var angle2=0;
							var angle3=0;
							var angle4=0;
							var angleIncrement = -.015;
							var angleIncrement2 = -.005;
							var angleIncrement3 = .0060;
							var angleIncrement4 = .0275;
							var xscale = 0;
							var xscale2 = 0;
							var xscale3 = 0;
							var xscale4 = 0;
							var primaryOn = 0;
							var yp0 = 0;
							var yp1 = 0;
							var yp2 = 0;
							var yp = [];


							setup = function()
								{ 
									  createCanvas(1200,300);
									  background(50,180,255);
									  xscale = 7/width;
									  xscale2 = 6/width;
									  xscale3 = 8/width;
									  xscale4 = 15/width;
									  // frameRate(10);

								};


							draw = function()
								{
								  //reset background
								  background(50,180,255,100);
                  // background (0,100);
								  //increment angle for sin function each loop
								  angle+=angleIncrement;
								  angle2+=angleIncrement2;
								  angle3+=angleIncrement3;
								  angle4+=angleIncrement4;

								  //go through all pixels from left to write
								  for (var x=0;x<width;x+=1)
								  {
									y = floor(((height/3)-5)+(sin((x*xscale)+angle)*((height/4)-10)));
									y2 = floor(((height/3)-5)+(sin((x*xscale2)+angle2)*((height/4)-10)));
									y3 = floor(((height/3)-5)+(sin((x*xscale3)+angle3)*((height/4)-10)));
									y4 = floor(((height/3)-5)+(sin((x*xscale4)+angle4)*((height/4)-10)));
									//calculate points
									yp[0] = floor((abs(y2)+abs(y3)+abs(y4))/2);     
									yp[1] = floor((abs(y)+abs(y3))/1);
									yp[2] = floor((abs(y2)+abs(y))/1);
									
									//fill in the waves
									// stroke(50,128,100,200);
									stroke(100,200);
                  yp = sort(yp);
									line(x,yp[0]+1,x,yp[1]-1);
									stroke(0,200);
									line(x,yp[1]+1,x,yp[2]-1);
									stroke(200,200);
									line(x,yp[2]+1,x,height);

									//Draw primary sin waves
									if (primaryOn == 1)
									{
									  stroke(255,0,0);
									  point(x,y);
									  stroke(0,255,0);
									  point(x,y2);
									  stroke(0,0,255);
									  point(x,y3);
									  stroke(0,255,255);
									  point(x,y4);
									}

									//draw points for waves
									stroke(255,255,255);    
									point(x,yp[0]);  //divide by # of waves added to keep it exactly where primary sin waves are
									point(x,yp[1]);  //divide by # of waves added to keep it exactly where primary sin waves are
									point(x,yp[2]);  //divide by # of waves added to keep it exactly where primary sin waves are
											//divide by 1 to make it full addition.  adjust to 1.1 or other to keep in display  
								  						
								};		
							};	