var dataPull = (function(){

  var contentHouse = document.querySelector('.content-house')
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

//AJAX requests
  if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  }

  httpRequest.open('GET', 'http://www.reddit.com/r/AdviceAnimals/.json', true);
  httpRequest.send(null);

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === HTTP_DONE) {
      if (httpRequest.status === HTTP_STATUS_OK) {
        var res = JSON.parse(httpRequest.responseText);
        setDataVariables(res);
      } else {
        throw new Error('There was a problem with the request.');
      }
    }
  }


//Assign variable to all the incoming data

  function setDataVariables (res){
    for (var i = 0; i < res.data.children.length; i++) {

      dataPermalink = res.data.children[i].data.permalink;
      image = res.data.children[i].data.url;
      title = res.data.children[i].data.title;
      author = res.data.children[i].data.author;
      creation = res.data.children[i].data.created_utc;
      views = res.data.children[i].data.score;

      checkData(dataPermalink, image, title, author, creation, views)

    };
  }

//data validation

  function checkData(dataPermalink, image, title, author, creation, views){

    if(image.indexOf('/imgur') > -1 && image.indexOf('.jpg') === -1){
      image = image.replace('/imgur', '/i.imgur')
      image = image + '.jpg';
    }

    if(image.indexOf('imgflip.com/i/') > -1 && image.indexOf('.jpg') === -1){
      image = image.replace('imgflip.com/i/', 'i.imgflip.com/')
      console.log('link', image)
      image = image + '.jpg';
      console.log('jpg', image)
    }


    dataGrabCreate(dataPermalink, image, title, author, creation, views)
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
    console.log('whats passed in', image)
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
    contentHouse.innerHTML = "";
    httpRequest.open('GET', 'http://www.reddit.com/r/AdviceAnimals/.json', true);
    httpRequest.send(null);
  }

  var randomClick = function (){
    contentHouse.innerHTML = "";
    httpRequest.open('GET', 'http://www.reddit.com/r/AdviceAnimals/.json', true);
    httpRequest.send(null);
  }

  var getTheAppClick = function (){
    contentHouse.innerHTML = "";
    httpRequest.open('GET', 'http://www.reddit.com/r/AdviceAnimals/.json', true);
    httpRequest.send(null);
  }

  document.querySelector('#random-nav').addEventListener('click', myBoardsClick);
  document.querySelector('#my-boards-nav').addEventListener('click', randomClick);
  document.querySelector('#get-the-app').addEventListener('click', getTheAppClick);

  return {
    myBoardsClick : myBoardsClick,
    randomClick : randomClick,
    getTheAppClick : getTheAppClick
  }

})();