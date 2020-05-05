/*Notification.requestPermission().then(function(result) {
    console.log(result);
  });

  function spawnNotification(body, icon, title) {
    let options = {
        body: body,
        icon: icon
    };
    let n = new Notification(title, options);
}*/

function notifyMe(body, icon, title) {   // provera da li browser podrzava notifikacije i da li je dao dozvolu
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    }
    else if (Notification.permission === "granted") {
      notify(body, icon, title);
    }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          notify(body, icon, title);
        }
      });
    }
}
    
    function notify(body, icon, title) {
        let options = {
            body: body,
            icon: icon,
        };
        
        let notification = new Notification(title, options);
        notification.onclick = function () {
            window.open("https://github.com/stefank-29");      
        };
        setTimeout(notification.close.bind(notification), 7000); 
    }
  
