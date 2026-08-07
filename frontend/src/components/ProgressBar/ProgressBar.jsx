import "./ProgressBar.css";

function ProgressBar({ current = 0 }) {

 const percent = (current / 10) * 100;

 return (

  <div>

   <h3>
    Participantes: {current}/10
   </h3>

   <div className="progress-container">

    <div
      className="progress-fill"
      style={{ width: `${percent}%` }}
    ></div>

   </div>

  </div>

 );
}

export default ProgressBar;