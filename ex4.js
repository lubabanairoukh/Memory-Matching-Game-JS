
const errorElement=document.createElement("div");
errorElement.innerText="Number of cards (rows X columns) must be even, please correct your choice.";
errorElement.classList.add("text-danger");
errorElement.id="error-element";


const STRINGFLIPPICTURES="flipPics";
const STRINGINVISIBLE="d-none";


document.addEventListener('DOMContentLoaded', function()
{


    initElement.formR().addEventListener("change",()=>handleForm.checksizeTablePics(initElement.formR()));
    initElement.formC().addEventListener("change",()=>handleForm.checksizeTablePics(initElement.formC()));

    document.getElementById("buttonSettings").addEventListener("click",()=>handleForm.formSettings());

    document.getElementById("buttonPlay").addEventListener("click",(ele)=>{

        ele.preventDefault();
        if(!PublicFuncs.validateSize() ||  !PublicFuncs.checkName() )
            return;

        handleEndFormStartGame.hideForm();
        handleEndFormStartGame.initGame();

        [...document.getElementsByClassName("img-card")].forEach(element => {
            element.addEventListener("click",()=>handleGame.handleClickPic(element))

        } )
    });
    document.getElementById("backtomenu").addEventListener("click" ,()=>handleGame.returnMain(true));

    document.getElementById("okbutton").addEventListener("click",()=>winTheGame.fromhightomenu());
})


let initElement = (()=>
{
    const rowsSize = ()=>
    {

        return document.getElementById("formSelectRows").value;
    }

    const colsSize= ()=>
    {
        return document.getElementById("formSelectCols").value;
    }
    const selectRow = ()=>
    {
        return document.getElementById("formSelectRows");
    }
    const selcetCol = ()=>
    {
        return document.getElementById("formSelectCols");
    }
    const secDelay=()=>
    {
        return document.getElementById("formSelectDelay").value;
    }

    let counterFP= ()=>
    {
        return document.getElementsByClassName(STRINGFLIPPICTURES).length;
    }

    let flipedPics=()=>
    {
        return document.getElementsByClassName("fliped").length;
    }

    let tableOfPics =()=>
    {
        return document.getElementById("tablePic");
    }

    let highscorebody=()=>
    {
        return document.getElementById("highscorebody");
    }
    return {
        sizeR:rowsSize,
        sizeC:colsSize,
        formR:selectRow,
        formC:selcetCol,
        delaySec:secDelay,
        counterFP:counterFP,
        flipedPics:flipedPics,
        tableOfPics:tableOfPics,
        highscorebody:highscorebody,
    }
})()



const handleForm = (function () {



        let checksizeTablePics=(ele)=>
        {
            if(PublicFuncs.validateSize()){
                if(errorElement.parentElement !== null){
                    errorElement.parentElement.removeChild(errorElement);
                }
            }
            else
                ele.insertAdjacentElement('afterend',errorElement);
        }

        let formSettings = ()=>
        {
            PublicFuncs.toggleHideFun(document.getElementById("settingsForm"));
        }


        return {
            checksizeTablePics:checksizeTablePics,
            formSettings:formSettings,
        }
    }
)()


const handleEndFormStartGame =( ()=>
{

    let hideForm = ()=>
    {
        PublicFuncs.toggleHideFun(document.getElementById("menuGame"));
    }


    let initGame = ()=>
    {
        PublicFuncs.toggleHideFun(document.getElementById("game"));
        let tablePics=initElement.tableOfPics();

        for(let i=0; i<initElement.sizeR() ;i++)
        {
            let newTableRow=document.createElement("tr");
            for(let y=0; y<initElement.sizeC();y++)
            {
                let tableD=document.createElement("td");
                tableD.appendChild(PublicFuncs.initCardPic());
                tableD.appendChild(PublicFuncs.initNPic());

                newTableRow.appendChild(tableD);
            }
            tablePics.appendChild(newTableRow);
        }

    }


    return {
        hideForm:hideForm,
        initGame:initGame,
    }
})()



