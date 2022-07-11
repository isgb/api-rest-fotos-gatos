
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=4';

const spanError = document.getElementById('error');

async function loadRandomMichis(){
    const res = await fetch(API_URL_RANDOM);
    const data =  await res.json();

    console.log('Random');
    console.log(data);
    
    if(res.status !== 200)
    {
        spanError.innerHTML = "Hubo un error: " + res.status;
    }else{
        const imgGato1 =document.getElementById('imgGato1');
        const imgGato2 =document.getElementById('imgGato2');
        const imgGato3 =document.getElementById('imgGato3');
        const imgGato4 =document.getElementById('imgGato4');
  
        imgGato1.src = data[0].url;
        imgGato2.src = data[1].url;
        imgGato3.src = data[2].url;
        imgGato4.src = data[3].url;
    }
}


loadRandomMichis();