const NotifikasiCoba = () => {

  const { Notification } = window;

  function notifyMe() {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    }

    if (Notification && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    if (Notification && Notification.permission === "granted") {
      //callback api notifikasi

      new Notification("Hi there!");
    }
  }


  return (
    <div>
      <h1>test</h1>
      <button onClick={() => notifyMe()}>Notify me!</button>

    </div>
  )

}

export default NotifikasiCoba