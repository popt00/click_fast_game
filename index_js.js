const wid=200, hei= 200;
const x=10, y=10;
let life = 3;
let score = 0;

let sys_x = Math.floor(Math.random() * x);
let sys_y = Math.floor(Math.random() * y);
let user_x = -1;
let user_y = -1;
function play(){
    let gamezone = document.getElementById("gamezone");
    document.getElementById("gamezone").innerHTML = "";
    document.getElementById("gamezone").width = wid;
    document.getElementById("gamezone").height = hei;
    for(i=0;i<y;i++){
        for(j=0;j<x;j++){
            const div_node = document.createElement("div");
            
            const image_node = document.createElement('img');
            image_node.src = "src/Blank_Square.png";
            image_node.width = wid/x;
            image_node.height = hei/y ;
            image_node.className = "blank_s";
            image_node.id= i*y + j;
            document.getElementById("gamezone").appendChild(image_node);
        }
        document.getElementById("gamezone").innerHTML = document.getElementById("gamezone").innerHTML + "<br>";
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
    console.log("done functions");
    let scorezone = document.getElementById("scorezone");
    scorezone.innerHTML="Life : "+ life + "   score: "+score;
}

function choose_random(){
    sys_x = Math.floor(Math.random() * x);
    sys_y = Math.floor(Math.random() * y);
    let new_one = document.getElementsByClassName("blank_s");
    let new_node= new_one[sys_x*x+sys_y];
    new_node.src = "/src/madara.png";
}


function compare(p_id){
    user_x= Math.floor(p_id/y);
    user_y= p_id- user_x*y;
    console.log("system: "+ sys_x+","+sys_y+", user: "+user_x+","+user_y);
    if(user_x==sys_x && user_y==sys_y){
        score++;
        let scorezone = document.getElementById("scorezone");
        scorezone.innerHTML="Life : "+ life + "   score: "+score;
    }
    else{
        life -- ;
        scorezone.innerHTML="Life : "+ life + "   score: "+score;
        if(life==0){
            document.getElementById("scorezone").innerHTML="";
            document.getElementById("gamezone").innerHTML=" YOU DIED YOUR SCORE: "+score;
            return;
        }
    }
    var system_image_buttons = document.getElementsByClassName("blank_s");
    system_image_buttons[sys_x*y+ sys_y].src = "/src/Blank_Square.png";
    choose_random();
}