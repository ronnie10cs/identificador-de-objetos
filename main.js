function preload(){

}

function setup(){
    canvas=createCanvas(300,300);
    canvas.position(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    classifier=ml5.imageClassifier('MobileNet', modeloCargado);
}

function modeloCargado(){
console.log("model")
}

function draw(){
image(video, 0 , 0 , 300 , 300);
classifier.classify(video,getResult);
}
var previous_result = ' ';

function getResult(error,results){
    if (error) {
        console.log("error");
    }
    else{
        if( (results[0].confidence) &&
        (previous_result!=results[0].label)) {
            console.log(results);
            var synth = window.speechSynthesis;
            speak_data= "el objeto detectado es"+ results[0].label;
            var utterThis = new SpeechSynthesisUtterance(speak_data); 
            synth.speak(utterThis);
            document.getElementById("result_object_name").innerHTML=results[0].label;
            document.getElementById("result_object_accurracy").innerHTML=results[0].confidence*100;
            }
        }
}