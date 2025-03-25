
function Registration(){
    return (
        <div>
         <form method="POST">
          <h1 className="heading"> Project Registration Form</h1>
          <label htmlFor="Username"> Name</label>
          <input type="text" id="Username" required/>
          <br/>
          <label htmlFor="URN">URN</label>
          <input type="text" id="URN" required/>
          <label htmlFor="Batch"> Select Batch</label>
          <select id="Batch" required>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          <br/>
          <label htmlFor="Project">Project Name:</label>
          <input id="Project" type="text" required/>
          <br/>
          <label htmlFor="description">Project Description</label><textarea id="description" required></textarea>
          <br/>
          <button type="submit">submit</button>
    
    
          
         </form>
        
         </div>
         
      )
}
export default Registration