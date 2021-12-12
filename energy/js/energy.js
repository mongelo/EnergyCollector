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
			var cookie_data=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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
			
			for (var i=0;i<37;i++)
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
			//[111]-[120] achievement [37]-[46]:
				//[111]-[113] Pick up 10, 100 , 250 Green in a row
				//[114] Pick up nothing for 10 hours 
				//[115] Visit our facebook page
				//[116] Almost give up... (klicka på reset game men ångra sig)
				//[117]-[120] Gain 10, 20, 30 ,40 achievements
			for (var i=0;i<10;i++)
			{
				temp_cookie = temp_cookie + achievement[i+37] + ":";
			} 
			//[121]-[122] AFK and GREENSTREAK
			temp_cookie = temp_cookie + afk + ":" + greenstreak + ":";
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
		
		var pink_show = 0;
		var check_pink = false;
		
		var black_show = 0;
		var check_black = false;
	
		var currency = [0,0,0,0,0,0,0,0,0,0];
		var check_color = [0,0,0,0,0,0,0,0,0];
		
		var upgrade = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var farm = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var power = [0,0,0.5,0,0.5,0,0.5,0,0.5,0]; // Temporära: 0.5=låst, cooldown>0, activetime<0      Permanenta: 0=låst 1=aktiv
		var spawnrate = 1;
		var xpgain = 1;
		var pickrate = 1;
		var convertrate = 1;
		var afk = 0;
		var greenstreak = 0;
		var farmrate = 1;
		var xpmin = 1;
		
		var achievement = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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
		
		//PINK
		var pink_visible = Math.floor((Math.floor((Math.random()*40/spawnrate)+16/spawnrate)));
		
		var pink = new Kinetic.Layer({
			visible: false
		});
		var pinkrect = new Kinetic.Rect({ 
			width: 25, 
			height: 25,
			fill: '#dc3eb9', 
		});		
		pink.draw();
		pink.add(pinkrect);
	

		//BLACK
		var black_visible = Math.floor((Math.floor((Math.random()*48)+20)));	
		
		var black = new Kinetic.Layer({
			visible: false
		});
		var blackrect = new Kinetic.Rect({ 
			width: 25, 
			height: 25,
			fill: '#000000', 
		});		
		black.draw();
		black.add(blackrect);
		
		var tempss = document.cookie;
		tempss = tempss.substring(tempss.indexOf("kaka")+5,tempss.length);
		splittedss = tempss.split(":");// Creates a vector with the stored cookie data in each element.
		
		// Cookie
		if(cookie_data && splittedss.length > 98)
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
			////////////////////////////////////////////////////////
			var temps = document.cookie;
			temps = temps.substring(temps.indexOf("kaka")+5,temp.length);
			splitteds = temps.split(":");// Creates a vector with the stored cookie data in each element.
			if(splitteds.length > 105){ //PATCH 1.1
				//[101]-[110] power [0]-[9]:
				for (var i=0;i<power.length;i++) 
				{
					power[i] = Number(cookie_data[i+101]);
				}
				//[111]-[120] achievement [37]-[46]:
				//[111]-[113] Pick up 10, 100 , 250 Green in a row
				//[114] Pick up nothing for 10 hours 
				//[115] Visit our facebook page
				//[116] Almost give up... (klicka på reset game men ångra sig)
				//[117]-[120] Gain 10, 20, 30 ,40 achievements
				for (var i=0;i<10;i++)
				{
					achievement[i+37] = Number(cookie_data[i+111]);
				}
			}
			//[121]-[122] AFK and GREENSTREAK
			afk = Number(cookie_data[121]);
			greenstreak = Number(cookie_data[122]);
			
			xpreq = 10*Math.pow(2,lvl);
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
			if(power[1]==1){
				xpgain = 2;
				l("bsBox1").style.opacity = 1;
				l("bsBox1").setAttribute('data-content','Increases XP gain by double');
				l('bsBox1').style.backgroundPosition = "-60px 0";
			}else{
				l("bsBox1").setAttribute('data-content','Pay 50000 green and 10000 red to increases XP gain by double');
			}
			if(power[2]!=0.5){
				l("bsBox2").style.opacity = 1;
				l("bsBox2").setAttribute('data-content','10X collected energy');
				l('clip2').style.backgroundPosition = "-120px 0";
			}else if(lvl >= 10){
				l("bsBox2").setAttribute('data-content','Pay 100000 green, 20000 red and 10000 blue for 10X collected energy');
				l("bsBox2").style.opacity = 1;
			}
			if(power[3]==1){
				xpmin = 10;
				l("bsBox3").style.opacity = 1;
				l('bsBox3').style.backgroundPosition = "-180px 0";
				l("bsBox3").setAttribute('data-content','Minimum base XP is 10');
			}else if(lvl >= 12){
				l("bsBox3").setAttribute('data-content','Pay 1000000 green, 200000 red and 100000 blue for minimum base XP 10');
				l("bsBox3").style.opacity = 1;
			}
			if(power[4]!=0.5){
				l("bsBox4").style.opacity = 1;
				l("bsBox4").setAttribute('data-content','5X farmed energy');
				l('clip4').style.backgroundPosition = "-240px 0";
			}else if(lvl >= 14){
				l("bsBox4").setAttribute('data-content','Pay 500000 green, 100000 red and 50000 blue for 5X farmed energy');
				l("bsBox4").style.opacity = 1;
			}
			if(power[5]!=0){
				l("bsBox5").style.opacity = 1;
				l('bsBox5').style.backgroundPosition = "-300px 0";
				l("bsBox5").setAttribute('data-content','10% farming while offline');
				var d = new Date();
				var n = d.getTime();
				var timeaway = Math.round((n - power[5])/10000);
				for (var i=0;i<currency.length;i++){	
					currency[i] = currency[i] + farm[i*2]*(farm[i*2+1]+1)*timeaway;
					total_farmed = total_farmed + farm[i*2]*(farm[i*2+1]+1)*timeaway;
				}
			}else if(lvl >= 16){
				l("bsBox5").setAttribute('data-content','Pay 5000000 green, 100000 red, 200000 blue and 100000 orange for 10% farming while offline');
				l("bsBox5").style.opacity = 1;
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
			l("unlock-color").className = "pinkproduct popoverOption";
			l("unlock-color").setAttribute('data-content','pay 1600 purple to unlock a new energy');
		}
		if(check_color[4]==1){
			l("unlock-color").className = "blackproduct popoverOption";
			l("unlock-color").setAttribute('data-content','pay 3200 pink to unlock a new energy');
		}
		if(check_color[5]==1){
			l("unlock-color").style.display="none";
		}
		
		l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
		
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		  ga('create', 'UA-37681642-2', 'energycollector.se');
		  ga('send', 'pageview');
		  
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
			if(check_color[5]==1){
			l("purple-img").setAttribute('data-content','Convert ' + 5000*convertrate + ' purple to '+ 1000*convertrate +' pink');
			}else{
			l("purple-img").setAttribute('data-content','Unlock more energies to convert purple.');
			}
			if(check_color[6]==1){
			l("pink-img").setAttribute('data-content','Convert ' + 5000*convertrate + ' pink to '+ 1000*convertrate +' black');
			}else{
			l("pink-img").setAttribute('data-content','Unlock more energies to convert pink.');
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
		    l("green-sec").innerHTML = farm[0]*(farm[1]+1)*farmrate; // Update the Green per sec
		    l("green-farm-0").innerHTML = 25*Math.pow(2,farm[0]); // Update the green per mouse over text
		    l("green-farm-count-0").innerHTML = farm[0]; // Update the green per mouse over text
		    l("green-farm-1").innerHTML = fm1cost*Math.pow(2,farm[1]);
		    l("red-farm-1").innerHTML = fm2cost*Math.pow(2,farm[1]);
		    l("red-farm-count-1").innerHTML = farm[1];
			l("green-farm-2").innerHTML = f1cost*Math.pow(2,farm[2]);
		    l("red-sec").innerHTML = farm[2]*(farm[3]+1); // Update the Red per sec
			if(check_color[1]==1){
				l("red-sec").innerHTML = farm[2]*(farm[3]+1)*farmrate; // Update the Red per sec
			}
		    l("red-farm-2").innerHTML = f2cost*Math.pow(2,farm[2]);
		    l("red-farm-count-2").innerHTML = farm[2];
			l("green-upgrade-0").innerHTML = 5*Math.pow(2,upgrade[0]); // Update the green per mouse over text
			l("green-upgrade-count-0").innerHTML = upgrade[0]; // Update the green per mouse over text
			l("green-click").innerHTML = (upgrade[0]+1)*(upgrade[1]+1)*pickrate; // Update the green click
		    l("green-upgrade-1").innerHTML = um1cost*Math.pow(2,upgrade[1]);	
		    l("red-upgrade-1").innerHTML = um2cost*Math.pow(2,upgrade[1]);
		    l("red-upgrade-count-1").innerHTML = upgrade[1];
			l("red-click").innerHTML = (upgrade[2]+1)*(upgrade[3]+1);
			if(check_color[1]==1){
				l("red-click").innerHTML = (upgrade[2]+1)*(upgrade[3]+1)*pickrate;
			}
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
			if(check_color[2]==1){
				l("blue-click").innerHTML = (upgrade[4]+1)*(upgrade[5]+1)*pickrate;
			}
			l("red-upgrade-4").innerHTML = u1cost*Math.pow(2,upgrade[4]);
			l("blue-upgrade-4").innerHTML = u2cost*Math.pow(2,upgrade[4]);
			l("blue-upgrade-count-4").innerHTML = upgrade[4];
			l("blue-sec").innerHTML = farm[4]*(farm[5]+1); // Update the Blue per sec
			if(check_color[2]==1){
				l("blue-sec").innerHTML = farm[4]*(farm[5]+1)*farmrate; // Update the Red per sec
			}
			l("blue-farm-4").innerHTML = f2cost*Math.pow(2,farm[4]);
			l("red-farm-4").innerHTML = f1cost*Math.pow(2,farm[4]);
			l("blue-farm-count-4").innerHTML = farm[4];
			l("orange-click").innerHTML = (upgrade[6]+1)*(upgrade[7]+1);
			if(check_color[3]==1){
				l("orange-click").innerHTML = (upgrade[6]+1)*(upgrade[7]+1)*pickrate;
			}
			l("orange-sec").innerHTML = farm[6]*(farm[7]+1); 
			if(check_color[3]==1){
				l("orange-sec").innerHTML = farm[6]*(farm[7]+1)*farmrate;  // Update the Red per sec
			}
			l("purple-click").innerHTML = (upgrade[8]+1)*(upgrade[9]+1);
			if(check_color[4]==1){
				l("purple-click").innerHTML = (upgrade[8]+1)*(upgrade[9]+1)*pickrate;
			}
			l("purple-sec").innerHTML = farm[8]*(farm[9]+1); 
			if(check_color[4]==1){
				l("purple-sec").innerHTML = farm[8]*(farm[9]+1)*farmrate;  // Update the Red per sec
			}
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
			l("pink-cur").innerHTML = currency[5]; // Update the Orange currency
			l("black-cur").innerHTML = currency[6]; // Update the Purple currency
			//1.1
			l("pink-upgrade-count-9").innerHTML = upgrade[9];
			l("pink-upgrade-count-10").innerHTML = upgrade[10];
			l("black-upgrade-count-11").innerHTML = upgrade[11];
			l("black-upgrade-count-12").innerHTML = upgrade[12];
			l("pink-farm-count-9").innerHTML = farm[9];
			l("pink-farm-count-10").innerHTML = farm[10];
			l("black-farm-count-11").innerHTML = farm[11];
			l("black-farm-count-12").innerHTML = farm[12];
			l("purple-farm-9").innerHTML = fm1cost*Math.pow(2,farm[9]);
			l("pink-farm-9").innerHTML = fm2cost*Math.pow(2,farm[9]);
			l("purple-farm-10").innerHTML = f1cost*Math.pow(2,farm[10]);
			l("pink-farm-10").innerHTML = f2cost*Math.pow(2,farm[10]);
			l("black-farm-11").innerHTML = fm2cost*Math.pow(2,farm[11]);
			l("pink-farm-11").innerHTML = fm1cost*Math.pow(2,farm[11]);
			l("black-farm-12").innerHTML = f2cost*Math.pow(2,farm[12]);
			l("pink-farm-12").innerHTML = f1cost*Math.pow(2,farm[12]);
			l("pink-upgrade-9").innerHTML = um2cost*Math.pow(2,upgrade[9]);
			l("purple-upgrade-9").innerHTML = um1cost*Math.pow(2,upgrade[9]);
			l("pink-upgrade-10").innerHTML = u2cost*Math.pow(2,upgrade[10]);
			l("purple-upgrade-10").innerHTML = u1cost*Math.pow(2,upgrade[10]);
			l("pink-upgrade-11").innerHTML = um1cost*Math.pow(2,upgrade[11]);
			l("black-upgrade-11").innerHTML = um2cost*Math.pow(2,upgrade[11]);
			l("pink-upgrade-12").innerHTML = u1cost*Math.pow(2,upgrade[12]);
			l("black-upgrade-12").innerHTML = u2cost*Math.pow(2,upgrade[12]);
			
			l("pink-click").innerHTML = (upgrade[10]+1)*(upgrade[11]+1);
			if(check_color[5]==1){
				l("pink-click").innerHTML = (upgrade[10]+1)*(upgrade[11]+1)*pickrate;
			}
			l("pink-sec").innerHTML = farm[10]*(farm[11]+1); 
			if(check_color[5]==1){
				l("pink-sec").innerHTML = farm[10]*(farm[11]+1)*farmrate;  // Update the Pink per sec
			}
			l("black-click").innerHTML = (upgrade[12]+1)*(upgrade[13]+1);
			if(check_color[6]==1){
				l("black-click").innerHTML = (upgrade[12]+1)*(upgrade[13]+1)*pickrate;
			}
			l("black-sec").innerHTML = farm[12]*(farm[13]+1); 
			if(check_color[6]==1){
				l("black-sec").innerHTML = farm[12]*(farm[13]+1)*farmrate;  // Update the Black per sec
			}
			
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
				l("lvl-text").innerHTML = "<h4>You Reached Level 10</h4>New Powerup<br>+ 20000 Green<br>+ 10000 Red<br>+ 5000 Blue<br>+ 2000 Orange<br>+ 200 Purple"; 	
  				currency[0]	= currency[0] + 20000;	
				currency[1]	= currency[1] + 10000;
				currency[2]	= currency[2] + 5000;
				currency[3]	= currency[3] + 2000;	
				currency[4]	= currency[4] + 200;
				l("bsBox2").setAttribute('data-content','Pay 100000 green, 20000 red and 10000 blue for 10X collected energy');
				l("bsBox2").style.opacity = 1;
			    break;
			case 11:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 11</h4>+ 200000 Green<br>+ 100000 Red<br>+ 50000 Blue<br>+ 20000 Orange<br>+ 2000 Purple"; 	
  				currency[0]	= currency[0] + 200000;	
				currency[1]	= currency[1] + 100000;
				currency[2]	= currency[2] + 50000;
				currency[3]	= currency[3] + 20000;	
				currency[4]	= currency[4] + 2000;
			    break;
			case 12:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 12</h4>New Powerup<br>+ 200000 Green<br>+ 100000 Red<br>+ 50000 Blue<br>+ 20000 Orange<br>+ 2000 Purple"; 	
  				currency[0]	= currency[0] + 200000;	
				currency[1]	= currency[1] + 100000;
				currency[2]	= currency[2] + 50000;
				currency[3]	= currency[3] + 20000;	
				currency[4]	= currency[4] + 2000;
				l("bsBox3").setAttribute('data-content','Pay 1000000 green, 200000 red and 100000 blue for minimum base XP 10');
				l("bsBox3").style.opacity = 1;
			    break;
			case 13:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 13</h4>+ 800000 Green<br>+ 200000 Red<br>+ 100000 Blue<br>+ 50000 Orange<br>+ 20000 Purple"; 	
  				currency[0]	= currency[0] + 800000;	
				currency[1]	= currency[1] + 200000;
				currency[2]	= currency[2] + 100000;
				currency[3]	= currency[3] + 50000;	
				currency[4]	= currency[4] + 20000;
			    break;
			case 14:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 14</h4>New Powerup<br>+ 800000 Green<br>+ 200000 Red<br>+ 100000 Blue<br>+ 50000 Orange<br>+ 20000 Purple<br>+ 2000 Pink"; 	
  				currency[0]	= currency[0] + 800000;	
				currency[1]	= currency[1] + 200000;
				currency[2]	= currency[2] + 100000;
				currency[3]	= currency[3] + 50000;	
				currency[4]	= currency[4] + 20000;
				currency[5] = currency[5] + 2000;
				l("bsBox4").setAttribute('data-content','Pay 500000 green, 100000 red and 50000 blue for 5X farmed energy');
				l("bsBox4").style.opacity = 1;
			    break;
			case 15:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 15</h4>+ 800000 Green<br>+ 200000 Red<br>+ 100000 Blue<br>+ 50000 Orange<br>+ 20000 Purple<br>+ 2000 Pink"; 	
  				currency[0]	= currency[0] + 800000;	
				currency[1]	= currency[1] + 200000;
				currency[2]	= currency[2] + 100000;
				currency[3]	= currency[3] + 50000;	
				currency[4]	= currency[4] + 20000;
				currency[5] = currency[5] + 2000;
			    break;
			case 16:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 16</h4>New Powerup<br>+ 1500000 Green<br>+ 750000 Red<br>+ 400000 Blue<br>+ 100000 Orange<br>+ 40000 Purple<br>+ 10000 Pink<br>+ 100 Black"; 	
  				currency[0]	= currency[0] + 1500000;	
				currency[1]	= currency[1] + 750000;
				currency[2]	= currency[2] + 400000;
				currency[3]	= currency[3] + 100000;	
				currency[4]	= currency[4] + 40000;
				currency[5] = currency[5] + 10000;
				currency[6] = currency[6] + 100;
				l("bsBox5").setAttribute('data-content','Pay 5000000 green, 100000 red, 200000 blue and 100000 orange for 10% farming while offline');
				l("bsBox5").style.opacity = 1;
			    break;
			case 17:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 17</h4>+ 1500000 Green<br>+ 750000 Red<br>+ 400000 Blue<br>+ 100000 Orange<br>+ 40000 Purple<br>+ 10000 Pink<br>+ 1000 Black"; 	
  				currency[0]	= currency[0] + 1500000;	
				currency[1]	= currency[1] + 750000;
				currency[2]	= currency[2] + 400000;
				currency[3]	= currency[3] + 100000;	
				currency[4]	= currency[4] + 40000;
				currency[5] = currency[5] + 10000;
				currency[6] = currency[6] + 1000;
			    break;
			case 18:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 18</h4>+ 2500000 Green<br>+ 1500000 Red<br>+ 800000 Blue<br>+ 200000 Orange<br>+ 60000 Purple<br>+ 20000 Pink<br>+ 50000 Black"; 	
  				currency[0]	= currency[0] + 2500000;	
				currency[1]	= currency[1] + 1500000;
				currency[2]	= currency[2] + 800000;
				currency[3]	= currency[3] + 200000;	
				currency[4]	= currency[4] + 60000;
				currency[5] = currency[5] + 20000;
				currency[6] = currency[6] + 50000;
			    break;
			case 19:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 19</h4>+ 2500000 Green<br>+ 1500000 Red<br>+ 800000 Blue<br>+ 200000 Orange<br>+ 60000 Purple<br>+ 20000 Pink<br>+ 50000 Black"; 	
  				currency[0]	= currency[0] + 2500000;	
				currency[1]	= currency[1] + 1500000;
				currency[2]	= currency[2] + 800000;
				currency[3]	= currency[3] + 200000;	
				currency[4]	= currency[4] + 60000;
				currency[5] = currency[5] + 20000;
				currency[6] = currency[6] + 50000;
			    break;
			case 20:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 18</h4>+ 2500000 Green<br>+ 1500000 Red<br>+ 800000 Blue<br>+ 200000 Orange<br>+ 60000 Purple<br>+ 20000 Pink<br>+ 50000 Black"; 	
  				currency[0]	= currency[0] + 2500000;	
				currency[1]	= currency[1] + 1500000;
				currency[2]	= currency[2] + 800000;
				currency[3]	= currency[3] + 200000;	
				currency[4]	= currency[4] + 60000;
				currency[5] = currency[5] + 20000;
				currency[6] = currency[6] + 50000;
			    break;
			case 21:
				$('#myModal').modal({
				  show: true,
				  backdrop: false
				})
				l("lvl-text").innerHTML = "<h4>You Reached Level 21</h4>+ 2500000 Green<br>+ 1500000 Red<br>+ 800000 Blue<br>+ 200000 Orange<br>+ 60000 Purple<br>+ 20000 Pink<br>+ 50000 Black"; 	
  				currency[0]	= currency[0] + 2500000;	
				currency[1]	= currency[1] + 1500000;
				currency[2]	= currency[2] + 800000;
				currency[3]	= currency[3] + 200000;	
				currency[4]	= currency[4] + 60000;
				currency[5] = currency[5] + 20000;
				currency[6] = currency[6] + 50000;
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
			  $("#menubox .red").css("display", "inline-block");
		  }
		  
		  // Blue
		  if (check_color[1] == 1) {
			  returns = spawn(blue,blue_visible,blue_show);
			  blue_visible = returns[0];
			  blue_show = returns[1];
			  $(".blue").css("display", "block");
			  $("#menubox .blue").css("display", "inline-block");
		  }
		  
		  // Orange
		  if (check_color[2] == 1) {
			  returns = spawn(orange,orange_visible,orange_show);
			  orange_visible = returns[0];
			  orange_show = returns[1];
			  $(".orange").css("display", "block");
			  $("#menubox .orange").css("display", "inline-block");
		  }
		  
		  // Purple
		  if (check_color[3] == 1) {
			  returns = spawn(purple,purple_visible,purple_show);
			  purple_visible = returns[0];
			  purple_show = returns[1];
			  $(".purple").css("display", "block");
			  $("#menubox .purple").css("display", "inline-block");
		  }
		  
		  // Pink
		  if (check_color[4] == 1) {
			  returns = spawn(pink,pink_visible,pink_show);
			  pink_visible = returns[0];
			  pink_show = returns[1];
			  $(".pink").css("display", "block");
			  $("#menubox .pink").css("display", "inline-block");
		  }
		  
		  // Black
		  if (check_color[5] == 1) {
			  returns = spawn(black,black_visible,black_show);
			  black_visible = returns[0];
			  black_show = returns[1];
			  $(".black").css("display", "block");
			  $("#menubox .black").css("display", "inline-block");
		  }
			
			timer2 = timer2 + 1;

			
			if(timer2 == 4) // One second timer
			{
				timer2 = 0;
				afk = afk +1;
				setCookie();
				for(var i=0;i<currency.length;i++){
					if(check_color[i] == 1){
						currency[i] = currency[i] + farm[i*2]*(farm[i*2+1]+1)*farmrate;
						total_farmed = total_farmed + farm[i*2]*(farm[i*2+1]+1)*farmrate;
					}else{
						currency[i] = currency[i] + farm[i*2]*(farm[i*2+1]+1);
						total_farmed = total_farmed + farm[i*2]*(farm[i*2+1]+1);
					}
				}
				
				/*=================================================================================
				Achivements
				=================================================================================*/
				if(total_clicked>=10){achievement[0]=1;l('a0').className='achived'}
				if(total_clicked>=1000){achievement[1]=1;l('a1').className='achived'}
				if(total_clicked>=10000){achievement[2]=1;l('a2').className='achived'}
				if(total_clicked>=100000){achievement[3]=1;l('a3').className='achived'}
				if(total_clicked>=500000){achievement[4]=1;l('a4').className='achived'}
				if(total_clicked>=1000000){achievement[5]=1;l('a5').className='achived'}
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
				if(total_farmed>=1000000000){achievement[21]=1;l('a21').className='achived'}
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
				if(greenstreak >= 10 || achievement[37]==1){achievement[37]=1;l('a37').className='achived'}
				if(greenstreak >= 100 || achievement[38]==1){achievement[38]=1;l('a38').className='achived'}
				if(greenstreak >= 250 || achievement[39]==1){achievement[39]=1;l('a39').className='achived'}
				if(afk >= 36000 || achievement[40]==1){achievement[40]=1;l('a40').className='achived'}
				if(achievement[41]==1){achievement[41]=1;l('a41').className='achived'} //facebook
				if(achievement[42]==1){achievement[42]=1;l('a42').className='achived'} //Almost give up
				var total_achieves = 0;
				for (var i=0;i<achievement.length;i++)
				{ 
					total_achieves = total_achieves + achievement[i];
				}
				if(total_achieves>=10 || achievement[43]==1){achievement[43]=1;l('a43').className='achived'}
				if(total_achieves>=20 || achievement[44]==1){achievement[44]=1;l('a44').className='achived'}
				if(total_achieves>=30 || achievement[45]==1){achievement[45]=1;l('a45').className='achived'}
				if(total_achieves>=40 || achievement[46]==1){achievement[46]=1;l('a46').className='achived'}
				
				/*=================================================================================
				 POWER UP LOOP CODE
				 =================================================================================*/
				if(power[0]>0 && power[0]!=0.5){ //CD
					clipTween0.reverse();
					clipTween0.timeScale(1/6);
					clipTween0.seek(power[0]/6);
					power[0] = power[0] - 1;
				}
				if(power[0]<0){ //AKTIV
					clipTween0.play();
					clipTween0.seek(20 + (power[0]+1));
					pulseTween0.play();
					power[0] = power[0] + 1;
					spawnrate = 3;
				}
				if(power[0] == -1){ //Går på CD
					power[0] = 120;
					pulseTween0.pause();
					TweenMax.to(bsBox0, 1, {boxShadow: "0px 0px 0px 0px rgba(163,79,217,0.0)", overwrite:"auto"});
				}
				if(power[0] >= 0 && power[0] != 0.5){ //Stäng av powerns
					spawnrate = 1;
				}
				
				if(power[2]>0 && power[2]!=0.5){ //CD
					clipTween2.reverse();
					clipTween2.timeScale(0.2);
					clipTween2.seek(power[2]/5);
					power[2] = power[2] - 1;
				}
				if(power[2]<0){ //AKTIV
					clipTween2.play();
					clipTween2.seek(60 + (power[2]+1));
					pulseTween2.play();
					power[2] = power[2] + 1;
					pickrate = 10;
				}
				if(power[2] == -1){ //Går på CD
					power[2] = 300;
					pulseTween2.pause();
					TweenMax.to(bsBox2, 1, {boxShadow: "0px 0px 0px 0px rgba(163,79,217,0.0)", overwrite:"auto"});
				}
				if(power[2] >= 0 && power[2] != 0.5){ //Stäng av powerns
					pickrate = 1;
				}
				
				
				if(power[4]>0 && power[4]!=0.5){ //CD
					clipTween4.reverse();
					clipTween4.timeScale(0.1);
					clipTween4.seek(power[4]/10);
					power[4] = power[4] - 1;
				}
				if(power[4]<0){ //AKTIV
					clipTween4.play();
					clipTween4.seek(30 + (power[4]+1));
					pulseTween4.play();
					power[4] = power[4] + 1;
					farmrate = 5;
				}
				if(power[4] == -1){ //Går på CD
					power[4] = 300;
					pulseTween4.pause();
					TweenMax.to(bsBox4, 1, {boxShadow: "0px 0px 0px 0px rgba(163,79,217,0.0)", overwrite:"auto"});
				}
				if(power[4] >= 0 && power[4] != 0.5){ //Stäng av powerns
					farmrate = 1;
				}
				
				if(power[5] != 0){
					var d = new Date();
					power[5] = d.getTime();
				}
				
				
			} // One second timer ends
			
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
			if(currency[4] >= fm1cost*Math.pow(2,farm[9]) && currency[5] >= fm2cost*Math.pow(2,farm[9])) {
				l('farm9').style.opacity = 1.0;
			}else{
				l('farm9').style.opacity = 0.4;
			}
			if(currency[4] >= f1cost*Math.pow(2,farm[10]) && currency[5] >= f2cost*Math.pow(2,farm[10])) {
				l('farm10').style.opacity = 1.0;
			}else{
				l('farm10').style.opacity = 0.4;
			}
			if(currency[5] >= fm1cost*Math.pow(2,farm[11]) && currency[6] >= fm2cost*Math.pow(2,farm[11])) {
				l('farm11').style.opacity = 1.0;
			}else{
				l('farm11').style.opacity = 0.4;
			}
			if(currency[5] >= f1cost*Math.pow(2,farm[12]) && currency[6] >= f2cost*Math.pow(2,farm[12])) {
				l('farm12').style.opacity = 1.0;
			}else{
				l('farm12').style.opacity = 0.4;
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
			if(currency[5] >= um2cost*Math.pow(2,upgrade[9]) && currency[4] >= um1cost*Math.pow(2,upgrade[9])) {
				l('upgrade9').style.opacity = 1.0;
			}else{
				l('upgrade9').style.opacity = 0.4;
			}
			if(currency[4] >= u1cost*Math.pow(2,upgrade[10]) && currency[5] >= u2cost*Math.pow(2,upgrade[10])) {
				l('upgrade10').style.opacity = 1.0;
			}else{
				l('upgrade10').style.opacity = 0.4;
			}
			if(currency[6] >= um2cost*Math.pow(2,upgrade[11]) && currency[5] >= um1cost*Math.pow(2,upgrade[11])) {
				l('upgrade11').style.opacity = 1.0;
			}else{
				l('upgrade11').style.opacity = 0.4;
			}
			if(currency[5] >= u1cost*Math.pow(2,upgrade[12]) && currency[6] >= u2cost*Math.pow(2,upgrade[12])) {
				l('upgrade12').style.opacity = 1.0;
			}else{
				l('upgrade12').style.opacity = 0.4;
			}

		}//Main loop ends
		
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
				returns = newColor(800,currency[3]); //Pay 800 currency to unlock currency Purple
				check_color[3] = returns[0];
				currency[3] = returns[1];
				if(check_color[3]==1){
					l("unlock-color").className = "pinkproduct";
					l("unlock-color").setAttribute('data-content','Pay 1600 purple to unlock a new energy');
				}
			}else if(check_color[4] != 1){
				returns = newColor(1600,currency[4]); //Pay 1600 currency to unlock currency Pink
				check_color[4] = returns[0];
				currency[4] = returns[1];
				if(check_color[4]==1){
					l("unlock-color").className = "blackproduct";
					l("unlock-color").setAttribute('data-content','Pay 3200 pink to unlock a new energy');
				}
			}else if(check_color[5] != 1){
				returns = newColor(3200,currency[5]); //Pay 3200 currency to unlock currency Black
				check_color[5] = returns[0];
				currency[5] = returns[1];
				if(check_color[5]==1){
					l("unlock-color").style.display="none";
				}
			}
		}
			
		/*=================================================================================
		 Mouse over Code
		 =================================================================================*/
		green.on('mouseover touchmove touchstart', function() {
			green_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);
			total_clicked = total_clicked + (upgrade[0]+1)*(upgrade[1]+1)*pickrate;
			green_show = 0;
			greenstreak = greenstreak + 1;
			if(power[3]==1){
				xp = xp +xpmin*xpgain;
			}else{
				xp = xp +1*xpgain;
			}
			currency[0] = currency[0] + (upgrade[0]+1)*(upgrade[1]+1)*pickrate; // Gain 1 green currency
			green.hide(); // Hide the cube
			green.draw(); // Update
			stage.add(green); //This line is needed for good response time
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
			afk = 0;
		});
		
		red.on('mouseover touchmove touchstart', function() {
			red_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);
			if(check_color[1]==0){
				red_visible = Math.floor((Math.random()*28)+8);
			}
			red_show = 0;
			if(power[3]==1){
				xp = xp +xpmin*xpgain;
			}else{
				xp = xp +2*xpgain;
			}
			if(check_color[1]==1){
				total_clicked = total_clicked + (upgrade[2]+1)*(upgrade[3]+1)*pickrate;
				currency[1] = currency[1] + (upgrade[2]+1)*(upgrade[3]+1)*pickrate;
			}else{
				total_clicked = total_clicked + (upgrade[2]+1)*(upgrade[3]+1);
				currency[1] = currency[1] + (upgrade[2]+1)*(upgrade[3]+1);
			}
			red.hide();
			red.draw();
			stage.add(red);
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
			afk = 0;
		});
		
		blue.on('mouseover touchmove touchstart', function() {
			blue_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);
			if(check_color[2]==0){
				blue_visible = Math.floor((Math.random()*28)+8);
			}
			if(check_color[2]==1){
				total_clicked = total_clicked + (upgrade[4]+1)*(upgrade[5]+1)*pickrate;
				currency[2] = currency[2] + (upgrade[4]+1)*(upgrade[5]+1)*pickrate; 
			}else{
				total_clicked = total_clicked + (upgrade[4]+1)*(upgrade[5]+1);
				currency[2] = currency[2] + (upgrade[4]+1)*(upgrade[5]+1); 
			}
			blue_show = 0;
			if(power[3]==1){
				xp = xp +xpmin*xpgain;
			}else{
				xp = xp +4*xpgain;
			}
			blue.hide();
			blue.draw();
			stage.add(blue);			
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
			afk = 0;
			
		});
		
		orange.on('mouseover touchmove touchstart', function() {
			orange_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);
			if(check_color[3]==0){
				orange_visible = Math.floor((Math.random()*28)+8);
			}
			if(check_color[3]==1){
				total_clicked = total_clicked + (upgrade[6]+1)*(upgrade[7]+1)*pickrate;
				currency[3] = currency[3] + (upgrade[6]+1)*(upgrade[7]+1)*pickrate; 
			}else{
				total_clicked = total_clicked + (upgrade[6]+1)*(upgrade[7]+1);
				currency[3] = currency[3] + (upgrade[6]+1)*(upgrade[7]+1); 
			}
			orange_show = 0;
			if(power[3]==1){
				xp = xp +xpmin*xpgain;
			}else{
				xp = xp +8*xpgain;
			}
			orange.hide();
			orange.draw();
			stage.add(orange);
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
			afk = 0;
		});
		
		purple.on('mouseover touchmove touchstart', function() {
			purple_visible = Math.floor((Math.random()*28/spawnrate)+8/spawnrate);
			if(check_color[4]==0){
				purple_visible = Math.floor((Math.random()*28)+8);
			}
			if(check_color[4]==1){
				total_clicked = total_clicked + (upgrade[8]+1)*(upgrade[9]+1)*pickrate;
				currency[4] = currency[4] + (upgrade[8]+1)*(upgrade[9]+1)*pickrate; 
			}else{
				total_clicked = total_clicked + (upgrade[8]+1)*(upgrade[9]+1);
				currency[4] = currency[4] + (upgrade[8]+1)*(upgrade[9]+1); 
			}
			purple_show = 0;
			xp = xp + 16*xpgain;
			purple.hide();
			purple.draw();
			stage.add(purple);
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
			afk = 0;
		});
		pink.on('mouseover touchmove touchstart', function() {
			pink_visible = Math.floor((Math.random()*40/spawnrate)+16/spawnrate);
			if(check_color[5]==0){
				pink_visible = Math.floor((Math.random()*40)+16);
			}
			if(check_color[5]==1){
				total_clicked = total_clicked + (upgrade[10]+1)*(upgrade[11]+1)*pickrate;
				currency[5] = currency[5] + (upgrade[10]+1)*(upgrade[11]+1)*pickrate; 
			}else{
				total_clicked = total_clicked + (upgrade[10]+1)*(upgrade[11]+1);
				currency[5] = currency[5] + (upgrade[10]+1)*(upgrade[11]+1); 
			}
			pink_show = 0;
			xp = xp + 32*xpgain;
			pink.hide();
			pink.draw();
			stage.add(pink);
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
			afk = 0;
		});
		black.on('mouseover touchmove touchstart', function() {
			black_visible = Math.floor((Math.random()*48/spawnrate)+20/spawnrate);
			if(check_color[6]==0){
				black_visible = Math.floor((Math.random()*48)+20);
			}
			if(check_color[6]==1){
				total_clicked = total_clicked + (upgrade[12]+1)*(upgrade[13]+1)*pickrate;
				currency[6] = currency[6] + (upgrade[12]+1)*(upgrade[13]+1)*pickrate; 
			}else{
				total_clicked = total_clicked + (upgrade[12]+1)*(upgrade[13]+1);
				currency[6] = currency[6] + (upgrade[12]+1)*(upgrade[13]+1); 
			}
			black_show = 0;
			xp = xp + 64*xpgain;
			black.hide();
			black.draw();
			stage.add(black);
			l("lvl").innerHTML = "lvl: " + lvl; // Update the lvl
			l("progressbar").style.width = (xp / xpreq)*100 + "%";
			l("lvltext").innerHTML = Math.floor((xp / xpreq)*100) + "%";
			afk = 0;
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
		 // Purple to Pink
		 function purple_convert() {
			if( currency[4] >= 5000*convertrate && check_color[5]==1) {
			currency[4] = currency[4] - 5000*convertrate;	
			currency[5] = currency[5] + 1000*convertrate;
			total_converted = total_converted + 1000*convertrate;
			}
		 }
		// Pink to Black
		 function pink_convert() {
			if( currency[5] >= 5000*convertrate && check_color[6]==1) {
			currency[5] = currency[5] - 5000*convertrate;	
			currency[6] = currency[6] + 1000*convertrate;
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
			  if(object == pink){
					visible = 5;
			  }
			  if(object == black){
					visible = 5;
			  }
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
			  visible = Math.floor((Math.random()*28)+8);
			  show = 0;
			  if(object == green){
					greenstreak = 0;
			  }
			  if(object == pink){
					visible = Math.floor((Math.random()*40)+16);
			  }
			  if(object == black){
					visible = Math.floor((Math.random()*48)+20);
			  }
		   }
		    var returns=[visible,show];
		    return returns;
		}
		/*=================================================================================
		 POWER UPS GSAP 1.8.0 Thanks to the creators of GSAP!
		 =================================================================================*/
		 // Clip Animation 1
		var box0 = $("#clip0");
		clipTween0 = TweenLite.from(box0, 20, {clip:"rect(0px,60px,60px,0px)", paused:true, ease:Linear.easeNone});
		// Pulse Animation
		var bsBox0 = $("#bsBox0");		
		pulseTween0 = TweenMax.fromTo(bsBox0, 0.7, {
			boxShadow: "0px 0px 0px 0px rgba(163,79,217,0.3)"
		}, {
			boxShadow: "0px 0px 10px 5px rgba(92,8,146,0.7)",
			repeat: -1,
			yoyo: true,
			paused: true,
			ease: Linear.easeNone
		});
		// Clip Animation 2
		var box2 = $("#clip2");
		clipTween2 = TweenLite.from(box2, 60, {clip:"rect(0px,60px,60px,0px)", paused:true, ease:Linear.easeNone});
		// Pulse Animation
		var bsBox2 = $("#bsBox2");		
		pulseTween2 = TweenMax.fromTo(bsBox2, 0.7, {
			boxShadow: "0px 0px 0px 0px rgba(163,79,217,0.3)"
		}, {
			boxShadow: "0px 0px 10px 5px rgba(92,8,146,0.7)",
			repeat: -1,
			yoyo: true,
			paused: true,
			ease: Linear.easeNone
		});
		// Clip Animation 3
		var box4 = $("#clip4");
		clipTween4 = TweenLite.from(box4, 30, {clip:"rect(0px,60px,60px,0px)", paused:true, ease:Linear.easeNone});
		// Pulse Animation
		var bsBox4 = $("#bsBox4");		
		pulseTween4 = TweenMax.fromTo(bsBox4, 0.7, {
			boxShadow: "0px 0px 0px 0px rgba(163,79,217,0.3)"
		}, {
			boxShadow: "0px 0px 10px 5px rgba(92,8,146,0.7)",
			repeat: -1,
			yoyo: true,
			paused: true,
			ease: Linear.easeNone
		});
		
		function powerup0(){
			if(power[0]==0){
				power[0] = -21; //Active time
				spawnrate = 3;
			}
		}
		function powerup1(){
			if(power[1]==0 && currency[0] >= 50000 && currency[1] >= 10000){
				currency[0] = currency[0] - 50000;
				currency[1] = currency[1] - 10000;
				power[1] = 1;
				xpgain = 2;
				l("bsBox1").style.opacity = 1;
				l('bsBox1').style.backgroundPosition = "-60px 0";
				l("bsBox1").setAttribute('data-content','Increases XP gain by double');
			}
		}
		function powerup2(){
			if(power[2]==0){
				power[2] = -61; //Active time
				pickrate = 10;
			}
			if(power[2]==0.5 && lvl >= 10 && currency[0] >= 100000 && currency[1] >= 20000 && currency[2] >= 10000){			
				power[2] = 0;
				currency[0] = currency[0] - 100000;
				currency[1] = currency[1] - 20000;
				currency[2] = currency[2] - 10000;
				l("bsBox2").setAttribute('data-content','10X collected energy');
				l('clip2').style.backgroundPosition = "-120px 0";
			}
		}
		function powerup3(){
			if(power[3] == 0 && currency[0] >= 1000000 && currency[1] >= 200000 && currency[2] >= 50000 && lvl >= 12){
				power[3] = 1;
				currency[0] = currency[0] - 1000000;
				currency[1] = currency[1] - 200000;
				currency[2] = currency[2] - 100000;
				xpmin = 10;
				l("bsBox3").style.opacity = 1;
				l('bsBox3').style.backgroundPosition = "-180px 0";
				l("bsBox3").setAttribute('data-content','Minimum base XP is 10');
			}
		}
		
		function powerup4(){
			if(power[4]==0){
				power[4] = -31; //Active time
				farmrate = 5;
			}
			if(power[4]==0.5 && lvl>=14 && currency[0] >= 500000 && currency[1] >= 100000 && currency[2] >= 50000){			
				power[4] = 0;
				currency[0] = currency[0] - 500000;
				currency[1] = currency[1] - 100000;
				currency[2] = currency[2] - 50000;
				l("bsBox4").setAttribute('data-content','5X farmed energy');
				l("bsBox4").style.opacity = 1;
				l('clip4').style.backgroundPosition = "-240px 0";
			}
		}
		
		function powerup5(){
			if(power[5] == 0 && currency[0] >= 5000000 && currency[1] >= 1000000 && currency[2] >= 200000 && currency[3] >= 100000 && lvl >= 16){
				var d = new Date();
				power[5] = d.getTime();
				currency[0] = currency[0] - 5000000;
				currency[1] = currency[1] - 1000000;
				currency[2] = currency[2] - 200000;
				currency[2] = currency[2] - 100000;
				l("bsBox5").style.opacity = 1;
				l("bsBox5").setAttribute('data-content','10% farming while offline');
				l('bsBox5').style.backgroundPosition = "-300px 0";
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
		//Farm 9  Purple per second multiplier
		function farm9(){
		  if( currency[5] >= fm2cost*Math.pow(2,farm[9]) &&  currency[4] >= fm1cost*Math.pow(2,farm[9]))
		  {
			   currency[5] = currency[5] - fm2cost*Math.pow(2,farm[9]);
			   currency[4] = currency[4] - fm1cost*Math.pow(2,farm[9]);
			   farm[9] = farm[9] + 1;
		  }
		}
		//Farm 10  Pink per second
		function farm10(){
		  if( currency[4] >= f1cost*Math.pow(2,farm[10]) &&  currency[5] >= f2cost*Math.pow(2,farm[10]))
		  {
			   currency[4] = currency[4] - f1cost*Math.pow(2,farm[10]);
			   currency[5] = currency[5] - f2cost*Math.pow(2,farm[10]);
			   farm[10] = farm[10] + 1;
		  }
		}
		//Farm 11  Pink per second multiplier
		function farm11(){
		  if( currency[6] >= fm2cost*Math.pow(2,farm[11]) &&  currency[5] >= fm1cost*Math.pow(2,farm[11]))
		  {
			   currency[6] = currency[6] - fm2cost*Math.pow(2,farm[11]);
			   currency[5] = currency[5] - fm1cost*Math.pow(2,farm[11]);
			   farm[11] = farm[11] + 1;
		  }
		}
		//Farm 12  Black per second
		function farm12(){
		  if( currency[5] >= f1cost*Math.pow(2,farm[12]) &&  currency[6] >= f2cost*Math.pow(2,farm[12]))
		  {
			   currency[5] = currency[5] - f1cost*Math.pow(2,farm[12]);
			   currency[6] = currency[6] - f2cost*Math.pow(2,farm[12]);
			   farm[12] = farm[12] + 1;
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
		//Upgrade 9  Purple per click multiplier
		function upgrade9(){
		  if( currency[5] >= um2cost*Math.pow(2,upgrade[9]) &&  currency[4] >= um1cost*Math.pow(2,upgrade[9]))
		  {
			   currency[5] = currency[5] - um2cost*Math.pow(2,upgrade[9]);
			   currency[4] = currency[4] - um1cost*Math.pow(2,upgrade[9]);
			   upgrade[9] = upgrade[9] + 1;
		  }
		}
		//Upgrade 10 Pink per click
		function upgrade10(){
		  if( currency[4] >= u1cost*Math.pow(2,upgrade[10]) &&  currency[5] >= u2cost*Math.pow(2,upgrade[10]))
		  {
			   currency[4] = currency[4] - u1cost*Math.pow(2,upgrade[10]);
			   currency[5] = currency[5] - u2cost*Math.pow(2,upgrade[10]);
			   upgrade[10] = upgrade[10] + 1;
		  }
		}
		//Upgrade 11 Pink per click multiplier
		function upgrade11(){
		  if( currency[6] >= um2cost*Math.pow(2,upgrade[11]) &&  currency[5] >= um1cost*Math.pow(2,upgrade[11]))
		  {
			   currency[6] = currency[6] - um2cost*Math.pow(2,upgrade[11]);
			   currency[5] = currency[5] - um1cost*Math.pow(2,upgrade[11]);
			   upgrade[11] = upgrade[11] + 1;
		  }
		}
		//Upgrade 12 Black per click
		function upgrade12(){
		  if( currency[5] >= u1cost*Math.pow(2,upgrade[12]) &&  currency[6] >= u2cost*Math.pow(2,upgrade[12]))
		  {
			   currency[5] = currency[5] - u1cost*Math.pow(2,upgrade[12]);
			   currency[6] = currency[6] - u2cost*Math.pow(2,upgrade[12]);
			   upgrade[12] = upgrade[12] + 1;
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
			achievement[42] = 1;
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
			//[55]-[91]: achievement[0]-ALLA
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
			for (var i=0;i<power.length;i++) 
			{
				power[i] = 0;
			}
			power[2] = 0.5;
			power[4] = 0.5;
			spawnrate = 1;
			xpgain = 1;
			pickrate = 1;
			convertrate = 1;
			afk = 0;
			greenstreak = 0;
			farmrate = 1;
			xpmin = 1;			
			
			setCookie();
			document.location.reload(true);
			}else{
				// Do nithing
			}
		}
		// Facebook click achivement
		function faceclick(){
			achievement[41] = 1;
		}



