const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropDown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropDown){
    for(let currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText= currcode;
        newOption.value =currcode;
        if(select.name === "from" && currcode==="USD"){
            newOption.selected ="selected";
        }else if(select.name === "to" && currcode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change" , (evt) =>{
        updateFlag(evt.target);
    });

};
const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtval= amount.value;
    if(amtval === "" || amtval < "1"){
        amtval = 1;
        amount.value = "1";
    };
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.min.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
        let finalAmount = amtval * rate;
        msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`
}
const updateFlag =(element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
btn.addEventListener("click",async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load",() => {
    updateExchangeRate();
})
