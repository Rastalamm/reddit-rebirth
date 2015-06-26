window.onload = function (){
  dataPull.getMeTheData('http://www.reddit.com/r/all.json')

}

var dataPull = (function(){

  var contentHouse = document.querySelector('.content-house');
  var dataPermalink;
  var image;
  var title;
  var author;
  var views;
  var creation;
  var HTTP_UNSENT = 0;
  var HTTP_OPENED = 1;
  var HTTP_HEADERS_RECV = 2;
  var HTTP_LOADING = 3;
  var HTTP_DONE = 4;
  var HTTP_STATUS_OK = 200;
  var HTTP_STATUS_NOT_FOUND = 404;
  var HTTP_STATUS_SERVER_ERROR = 500;
  var HTTP_GET = 'GET';
  var httpRequest;



//fucntion to get the data
function getMeTheData(jsonSource) {

  $.ajax({
    method: 'GET',
    url: (jsonSource),
    dataType: 'json'
  })
  .done(function(res) {
    setDataVariables(res);
  })
  .fail(function() {
    throw new Error('There was a problem with the request.');
  })
  .always(function() {
    //Always update the UI with status
  });
}


//Assign variable to all the incoming data

  function setDataVariables (res){

    for (var i = 0; i < res.data.children.length; i++) {

      dataPermalink = res.data.children[i].data.permalink;

      if(res.data.children[i].data.preview){
         image = res.data.children[i].data.preview.images[0].source.url;
      }else{
        image = 'https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.ytimg.com%2Fvi%2Fp2H5YVfZVFw%2Fmqdefault.jpg&f=1';
      }

      title = res.data.children[i].data.title;
      author = res.data.children[i].data.author;
      creation = res.data.children[i].data.created_utc;
      views = res.data.children[i].data.score;

      dataGrabCreate(dataPermalink, image, title, author, creation, views)

    };
  }


//Function to populate the board
  function dataGrabCreate(dataPermalink, image, dataTitle, author, creation, views){

    var linkOut = document.createElement('a');
    linkOut.setAttribute('href', 'http://www.reddit.com' + dataPermalink );
    linkOut.setAttribute('target', '_blank' + dataPermalink );
    contentHouse.appendChild(linkOut);

    var articleHouse = document.createElement('div');
    articleHouse.setAttribute('class', 'article-house');
    linkOut.appendChild(articleHouse);

    var articlePic = document.createElement('div');
    articlePic.setAttribute('class', 'article-pic');
    articlePic.style.backgroundImage = image;
    articlePic.style.backgroundSize = 'cover';
    articleHouse.appendChild(articlePic);

    var articlePicImage = document.createElement('img');
    articlePicImage.setAttribute('src', image);
    articlePicImage.setAttribute('opacity', '0');
    articlePicImage.setAttribute('width', '275px');
    articlePicImage.setAttribute('height', '170px');
    articlePic.appendChild(articlePicImage)

    var title = document.createElement('h1');
    title.innerHTML = dataTitle;
    articleHouse.appendChild(title);

    var ulListStart = document.createElement('ul');
    articleHouse.appendChild(ulListStart);

    var authorList = document.createElement('li');
    authorList.innerHTML = author;
    ulListStart.appendChild(authorList);

    var ageList = document.createElement('li');
    ageList.innerHTML = moment(creation, "DD").fromNow();
    ulListStart.appendChild(ageList);

    var viewsList = document.createElement('li');
    viewsList.innerHTML = (views + ' views');
    ulListStart.appendChild(viewsList);

    var description = document.createElement('p');
    description.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ipsam, facilis suscipit maiores nostrum pariatur.'
    articleHouse.appendChild(description);
  }

//Click functions
  var myBoardsClick = function (){
    console.log('boards click');
    contentHouse.innerHTML = "";
    getMeTheData('http://www.reddit.com/r/reallifedoodles.json');

  }

  var randomClick = function (){
    contentHouse.innerHTML = "";
    getMeTheData('http://www.reddit.com/r/AdviceAnimals/.json');
  }

  var getTheAppClick = function (){
    contentHouse.innerHTML = "";
    getMeTheData('http://www.reddit.com/r/funny/.json');
  }

  document.querySelector('#nav-1').addEventListener('click', myBoardsClick);
  document.querySelector('#nav-2').addEventListener('click', randomClick);
  document.querySelector('#nav-3').addEventListener('click', getTheAppClick);

  return {
    getMeTheData : getMeTheData,
    myBoardsClick : myBoardsClick,
    randomClick : randomClick,
    getTheAppClick : getTheAppClick
  }

})();