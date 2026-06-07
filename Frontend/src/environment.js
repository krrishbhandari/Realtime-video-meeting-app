let IS_PROD = true;

const servers= IS_PROD?
 "https://realtime-video-meeting-app.onrender.com" : "http://localhost:8080"

export default servers;