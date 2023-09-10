

let search=document.getElementById("nav-main-searchbar");

let search_placeholder="Search \"Medical Kits\" , \"Hiking equipement\", \"Camping gear\"";

function typing()
{
    let placholder="";
    let x=0;

    search.setAttribute('placeholder',"");

    let interval=setInterval(()=>
    {
        placholder_=search_placeholder[x++];

        search.setAttribute('placeholder',placeholder);
        if(x>search_placeholder.length-1)
        {
            clearInterval(interval);
        }
    })
}

typing();