let handleGame = (()=>
{
    let handleClickPic= (ele) =>
    {

        if(initElement.counterFP() >= 2)
            return;
        else
        {
            PublicFuncs.addscore();
            document.getElementById("steps").innerHTML=`Steps: ${PublicFuncs.returnsteps()}`;
            PublicFuncs.toggleHideFun(ele);
            PublicFuncs.toggleHideFun(ele.nextElementSibling);
            ele.nextElementSibling.classList.toggle(STRINGFLIPPICTURES);
            if(initElement.counterFP() == 1)
                return;
            else
            {
                let arr = document.getElementsByClassName(STRINGFLIPPICTURES);
                if(!handleGame.matchPics(arr[0],arr[1]))
                {
                    handleGame.switchPics(arr);
                }
                else{
                    handleGame.changeClassList(arr);
                }
            }
        }

        if(initElement.flipedPics() ===  (initElement.sizeR() *initElement.sizeC()))
        {
            PublicFuncs.toggleHideFun(document.getElementById("game"));
            winTheGame.setModals();
            PublicFuncs.toggleHideFun(document.getElementById("highscore"));
        }
    }


    let matchPics= (firstPic, secPic)=>
    {
        if(firstPic.src === secPic.src)
            return true;
        return false;
    }


    let changeClassList= (arr) =>
    {
        [...arr].forEach(element=>
        {
            element.classList.toggle(STRINGFLIPPICTURES);
            element.classList.toggle("fliped");
        })

    }

    let switchPics =(arr)=>
    {

        setTimeout( ()=>{ [...arr].forEach(element=>
        {
            PublicFuncs.toggleHideFun(element.previousElementSibling);
            element.classList.toggle(STRINGFLIPPICTURES);
            PublicFuncs.toggleHideFun(element);

        })
        }, (1000 * initElement.delaySec()));
    }



    let returnMain = (ele)=>
    {


        let size=initElement.tableOfPics().rows.length;
        for(let i=0 ; i<size ;i++)
        {
            initElement.tableOfPics().deleteRow(0);
        }
        if(ele)
            PublicFuncs.toggleHideFun(document.getElementById("game"));
        PublicFuncs.toggleHideFun(document.getElementById("menuGame"));
        PublicFuncs.arrret();
        PublicFuncs.resetScore();

        while(initElement.highscorebody().hasChildNodes())
        {
            initElement.highscorebody().removeChild(initElement.highscorebody().firstChild);
        }

        document.getElementById("steps").innerHTML=`Steps: ${PublicFuncs.returnsteps()}`;
    }

    return {
        handleClickPic:handleClickPic,
        matchPics,matchPics,
        switchPics,switchPics,
        changeClassList,changeClassList,
        returnMain:returnMain,
    }

})()


