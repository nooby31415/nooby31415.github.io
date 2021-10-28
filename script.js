//////////////////////////////////////////////////////////////////////////////////////////////INIT VARS
var mouseX=0;
var mouseY=0;
var shiftX=0;
var shiftY=0;
var zoom=0;
var p=1;
var i=0;
var m=100;
var g=0;
var char_rarity=0;
var char_num=3;
var char_name=[
	["muffin"       ,"impostor"  ,"happy meal"     ,"noob"        ,"crewmate"],
	["polish cow"   ,"stickman"  ,"rick astley"    ,"cheeseburger","e"       ],
	["shrek"        ,"mc chicken","epic rickroll"  ,"rubiks cube" ,"discord" ],
	["nestle crunch","potato"    ,"legend rickroll","big mac"     ,"dream"   ]
];
var char_img=[
	["muffin.png"      ,"among us red.png","happymeal.png" ,"favicon.png"     ,"amongusgreen.png"],
	["polishcow.png"   ,"stickman.png"    ,"rickastley.png","cheeseburger.png","E.png"           ],
	["shrek.png"       ,"mcchicken.png"   ,"rickastley.png","rubikscube.png"  ,"discord.png"     ],
	["nestlecrunch.png","potato.png"      ,"rickastley.png","bigmac.png"      ,"dream.png"       ]
];
var char_attack=[
	["die die dieee","sus"         ,"mc donalds"             ,"oof"       ,"tasks"            ],
	["kick"         ,"stickboi"    ,"never gonna give you up","mc donalds","eeee"             ],
	["shreksophone" ,"mc donalds"  ,"never gonna give you up","solve"     ,"ear blasting ping"],
	["CRUNCH"       ,"potato"      ,"never gonna give you up","mc donalds","minecraft"        ]
];
var char_min=[
	[6,7,7 ,5,7 ],
	[7,6,7 ,7,8 ],
	[8,8,8 ,7,8 ],
	[9,9,10,9,10]
];
var char_max=[
	[12,13,12,12,13],
	[13,13,14,13,14],
	[15,16,15,16,16],
	[17,17,18,17,18]
];
var char_hp=[
	[90 ,90 ,95 ,85 ,90 ],
	[100,110,105,105,105],
	[115,120,110,110,115],
	[125,120,130,125,125]
];
var char_exists=[
	[0,0,0,1,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0]
];
var char_php;
var char_ehp;
var char_erarity;
var char_enum;
var turn=0;
var ranks=["Common","Rare","Epic","Legendary"];
var img=["num7.png","gold.png","rickastley.png","google.png","cherry.png"];
var good="We're no strangers to love You know the rules and so do I A full commitment's what I'm thinking of You wouldn't get this from any other guy I just wanna tell you how I'm feeling Gotta make you understand Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you We've known each other for so long Your heart's been aching but you're too shy to say it Inside we both know what's been going on We know the game and we're gonna play it And if you ask me how I'm feeling Don't tell me you're too blind to see Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Never gonna give, never gonna give (Give you up) We've known each other for so long Your heart's been aching but you're too shy to say it Inside we both know what's been going on We know the game and we're gonna play it I just wanna tell you how I'm feeling Gotta make you understand Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you ";
var c_r=[255];
var c_g=[0];
var c_b=[0];
var click=false;
//////////////////////////////////////////////////////////////////////////////////////////////FUNCTIONS
function randint(m,n){
	if(m>n){
		var p=m;
		m=n;
		n=p;
	}
	n++;
	return Math.floor(Math.random()*(n-m))+m;
};
function complex2(comp){
	return [comp[0]**2-comp[1]**2,2*comp[0]*comp[1]];
}
function complexadd(comp1,comp2){
	return [comp1[0]+comp2[0],comp1[1]+comp2[1]]
}
function hexp(c) {
	var hex=c.toString(16);
	if(hex.length==1){
		return "0"+hex;
	}else{
		return hex;
	}
}
function rgb2hex(r,g,b) {
	return "#"+hexp(r)+hexp(g)+hexp(b);
}
for(var iter1=1;iter1<=8;iter1++){
	for(var iter2=0;iter2<=5;iter2++){
		c_r.push(255);
		c_g.push(iter2*42);
		c_b.push(0);
	}
	for(var iter2=5;iter2>=0;iter2--){
		c_g.push(255);
		c_r.push(iter2*42);
		c_b.push(0);
	}
	for(var iter2=0;iter2<=5;iter2++){
		c_g.push(255);
		c_b.push(iter2*42);
		c_r.push(0);
	}
	for(var iter2=5;iter2>=0;iter2--){
		c_b.push(255);
		c_g.push(iter2*42);
		c_r.push(0);
	}
	for(var iter2=0;iter2<=5;iter2++){
		c_b.push(255);
		c_r.push(iter2*42);
		c_g.push(0);
	}
	for(var iter2=5;iter2>=0;iter2--){
		c_r.push(255);
		c_b.push(iter2*42);
		c_g.push(0);
	}
	c_r.push(255);
	c_b.push(0);
	c_g.push(0);
	c_r.push(255);
	c_b.push(0);
	c_g.push(0);
}
function mandel(){
	var canvas=document.getElementById("ma_canvas")
	var ctx=canvas.getContext("2d");
	for(var x=0;x<512;x+=2){
		for(var y=0;y<512;y+=2){
			var xpos=((x+shiftX)-256)/(128*zoom)+(shiftX*zoom/(256*zoom));
			var ypos=(256-(y+shiftY))/(128*zoom)-(shiftY*zoom/(256*zoom));
			var z=[0,0];
			var c=[xpos,ypos]
			for(var iter=0;iter<256;iter++){
				z=complexadd(complex2(z),c);
				if(iter==255){
					ctx.fillStyle="#000000";
					break;
				}
				if(Math.sqrt(z[0]**2+z[1]**2)>=2){
					ctx.fillStyle=rgb2hex(c_r[iter],c_g[iter],c_b[iter]);
					break;
				}
			}
			ctx.fillRect(x,y,2,2);
		}
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////INIT ELEMENTS
document.getElementById("rt_div").style.display="none";
document.getElementById("ab_div").style.display="block";
document.getElementById("sl_div").style.display="none";
document.getElementById("ba_div").style.display="none";
document.getElementById("sa_div").style.display="none";
document.getElementById("in_div").style.display="none";
document.getElementById("ma_div").style.display="none";
document.getElementById("sh_div").style.display="none";

document.getElementById("hi_text").innerHTML="Click or tap on a button!";
document.getElementById("sl_char").style.visibility="hidden";
//////////////////////////////////////////////////////////////////////////////////////////////BUTTONS-RICKROLL TYPER
document.getElementById("rt").onclick=function(){
	p=0;
	document.getElementById("rt_div").style.display="block";
	document.getElementById("ab_div").style.display="none";
	document.getElementById("sl_div").style.display="none";
	document.getElementById("ba_div").style.display="none";
	document.getElementById("sa_div").style.display="none";
	document.getElementById("in_div").style.display="none";
	document.getElementById("ma_div").style.display="none";
	document.getElementById("sh_div").style.display="none";

	document.getElementById("hi_text").innerHTML="Type or tap the screen!";
}
//////////////////////////////////////////////////////////////////////////////////////////////BUTTONS-ABOUT
document.getElementById("ab").onclick=function(){
	p=1;
	document.getElementById("rt_div").style.display="none";
	document.getElementById("ab_div").style.display="block";
	document.getElementById("sl_div").style.display="none";
	document.getElementById("ba_div").style.display="none";
	document.getElementById("sa_div").style.display="none";
	document.getElementById("in_div").style.display="none";
	document.getElementById("ma_div").style.display="none";
	document.getElementById("sh_div").style.display="none";

	document.getElementById("hi_text").innerHTML="Click or tap on a button!";
}
//////////////////////////////////////////////////////////////////////////////////////////////BUTTONS-SLOTS
document.getElementById("sl").onclick=function(){
	p=2;
	document.getElementById("rt_div").style.display="none";
	document.getElementById("ab_div").style.display="none";
	document.getElementById("sl_div").style.display="block";
	document.getElementById("ba_div").style.display="none";
	document.getElementById("sa_div").style.display="none";
	document.getElementById("in_div").style.display="none";
	document.getElementById("ma_div").style.display="none";	
	document.getElementById("sh_div").style.display="none";

	document.getElementById("hi_text").innerHTML="Press spin and earn (or lose) money!";
}
//////////////////////////////////////////////////////////////////////////////////////////////BUTTONS-BATTLE
document.getElementById("ba").onclick=function(){
	p=3;
	document.getElementById("rt_div").style.display="none";
	document.getElementById("ab_div").style.display="none";
	document.getElementById("sl_div").style.display="none";
	document.getElementById("ba_div").style.display="block";
	document.getElementById("sa_div").style.display="none";
	document.getElementById("in_div").style.display="none";
	document.getElementById("ma_div").style.display="none";	
	document.getElementById("sh_div").style.display="none";

	document.getElementById("hi_text").innerHTML="Battle to the death!";

	document.getElementById("ba_pchar").src=char_img[char_rarity][char_num];
	char_erarity=randint(0,3);
	char_enum=randint(0,4);
	char_php=char_hp[char_rarity][char_num];
	char_ehp=char_hp[char_erarity][char_enum];
	document.getElementById("ba_echar").src=char_img[char_erarity][char_enum];
	document.getElementById("ba_ptext").innerHTML=char_name[char_rarity][char_num]+"-"+char_php+"HP";
	document.getElementById("ba_etext").innerHTML=char_name[char_erarity][char_enum]+"-"+char_ehp+"HP";

}
//////////////////////////////////////////////////////////////////////////////////////////////BUTTONS-SAVE/LOAD
document.getElementById("sa").onclick=function(){
	p=4;
	document.getElementById("rt_div").style.display="none";
	document.getElementById("ab_div").style.display="none";
	document.getElementById("sl_div").style.display="none";
	document.getElementById("ba_div").style.display="none";
	document.getElementById("sa_div").style.display="block";
	document.getElementById("in_div").style.display="none";
	document.getElementById("ma_div").style.display="none";	
	document.getElementById("sh_div").style.display="none";

	document.getElementById("hi_text").innerHTML="Copy the code and save it, or paste a code to load data";
	var m_save=m.toString();
	var m_savel=m_save.length;
	for(var iter=0;iter<7-m_savel;iter++){
		m_save="0"+m_save;
	}
	var g_save=g.toString();
	var g_savel=g_save.length;
	for(var iter=0;iter<7-g_savel;iter++){
		g_save="0"+g_save;
	}
	var m_hash=0;
	var g_hash=0;
	for(var iter=0;iter<7;iter++){
		m_hash+=parseInt(m_save.charAt(iter));
		g_hash+=parseInt(g_save.charAt(iter));
	}
	m_hash=m_hash.toString();
	g_hash=g_hash.toString();
	if(parseInt(m_hash)<10){m_hash="0"+m_hash;}
	if(parseInt(g_hash)<10){g_hash="0"+g_hash;}
	var inv="";
	for(var iter1=0;iter1<4;iter1++){
		for(var iter2=0;iter2<5;iter2++){
			inv+=char_exists[iter1][iter2];
		}
	}
	document.getElementById("sa_code").innerHTML=m_save+g_save+m_hash+g_hash+inv;
}
//////////////////////////////////////////////////////////////////////////////////////////////BUTTONS-INVENTORY
document.getElementById("in").onclick=function(){
	p=5;
	document.getElementById("rt_div").style.display="none";
	document.getElementById("ab_div").style.display="none";
	document.getElementById("sl_div").style.display="none";
	document.getElementById("ba_div").style.display="none";
	document.getElementById("sa_div").style.display="none";
	document.getElementById("in_div").style.display="block";
	document.getElementById("ma_div").style.display="none";	
	document.getElementById("sh_div").style.display="none";

	document.getElementById("hi_text").innerHTML="Click on a character to equip it";

	for(var iter1=0;iter1<4;iter1++){
		for(var iter2=0;iter2<5;iter2++){
			if(char_exists[iter1][iter2]==0){
				document.getElementById((iter1*5+iter2).toString()).style.visibility="hidden";
			}else{
				document.getElementById((iter1*5+iter2).toString()).style.visibility="visible";
			}
			document.getElementById("i"+(iter1*5+iter2).toString()).src=char_img[iter1][iter2];
			document.getElementById((iter1*5+iter2).toString()).style.position="absolute";
			document.getElementById((iter1*5+iter2).toString()).style.top=(iter1*100+200).toString()+"px";
			document.getElementById((iter1*5+iter2).toString()).style.left=(iter2*100).toString()+"px";
		}

	}
	document.getElementById("in_text").innerHTML=char_name[char_rarity][char_num]+"-"+ranks[char_rarity]+": #"+(char_rarity*5+char_num+1).toString()+" hp: "+(char_hp[char_rarity][char_num]).toString()+" range: "+(char_min[char_rarity][char_num]).toString()+"-"+(char_max[char_rarity][char_num]).toString()+" attack: "+char_attack[char_rarity][char_num];
}
//////////////////////////////////////////////////////////////////////////////////////////////BUTTONS-MANDELBROT
document.getElementById("ma").onclick=function(){
	p=6;
	document.getElementById("rt_div").style.display="none";
	document.getElementById("ab_div").style.display="none";
	document.getElementById("sl_div").style.display="none";
	document.getElementById("ba_div").style.display="none";
	document.getElementById("sa_div").style.display="none";
	document.getElementById("in_div").style.display="none";
	document.getElementById("ma_div").style.display="block";	
	document.getElementById("sh_div").style.display="none";

	document.getElementById("hi_text").innerHTML="Explore the mandelbrot set by scrolling and dragging";

	shiftX=0;
	shiftY=0;
	zoom=1;
	mandel();
}
//////////////////////////////////////////////////////////////////////////////////////////////BUTTONS-SHOP
document.getElementById("sh").onclick=function(){
	p=7;
	document.getElementById("rt_div").style.display="none";
	document.getElementById("ab_div").style.display="none";
	document.getElementById("sl_div").style.display="none";
	document.getElementById("ba_div").style.display="none";
	document.getElementById("sa_div").style.display="none";
	document.getElementById("in_div").style.display="none";
	document.getElementById("ma_div").style.display="none";
	document.getElementById("sh_div").style.display="block";

	document.getElementById("hi_text").innerHTML="Buy stuffs";
}
//////////////////////////////////////////////////////////////////////////////////////////////MANDELBROT-CLICKS
document.getElementById("ma_canvas").onmousedown=function(){
	click=true;
}
document.getElementById("ma_canvas").onmouseup=function(){
	click=false;
}
document.getElementById("ma_zoomin").onclick=function(){
	zoom*=2;
	mandel();
}
document.getElementById("ma_zoomout").onclick=function(){
	zoom/=2;
	mandel();
}
document.getElementById("ma_canvas").onmousewheel=function(event){
	if(Math.sign(event.deltaY)==-1){
		zoom*=1.2;
	}else{
		zoom/=1.2;
	}
	mandel();
}
document.getElementById("ma_canvas").onmousemove=function(event){
	if(click){
		mouseX=event.clientX;
		mouseY=event.clientY;
		shiftX+=(256-mouseX)/(16*(zoom/2));
		shiftY+=(356-mouseY)/(16*(zoom/2));

		mandel();
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////GLOBAL EVENT-RICKROLL TYPER
document.onkeypress=function(){
	if(p==0){
		document.getElementById("rt_text").innerHTML+=good.charAt(i%good.length);
		i+=1;
	}
};
//////////////////////////////////////////////////////////////////////////////////////////////RICKROLL TYPER-MOBILE CLICK
document.getElementById("rt_mobile").onclick=function(){
	for(var iter=0;iter<5;iter++){
		document.getElementById("rt_text").innerHTML+=good.charAt(i%good.length);
		i+=1;
	}
};
//////////////////////////////////////////////////////////////////////////////////////////////SLOTS-SPIN
document.getElementById("sl_spin").onclick=function(){
	if(p==2){
		m-=30;
		var img1=img[randint(0,4)];
		var img2=img[randint(0,4)];
		var img3=img[randint(0,4)];
		document.getElementById("sl_1").src=img1;
		document.getElementById("sl_2").src=img2;
		document.getElementById("sl_3").src=img3;
		if(img1==img2 && img2==img3 && img3==img1){
			m+=55;
			g+=2;
		}else if(img1==img2 || img2==img3 || img3==img1){
			m+=35;
			g+=1;
		}
		if(m>0){
			document.getElementById("sl_text").innerHTML="$"+m.toString()+" Gems:"+g.toString();
		}else{
			document.getElementById("sl_text").innerHTML="You lose";
			m=100;
			g=0;
		}
	}
};
//////////////////////////////////////////////////////////////////////////////////////////////SLOTS-BUY
document.getElementById("sh_b1").onclick=function(){
	if(g>1){
		g-=2;
		m+=100;
		document.getElementById("sl_text").innerHTML="$"+m.toString()+" Gems:"+g.toString();
	}
};
document.getElementById("sh_b2").onclick=function(){
	if(g>2){
		g-=3;
		m+=175;
		document.getElementById("sl_text").innerHTML="$"+m.toString()+" Gems:"+g.toString();
	}
};
document.getElementById("sh_b3").onclick=function(){
	if(m>99){
		m-=100;
		g+=2;
		document.getElementById("sl_text").innerHTML="$"+m.toString()+" Gems:"+g.toString();
	}
};
document.getElementById("sh_b4").onclick=function(){
	if(m>174){
		m-=175;
		g+=3;
		document.getElementById("sl_text").innerHTML="$"+m.toString()+" Gems:"+g.toString();
	}
};
document.getElementById("sh_b5").onclick=function(){
	if(g>4){
		g-=5;
		for(var n=0;n<100;n++){
			var img=document.createElement("img");
			document.getElementById('body').appendChild(img);
			img.src="rickastley.png";
			img.width="100";
			img.height="100";
			var rand1=randint(0,100);
			var rand2=randint(0,100);
			img.style.position="absolute"
			img.style.top=rand1.toString()+"%";
			img.style.left=rand2.toString()+"%";
			img.style.opacity="0.5";
			img.style.zIndex="-1";
		}
		document.getElementById("sl_text").innerHTML="$"+m.toString()+" Gems:"+g.toString();
	}
};
//////////////////////////////////////////////////////////////////////////////////////////////SLOTS-CHARS
document.getElementById("sh_b6").onclick=function(){
	if(g>11){
		g-=12;
		var rand=randint(0,100);
		if(rand<80){
			char_rarity=0;
		}else if(rand<90){
			char_rarity=1;
		}else if(rand<98){
			char_rarity=2;
		}else{
			char_rarity=3;
		}
		char_num=randint(0,4);
		document.getElementById("sl_text").innerHTML="You got: "+char_name[char_rarity][char_num]+"-"+ranks[char_rarity];
		document.getElementById("sl_char").style.visibility="visible";
		document.getElementById("sl_char").src=char_img[char_rarity][char_num];
		char_exists[char_rarity][char_num]=1;
	}
};
document.getElementById("sh_b7").onclick=function(){
	if(g>24){
		g-=25;
		var rand=randint(0,100);
		if(rand<20){
			char_rarity=0;
		}else if(rand<80){
			char_rarity=1;
		}else if(rand<94){
			char_rarity=2;
		}else{
			char_rarity=3;
		}
		char_num=randint(0,4);
		document.getElementById("sl_text").innerHTML="You got: "+char_name[char_rarity][char_num]+"-"+ranks[char_rarity];
		document.getElementById("sl_char").style.visibility="visible";
		document.getElementById("sl_char").src=char_img[char_rarity][char_num];
		char_exists[char_rarity][char_num]=1;
	}
};
document.getElementById("sh_b8").onclick=function(){
	if(g>49){
		g-=50;
		var rand=randint(0,100);
		if(rand<15){
			char_rarity=0;
		}else if(rand<35){
			char_rarity=1;
		}else if(rand<90){
			char_rarity=2;
		}else{
			char_rarity=3;
		}
		char_num=randint(0,4);
		document.getElementById("sl_text").innerHTML="You got: "+char_name[char_rarity][char_num]+"-"+ranks[char_rarity];
		document.getElementById("sl_char").style.visibility="visible";
		document.getElementById("sl_char").src=char_img[char_rarity][char_num];
		char_exists[char_rarity][char_num]=1;
	}
};
//////////////////////////////////////////////////////////////////////////////////////////////BATTLE-NEXT
document.getElementById("ba_next").onclick=function(){
	if(turn==0){
		char_ehp-=randint(char_min[char_rarity][char_num],char_max[char_rarity][char_num])
		document.getElementById("ba_ptext").innerHTML=char_name[char_rarity][char_num]+"-"+char_php+"HP used "+char_attack[char_rarity][char_num];
		document.getElementById("ba_etext").innerHTML=char_name[char_erarity][char_enum]+"-"+char_ehp+"HP";
		if(char_ehp<=0){
			document.getElementById("ba_ptext").innerHTML="You win!";
			var gain_m=Math.floor((char_erarity+2)/2*randint(100,300));
			m+=gain_m;
			var gain_g=Math.floor((char_erarity+2)/2*randint(8,18));
			g+=gain_g;
			document.getElementById("ba_etext").innerHTML="$"+(gain_m.toString())+","+(gain_g.toString())+" gems";
			turn=100;
		}
		turn++;
	}else if(turn==1){
		char_php-=randint(char_min[char_erarity][char_enum],char_max[char_erarity][char_enum])
		document.getElementById("ba_etext").innerHTML=char_name[char_erarity][char_enum]+"-"+char_ehp+"HP used "+char_attack[char_erarity][char_enum];
		document.getElementById("ba_ptext").innerHTML=char_name[char_rarity][char_num]+"-"+char_php+"HP";
		if(char_php<=0){
			document.getElementById("ba_ptext").innerHTML="You lose...";
			turn=100;
		}
		turn--;
	}else{
		char_erarity=randint(0,3);
		char_enum=randint(0,4);
		char_php=char_hp[char_rarity][char_num];
		char_ehp=char_hp[char_erarity][char_enum];
		document.getElementById("ba_echar").src=char_img[char_erarity][char_enum];
		document.getElementById("ba_ptext").innerHTML=char_name[char_rarity][char_num]+"-"+char_php+"HP";
		document.getElementById("ba_etext").innerHTML=char_name[char_erarity][char_enum]+"-"+char_ehp+"HP";
		turn=0;
	}
};
//////////////////////////////////////////////////////////////////////////////////////////////SAVE/LOAD-LOAD
document.getElementById("sa_loadb").onclick=function(){
	var m_save="";
	var g_save="";
	var code=document.getElementById("sa_loadt").value;
	for(var iter=0;iter<7;iter++){
		m_save+=code.charAt(iter);
	}
	for(var iter=7;iter<14;iter++){
		g_save+=code.charAt(iter);
	}
	var m_hash=code.charAt(14)+code.charAt(15);
	var g_hash=code.charAt(16)+code.charAt(17);
	var m_ahash=0;
	var g_ahash=0;
	for(var iter=0;iter<7;iter++){
		m_ahash+=parseInt(m_save.charAt(iter));
		g_ahash+=parseInt(g_save.charAt(iter));
	}
	m_ahash=m_ahash.toString();
	g_ahash=g_ahash.toString();
	if(parseInt(m_ahash)<10){
		m_ahash="0"+m_ahash;
	}
	if(parseInt(g_ahash)<10){
		g_ahash="0"+g_ahash;
	}
	if((m_hash==m_ahash)&&(g_hash==g_ahash)&&(code.length==38)){
		document.getElementById("sa_text").innerHTML="Success";
		m=parseInt(m_save);
		g=parseInt(g_save);
		for(var iter=18;iter<38;iter++){
			if(code.charAt(iter)=="1"){
				char_exists[Math.floor((iter-18)/5)][(iter-18)%5]=1;
				char_rarity=Math.floor((iter-18)/5);
				char_num=(iter-18)%5;
			}
		}
	}else{
		document.getElementById("sa_text").innerHTML="Invalid save code. Make sure all numbers are correct";
	}
};
//////////////////////////////////////////////////////////////////////////////////////////////INVENTORY-EQUIP
for(var iter=0;iter<20;iter++){
	document.getElementById(iter).onclick=function(){
		char_rarity=Math.floor(this.id/5);
		char_num=this.id%5;
		document.getElementById("in_text").innerHTML=char_name[char_rarity][char_num]+"-"+ranks[char_rarity]+": #"+(parseInt(this.id)+1).toString()+" hp: "+(char_hp[char_rarity][char_num]).toString()+" range: "+(char_min[char_rarity][char_num]).toString()+"-"+(char_max[char_rarity][char_num]).toString()+" attack: "+char_attack[char_rarity][char_num];
	};
};
