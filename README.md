<h1>Create React app with electron
<H2>Setting cra with electron</h2>
1.link for setup cra with electron-
<b><a>https://dev.to/mandiwise/electron-apps-made-easy-with-create-react-app-and-electron-forge-560e?fbclid=IwAR0bH_6umWb6JlBRhDC78lUWmUaltaz7JIqbgUsrqbMTG4Z9x7jDMc-CQjw"</a></b>



2.<b>Issue with "BROWSER" is not recognized as an internal or external command :</b>
Solution:
<b>https://stackoverflow.com/questions/58736319/how-to-fix-browser-is-not-recognized-as-an-internal-or-external-command?fbclid=IwAR2bAcC0PIKd7XBL9SC3ZXfdKSNtPyDgM3FefiiAXhejb-4ltExGKoJQ94w</b>

3.**Issue with TypeError:fs.exsistsSync is not a function**. This error exist when you import electron in your react components (webpack restriction with CRA).
<b>Solution how to fix this</b>
<b><a>https://github.com/yhirose/react-typescript-electron-sample-with-create-react-app-and-electron-builder/issues/7?fbclid=IwAR1f1FAGbVGT3C5nsRgQJIlWbG0LiolszXYeovy0VTe5YHrJZPqhsBM0YsQ</a></b>

<h2>How to start the application</h2>
 - clone the repo<br/>
 - npm install<br/>
 - npm run dev
 
 <h2>Explanation of architecture of app</h2>
 This is a simple poc aplication with React.js to work on Desktop with a help of Electron.
 
 - Users Can write simple blogpost
 - Users are notified about their blogs through native electron notification api.
 
<b>How renderer processes and main process communicate between ?</b>

-<b>Answer is through IPC</b>

-Main process uses ipcMain.on() method to add event listener on some action, from React.js application i call this method with help of electron.ipcRenderer.send() method to send message to main process.

<b> Main Process (i called this electron.js into app)</b>
i used ipcMain.on('send_message',(evt,arg) => {
	showNotification(arg)
}) 
this is an event listener to listen on events which is triggered from React.app(in this case into a App.js)
when this event is triggered callback function will return ShowNotification function with text passed from react component in this case <b>arg</b> object.

example from showNotification
function showNotification (text) {
	const notification = {
	title:'Notification about your blog post',
	body:`${text}	
}
new Notification(notification).show()
}
<b>To use notification from electron api's  we need first import Notification from electron</b>

How this works on the other side(App.js - react.js component)
first i imported 
<b>const electron = window.require('electron');</b>
why i use window.require ?
answer is  above **Issue with TypeError:fs.exsistsSync is not a function**

<b>sending data to main process</b>
on line 64 in app.js i sending message( in this case 'string' as a second argument of electron.ipcRenderer.send method, as first argument is a typo of event listener which able us to call from main process)