let winTheGame = (()=>
{
    let setModals =()=>
    {
        document.getElementById("cardsplayed").innerHTML=`Number of cards played: ${(initElement.sizeR() *initElement.sizeC())}`;
        addNewPlayer();
        let rowsmodal=document.getElementById("modalscore").getElementsByTagName("tr");
        if(rowsmodal.length < 3)
        {
            for(let i=0 ; i<rowsmodal.length ;i++)
            {
                initElement.highscorebody().appendChild(rowsmodal[i].cloneNode(true));
            }
            let size= 3 - rowsmodal.length;
            for(let i=3-size ; i<3;i++)
            {
                let newRow= document.createElement("tr");
                let newH=document.createElement("th");
                newH.scope="row";
                newH.innerHTML=i+1;
                newRow.appendChild(newH);
                for(let y=0 ;y<2;y++)
                {
                    let f=document.createElement("td");
                    newRow.appendChild(f);
                }
                initElement.highscorebody().appendChild(newRow);
            }
        }
        else
        {
            for(let i=0 ; i <3;i++)
            {
                initElement.highscorebody().appendChild(rowsmodal[i].cloneNode(true));
            }
        }
        let arrTop=[];
        for(let i=0 ; i<initElement.highscorebody().rows.length;i++)
        {
            arrTop.push(initElement.highscorebody().getElementsByTagName("tr")[i].getElementsByTagName("td"));
        }
        let playerInRank=false;
        for(let i=0 ; i<arrTop.length ;i++)
        {
            if((arrTop[i][0].innerHTML === document.getElementById("userName").value.trim()) && arrTop[i][1].innerHTML === `${((initElement.sizeR() *initElement.sizeC())/PublicFuncs.returnsteps())*50}`){
                playerInRank=true;
                document.getElementById("scoreWithRank").innerHTML=`Score:${arrTop[i][1].innerHTML}. You are ranked ${i+1} out of 3`;
            }

        }
        if(!playerInRank)
            document.getElementById("scoreWithRank").innerHTML=`Score:${((initElement.sizeR() *initElement.sizeC())/PublicFuncs.returnsteps())*50}. You are not in top ranks`;
    }

    let fromhightomenu = ()=>
    {
        handleGame.returnMain(false);
        PublicFuncs.toggleHideFun(document.getElementById("highscore"));
    }

    let addNewPlayer =()=>
    {
        let rowsmodal1=document.getElementById("modalscore").getElementsByTagName("tr");
        let newRow1= document.createElement("tr");
        let newH1=document.createElement("th");
        newH1.scope="row";
        newH1.innerHTML=rowsmodal1.length + 1;
        newRow1.appendChild(newH1);


        let tabled1=document.createElement("td");
        tabled1.innerHTML=document.getElementById("userName").value.trim();
        newRow1.appendChild(tabled1);

        let tabled2=document.createElement("td");
        let newscore=((initElement.sizeR() *initElement.sizeC())/PublicFuncs.returnsteps())*50;
        tabled2.innerHTML=newscore;
        tabled2.classList.add="scoreid";
        newRow1.appendChild(tabled2);
        document.getElementById("modalscore").appendChild(newRow1);

        let newarraytoinput=newRow1.getElementsByTagName("td");

        let arrayrows=document.getElementById("modalscore").getElementsByTagName("tr");

        if(arrayrows.length !==0 ){

            let arraytd=[];
            for(let i=0 ; i<arrayrows.length;i++)
                arraytd.push(arrayrows[i].getElementsByTagName("td"));
            for(let i= 0 ;i<arraytd.length ;i++)
            {
                if(newscore > arraytd[i][1].innerHTML)
                {
                    for(let y=arrayrows.length-1; y > i ;y-- )
                    {

                        document.getElementById("modalscore").getElementsByTagName("tr")[y].getElementsByTagName("td")[0].innerHTML=arraytd[y-1][0].innerHTML;
                        document.getElementById("modalscore").getElementsByTagName("tr")[y].getElementsByTagName("td")[1].innerHTML=arraytd[y-1][1].innerHTML;

                    }
                    document.getElementById("modalscore").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML= document.getElementById("userName").value.trim();
                    document.getElementById("modalscore").getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML= newscore;
                    break;
                }
            }
        }
    }



    return {
        setModals:setModals,
        fromhightomenu:fromhightomenu,
    }
})()


let PublicFuncs = (()=>
{
    const arr=new Array(((initElement.sizeR()*initElement.sizeC())/2)).fill(0);
    let score=0;

    let x=()=>{
        let x=Math.floor(Math.random()*((initElement.sizeR()*initElement.sizeC())/2));

        while(arr[x]==2)
        {
            x=Math.floor(Math.random()*((initElement.sizeR()*initElement.sizeC())/2));
        }
        return x;
    }

    let validateSize= ()=>
    {
        if((initElement.sizeR() * initElement.sizeC()) % 2 === 0){
            return true;
        }
        return false;
    };

    let initImg =()=>
    {
        let imageE =document.createElement("img");
        imageE.classList.add("img-thumbnail");
        return imageE;
    }

    let initCardPic = ()=>
    {
        let cardImage =PublicFuncs.initImg();
        cardImage.classList.add("img-card");
        cardImage.src="resources/card.jpg";
        return cardImage;
    }

    let initNPic = ()=>
    {
        let norPic =PublicFuncs.initImg();
        norPic.classList.add("picture");
        let x=PublicFuncs.x();
        arr[x]++;
        norPic.src=`resources/${x}.jpg`;
        PublicFuncs.toggleHideFun(norPic);
        norPic.classList.add(STRINGINVISIBLE);
        return norPic;
    }

    const resetarr = ()=>
    {
        arr.fill(0);
    }
    let resetScore=()=>
    {
        score=0;
    }
    let returnsteps=()=>
    {
        //score++;
        return score;
    }
    let addscore= ()=>
    {
        score++;
    }

    let toggleHideFun= (ele)=>
    {
        ele.classList.toggle(STRINGINVISIBLE);
    }


    let checkName = ()=>
    {
        let name=document.getElementById("userName").value.trim();
        if(/^[A-Za-z0-9]*$/.test(name) && name.length > 0 && name.length <= 12)
            return true;
        return false;
    }
    return {
        x:x,
        initImg:initImg,
        validateSize: validateSize,
        initCardPic:initCardPic,
        initNPic:initNPic,
        arrret:resetarr,
        resetScore:resetScore,
        returnsteps:returnsteps,
        checkName:checkName,
        toggleHideFun:toggleHideFun,
        addscore:addscore,
    }
})()
