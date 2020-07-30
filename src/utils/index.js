// const feedsTransform = (items, itemsPerRow) => {

//     let rowsCount = Math.ceil(items.length / itemsPerRow);
//     let rows = [];

//     for(let i=0; i < rowsCount; i++) 
//     {   
//         let cols = [];

//         for(let j=0; j < itemsPerRow; j++ ) 
//         {
//             let index = (itemsPerRow * i) + j;
//             let key   = index;
//             let item  = items[index];

//             if( item == undefined ) {
//                 const error = { len: items.length, index, key, item };
//                 console.log(error);
//             }
                

//             cols.push(
//                 <div className="col-md-4 mb-1">
//                     <RSSFeedCard key={'card_' + key} id={index} title={item.title} content={item.content} href={item.link}/>
//                 </div>
//             )
//         }

//         rows.push(cols);
//     }

//     return rows;
// }


export const readFile = (file, callback) => {

    // Check if the file is an image.
    // if (file.type && file.type.indexOf('image') === -1) {
      
    //   return;
    // }

    console.log(file.type, file);
  
    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
      callback(event.target.result);
    });

    reader.readAsText(file);

    //reader.readAsDataURL(file);
}


export const downloadFile = (data, fileName, type='text/plain;charset=UTF-8') => {

    // создаем невидимый элемент ссылки
    const a = document.createElement('a');
    a.style.display = 'none';
    document.body.appendChild(a);
    

    // в качестве данных для загрузки из ссылки устанавливаем данные из формы
    a.href = URL.createObjectURL(
        new Blob([data], {type})
    );
    
    // аттрибут download ссылки используется для загрузки файла
    a.setAttribute('download', fileName);

    // запускаем загрузку путем эмулирования нажатия клавиши
    a.click();

    // удаляем ссылку из DOM
    document.body.removeChild(a);
}


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export const isEmpty = (obj) => {

    if( Array.isArray(obj) )
        return obj.length === 0;

    return Object.keys(obj).length === 0;
}


export const randomString = (len = 8) => {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    ).substring(0,len);
}

