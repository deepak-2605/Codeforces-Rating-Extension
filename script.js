function handlevalue(){
    let inputValue=document.getElementById("handle").value;
    return inputValue;
}
let ratingchangechecker;
submit.addEventListener("click",function(event){
    let handlename=handlevalue();
    fetchdatacontinously(handlename);
    ratingchangechecker=setInterval(fetchdatacontinously(handlename),5000)
});
window.addEventListener('keypress',function(e){
    // console.log("hjk");
    if(e.key==='Enter'){
        let handlename=handlevalue();
        fetchdatacontinously(handlename);
        ratingchangechecker=setInterval(fetchdatacontinously(handlename),5000)
    }
})
function fetchdatacontinously(handlename){
    fetch(`https://codeforces.com/api/user.rating?handle=${handlename}`).then((response)=>{
        if(response.ok){
            return response.json();
        }
        throw new Error("Something went wrong");
    })
    .then((userdata)=>{
        console.log(userdata);
        console.log("Hello");
          container.innerHTML=`<p id="oldrating"></p>
          <p id="newrating"></p>
          <p id="timestamp"></p>`
                 oldrating.innerText="Old Rating:";
                //  console.log(userdata.result.length);
        
                 oldrating.innerText+=userdata.result[userdata.result.length-1].oldRating;
        
                newrating.innerText="New Rating:"
                 newrating.innerText+=userdata.result[userdata.result.length-1]["newRating"];
                 var time=userdata.result[userdata.result.length-1]["ratingUpdateTimeSeconds"];
                 time+="000"
                 console.log(time);
                 time=Number(time)+19800000;
                 var presentime=new Date().getTime();
                 console.log(presentime);
                 console.log(time);
                 var timepassed=Number(presentime)-Number(time);
                 if(timepassed>=0&&timepassed<=10000){
                    alert("Rating changes took place");
                    clearInterval(ratingchangechecker);
                 }
                 var text="Rating was updated ";
                 console.log(timepassed/3600000);
                 var days=timepassed/86400000;
                 if(Math.floor((days))>0){
                    var e=Math.floor((days));
                      text+=`${e} days ago `;
                 }
                 else if(Math.floor((timepassed)/3600000)>0){
                    var a=Math.floor((timepassed)/3600000);
                    text+=`${a} hours and `;
                    var b=timepassed-a*(3600000);
                    b=Math.floor(b/60000);
                    text+=`${b} minutes ago. `
                 }
                 console.log(text);
                 timestamp.innerText=text;
    })
    .catch((error)=>{
        // clearInterval(ratingchangechecker);
        container.innerText="Handle doesn't exist."
    })
}
