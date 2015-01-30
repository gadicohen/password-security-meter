number=0;
var avg=0;
var i =0;
var canvases={};
var avgs={};
var px;
var py;
var px1;
var py1;
var randomNumber=.2+Math.random();
var finishBricks = false;
var bNum=0;
var brickDict={};
var tempTopRow={};
var usable=false;
$(document).ready(function() {

    $('#dendro').css('background', 'hsl(211%,12%,'+48-i+')');


    $("#fmPass").keyup(function(event) {
        avg=strengthMeter($("#fmPass").val(),1);
                    treeRoots(1000000*avg+10,$("#fmPass").val());
        $(".rates:first").html("It would take an average of <span id='time'>"+secondsToStr(avg)+"</span> to break your password");


    });
    

    strengthMeter("fmPass",1);

  $("#trafficpass").keyup(function(event) {
        avg=strengthMeter($("#trafficpass").val(),1);
        traffic(avg);
    });


   $("#bricksPass").keyup(function(event) {
        avg=strengthMeter($("#bricksPass").val(),1);
        if (!finishBricks){
            bricks(avg);
        }
        $("#rates2").html("It would take an average of <span id='time2'><style='color:white'>"+secondsToStr(avg)+"</span> to break your password");
            });

   checkIfResize();

});

function checkIfResize(){
    var resize=document.getElementById("resize");
    resize.style.position="fixed";
    resize.style.top=$(window).height()*.5+"px";
    resize.style.width=$(window).width();
    resize.style.color="black";
    
    console.log(resize);
    if ($(window).width()<743){
        resize.style.visibility = "visible";
    }
    if ($(window).width()>=743){
        resize.style.visibility = "hidden";
    }
}

function traffic(avg){
    var color;
    avg=Math.log(avg);
            if (avg<-4){
                color='#C0392B';
            }
            else if (-4<avg){
                color='#E74C3C';
                    if (avg>10){
                    color='#F39C12';
                        if (avg>23){
                            color='#F1C40F';
                            if (avg>35)
                                {color='#2ECC71';
                            }
                        }
               }
            }
    if (usable){
            $("#trafficpass").css("background-color",color);
            $(".color-3").css("background-color","#BFBFBF");
        }
        else{
            $(".color-3").css("background-color",color);
             $("#trafficpass").css("background-color","white");


        }

}


$(window).scroll(function(){
    if ($("#info").position() < $(window).scrollTop())
    {
        $("#info").style.top="0px";
        $("#info").style.position="fixed";
    }
});

function bricks(avg){

    
    var containerwidth;
    avg=Math.log(avg);
    console.log(avg);
    var bricks=0;
    if (!usable){
        var brickWidth=175;
        containerwidth=$("#bricks").width();
    }
    else{
        var brickWidth=50;
        containerwidth=200;
    }
    var bricksInRow = containerwidth/brickWidth;
    var numberofRows=1+Math.floor(bricks/bricksInRow);

    if (avg<-10){
        bricks+=3;
    }
    else if (avg>=-10){
        for (x=-10; x<50; x++){
            if (avg>=x){
                bricks+=Math.ceil(bricksInRow/4);
            }
        }
    }
   


    numberofRows=1+Math.floor(bricks/bricksInRow);
    //console.log(bricksInRow,numberofRows);
    var bricksInTopRow=Math.floor(bricks-(numberofRows-1)*bricksInRow);
    console.log("toprow"+bricksInTopRow);

    /*if (bricksInTopRow!=0){
        for (tr=0;tr<Object.size(tempTopRow);tr++){
            tempTopRow[tr].remove();
        }
    }*/
    

    for (r=0;r<numberofRows;r++){
        //console.log(r);
        for (b=0;b<bricksInRow;b++){            
            var brick = new Brick(r,b,brickWidth);
            brick.style.zIndex="50";
            
            if (!usable){
                $("#bricks").append(brick);
            }
            else{
                $("#brickreuse").append(brick);
            }
        }
    }
    randoms={};
        for (t=0;t<bricksInTopRow;t++){
            var rand=Math.floor(Math.random()*bricksInRow);
            var topBrick=new Brick(numberofRows,rand, brickWidth);
            console.log(topBrick,numberofRows,rand);
            document.body.appendChild(topBrick);
            $("#bricks").append(topBrick);
            if (!usable){
                $("#bricks").append(topBrick);
            }
            else{
                $("#brickreuse").append(topBrick);
            }
            tempTopRow[t]=topBrick;
        }
}

