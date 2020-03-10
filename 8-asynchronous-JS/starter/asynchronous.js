

document.querySelector('h1').addEventListener('click', async function getAPI(){
    var objData = new Map();

    const result = await fetch('https://randomuser.me/api/');
    const data = await result.json();

    objData.set('Gender', data.results[0].gender);

    console.log(data.results[0]);

    document.querySelector('h1').textContent = objData.get('Gender')
    setTimeout((resolve, reject) =>{
        console.log('GG');
    }, 2000);

});


