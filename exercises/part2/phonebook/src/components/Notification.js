const Notification = ({ message, status }) => {
    const fontColor = status === 'success' ? 'green' : 'red'
    const notificationStyle = {
      color: fontColor, 
      background: "lightgray",
      fontstyle: 'italic', 
      fontSize: 20, 
      borderStyle: 'solid', 
      borderRadius: 5,
      padding: 10, 
      marginBottom: 10,
    }
  
    if (message === null) { 
      return null
    } 
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  export default Notification