function Brick(r,b,brickWidth){
    //console.log(this);
    var brick = document.createElement("div");
    var top;
    brickDict[bNum]=brick;
    bNum++;

    brick.className="brick";
    brick.style.width=brickWidth+"px";
    brick.style.height=.5*brickWidth+"px";
    brick.style.backgroundColor="#841F27";
    brick.style.position="absolute";
    brick.style.border="2px solid black";
    var widthM=brickWidth+2;
    var heightM=.5*brickWidth+1;

    if (usable){
        top=200;
    }
    else{
        top=579;
    }
    brick.style.top=top-heightM*r+"px";

    if (top-heightM+.5*brickWidth<0){
        finishBricks=true;
        //brick.style.visbility="hidden";
        for (bn=0;bn<Object.size(brickDict);bn++){
            brickDict[bn].style.backgroundColor="#8A0808";
            brickDict[bn].style.opacity="1";
        }
    }

    brick.style.left=b*widthM+"px";//40*i+"px";

    return brick;
}

var bool=false;

function showOverlay(buttonID){
    div=buttonID;
    if (bool){
        bool=false;
        div.style.visibility = "hidden";
    }
    else if (bool==false){
        bool=true;
        div.style.visibility = "visible";
    }
    

}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
    };

function makeUsable(){
    if (usable){
        usable=false;
    }
    else{
        usable=true;
    }
}
$(window).resize(function(){
    
    console.log($(window).width());
    for (n=0; n<Object.size(canvases); n++){
        canvases[n].remove();
    }
    var num=Object.size(avgs);
    for (n=0; n<num; n++){
        drawCircle(avgs[n]);
    }


    for (a=0; a<Object.size(brickDict); a++){
            brickDict[a].remove();
        }
        
        /*avg=strengthMeter($("#bricksPass").val(),1);
        bricks(avg);
        $("#rates2").html("It would take an average of <span id='time'>"+secondsToStr(avg)+"</span> to break your password");
*/
    checkIfResize();

});

var maxPass=0;
function strengthMeter(password, nodes) {


    // init undefined 
    if ('undefined' === typeof(nodes)) {
        var nodes = 1;
    }   
    
    if (number==0){
        password="";
        number++;
    }

    // init character classes
    
    var numEx = /\d/;
    var lcEx = /[a-z]/;
    var ucEx = /[A-Z]/;
    var syEx = /\W/;
    var meterMult = 1;
    var character_set_size = 0;
    
    // loop over each char of the password and check it per regexes above.
    // weight numbers, upper case and lowercase at .75, 1 and .25 respectively.
    if (numEx.test(password)) {
        character_set_size += 10;
    }
    if (ucEx.test(password)) {
        character_set_size += 26;
    }
    if (lcEx.test(password)) {
        character_set_size += 26;
    }
    if (syEx.test(password)) {
        character_set_size += 32;
    }

    // assume that 100% is a meterMult of maxMulti
    var strength = Math.pow(character_set_size, password.length);

    // init crackers at hashes/second
    // all numbers from slowest computer here http://hashcat.net/oclhashcat-plus/
    var rateMd5 = 1333000000; 
    var rateSHA1 = 433000000;
    var rateMd5crypt = 855000;
    var rateBcrypt = 604;
        
    // calculate a human readable time based on seconds and nodes
    var secMd5 = secondsToStr(toFixed(strength/(rateMd5*nodes))); 
    var secSHA1 = secondsToStr(toFixed(strength/(rateSHA1*nodes)));
    var secMd5crypt = secondsToStr(toFixed(strength/(rateMd5crypt*nodes)));
    var secBcrypt = secondsToStr(toFixed(strength/(rateBcrypt*nodes)));
    avg = toFixed(strength/((1/4)*(rateBcrypt+rateMd5crypt+rateSHA1+rateMd5)*nodes));

    if (password.length==0){

    }

    
    // if null, don't show anything
    if (password.length > 0) {
           
           

            
            



              
            

        $("#passwordIndicator").show();
    } else {
        $("#passwordIndicator").hide();



    }
    return avg;
    
}
 arrow = $('.arrow');

function arrow(complexity){
    var calculated = (complexity/100)*268 - 134;
    var prop = 'rotate('+(calculated)+'deg)';

    // Rotate the arrow. Additional rules for different browser engines.
    arrow.css({
        '-moz-transform':prop,
        '-webkit-transform':prop,
        '-o-transform':prop,
        '-ms-transform':prop,
        'transform':prop
    });
}



function treeRoots(average,pw){

    if (pw==""){
        clearCanvas();
    }

    width=$(window).width();
    
    var color1 = $(".color-1");

    drawCircle(average);


}


