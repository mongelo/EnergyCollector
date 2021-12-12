/* THOUGHTS AND STUFF
 * skapa en function för random, blir lättare att redigera i framtiden
 *
 *
*/
		/*=================================================================================
		 MISC HELPER FUNCTIONS
		==================================================================================*/
		function l(what){return document.getElementById(what);} // This will make my life so much easier

		/*=================================================================================
		 Cookies NOM NOM
		 =================================================================================*/
		 
		if(document.cookie != "") //Is there a stored cookie?
		{
			var cookie_data=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			var temp = document.cookie;
			temp = temp.substring(temp.indexOf("kaka")+5,temp.length);
			splitted = temp.split(":");// Creates a vector with the stored cookie data in each element.

			for (var i=0;i<cookie_data.length;i++)
			{
				cookie_data[i] = splitted[i];
			}	
		} 
		function setCookie()//Store information in cookie
		{
			//[0]-[9]: currency[0]-[9]
			var temp_cookie="";
			for (var i=0;i<currency.length;i++)
			{
				temp_cookie = temp_cookie  + currency[i] + ":";
			} 
			//[10]-[29]: upgrade[0]-[19]
			for (var i=0;i<upgrade.length;i++)	
			{
				temp_cookie = temp_cookie + upgrade[i] + ":";
			} 
			//[30]-[49]: farm[0]-[19]
			for (var i=0;i<farm.length;i++)
			{
				temp_cookie = temp_cookie + farm[i] + ":";
			} 
			//[50]-[54]: xp, lvl, total_clicked, total_farmed, total_converted
			temp_cookie = temp_cookie + xp + ":" + lvl + ":" + total_clicked + ":" + total_farmed + ":" + total_converted + ":";
			//[55]-[91]: achievement[0]-[36] 
			
			for (var i=0;i<achievement.length;i++)
			{
				temp_cookie = temp_cookie + achievement[i] + ":";
			} 
			
			//[92]-[100]:
			for (var i=0;i<check_color.length;i++) 
			{
				temp_cookie = temp_cookie + check_color[i] + ":";
			} 
			//[101]-[110] power [0]-[9]:
			for (var i=0;i<power.length;i++) 
			{
				temp_cookie = temp_cookie + power[i] + ":";
			}
			document.cookie = "kaka=" + String(temp_cookie) + ";expires=Thu, 18 Dec 2033 12:00:00 GMT";

			 
		}
		
		/*=================================================================================
		 Declare Variables
		 =================================================================================*/
		var timer2 = 0;
		var xp = 0;		// start xp
		var lvl = 0;	// start lvl
		var xpreq = 10*Math.pow(2,lvl);	// start xp requirement
		
		var green_show = 0;
		
		var red_show = 0;
		
		var check_red = false;		
		
		var blue_show = 0;
		
		var check_blue = false;
		
		var orange_show = 0;
		
		var check_orange = false;
		
		var purple_show = 0;
		
		var check_purple = false;
	
		var currency = [100000000,100000000,100000000,0,0,0,0,0,0,0];
		var check_color = [1,0,0,0,0,0,0,0,0];
		
		var upgrade = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var farm = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var power = [0,0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5]; // Temporära: 0.5=låst, cooldown>0, activetime<0      Permanenta: 0=låst 1=aktiv
		var spawnrate = 1;
		var xpgain = 1;
		var convertrate = 1;
		
		var achievement = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var total_clicked = 0;//Total energy collected
		var total_converted = 0;//Total energy converted
		var total_farmed = 0;//Total energy collected through farming
		var total_upgrades = 0;//Total upgrades purchased
		var total_farms = 0;//Total farms purchased
		var total_currency = 0;//Total currency
		u1cost = 15; 
		u2cost = 5; 
		um1cost = 300; 
		um2cost = 100; 
		f1cost = 225; 
		f2cost = 75; 
		fm1cost = 1500; 
		fm2cost = 500;
		
		l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
		l("progressbar").style.width = (xp / xpreq)*100 + "%";
		l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";		
		l("green-farm-0").innerHTML = 25*Math.pow(2,farm[0]); // Update the green per mouse over text
		l("green-upgrade-0").innerHTML = 5*Math.pow(2,upgrade[0]); // Update the green per mouse over text		
		l("green-click").innerHTML = (upgrade[0]+1)*(upgrade[1]+1); // Update the green click
		
		/*=================================================================================
		 Cube and Game box creation
		 =================================================================================*/
		// Create the main canvas
		window.onresize = function(event) {  //this function will resize your stage to the size of your window
			stage.setWidth($('.gamebox').width()); 
			stage.setHeight($('.gamebox').height());
			stage.draw(); // redraw the stage, not sure if really needed, but good to have.
		}
		var stage = new Kinetic.Stage({
			container: 'gamebox', // Find an HTML element
			width: $('.gamebox').width(), // Set width
			height: $('.gamebox').height() // Set heigth
		});
		
		//GREEN
		var green_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate); // How long green is visible	

		var green = new Kinetic.Layer({ //Creates the green cube
			visible: false // Hide the cube
		});		
		var greenrect = new Kinetic.Rect({ // The design for green rectangles
			width: 25, // Width of the cube
			height: 25, // Height of the cube
			fill: '#5cb85c', // Color of the cube
		});		
		green.draw(); // Draw the cube
		green.add(greenrect); // Add greenrect to green
		
		//RED
		var red_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);	
		
		var red = new Kinetic.Layer({
			visible: false
		});		
		var redrect = new Kinetic.Rect({
			width: 25,
			height: 25,
			fill: '#d9534f',
		});		
		red.draw();
		red.add(redrect);
		
		//BLUE
		var blue_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);	
		
		var blue = new Kinetic.Layer({
			visible: false
		});		
		var bluerect = new Kinetic.Rect({ 
			width: 25, 
			height: 25,
			fill: '#5bc0de', 
		});		
		blue.draw();
		blue.add(bluerect);
		
		//ORANGE
		var orange_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);	
		
		var orange = new Kinetic.Layer({
			visible: false
		});
		var orangerect = new Kinetic.Rect({ 
			width: 25, 
			height: 25,
			fill: '#efad4d', 
		});		
		orange.draw();
		orange.add(orangerect);
		
		//PURPLE
		var purple_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);	
		
		var purple = new Kinetic.Layer({
			visible: false
		});
		var purplerect = new Kinetic.Rect({ 
			width: 25, 
			height: 25,
			fill: '#a34fd9', 
		});		
		purple.draw();
		purple.add(purplerect);
		
		// Cookie
		if(cookie_data)
		{
			//[0]-[9]: currency[0]-[9]
			for (var i=0;i<currency.length;i++)
			{
				currency[i] = Number(cookie_data[i]);
			} 
			//[10]-[29]: upgrade[0]-[19]
			for (var i=0;i<upgrade.length;i++)
			{
				upgrade[i] = Number(cookie_data[i+10]);
			} 
			//[30]-[49]: farm[0]-[19]
			for (var i=0;i<farm.length;i++)
			{
				farm[i] = Number(cookie_data[i+30]);
			} 
			//[50]-[54]: xp, lvl, total_clicked, total_farmed, total_converted
			xp = Number(cookie_data[50]);
			lvl = Number(cookie_data[51]);
			total_clicked = Number(cookie_data[52]);
			total_farmed = Number(cookie_data[53]);
			total_converted = Number(cookie_data[54]);
			//[55]-[91]: achievement[0]-[36] 
			for (var i=0;i<achievement.length;i++)
			{
				achievement[i] = Number(cookie_data[i+55]);
			} 
			//[92]-[100] check_color [0]-[8]:
			for (var i=0;i<check_color.length;i++) 
			{
				check_color[i] = Number(cookie_data[i+92]);
			} 
			//[101]-[110] power [0]-[9]:
			for (var i=0;i<power.length;i++) 
			{
				power[i] = Number(cookie_data[i+101]);
			}
			xpreq = 10*Math.pow(2,lvl);
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
			if(power[1]==1){
				xpgain = xpgain +1;
			}
		}
		
		// Update the New Color Button
		if(check_color[0]==0){
			l("unlock-color").setAttribute('data-content','Pay 100 green to unlock a new energy');
		}
		if(check_color[0]==1){
			l("unlock-color").className = "blueproduct popoverOption";
			l("unlock-color").setAttribute('data-content','Pay 200 red to unlock a new energy');
		}
		if(check_color[1]==1){
			l("unlock-color").className = "orangeproduct popoverOption";
			l("unlock-color").setAttribute('data-content','Pay 400 blue to unlock a new energy');
		}
		if(check_color[2]==1){
			l("unlock-color").className = "purpleproduct popoverOption";
			l("unlock-color").setAttribute('data-content','pay 800 orange to unlock a new energy');
		}
		if(check_color[3]==1){
			l("unlock-color").style.display="none";
		}
		
		l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
		
		
		
		

		  
		/*=================================================================================
		 Loop function
		 =================================================================================*/
		setInterval(function(){myTimer()},250); // SetInterval will play function myTimer every 0.25 second		
		function myTimer(){
			// Convert Rate Code
			var x = l("convert-rate").selectedIndex;
			convertrate = document.getElementsByTagName("option")[x].value;
			if(check_color[1]==1){
				l("green-img").setAttribute('data-content','Convert ' + 5000*convertrate + ' green to '+ 1000*convertrate +' red');
			}else{
				l("green-img").setAttribute('data-content','Unlock more energies to convert green.');
			}
			if(check_color[2]==1){
				l("red-img").setAttribute('data-content','Convert ' + 5000*convertrate + ' red to '+ 1000*convertrate +' blue');
			}else{
				l("red-img").setAttribute('data-content','Unlock more energies to convert red.');
			}
			if(check_color[3]==1){
			l("blue-img").setAttribute('data-content','Convert ' + 5000*convertrate + ' blue to '+ 1000*convertrate +' orange');
			}else{
				l("blue-img").setAttribute('data-content','Unlock more energies to convert blue.');
			}
			if(check_color[4]==1){
				l("orange-img").setAttribute('data-content','Convert ' + 5000*convertrate + ' orange to '+ 1000*convertrate +' purple');
			}else{
				l("orange-img").setAttribute('data-content','Unlock more energies to convert orange.');
			}
			
			l("total_collected").innerHTML = total_clicked;
			l("total_farmed").innerHTML = total_farmed;
			l("total_converted").innerHTML = total_converted;
  		    total_upgrades = 0
			total_farms = 0
			total_currency = 0
			for (var i=0;i<upgrade.length;i++)	
			{
				total_upgrades = total_upgrades + upgrade[i]
			} 
			for (var i=0;i<farm.length;i++)	
			{
				total_farms = total_farms + farm[i]
			} 
			for (var i=0;i<currency.length;i++)	
			{
				total_currency = total_currency + currency[i]
			} 
			l("total_farms").innerHTML = total_farms;
			l("total_upgrades").innerHTML = total_upgrades;
			l("total_currencies").innerHTML = total_currency;
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			//l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
		    l("green-sec").innerHTML = farm[0]*(farm[1]+1); // Update the Green per sec
		    l("green-farm-0").innerHTML = 25*Math.pow(2,farm[0]); // Update the green per mouse over text
		    l("green-farm-count-0").innerHTML = farm[0]; // Update the green per mouse over text
		    l("green-farm-1").innerHTML = fm1cost*Math.pow(2,farm[1]);
		    l("red-farm-1").innerHTML = fm2cost*Math.pow(2,farm[1]);
		    l("red-farm-count-1").innerHTML = farm[1];
			l("green-farm-2").innerHTML = f1cost*Math.pow(2,farm[2]);
		    l("red-sec").innerHTML = farm[2]*(farm[3]+1); // Update the Red per sec
		    l("red-farm-2").innerHTML = f2cost*Math.pow(2,farm[2]);
		    l("red-farm-count-2").innerHTML = farm[2];
			l("green-upgrade-0").innerHTML = 5*Math.pow(2,upgrade[0]); // Update the green per mouse over text
			l("green-upgrade-count-0").innerHTML = upgrade[0]; // Update the green per mouse over text
			l("green-click").innerHTML = (upgrade[0]+1)*(upgrade[1]+1); // Update the green click
		    l("green-upgrade-1").innerHTML = um1cost*Math.pow(2,upgrade[1]);	
		    l("red-upgrade-1").innerHTML = um2cost*Math.pow(2,upgrade[1]);
		    l("red-upgrade-count-1").innerHTML = upgrade[1];
			l("red-click").innerHTML = (upgrade[2]+1)*(upgrade[3]+1);
		    l("green-upgrade-2").innerHTML = u1cost*Math.pow(2,upgrade[2]);
		    l("red-upgrade-2").innerHTML = u2cost*Math.pow(2,upgrade[2]);
		    l("red-upgrade-count-2").innerHTML = upgrade[2];
			l("blue-farm-3").innerHTML = fm2cost*Math.pow(2,farm[3]);
			l("red-farm-3").innerHTML = fm1cost*Math.pow(2,farm[3]);
			l("blue-farm-count-3").innerHTML = farm[3];
			l("red-upgrade-3").innerHTML = um1cost*Math.pow(2,upgrade[3]);
			l("blue-upgrade-3").innerHTML = um2cost*Math.pow(2,upgrade[3]);
			l("blue-upgrade-count-3").innerHTML = upgrade[3];
			l("blue-click").innerHTML = (upgrade[4]+1)*(upgrade[5]+1);
			l("red-upgrade-4").innerHTML = u1cost*Math.pow(2,upgrade[4]);
			l("blue-upgrade-4").innerHTML = u2cost*Math.pow(2,upgrade[4]);
			l("blue-upgrade-count-4").innerHTML = upgrade[4];
			l("blue-sec").innerHTML = farm[4]*(farm[5]+1); // Update the Blue per sec
			l("blue-farm-4").innerHTML = f2cost*Math.pow(2,farm[4]);
			l("red-farm-4").innerHTML = f1cost*Math.pow(2,farm[4]);
			l("blue-farm-count-4").innerHTML = farm[4];
			l("orange-click").innerHTML = (upgrade[6]+1)*(upgrade[7]+1);
			l("orange-sec").innerHTML = farm[6]*(farm[7]+1); 
			l("purple-click").innerHTML = (upgrade[8]+1)*(upgrade[9]+1);
			l("purple-sec").innerHTML = farm[8]*(farm[9]+1); 
			l("orange-upgrade-count-5").innerHTML = upgrade[5];
			l("orange-upgrade-count-6").innerHTML = upgrade[6];
			l("purple-upgrade-count-7").innerHTML = upgrade[7];
			l("purple-upgrade-count-8").innerHTML = upgrade[8];
			l("orange-farm-count-5").innerHTML = farm[5];
			l("orange-farm-count-6").innerHTML = farm[6];
			l("purple-farm-count-7").innerHTML = farm[7];
			l("purple-farm-count-8").innerHTML = farm[8];
			l("blue-farm-5").innerHTML = fm1cost*Math.pow(2,farm[5]);
			l("orange-farm-5").innerHTML = fm2cost*Math.pow(2,farm[5]);
			l("blue-farm-6").innerHTML = f1cost*Math.pow(2,farm[6]);
			l("orange-farm-6").innerHTML = f2cost*Math.pow(2,farm[6]);
			l("purple-farm-7").innerHTML = fm2cost*Math.pow(2,farm[7]);
			l("orange-farm-7").innerHTML = fm1cost*Math.pow(2,farm[7]);
			l("purple-farm-8").innerHTML = f2cost*Math.pow(2,farm[8]);
			l("orange-farm-8").innerHTML = f1cost*Math.pow(2,farm[8]);
			l("blue-upgrade-5").innerHTML = um1cost*Math.pow(2,upgrade[5]);
			l("orange-upgrade-5").innerHTML = um2cost*Math.pow(2,upgrade[5]);
			l("blue-upgrade-6").innerHTML = u1cost*Math.pow(2,upgrade[6]);
			l("orange-upgrade-6").innerHTML = u2cost*Math.pow(2,upgrade[6]);
			l("purple-upgrade-7").innerHTML = um2cost*Math.pow(2,upgrade[7]);
			l("orange-upgrade-7").innerHTML = um1cost*Math.pow(2,upgrade[7]);
			l("purple-upgrade-8").innerHTML = u2cost*Math.pow(2,upgrade[8]);
			l("orange-upgrade-8").innerHTML = u1cost*Math.pow(2,upgrade[8]);
			l("green-cur").innerHTML = currency[0]; // Update the green currency
			l("red-cur").innerHTML = currency[1]; // Update the Red currency
			l("blue-cur").innerHTML = currency[2]; // Update the Blue currency
			l("orange-cur").innerHTML = currency[3]; // Update the Orange currency
			l("purple-cur").innerHTML = currency[4]; // Update the Purple currency
		  /*=================================================================================
		   LvL Up Code
		   =================================================================================*/
		  if (xp >= xpreq)
		  {
			  xp = xp-xpreq; // Reset xp
			  xpreq = xpreq*2; // Increase the xpreq
			  lvl = ++lvl; // Gain a lvl
			  l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			  l("progressbar").style.width = (xp / xpreq)*100 + "%";
		  	  l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
			switch(lvl)
			{
			case 1:
  				currency[0]	= currency[0] + 20;
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 1</h4>+ 20 Green";
			    break;
			case 2:
  				currency[0]	= currency[0] + 100;
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 2</h4>+ 100 Green";
			    break;
			case 3:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
  				currency[0]	= currency[0] + 500;
				currency[1]	= currency[1] + 50;
				l("lvl-text").innerHTML = "<h4>You Reached Level 3</h4>+ 500 Green<br>+ 50 Red";
			    break;
			case 4:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
  				currency[0]	= currency[0] + 1000;	
				currency[1]	= currency[1] + 150;
				l("lvl-text").innerHTML = "<h4>You Reached Level 4</h4>+ 1000 Green<br>+ 150 Red";
			    break;
			case 5:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 5</h4>+ 1000 Green<br>+ 300 Red<br>+ 25 Blue";
  				currency[0]	= currency[0] + 1000;	
				currency[1]	= currency[1] + 300;
				currency[2]	= currency[2] + 25;
			    break;
			case 6:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 6</h4>+ 1000 Green<br>+ 500 Red<br>+ 100 Blue";
  				currency[0]	= currency[0] + 1000;	
				currency[1]	= currency[1] + 500;
				currency[2]	= currency[2] + 100;
			    break;
			case 7:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 7</h4>+ 2000 Green<br>+ 500 Red<br>+ 200 Blue<br>+ 20 Orange";
  			  	currency[0]	= currency[0] + 2000;	
				currency[1]	= currency[1] + 500;
				currency[2]	= currency[2] + 200;
				currency[3]	= currency[3] + 20;
			    break;
			case 8:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 8</h4>+ 8000 Green<br>+ 4000 Red<br>+ 1000 Blue<br>+ 500 Orange"; 	
  				currency[0]	= currency[0] + 8000;	
				currency[1]	= currency[1] + 4000;
				currency[2]	= currency[2] + 1000;	
				currency[3]	= currency[3] + 500;
			    break;
			case 9:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 9</h4>+ 20000 Green<br>+ 10000 Red<br>+ 5000 Blue<br>+ 2000 Orange<br>+ 200 Purple"; 	
  				currency[0]	= currency[0] + 20000;	
				currency[1]	= currency[1] + 10000;
				currency[2]	= currency[2] + 5000;
				currency[3]	= currency[3] + 2000;	
				currency[4]	= currency[4] + 200;
			    break;
			case 10:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 10</h4>+ 20000 Green<br>+ 10000 Red<br>+ 5000 Blue<br>+ 2000 Orange<br>+ 200 Purple"; 	
  				currency[0]	= currency[0] + 20000;	
				currency[1]	= currency[1] + 10000;
				currency[2]	= currency[2] + 5000;
				currency[3]	= currency[3] + 2000;	
				currency[4]	= currency[4] + 200;
			    break;
			case 11:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 11</h4>+ 20000 Green<br>+ 10000 Red<br>+ 5000 Blue<br>+ 2000 Orange<br>+ 200 Purple"; 	
  				currency[0]	= currency[0] + 20000;	
				currency[1]	= currency[1] + 10000;
				currency[2]	= currency[2] + 5000;
				currency[3]	= currency[3] + 2000;	
				currency[4]	= currency[4] + 200;
			    break;
			case 12:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 12</h4>+ 20000 Green<br>+ 10000 Red<br>+ 5000 Blue<br>+ 2000 Orange<br>+ 200 Purple"; 	
  				currency[0]	= currency[0] + 20000;	
				currency[1]	= currency[1] + 10000;
				currency[2]	= currency[2] + 5000;
				currency[3]	= currency[3] + 2000;	
				currency[4]	= currency[4] + 200;
			    break;
			case 13:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 13</h4>+ 20000 Green<br>+ 10000 Red<br>+ 5000 Blue<br>+ 2000 Orange<br>+ 200 Purple"; 	
  				currency[0]	= currency[0] + 20000;	
				currency[1]	= currency[1] + 10000;
				currency[2]	= currency[2] + 5000;
				currency[3]	= currency[3] + 2000;	
				currency[4]	= currency[4] + 200;
			    break;
			case 14:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 14</h4>+ 20000 Green<br>+ 10000 Red<br>+ 5000 Blue<br>+ 2000 Orange<br>+ 200 Purple"; 	
  				currency[0]	= currency[0] + 20000;	
				currency[1]	= currency[1] + 10000;
				currency[2]	= currency[2] + 5000;
				currency[3]	= currency[3] + 2000;	
				currency[4]	= currency[4] + 200;
			    break;
			case 15:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 15</h4>+ 20000 Green<br>+ 10000 Red<br>+ 5000 Blue<br>+ 2000 Orange<br>+ 200 Purple"; 	
  				currency[0]	= currency[0] + 20000;	
				currency[1]	= currency[1] + 10000;
				currency[2]	= currency[2] + 5000;
				currency[3]	= currency[3] + 2000;	
				currency[4]	= currency[4] + 200;
			    break;
				
			default:
				
			}
		  }
		  
		  // Green
		  returns = spawn(green,green_visible,green_show);
		  green_visible = returns[0];
		  green_show = returns[1];
		  
		  // Red
		  if (check_color[0] == 1) {
			  returns = spawn(red,red_visible,red_show);
			  red_visible = returns[0];
			  red_show = returns[1];
			  $(".red").css("display", "block");
		  }
		  
		  // Blue
		  if (check_color[1] == 1) {
			  returns = spawn(blue,blue_visible,blue_show);
			  blue_visible = returns[0];
			  blue_show = returns[1];
			  $(".blue").css("display", "block");
		  }
		  
		  // Orange
		  if (check_color[2] == 1) {
			  returns = spawn(orange,orange_visible,orange_show);
			  orange_visible = returns[0];
			  orange_show = returns[1];
			  $(".orange").css("display", "block");
		  }
		  
		  // Purple
		  if (check_color[3] == 1) {
			  returns = spawn(purple,purple_visible,purple_show);
			  purple_visible = returns[0];
			  purple_show = returns[1];
			  $(".purple").css("display", "block");
		  }
			
			timer2 = timer2 + 1;

			if(timer2 == 4)
			{
				timer2 = 0;
				setCookie();
				for(var i=0;i<currency.length;i++){
					currency[i] = currency[i] + farm[i*2]*(farm[i*2+1]+1);
					total_farmed = total_farmed + farm[i*2]*(farm[i*2+1]+1);
				}
				
				if(power[0]>0 && power[0]!=0.5){ //CD
					clipTween1.reverse();
					clipTween1.timeScale(0.5);
					power[0] = power[0] - 1;
				}
				if(power[0]<0){ //AKTIV
					clipTween1.play();
					power[0] = power[0] +1;
				}
				if(power[0] == -1){ //Går på CD
					power[0] = 40;
					clipTween1.pause();
				}
				if(power[0] >= 0 && power[0] != 0.5){ //Stäng av powerns
					spawnrate = 1;
				}
				
		  	/*=================================================================================
		   	Achivements
		  	=================================================================================*/
		  	if(total_clicked>=10){achievement[0]=1;l('a0').className='achived'}
		  	if(total_clicked>=100){achievement[1]=1;l('a1').className='achived'}
			if(total_clicked>=1000){achievement[2]=1;l('a2').className='achived'}
			if(total_clicked>=10000){achievement[3]=1;l('a3').className='achived'}
			if(total_clicked>=50000){achievement[4]=1;l('a4').className='achived'}
			if(total_clicked>=100000){achievement[5]=1;l('a5').className='achived'}
			if(total_converted>=10000){achievement[6]=1;l('a6').className='achived'}
			if(total_converted>=50000){achievement[7]=1;l('a7').className='achived'}
			if(total_converted>=500000){achievement[8]=1;l('a8').className='achived'}
			if(total_converted>=5000000){achievement[9]=1;l('a9').className='achived'}
			if(total_converted>=50000000){achievement[10]=1;l('a10').className='achived'}
			if(total_converted>=500000000){achievement[11]=1;l('a11').className='achived'}
			if(lvl>=5){achievement[12]=1;l('a12').className='achived'}
			if(lvl>=10){achievement[13]=1;l('a13').className='achived'}
			if(lvl>=15){achievement[14]=1;l('a14').className='achived'}
			if(lvl>=20){achievement[15]=1;l('a15').className='achived'}
			if(lvl>=25){achievement[16]=1;l('a16').className='achived'}
			if(total_farmed>=100){achievement[17]=1;l('a17').className='achived'}
			if(total_farmed>=5000){achievement[18]=1;l('a18').className='achived'}
			if(total_farmed>=100000){achievement[19]=1;l('a19').className='achived'}
			if(total_farmed>=5000000){achievement[20]=1;l('a20').className='achived'}
			if(total_farmed>=100000000){achievement[21]=1;l('a21').className='achived'}
			//Total upgrades check
			total_upgrades = 0;
			for (var i=0;i<upgrade.length;i++)
			{ 
				total_upgrades = total_upgrades + upgrade[i];
			}
			if(total_upgrades>=10){achievement[22]=1;l('a22').className='achived'}
			if(total_upgrades>=50){achievement[23]=1;l('a23').className='achived'}
			if(total_upgrades>=100){achievement[24]=1;l('a24').className='achived'}
			if(total_upgrades>=500){achievement[25]=1;l('a25').className='achived'}
			if(total_upgrades>=1000){achievement[26]=1;l('a26').className='achived'}
			//Total farms check
			total_farms = 0;
			for (var i=0;i<farm.length;i++)
			{ 
				total_farms = total_farms + farm[i];
			}
			if(total_farms>=10){achievement[27]=1;l('a27').className='achived'}
			if(total_farms>=50){achievement[28]=1;l('a28').className='achived'}
			if(total_farms>=100){achievement[29]=1;l('a29').className='achived'}
			if(total_farms>=500){achievement[30]=1;l('a30').className='achived'}
			if(total_farms>=1000){achievement[31]=1;l('a31').className='achived'}
			total_currency = 0;
			for (var i=0;i<currency.length;i++)
			{ 
				total_currency = total_currency + currency[i];
			}
			if(total_currency>=100 || achievement[32]==1){achievement[32]=1;l('a32').className='achived'}
			if(total_currency>=10000 || achievement[33]==1){achievement[33]=1;l('a33').className='achived'}
			if(total_currency>=1000000 || achievement[34]==1){achievement[34]=1;l('a34').className='achived'}
			if(total_currency>=10000000 || achievement[35]==1){achievement[35]=1;l('a35').className='achived'}
			if(total_currency>=100000000 || achievement[36]==1){achievement[36]=1;l('a36').className='achived'}
			}
			
			// Price checking
			
			if(currency[0] >= 25*Math.pow(2,farm[0])){
				l('farm0').style.opacity = 1.0;
			}else{
				l('farm0').style.opacity = 0.4;
			}
			
			if(currency[0] >= fm1cost*Math.pow(2,farm[1]) && currency[1] >= fm2cost*Math.pow(2,farm[1])) {
				l('farm1').style.opacity = 1.0;
			}else{
				l('farm1').style.opacity = 0.4;
			}
			
			if(currency[0] >= f1cost*Math.pow(2,farm[2]) && currency[1] >= f2cost*Math.pow(2,farm[2])) {
				l('farm2').style.opacity = 1.0;
			}else{
				l('farm2').style.opacity = 0.4;
			}
			
			if(currency[1] >= fm1cost*Math.pow(2,farm[3]) && currency[2] >= fm2cost*Math.pow(2,farm[3])) {
				l('farm3').style.opacity = 1.0;
			}else{
				l('farm3').style.opacity = 0.4;
			}
			
			if(currency[1] >= f1cost*Math.pow(2,farm[4]) && currency[2] >= f2cost*Math.pow(2,farm[4])) {
				l('farm4').style.opacity = 1.0;
			}else{
				l('farm4').style.opacity = 0.4;
			}
			
			if(currency[3] >= fm2cost*Math.pow(2,farm[5]) && currency[2] >= fm1cost*Math.pow(2,farm[5])) {
				l('farm5').style.opacity = 1.0;
			}else{
				l('farm5').style.opacity = 0.4;
			}
			
			if(currency[2] >= f1cost*Math.pow(2,farm[6]) && currency[3] >= f2cost*Math.pow(2,farm[6])) {
				l('farm6').style.opacity = 1.0;
			}else{
				l('farm6').style.opacity = 0.4;
			}
			
			if(currency[4] >= fm2cost*Math.pow(2,farm[7]) && currency[3] >= fm1cost*Math.pow(2,farm[7])) {
				l('farm7').style.opacity = 1.0;
			}else{
				l('farm7').style.opacity = 0.4;
			}
			
			if(currency[3] >= f1cost*Math.pow(2,farm[8]) && currency[4] >= f2cost*Math.pow(2,farm[8])) {
				l('farm8').style.opacity = 1.0;
			}else{
				l('farm8').style.opacity = 0.4;
			}
			
			if(currency[0] >= 5*Math.pow(2,upgrade[0])){
				l('upgrade0').style.opacity = 1.0;
			}else{
				l('upgrade0').style.opacity = 0.4;
			}
			
			if(currency[0] >= um1cost*Math.pow(2,upgrade[1]) && currency[1] >= um2cost*Math.pow(2,upgrade[1])){
				l('upgrade1').style.opacity = 1.0;
			}else{
				l('upgrade1').style.opacity = 0.4;
			}
			
			if(currency[0] >= u1cost*Math.pow(2,upgrade[2]) && currency[1] >= u2cost*Math.pow(2,upgrade[2])){
				l('upgrade2').style.opacity = 1.0;
			}else{
				l('upgrade2').style.opacity = 0.4;
			}
			
			if(currency[1] >= um1cost*Math.pow(2,upgrade[3]) && currency[2] >= um2cost*Math.pow(2,upgrade[3])){
				l('upgrade3').style.opacity = 1.0;
			}else{
				l('upgrade3').style.opacity = 0.4;
			}
			
			if(currency[1] >= u1cost*Math.pow(2,upgrade[4]) && currency[2] >= u2cost*Math.pow(2,upgrade[4])){
				l('upgrade4').style.opacity = 1.0;
			}else{
				l('upgrade4').style.opacity = 0.4;
			}
			
			if(currency[3] >= um2cost*Math.pow(2,upgrade[5]) && currency[2] >= um1cost*Math.pow(2,upgrade[5])) {
				l('upgrade5').style.opacity = 1.0;
			}else{
				l('upgrade5').style.opacity = 0.4;
			}
			
			if(currency[2] >= u1cost*Math.pow(2,upgrade[6]) && currency[3] >= u2cost*Math.pow(2,upgrade[6])) {
				l('upgrade6').style.opacity = 1.0;
			}else{
				l('upgrade6').style.opacity = 0.4;
			}
			
			if(currency[4] >= um2cost*Math.pow(2,upgrade[7]) && currency[3] >= um1cost*Math.pow(2,upgrade[7])) {
				l('upgrade7').style.opacity = 1.0;
			}else{
				l('upgrade7').style.opacity = 0.4;
			}
			
			if(currency[3] >= u1cost*Math.pow(2,upgrade[8]) && currency[4] >= u2cost*Math.pow(2,upgrade[8])) {
				l('upgrade8').style.opacity = 1.0;
			}else{
				l('upgrade8').style.opacity = 0.4;
			}

		}
		/*=================================================================================
		 Unlock new energy
		 =================================================================================*/
		function newColor(price,cash){
			if(price > cash){
				returns = [0,cash];
				return returns;
			}else if(price <= cash){
				cash = cash - price;
				returns = [1,cash]
				return returns
			}
		}
				
		function unlockenergy(){
		
			if(check_color[0] != 1){
				returns = newColor(100,currency[0]); //Pay 100 currency  to unlock currency 1
				check_color[0] = returns[0];
				currency[0] = returns[1];
				if(check_color[0]==1){
					l("unlock-color").className = "blueproduct";
					l("unlock-color").setAttribute('data-content','Pay 200 red to unlock a new energy');
				}
			}else if(check_color[1] != 1){
				returns = newColor(200,currency[1]); //Pay 200 currency to unlock currency 2
				check_color[1] = returns[0];
				currency[1] = returns[1];
				if(check_color[1]==1){
					l("unlock-color").className = "orangeproduct";
					l("unlock-color").setAttribute('data-content','Pay 400 blue to unlock a new energy');
				}
			}else if(check_color[2] != 1){
				returns = newColor(400,currency[2]); //Pay 400 currency to unlock currency 3
				check_color[2] = returns[0];
				currency[2] = returns[1];
				if(check_color[2]==1){
					l("unlock-color").className = "purpleproduct";
					l("unlock-color").setAttribute('data-content','Pay 800 orange to unlock a new energy');
				}
			}else if(check_color[3] != 1){
				returns = newColor(800,currency[3]); //Pay 800 currency to unlock currency 4
				check_color[3] = returns[0];
				currency[3] = returns[1];
				l("orange-cur").innerHTML = currency[3];
				if(check_color[3]==1){
					l("unlock-color").style.display="none";
				}
			}
		}
			
		/*=================================================================================
		 Mouse over Code
		 =================================================================================*/
		green.on('mouseover touchmove', function() {
			green_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);
			total_clicked = total_clicked + (upgrade[0]+1)*(upgrade[1]+1);
			green_show = 0;
			xp = xp +1*xpgain; // Gain 1 xp for each cube
			currency[0] = currency[0] + (upgrade[0]+1)*(upgrade[1]+1); // Gain 1 green currency
			green.hide(); // Hide the cube
			green.draw(); // Update
			stage.add(green); //This line is needed for good response time
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
		});
		
		red.on('mouseover touchmove', function() {
			red_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);
			total_clicked = total_clicked + (upgrade[2]+1)*(upgrade[3]+1);
			red_show = 0;
			xp = xp + 2*xpgain;
			currency[1] = currency[1] + (upgrade[2]+1)*(upgrade[3]+1);
			red.hide();
			red.draw();
			stage.add(red);
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
		});
		
		blue.on('mouseover touchmove', function() {
			blue_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);
			total_clicked = total_clicked + (upgrade[4]+1)*(upgrade[5]+1);
			blue_show = 0;
			xp = xp + 4*xpgain;
			currency[2] = currency[2] + (upgrade[4]+1)*(upgrade[5]+1); 
			blue.hide();
			blue.draw();
			stage.add(blue);			
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
			
		});
		
		orange.on('mouseover touchmove', function() {
			orange_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);
			total_clicked = total_clicked + (upgrade[6]+1)*(upgrade[7]+1);
			orange_show = 0;
			xp = xp + 8*xpgain;
			currency[3] = currency[3] + (upgrade[6]+1)*(upgrade[7]+1); 
			orange.hide();
			orange.draw();
			stage.add(orange);
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
		});
		
		purple.on('mouseover touchmove', function() {
			purple_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);
			total_clicked = total_clicked + (upgrade[8]+1)*(upgrade[9]+1);
			purple_show = 0;
			xp = xp + 16*xpgain;
			currency[4] = currency[4] + (upgrade[8]+1)*(upgrade[9]+1); 
			purple.hide();
			purple.draw();
			stage.add(purple);
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
		});
		
		/*=================================================================================
		 Convert
		 =================================================================================*/
		 // Green to Red
		 function green_convert() {
			if( currency[0] >= 5000*convertrate && check_color[1]==1) {
			currency[0] = currency[0] - 5000*convertrate;
			currency[1] = currency[1] + 1000*convertrate;
			total_converted = total_converted + 1000*convertrate;
			}
		 }
		 // Red to Blue
		 function red_convert() {
			if( currency[1] >= 5000*convertrate && check_color[2]==1) {
			currency[1] = currency[1] - 5000*convertrate;
			currency[2] = currency[2] + 1000*convertrate;
			total_converted = total_converted + 1000*convertrate;
			}
		 }
		 // Blue to Orange
		 function blue_convert() {
			if( currency[2] >= 5000*convertrate && check_color[3]==1) {
			currency[2] = currency[2] - 5000*convertrate;
			currency[3] = currency[3] + 1000*convertrate;
			total_converted = total_converted + 1000*convertrate;
			}
		 }
		 // Orange to Purple
		 function orange_convert() {
			if( currency[3] >= 5000*convertrate && check_color[4]==1) {
			currency[3] = currency[3] - 5000*convertrate;	
			currency[4] = currency[4] + 1000*convertrate;
			total_converted = total_converted + 1000*convertrate;
			}
		 }
	
		/*=================================================================================
		 Spawn and Despawn
		 =================================================================================*/
		function spawn(object,visible,show)
		{
			visible = --visible;
			if (visible == 0 && show == 0) //Conditions for spawning
			{
			  show = 1;
			  visible = 16; // How long g1 will be shown (4sec)
			  object.show();
			  object.setPosition({
				  x: Math.abs(Math.floor((Math.random()*($('.gamebox').width()))-25)), 
				  y: Math.abs(Math.floor((Math.random()*($('.gamebox').height()))-25))
			  });
			  stage.add(object); // add the layer to the stage
			}
		   if (visible == 0 && show == 1) // If g1 is supposed to be removed from screen
		   {
			  object.hide(); // Hide the object
			  object.draw(); // Update
			  stage.add(object);
			  visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);
			  show = 0;
		   }
		    var returns=[visible,show];
		    return returns;
		}
		/*=================================================================================
		 POWER UPS
		 =================================================================================*/
		 //GSAP 1.8.0
		var box1 = $("#clip1");
		clipTween1 = TweenLite.from(box1, 20, {clip:"rect(0px,60px,60px,0px)", paused:true, ease:Linear.easeNone});
		 
		 function powerup0(){
			if(power[0]==0){
				power[0] = -21;
				spawnrate = spawnrate + 3;
			}
			if(power[1]==0 && currency[0]>=25000 && currency[1]>=5000){
				power[1] = 1;
				xpgain = xpgain + 1;
				currency[0] = currency[0] - 25000;
				currency[1] = currency[1] - 5000;
			}
		}
		/*=================================================================================
		 FARMS
		 =================================================================================*/		 
		function farm0(){  
		  if( currency[0] >= 25*Math.pow(2,farm[0]))
		  {
			   currency[0] = currency[0] - 25*Math.pow(2,farm[0]);
			   farm[0] = farm[0] + 1;
		  }
		}		
		//Farm 1  Green per second multiplier
		function farm1(){
		  if( currency[0] >= fm1cost*Math.pow(2,farm[1]) &&  currency[1] >= fm2cost*Math.pow(2,farm[1]))
		  {
			   currency[0] = currency[0] - fm1cost*Math.pow(2,farm[1]);
			   currency[1] = currency[1] - fm2cost*Math.pow(2,farm[1]);
			   farm[1]=farm[1] + 1;
		  }			
		}
		//Farm 2  Red per second
		function farm2(){
		  if( currency[1] >= f2cost*Math.pow(2,farm[2]) &&  currency[0] >= f1cost*Math.pow(2,farm[2]))
		  {
			   currency[1] = currency[1] - f2cost*Math.pow(2,farm[2]);
			   currency[0] = currency[0] - f1cost*Math.pow(2,farm[2]);
			   farm[2] = farm[2] + 1;
		  }
		}		
		//Farm 3  Red per second multiplier
		function farm3(){
		  if( currency[1] >= fm1cost*Math.pow(2,farm[3]) &&  currency[2] >= fm2cost*Math.pow(2,farm[3]))
		  {
			   currency[1] = currency[1] - fm1cost*Math.pow(2,farm[3]);
			   currency[2] = currency[2] - fm2cost*Math.pow(2,farm[3]);
			   farm[3] = farm[3] + 1;
		  }
		}
		//Farm 4  Blue per second
		function farm4(){
		  if( currency[1] >= f1cost*Math.pow(2,farm[4]) &&  currency[2] >= f2cost*Math.pow(2,farm[4]))
		  {
			   currency[1] = currency[1] - f1cost*Math.pow(2,farm[4]);
			   currency[2] = currency[2] - f2cost*Math.pow(2,farm[4]);
			   farm[4] = farm[4] + 1;
		  }
		}
		
		//Farm 5  Blue per second multiplier
		function farm5(){
		  if( currency[3] >= fm2cost*Math.pow(2,farm[5]) &&  currency[2] >= fm1cost*Math.pow(2,farm[5]))
		  {
			   currency[2] = currency[2] - fm1cost*Math.pow(2,farm[5]);
			   currency[3] = currency[3] - fm2cost*Math.pow(2,farm[5]);
			   farm[5] = farm[5] + 1;
		  }
		}
		//Farm 6  Orange per second
		function farm6(){
		  if( currency[2] >= f1cost*Math.pow(2,farm[6]) &&  currency[3] >= f2cost*Math.pow(2,farm[6]))
		  {
			   currency[2] = currency[2] - f1cost*Math.pow(2,farm[6]);
			   currency[3] = currency[3] - f2cost*Math.pow(2,farm[6]);
			   farm[6] = farm[6] + 1;
		  }
		}
		
		//Farm 7  Orange per second multiplier
		function farm7(){
		  if( currency[4] >= fm2cost*Math.pow(2,farm[7]) &&  currency[3] >= fm1cost*Math.pow(2,farm[7]))
		  {
			   currency[4] = currency[4] - fm2cost*Math.pow(2,farm[7]);
			   currency[3] = currency[3] - fm1cost*Math.pow(2,farm[7]);
			   farm[7] = farm[7] + 1;
		  }
		}
		//Farm 8  Purple per second
		function farm8(){
		  if( currency[3] >= f1cost*Math.pow(2,farm[8]) &&  currency[4] >= f2cost*Math.pow(2,farm[8]))
		  {
			   currency[3] = currency[3] - f1cost*Math.pow(2,farm[8]);
			   currency[4] = currency[4] - f2cost*Math.pow(2,farm[8]);
			   farm[8] = farm[8] + 1;
		  }
		}
		
		
		
		/*=================================================================================
		 UPGRADES
		 =================================================================================*/
		// Upgrade 0 Green per click
		function upgrade0(){
			if(currency[0] >= 5*Math.pow(2,upgrade[0])){ // Enough Money ?
				currency[0] = currency[0]-5*Math.pow(2,upgrade[0]); // Pay the rents bitach!
				upgrade[0] = upgrade[0]+1; // Get rewarded
			}
		}		
		// Upgrade 1  Green per click multiplier
		function upgrade1(){  
		  if( currency[0] >= um1cost*Math.pow(2,upgrade[1]) && currency[1] >= um2cost*Math.pow(2,upgrade[1]) )
		  {
			   currency[0] = currency[0] - um1cost*Math.pow(2,upgrade[1]);
			   currency[1] = currency[1] - um2cost*Math.pow(2,upgrade[1]);
			   upgrade[1] = upgrade[1] + 1;	   
		  }
		}		
		// Upgrade 2  Red per click
		function upgrade2(){  
		  if( currency[0] >= u1cost*Math.pow(2,upgrade[2]) && currency[1] >= u2cost*Math.pow(2,upgrade[2]) )
		  {
			   currency[0] = currency[0] - u1cost*Math.pow(2,upgrade[2]);
			   currency[1] = currency[1] - u2cost*Math.pow(2,upgrade[2]);
			   upgrade[2] = upgrade[2] + 1;
		  }
		}		
		// Upgrade 3  Red per click multiplier
		function upgrade3(){  
		  if( currency[2] >= um2cost*Math.pow(2,upgrade[3]) && currency[1] >= um1cost*Math.pow(2,upgrade[3]) )
		  {
			   currency[2] = currency[2] - um2cost*Math.pow(2,upgrade[3]);
			   currency[1] = currency[1] - um1cost*Math.pow(2,upgrade[3]);
			   upgrade[3] = upgrade[3] + 1;
		  }
		}
		// Upgrade 4  Blue per click
		function upgrade4(){  
		  if( currency[2] >= u2cost*Math.pow(2,upgrade[4]) && currency[1] >= u1cost*Math.pow(2,upgrade[4]) )
		  {
			   currency[2] = currency[2] - u2cost*Math.pow(2,upgrade[4]);
			   currency[1] = currency[1] - u1cost*Math.pow(2,upgrade[4]);
			   upgrade[4]=upgrade[4] + 1;
		  }
		}
		
	    //Upgrade 5  Blue per click multiplier
		function upgrade5(){
		  if( currency[3] >= um2cost*Math.pow(2,upgrade[5]) &&  currency[2] >= um1cost*Math.pow(2,upgrade[5]))
		  {
			   currency[2] = currency[2] - um1cost*Math.pow(2,upgrade[5]);
			   currency[3] = currency[3] - um2cost*Math.pow(2,upgrade[5]);
			   upgrade[5] = upgrade[5] + 1;
		  }
		}
		//Upgrade 6  Orange per click
		function upgrade6(){
		  if( currency[2] >= u1cost*Math.pow(2,upgrade[6]) &&  currency[3] >= u2cost*Math.pow(2,upgrade[6]))
		  {
			   currency[2] = currency[2] - u1cost*Math.pow(2,upgrade[6]);
			   currency[3] = currency[3] - u2cost*Math.pow(2,upgrade[6]);
			   upgrade[6] = upgrade[6] + 1;
		  }
		}
		
		//Upgrade 7  Orange per click multiplier
		function upgrade7(){
		  if( currency[4] >= um2cost*Math.pow(2,upgrade[7]) &&  currency[3] >= um1cost*Math.pow(2,upgrade[7]))
		  {
			   currency[4] = currency[4] - um2cost*Math.pow(2,upgrade[7]);
			   currency[3] = currency[3] - um1cost*Math.pow(2,upgrade[7]);
			   upgrade[7] = upgrade[7] + 1;
		  }
		}
		//Upgrade 8  Purple per click
		function upgrade8(){
		  if( currency[3] >= u1cost*Math.pow(2,upgrade[8]) &&  currency[4] >= u2cost*Math.pow(2,upgrade[8]))
		  {
			   currency[3] = currency[3] - u1cost*Math.pow(2,upgrade[8]);
			   currency[4] = currency[4] - u2cost*Math.pow(2,upgrade[8]);
			   upgrade[8] = upgrade[8] + 1;
		  }
		}
		
		
		/*=================================================================================
		 WYSIWYG
		 =================================================================================*/		
		// This function gets element by classname, use it to be able to play a function for elements with the same class
		function getElementByClass (className, parent) {
		  parent || (parent = document);
		  var descendants= parent.getElementsByTagName('*'), i=-1, e, result=[];
		  while (e=descendants[++i]) {
			((' '+(e['class']||e.className)+' ').indexOf(' '+className+' ') > -1) && result.push(e);
		  }
		  return result;
		}
		$('.popoverOption').popover({ trigger: "hover" }); // Hover code for popups
		
		// Show XP-bar
		function showxp() {
			l("lvltext").innerHTML = xp + "/" + xpreq; // Update the xp
		}
		function hidexp() {
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
		}
		$('#myCollapsible').collapse({
		  toggle: false
		})
		
		/*=================================================================================
		 RESET GAME
		 =================================================================================*/	
		function Game_Reset(){
			if(confirm('Do you really want to reset the Game? All progress will be lost.')){
			
			for (var i=0;i<currency.length;i++)
			{
				currency[i] = 0;
			} 
			//[10]-[29]: upgrade[0]-[19]
			for (var i=0;i<upgrade.length;i++)
			{
				upgrade[i] = 0;
			} 
			//[30]-[49]: farm[0]-[19]
			for (var i=0;i<farm.length;i++)
			{
				farm[i] = 0;
			} 
			//[50]-[54]: xp, lvl, total_clicked, total_farmed, total_converted
			xp = 0;
			lvl = 0;
			total_clicked = 0;
			total_farmed = 0;
			total_converted = 0;
			//[55]-[91]: achievement[0]-[36] 
			for (var i=0;i<achievement.length;i++)
			{
				achievement[i] = 0;
			} 
			//[92]-[100] check_color [0]-[8]:
			for (var i=0;i<check_color.length;i++) 
			{
				check_color[i] = 0;
			} 
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";

			power[0] = 0;
		
			setCookie();
			document.location.reload(true);
			}else{
				// Do nithing
			}
		}
		
		$('#myCollapsible').collapse({
		  toggle: false
		})

		



