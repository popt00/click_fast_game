let wid, hei;
let life = 3,score = 0;
var x; var y;
var sys_x, sys_y;
let user_x = -1, user_y = -1;
const START_TIMER=4000;
let exp_time = new Date().getTime();
function play(){

    x= document.forms["co_frm"]["x_co"].value;
    y= document.forms["co_frm"]["y_co"].value;
    if(x>8 || y>8 || x<=0 || y<=0){
        window.alert("you entered incorrect values");
        // document.getElementsByClassName("playCon")[0].innerHTML="you entered incorrect values";
        return;
    }
    if(x==1 && y==1){
        window.alert("you activated cheat mode");
    }
    wid= x*20;hei=x*20;
    wid=Math.min(wid,200);
    hei=Math.min(hei,500);
    let playBtn = document.getElementsByClassName("playBtn");
    playBtn[0].style.visibility = 'hidden';
    let playCon = document.getElementsByClassName("playCon");
    for(i=0;i<x;i++){
        for(j=0;j<y;j++){
            const image_node = document.createElement('div');
            image_node.width = wid/x;
            image_node.height = hei/y ;
            image_node.className = "blank_s";
            image_node.id= i*y + j;
            document.getElementById("playCon").appendChild(image_node);
        }
        // document.getElementById("gamezone").innerHTML +="<br>";
    }
    var buttons = document.getElementsByClassName("blank_s");
    var buttonsCount = buttons.length;
    choose_random();
    console.log("done random");
    for (var i = 0; i < buttonsCount; i += 1) {
        buttons[i].onclick = function() {
            compare(this.id);
        };
    }
    make_scorecard();
    console.log("done functions");
    
}

function make_scorecard(){
    let scorezone = document.getElementById("scorezone");
    let life_child = document.createElement('i');
    life_child.id = "life_id";
    let score_child = document.createElement('i');
    score_child.id = "score_id";
    let time_node= document.createElement('p');
    life_child.innerHTML= " Life: "+ life;
    score_child.innerHTML = ",Score: "+ score;
    time_node.innerHTML="";
    time_node.id="timer_id";
    scorezone.appendChild(life_child);
    scorezone.appendChild(score_child);
    scorezone.appendChild(time_node);
    exp_time =  new Date().getTime()+  START_TIMER;
    timer();
}

function choose_random(){
    sys_x = Math.floor(Math.random() * x);
    sys_y = Math.floor(Math.random() * y);
    let new_node= document.getElementsByClassName("blank_s")[sys_x*y+sys_y];

    const image_node = document.createElement('img');
    // image_node.width = wid/x;
    // image_node.height = hei/y ;
    image_node.src = "src/madara.png";
    image_node.className = "madara";
    new_node.appendChild(image_node);

}

function timer(){
    var timer_id = setInterval(function(){ 
        if((exp_time- new Date().getTime())>0){
            document.getElementById("timer_id").innerHTML =
                (Math.floor(((exp_time- new Date().getTime()) % (1000 * 60)) / 1000))+"s "
                + (exp_time- new Date().getTime())%1000;
        }
        else{
            death();
            console.log("done timer");
            clearInterval(timer_id);
        }
        
    },100);
}

function compare(p_id){
    user_x= Math.floor(p_id/y);
    user_y= p_id%y;
    console.log("system: "+ sys_x+","+sys_y+", user: "+user_x+","+user_y);
    if(user_x==sys_x && user_y==sys_y){
        score++;
        let score_ele = document.getElementById("score_id");
        score_ele.innerHTML = ", Score: "+score;
    }
    else{
        life -- ;
        let life_ele = document.getElementById("life_id");
        life_ele.innerHTML = "Life: "+life;
        if(life==0){
            death();
            return;
        }
    }
    exp_time = new Date().getTime() + 4000 - score*200;
    var system_image_buttons = document.getElementsByClassName("blank_s");
    system_image_buttons[sys_x*y+ sys_y].innerHTML="";
    choose_random();
}

function death(){
    exp_time = new Date().getTime() - 1;
    document.getElementById("scorezone").innerHTML="";
    let gamezone_ele =document.getElementById("gamezone");
    gamezone_ele.innerHTML=" YOU DIED YOUR SCORE: "+score +"<br>";
    
    let nw_button = document.createElement('button');
    nw_button.textContent = "Click Me to Restart";
    nw_button.className = "playBtn"
    nw_button.onclick = function(){
        window.location.reload();
    };
    
    gamezone_ele.appendChild(nw_button);
    
}