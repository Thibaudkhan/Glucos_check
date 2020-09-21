var nbTouch = 0 ;
var sablerAreDone = false;
var nbOfControl = 0 ;
var resultOfGlucos = [];
var time;
var watchOff;


var x = document.getElementById("myAudio");


$("#watch").click(function(){ displayImage(); });//when the watch are touched
setInterval(displayImage,300000); //turn on every 30 min 

function displayImage(){
    if (sablerAreDone){
        resultOfGlucos.push(Math.floor(Math.random()*(200-50+1)+50));
        $( "#done" ).remove();
        if(nbTouch == 1){
            $('#watch').prepend('<div class="showGlucos">'+resultOfGlucos[resultOfGlucos.length - 1] +'  <div/>')
            // show glucos result
        }
        if(resultOfGlucos.length > 10){
        	//when the number of glmucos data are > to ten delete
            resultOfGlucos.splice(0, 1);
        }
        if(resultOfGlucos[resultOfGlucos.length - 1] < 70){
            $('#watch').html('<div class="showGlucos">'+resultOfGlucos[resultOfGlucos.length - 1] + ' Glucosa Baja'+'  <div/>');
            $('.showGlucos').css("background-image", "url(img/TooFew.png)");
            playAudio();

        }else if(resultOfGlucos[resultOfGlucos.length - 1] > 120){
            $('#watch').html('<div class="showGlucos">'+resultOfGlucos[resultOfGlucos.length - 1] + ' Glucosa Alta'+'  <div/>');
            $('.showGlucos').css("background-image", "url(img/ToMuch.png)");
            playAudio();

        }else{
            $('#watch').html('<div class="showGlucos">'+resultOfGlucos[resultOfGlucos.length - 1] + ' Glucosa En Rango'+'  <div/>');
            $('.showGlucos').css("background-image", "url(img/good.png)");
        }
        nbTouch++;

    }else if(!sablerAreDone && nbTouch == 0){
        $('#watch').prepend('<div id="sabler">  <div/>')
        time = setInterval(displayDone,3000);
        nbOfControl++;
        nbTouch++;
        watchOff = setInterval(powerOff,10000);


    }
    console.log(resultOfGlucos);

}

//When the check are Done
function displayDone(){
    sablerAreDone = true;
    $( "#sabler" ).remove();
    $('#watch').prepend('<div id="done">  <div/>')
    clearInterval(time);
}

//play bip during 5 secondes
function playAudio() {
    x.play();
}

// turn off the watch
function powerOff(){
    $( ".showGlucos" ).remove();
    $( "#sabler" ).remove();
    $( "#done" ).remove();
    sablerAreDone = false;
    nbTouch = 0;
    clearInterval(watchOff);

}