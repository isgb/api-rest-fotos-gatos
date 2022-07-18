const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=4';

const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=470e24e8-de87-4d54-9c66-5f450b5a125b';

const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

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

        const btn1 =document.getElementById('btn1');
        const btn2 =document.getElementById('btn2');
        const btn3 =document.getElementById('btn3');
        const btn4 =document.getElementById('btn4');
  
        imgGato1.src = data[0].url;
        imgGato2.src = data[1].url;
        imgGato3.src = data[2].url;
        imgGato4.src = data[3].url;

        btn1.onclick =  () => saveFavoriteMichis(data[0].id);
        btn2.onclick = () => saveFavoriteMichis(data[1].id);
        btn3.onclick =  () => saveFavoriteMichis(data[2].id);
        btn4.onclick = () => saveFavoriteMichis(data[3].id);
    }
}

async function loadFavoritesMichis(){
    const res = await fetch(API_URL_FAVORITES,{
        method: 'GET',
        headers: {
            'X-API-KEY': '470e24e8-de87-4d54-9c66-5f450b5a125b',
        },
    });
    const data =  await res.json();
    console.log('Favorites');
    console.log(data);

    if(res.status !== 200)
    {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }else{

        const section = document.getElementById('favoritesMichis');
        section.innerHTML = "";

        const h1 = document.createElement("h1");
        h1.classList.add("my-4");
        h1.classList.add("fw-bold");
        const h1Text = document.createTextNode('MIS GATOS FAVORITOS');
        h1.appendChild(h1Text);
        section.appendChild(h1);

        data.forEach(michi => {

            const div = document.createElement("div");
            div.classList.add("col-lg-3");
            div.classList.add("col-md-6");
            div.classList.add("col-12");

            const card = document.createElement("div");
            card.classList.add("card");
            card.classList.add("mb-4");

            const cardbody = document.createElement("div");
            cardbody.classList.add("card-body");

            const imgcard = document.createElement("img");
            imgcard.classList.add("img-card");
            imgcard.width= 150;

            const btneliminar = document.createElement("button");
            btneliminar.classList.add("btn-eliminar");
            btneliminar.classList.add("btn");
            btneliminar.classList.add("btn-primary");
            const btnEliminarText = document.createTextNode('Quitar Foto');
            btneliminar.appendChild(btnEliminarText);

            div.appendChild(card);
            card.appendChild(cardbody);
            cardbody.appendChild(imgcard);
            cardbody.appendChild(btneliminar);

            imgcard.src = michi.image.url;
            btneliminar.onclick = () => deleteFavoriteMichis(michi.id);

            section.appendChild(div);
       
        });
    }
}


async function saveFavoriteMichis(id){
    const rest= await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': '470e24e8-de87-4d54-9c66-5f450b5a125b',
        },
        body: JSON.stringify({
            image_id: id
        })
    });

    const data = await rest.json();

    console.log('Save')
    console.log(rest);

    if(rest.status !== 200)
    {   console.log('jola');
        spanError.innerHTML = "Hubo un error: " + rest.status + data.message;
    }else{
        console.log('Michi guardado en favoritos');
        loadFavoritesMichis();
    }
}

async function deleteFavoriteMichis(id){
    const rest= await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': '470e24e8-de87-4d54-9c66-5f450b5a125b',
        },
    });

    const data = await rest.json();

    if(rest.status !== 200)
    {   console.log('jola');
        spanError.innerHTML = "Hubo un error: " + rest.status + data.message;
    }else{
        console.log('Michi eliminado de favoritos');
        loadFavoritesMichis();
    }
}

async function uploadMichiPhoto(){
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'))
  
    const res = await fetch(API_URL_UPLOAD, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'X-API-KEY': 'c08d415f-dea7-4a38-bb28-7b2188202e46',
      },
      body: formData,
    })
    const data = await res.json();
  
    if (res.status !== 201) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      console.log({data})
    } else {
      console.log('Foto de michi subida :)')
      console.log({data})
      console.log(data.url)
      saveFavoriteMichis(data.id);
    }
}

loadRandomMichis();
loadFavoritesMichis();