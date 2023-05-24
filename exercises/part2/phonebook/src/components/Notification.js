const Notification = ({ info }) => {
  if (!info.message) {
    return
  }
  
  const notificationStyle = {
    background: "lightgray",
    fontstyle: 'italic', 
    fontSize: 20, 
    borderStyle: 'solid', 
    borderRadius: 5,
    padding: 10, 
    marginBottom: 10,
  }

  return (
    <div style={notificationStyle}>
      {info.message}
    </div>
  )
}

export default Notification