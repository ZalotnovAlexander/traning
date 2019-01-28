window.onload = function () {
    try {
        let a = localStorage.getItem('counter');
        for (var m = 0; m < a ; m++){
            if(localStorage.getItem('postData'+m) == null){

            }else {
            let localData = JSON.parse(localStorage.getItem('postData'+m));

            document.getElementById("news").innerHTML += '<div class="post-warper" id="post-id'+m+'">'+
                '<div class="post" >'+
                '<div class="user-info">'+
                '<div class="user-info-warper">'+
                '<img src="./image/cristofer-jeschke-1082551-unsplash.jpg" alt="user-photo" class="user-photo">'+
                '<p class="user-name" id="id_' + m + '">default name</p>'+
                '</div>'+
                '<div class="control-buttons">'+
                '<button  class="post-options" id="ide_' + m + '" onclick="post_options(this.id)"> </button>'+
                '</div>'+
                '<span class="quote" id="idq_'+ m +'">The morning begins with a cup of coffee.</span>'+
                '</div>'+
                '<div id="content" class="content-place">'+
                '<img src=""  class="uploaded-photo" id="idp_'+m+'">'+
                '</div>'+
                '</div>'+
                '</div>';
            document.getElementById("id_" + m).innerHTML = localData.username;
            document.getElementById("idq_" + m).innerHTML = localData.usertext;
            document.getElementById("idp_" + m).src = localData.src;
            }}
    }catch (e) {
        return console.log("local storage variable not yet exist. That`s why added a them");
    }
};

i=0;
main_id = "";
flag = false;
image_flag = false;
resul = 0;
localSRCCheck = "";

button.onclick = function() {
    if(document.getElementById("user-n").value === ""){
        document.getElementById("user-n").id = "error1";
    }
    if(document.getElementById("user-t").value === ""){
        document.getElementById("user-t").id = "error2";
    }
    if (flag  === true){

        let
            photoSrc = document.getElementById('output_image').src,
            userName = document.getElementById("user-n").value,
            userText = document.getElementById("user-t").value;
        if (image_flag === false){
            photoSrc = "";
        }
        let postsArr = [];
        let keyID = resul;
        let postData = JSON.stringify({
            username: userName,
            usertext: userText,
            src: photoSrc
        });

        postsArr.push(postData);

        localStorage.setItem('postData'+keyID, postsArr);

        document.getElementById("id_"+resul).innerHTML = userName;
        document.getElementById("idq_"+resul).innerHTML = userText;
        document.getElementById("idp_"+resul).src = photoSrc;

        document.getElementById("user-n").value = "";
        document.getElementById("user-t").value = "";
        document.getElementById("output_image").src = "";
        document.getElementById("image-file").value = "";
        flag = false;

        document.getElementById("slide-conteiner").style.height= "0";
    }

    else if (document.getElementsByClassName("user-name").value !== null  && document.getElementsByClassName("user-text").value !== null) {
        try {

            let
                photoSrc = document.getElementById("output_image").src,
                userName = document.getElementById("user-n").value,
                userText = document.getElementById("user-t").value;

            if (image_flag === false){
                 photoSrc = "";
            }

            if (localStorage.getItem('counter') !== null){
                i = localStorage.getItem('counter');
            }

            document.getElementById("news").innerHTML += '<div class="post-warper"  id="post-id'+i+'">'+
                '<div class="post">'+
                '<div class="user-info">'+
                '<div class="user-info-warper">'+
                '<img  src="./image/cristofer-jeschke-1082551-unsplash.jpg" alt="user-photo" class="user-photo">'+
                '<p class="user-name" id="id_' + i + '">default name</p>'+
                '</div>'+
                '<div class="control-buttons">'+
                '<button  class="post-options" id="ide_' + i + '" onclick="post_options(this.id)"> </button>'+
                '</div>'+
                '<span class="quote" id="idq_'+i+'">The morning begins with a cup of coffee.</span>'+
                '</div>'+
                '<div  id="content_'+i+'" class="content-place">'+
                '<img src=""  class="uploaded-photo" id="idp_'+i+'">'+
                '</div>'+
                '</div>'+
                '</div>';

    document.getElementById("id_" + i).innerHTML = userName;
    document.getElementById("idq_" + i).innerHTML = userText;
    document.getElementById("idp_" + i).src = photoSrc;

    let postsArr = [];
    let keyID = i;
    let postData = JSON.stringify({
        username: userName,
        usertext: userText,
        src: photoSrc
    });
    postsArr.push(postData);

    i ++;

    localStorage.setItem('counter', JSON.stringify(i));
    localStorage.setItem('postData'+keyID, postsArr);

    document.getElementById("user-n").value = "";
    document.getElementById("user-t").value = "";
    document.getElementById("output_image").src = "";
    document.getElementById("image-file").value = "";

    document.getElementById("slide-conteiner").style.height= "0";
            image_flag = false;
        }catch (e) {}
    }};