function drawCircle(avg){


    var canvas=createCanvas();
    point=canvas.width*4/9, canvas.height*4/9;

    

    if (avg<1){
            
            

            ctx = canvas.getContext("2d");

            ctx.arc(canvas.width*4/9, canvas.height*4/9, Math.abs(avg), 0, 3 * Math.PI);
            ctx.fillStyle = '#E5C349';
            ctx.strokeStyle = '#B37D19';
            ctx.fill();
            ctx.stroke(); 

            avgs[i]=avg;
            ctx.closePath();

    }
    
    
    else if (1<avg<100){

            newavg=100*avg;
            avg=100*avg;

            ctx = canvas.getContext("2d");

            var color='#FBE494';
            var strokeColor='#FCD764';
            var linewidth=2;
            if (newavg>70378370){
                color='#FADC93';
                strokeColor='#FBCC5A';
                linewidth=3;
            }
            if (newavg> 1504786194599911){
                color='#F9B56C';
                strokeColor='#F3903B';
                linewidth=4;
            }
            if (newavg>10116660760426044000000000000){
                color='#D48564';
                strokeColor='#BF5428';
                linewidth=5;
            }
            if (newavg>318100187622228160000000000000000010){
                color='#A5614A';
                strokeColor='#793520';
                linewidth=5;
            }

            var r=3*Math.log(avg);
            console.log(r+"r");
            ctx.arc(canvas.width*.5,  canvas.height*5/9, 3*Math.log(avg), 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth=linewidth;
            ctx.fill();
            ctx.stroke(); 
            ctx.closePath();
            ctx.beginPath();
            ctx.linewidth=i+"px";
            
            if (i==0){
                px=canvas.width*.5;
                py=canvas.height*5/9;   
                px1 =canvas.width*.5;
                py1 = canvas.height*5/9;       
            }
            
            
            
            if (i<randomNumber*40){
                    ctx.moveTo(px,py);
                    var theta=Math.random()*.03*Math.PI;
                    px =canvas.width*.5+r*Math.cos(theta);
                    py = canvas.height*5/9+r*Math.sin(theta);

                    ctx.lineTo(px,py);
                    ctx.stroke();
            }

            if (i<randomNumber*30){
                    ctx.moveTo(px1,py1);
                    var theta=Math.PI/4+Math.random()*.04*Math.PI;
                    px1 =canvas.width*.5 + r*Math.cos(theta);
                    py1 = canvas.height*5/9+r*Math.sin(theta);

                    ctx.lineTo(px1,py1);
                    ctx.stroke();
            }

          
            avgs[i]=avg;
            i++;
            
        

    }
}

function createCanvas(){
    var canvas = document.createElement('canvas');
    

    var dendro = document.getElementById("dendro");

            var color1 = $(".color-1");
            canvases[i]=canvas
            canvas.id = "canvas"+i;
            canvas.width  = color1.width();
            canvas.height = color1.height();
            canvas.style.zIndex = 1000-i;
            canvas.style.position = "absolute";
            canvas.style.left=0;
            canvas.style.top=0;
            canvas.style.border = "0px solid";
            dendro.appendChild(canvas);
            return canvas;
}



// thanks http://stackoverflow.com/questions/2901102/how-to-print-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// thanks http://stackoverflow.com/questions/8211744/convert-milliseconds-or-seconds-into-human-readable-form
function secondsToStr(seconds){
    // TIP: to find current time in milliseconds, use:
    // var milliseconds_now = new Date().getTime();
    seconds = Math.round(seconds);
    var numyears = Math.floor(seconds / 31536000);
    if(numyears){
        return numberWithCommas(numyears) + ' year' + ((numyears > 1) ? 's' : '');
    }
    var numdays = Math.floor((seconds % 31536000) / 86400);
    if(numdays){
        return numdays + ' day' + ((numdays > 1) ? 's' : '');
    }
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    if(numhours){
        return numhours + ' hour' + ((numhours > 1) ? 's' : '');
    }
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    if(numminutes){
        return numminutes + ' minute' + ((numminutes > 1) ? 's' : '');
    }
    var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    if(numseconds){
        return numseconds + ' second' + ((numseconds > 1) ? 's' : '');
    }
    return 'less then a second'; //'just now' //or other string you like;
}

// thanks http://stackoverflow.com/questions/1685680/how-to-avoid-scientific-notation-for-large-numbers-in-javascript
function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
    return x;
}



function clearBricks(){

    for (var brick in brickDict){
        brickDict[brick].remove();
    }
    
        $('#bricksPass').val("");
         finishBricks = false;
         bNum=0;

        $("#rates2").html("");

}
    

function clearCanvas(){

    for (var can in canvases){
        canvases[can].remove();
    }
    for (var a in avgs){
        delete avgs[a];
        $('#fmPass').val("");
        avg=0;
        var rates = "It would take an average of <span id='time'>"+secondsToStr(avg)+"</span> to break your password";
    }
        $("#rates").html("");
        i=0;
        randomNumber=.2+Math.random();

}