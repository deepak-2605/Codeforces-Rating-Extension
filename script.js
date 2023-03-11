function handlevalue(){
    let inputValue=document.getElementById("handle").value;
    return inputValue;
}
submit.addEventListener("click",function(event){
    let handlename=handlevalue();
    fetchdatacontinously(handlename);
});
function fetchdatacontinously(handlename){
    fetch(`https://codeforces.com/api/user.rating?handle=${handlename}`).then(data=>data.json()).then(userdata=>
    {
         oldrating.innerText="Old Rating:";
        //  console.log(userdata.result.length);

         oldrating.innerText+=userdata.result[userdata.result.length-1].oldRating;

         oldrating.innerText+="New Rating:"
         oldrating.innerText+=userdata.result[userdata.result.length-1]["newRating"];
         var time=userdata.result[userdata.result.length-1]["ratingUpdateTimeSeconds"];
         time+="000"
         console.log(time);
         time=Number(time)+19800000;
         var presentime=new Date().getTime();
         console.log(presentime);
         console.log(time);
         var timepassed=Number(presentime)-Number(time);
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
         oldrating.innerText+=text;
    })

   
}
