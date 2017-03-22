/**
 * Created by mashenjun on 22-3-17.
 */
document.getElementById("submit").onclick = function () {
        var xmlhttp = null;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xmlhttp!=null)
    {
        var title = document.getElementById('quantity').value;
        var catalogue = '';
        var text = '';
        var img_url = [];
        var video_url = [];
        var audio_url = [];
        var author = '';
        serverUrl = '../OSSgetsig/'
        xmlhttp.open( "GET", serverUrl, false );
        xmlhttp.send(JSON.stringify({title:title, catalogue:catalogue, text:text, img_url:img_url, video_url: video_url, audio_url: audio_url, author:author }));
        return xmlhttp.responseText
    }
    else
    {
        alert("Your browser does not support XMLHTTP.");
    }

    alert('hello!');

};