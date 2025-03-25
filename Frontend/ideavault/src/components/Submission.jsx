function Submission(){
    return (
        <form method="POST">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" required/>
            <label htmlFor="link">Project link :</label>
            <input type="url" id="link"  required placeholder="https://example.com"/>
            <button type="submit">Submit</button>
        </form>
        
    )
}
export default Submission