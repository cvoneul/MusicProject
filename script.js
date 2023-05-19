function testSound() {
    visualize("testSound.mp3");
}

function elements() {
    visualize("ELements (Bass Version).m4a");
}

function walk() {
    visualize("Walk on By.m4a");
}

function hurry() {
    visualize("You Cant Hurry Love.m4a");
}

function edm() {
    visualize("Secret_Love.m4a");
}

function fileSelector() {
    var musicFile = document.getElementById("file-selector").files[0];
    var musicPlayer = document.getElementById("audio1");
    musicPlayer.src = URL.createObjectURL(musicFile);
    visualize(musicPlayer.src);
}
document.getElementById("file-selector").addEventListener("change", fileSelector, false);


function visualize(str) {
    //setting the elements from html
    const container = document.getElementById('container');
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    //creating the audioContext object, which is a web API that helps with low level functions
    const audioContext = new AudioContext();

    //establishing some constraints and variables
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let audioSource;
    let analyser;


    //getting the audio element from the html and setting the filename
    const audio1 = document.getElementById('audio1');
    audio1.src = str;

    //play the file
    audio1.play();


    //setting the source data from our audio file as a node we can do stuff with
    audioSource = audioContext.createMediaElementSource(audio1);
    analyser = audioContext.createAnalyser();
    //connecting the source to our analyzer so we can get special metadata to manipulate
    audioSource.connect(analyser);
    //connecting our analyzer to whatever default output device is stated
    analyser.connect(audioContext.destination);


    //the "quality" of our visual representation
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount - 330;//length of spectrum
    // (conversion) creating special array based off bufferLength
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = canvas.width / bufferLength;
    const barwidthLow = barWidth + 5;
    let barHeight;
    let x; let low;

    //where the magic happens
    function animate() {
        x = 0;
        ctx.clearRect(0,0,canvas.width,canvas.height); //clear part of the screen
        analyser.getByteFrequencyData(dataArray); //returns the "loudness" (decibel) of each frequency
        for(let i = 0; i < bufferLength; i++) { //loop thru our dataArray
            barHeight = dataArray[i]; //get height of bar
            ctx.fillStyle = "purple"; 
            if(x < 30) { //just added for fun: makes the low frequencies wider so its easier to see
                ctx.fillRect(x, canvas.height - barHeight, barwidthLow, barHeight);
                x += barwidthLow;
            }else {
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight); //make the bar and iterate for the next bar
                x += barWidth;
            }
        }
        requestAnimationFrame(animate); 
    }
    animate();
}