function proverka(input){
    let value = input.value;
    let rep = /[-/.#;,"()><*!№%?:ієї]/;
    if (rep.test(value)) {
        value = value.replace(rep, '');
        input.value = value;
    }
}

function falg_activation(button_id) {

    let raw_id = main_id.toString();
    let res = raw_id.replace("ide_", "");

    if (button_id === "delete") {
        let question = confirm("Вы точно желаете удалить пост ?");
        if (question === true){
            localStorage.removeItem('postData' + res);
            let deleteable_childe = document.getElementById("post-id" + res);
            let parent = document.getElementById("news");
            parent.removeChild(deleteable_childe);
            options.style.height = "0";
        }
    } if (button_id === "edit") {
        let question = confirm("Вы точно желаете редактировать пост ?");
        if (question === true){
            resul = res;
            let localData = JSON.parse(localStorage.getItem('postData' + res));
            document.getElementById("user-n").value = localData.username;
            document.getElementById("user-t").value = localData.usertext;
            document.getElementById("output_image").src = localData.src;
            flag = true;
            localSRCCheck = localData.src;
            options.style.height = "0";

            document.getElementById("slide-conteiner").style.height= "100%";

            if (localData.src !== ""){
                document.getElementById("X").style.opacity = "1";
                document.getElementById("dell-image").disabled = false;
            }else {
                document.getElementById("X").style.opacity = "0";
                document.getElementById("dell-image").disabled = true;
            }
        }
    }
}

function post_options(post_id) {
    options.style.height = "100%";
    main_id = post_id;
}

function preview_image(event){
    let reader = new FileReader();
    reader.onload = function()
    {
        let output = document.getElementById('output_image');
        output.src = reader.result;

        if (localSRCCheck !== ""){
            document.getElementById("X").style.opacity = "1";
            document.getElementById("dell-image").disabled = false;
        }else {
            document.getElementById("X").style.opacity = "0";
            document.getElementById("dell-image").disabled = true;
        }
    };
    reader.readAsDataURL(event.target.files[0]);

}

function back_user_name_id(){
    if (document.getElementsByClassName("user-name").id = "user-n") {
        if (document.getElementsByClassName("user-name").id = "error1" && document.getElementsByClassName("user-name").value !== "") {
            try {
                document.getElementById("error1").id = 'user-n';
            }catch (e) {
                return false;
            }
        }
    }
}

function back_user_text_id(){
    if (document.getElementsByClassName("user-text").id = "user-t") {
        if (document.getElementsByClassName("user-text").id = "error2" && document.getElementsByClassName("user-text").value !== "") {
            try {
                document.getElementById("error2").id = 'user-t';
            }catch (e) {
                return false;
            }
        }
    }
}

let options = document.getElementById("options");
let image_button = document.getElementById("photo");
let navbar = document.getElementById("nav");
let sticky = navbar.offsetTop;
let arr = document.getElementById("arrow");
let new_post = document.getElementById("new-post");
let post = document.getElementById("add-new");
let dell_ph = document.getElementById("dell-image");

image_button.onclick  = ()=> {
    image_flag = true;
};

window.onclick = function(event) {
    if (event.target === options) {
        options.style.height= "0";
    }
};

window.onscroll = ()=>{
    if (window.pageYOffset >= sticky){
        navbar.classList.add("sticky");

    }
    else{
        navbar.classList.remove("sticky");
    }
};

arr.onclick = ()=>{
    document.getElementById("slide-conteiner").style.height= "0";
};

new_post.onclick = ()=>{
    document.getElementById("slide-conteiner").style.height= "100%";
};

post.onclick = ()=>{
    document.getElementById("slide-conteiner").style.height= "100%";
};

function textAreaAdjust(o) {
    o.style.height = "60px";
    o.style.height = (25+o.scrollHeight)+"px";
    proverka(o);
}

dell_ph.onclick =()=>{
    document.getElementById("output_image").src = "";
    document.getElementById("X").style.opacity = "0";
    document.getElementById("dell-image").disabled = true;
    image_flag = false;
};
