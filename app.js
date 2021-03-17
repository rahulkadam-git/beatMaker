class DrumKit{
    constructor(){
        this.pad = document.querySelectorAll(".pad");
        this.playButton = document.querySelector(".play");
        this.currentKick = './allSounds/kick-808.wav';
        this.currentClap = './allSounds/clap-808.wav';
        this.currentSnare = './allSounds/snare-808.wav';
        this.currentHihat = './allSounds/hihat-808.wav';
        this.kickAudio = document.querySelector(".kick-sound");
        this.clapAudio = document.querySelector(".clap-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        
        this.index = 0;
        this.bpm = 60   ;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtn = document.querySelectorAll(".mute");
    }
activePad(){
   this.classList.toggle("active");

}

    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar =>{
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
        if(bar.classList.contains("active")){
            if(bar.classList.contains("kick-pad")){
                this.kickAudio.play();
                this.kickAudio.currentTime = 0;
            }
            if(bar.classList.contains("clap-pad")){
                this.clapAudio.play();
                this.clapAudio.currentTime = 0;
            }
            if(bar.classList.contains("snare-pad")){
                this.snareAudio.play();
                this.snareAudio.currentTime = 0;
            }
            if(bar.classList.contains("hihat-pad")){
                this.hihatAudio.play();
                this.hihatAudio.currentTime = 0;
            }
        }
        });
        this.index++;

    }
    start(){
            const interval = (60/this.bpm) * 1000;
            if(!this.isPlaying){
             this.isPlaying = setInterval(() => {
            this.repeat();
        }, interval);
            }else{
                clearInterval(this.isPlaying);
                this.isPlaying = null;
            }
}
updateBtn(){
    if(!this.isPlaying){
        this.playButton.innerText = "Stop";
        this.playButton.classList.add = "active";
    }else{
        this.playButton.innerText = "Play";
        this.playButton.classList.remove = 'active';
    }
}
changeSound(e){
    const selectiontarget = e.target.name;
    const selectionvalue = e.target.value;
    switch(selectiontarget){
        case "kick-select":
            this.kickAudio.src = selectionvalue;
            break;
            case "snare-select":
            this.snareAudio.src = selectionvalue;
            break;
            case "hihat-select":
            this.hihatAudio.src = selectionvalue;
            break;
            case "clap-select":
            this.clapAudio.src = selectionvalue;
            break;
        }
        
    }

    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")){
          switch(muteIndex){
             case "0":
            this.clapAudio.volume = 0;
            break; 
            case "1":
                this.snareAudio.volume = 0;
                break; 
                case "2":
                    this.hihatAudio.volume = 0;
                    break; 
                    case "3":
                        this.kickAudio.volume = 0;
                        break; 
                }
            }else{
                switch(muteIndex){
                    case "0":
                        this.clapAudio.volume = 1;
                        break; 
                        case "1":
                            this.snareAudio.volume = 1;
                            break; 
                            case "2":
                                this.hihatAudio.volume = 1;
                                break; 
                                case "3":
                                    this.kickAudio.volume = 1;
                                    break;  
                }
            }
        }
    }


const drumKit = new DrumKit();
drumKit.pad.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener('animationend', function(){
    this.style.animation = "";
    });
});
drumKit.playButton.addEventListener("click", () =>{
    drumKit.updateBtn();
    drumKit.start();
});
drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    });
});

drumKit.muteBtn.forEach(btn => {
    btn.addEventListener('click', function(e){
        drumKit.mute(e);
    });
});