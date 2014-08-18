/* create xmlhttp request object and return xml document */
function getXmlDoc(name)
{
  var xhttp = null;
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xhttp=new XMLHttpRequest();
  }
  else if (window.ActiveXObject) {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  if (xhttp) {
     xhttp.open("GET",name,false);
     xhttp.send("");
     return xhttp.responseXML;
  }
  
  return null;
}


// copy attributes from one object to another
function copyAttributes(x,inX)
{
  // xmlDoc
  for (i=0;i< inX.attributes.length;i+=1) {
    //alert(i+":"+inX.attributes[i].name+"="+inX.attributes[i].value);
    x.setAttribute(inX.attributes[i].name,inX.attributes[i].value);
  }
}

// copy xml object as child into html element
function insertInto(myDoc,xmlDoc)
{
  if (!myDoc || !xmlDoc) {
    //alert("Faild:"+myDoc+":"+xmlDoc);
    return false;		
  }
// xmlDoc
  var inChild = xmlDoc.firstChild;
  if (inChild) {
    var child;
    do {
      if (inChild.nodeType==1) { // Element
	if (inChild.nodeName!="img") {
	  child = document.createElement(inChild.nodeName);
	  copyAttributes(child,inChild);
	  insertInto(child,inChild);
	}
      }
      else if (inChild.nodeType==3) { // Text 
	child = document.createTextNode(inChild.nodeValue);
      }
      myDoc.appendChild(child);
      
    } while (inChild = inChild.nextSibling) ;
  }
  return true;
}

// add a image map if available
function AddMappings() {
  re=/(mapped_.*).png/ 
  for (var i= 0;i<document.images.length;++i) {
    img=document.images.item(i);
    m=img.src.match(re);
    if (m) {
      pre = m[1];
      img.setAttribute('usemap',"#GraffleExport");
      xmlDoc=getXmlDoc(pre+".xml");
      if (xmlDoc) {
	mother = img.parentElement;
	insertInto(mother,xmlDoc.documentElement);
      }
    }
  }

}

// helper for HighlightCurrentTask()
function TestIfTask(key,level) {
  //   var key = ".."+ m[0]+"index.html";
  uls = document.getElementsByTagName("ul");
  for (var k=0;k<2;k++) {
    if (k&level) continue;
    var ul=uls.item(k);
    items=ul.getElementsByTagName("li");
    for (var i=0; i<items.length; i++) {
      li=items[i];
      var a=li.childNodes[0];
	  var href = a.getAttribute("href");
	  //	  alert(href);
	  if (href==key || href=="../"+key) {
            li.setAttribute("class","current");
	    level+=k;
	    break;
	  }
	  
    }
  }
  return level;
}

function HighlightCurrentTask() 
{
  DoHighlightCurrentTask();
  AddMappings();
}

// highlight tab with current file or at least current path
function DoHighlightCurrentTask() 
{
  var l=0;
  var path = location.pathname;
  var re = new RegExp("/task.[abcdefg]{0,1}(/.*html)");
  m = path.match(re);
  if (m) {
	//	alert("key : .."+m[1]);
	l = TestIfTask(".."+m[1],l);

        var key = ".."+ m[0];
	//	alert("key : "+key);
        l = TestIfTask(key,l);
  }

  re = new RegExp("/task.[abcdefg]/");
  m = path.match(re);
  if (m) {
    var key = ".."+ m[0]+"index.html";
    //	alert("key : "+key);
    l=TestIfTask(key,l);
  }

  re = new RegExp("/task./");
  m = path.match(re);
  if (m) {
    var key = ".."+ m[0]+"index.html";
    //	alert("key : "+key);
    l = TestIfTask(key,l);
  }

  return false;
}
