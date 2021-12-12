
		// Declare variables
		var xp = 0;
		var lvl = 0;
		var xpreq = 5;
		var rectvis=0;
		var rectrnd=0;

		// Create the main canvas
		var stage = new Kinetic.Stage({
			container: 'gamebox', // Find an HTML element
			width: 523, // Set width
			height: 499 // Set heigth
		});
		
		// Spawn cubes
		var myVar=setInterval(function(){myTimer()},100); // SetInterval will play function myTimer every 10 second
			var g1 = new Kinetic.Layer({
				x:-1111,
				y:-1111,
				}); 
			g1.draw(); // Update
			var rect = new Kinetic.Rect({ // Creates the cube
				width: 25, // Width of the cube
				height: 25, // Height of the cube
				fill: 'green', // Color of the cube
			});
			g1.add(rect);
		
		function myTimer(){
		  document.getElementById("xp").innerHTML = "xp: " + xp; // Update the xp
		  document.getElementById("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
		  document.getElementById("xpreq").innerHTML = "xpreq: " + xpreq; // Update the xpreq
		  document.getElementById("progressbar").style.width = (xp / xpreq)*100 + "%"; 
		  document.getElementById("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
  
		  if (xp > (xpreq-1))
		  {
			  xp = xp-xpreq; // Reset xp
			  xpreq = xpreq*2; // Increase the xpreq
			  lvl = ++lvl; // Gain a lvl
		  }
			  
			  rectrnd=Math.floor((Math.random()*1000)+1)
			  if (rectvis > 0)
			  {
				  rectvis=--rectvis;
				  if (rectvis ==0)
				  {
					  g1.setPosition({x: -1111, y: -1111});
					  g1.draw(); // Update
					  stage.add(g1); // add the layer to the stage
				  }
			  }
			  
		  if (rectrnd > 980 && rectvis==0){
			  rectvis=50
			  g1.setPosition({x: Math.floor((Math.random()*463)+20), y: Math.floor((Math.random()*439)+20)});
			  stage.add(layer); // add the layer to the stage
		  }
		} //End Of myTimer
		
			
			// Mouse over code
			g1.on('mouseover', function() {
				rectvis=0;
				xp = ++xp; // Gain 1 xp for each cube
				g1.setPosition({x: -1111, y: -1111});
				g1.draw(); // Update
				stage.add(g1);//This line is needed for good response time
			});
		