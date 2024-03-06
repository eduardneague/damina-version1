const LoadingAnimation = () => {
  return (
    <div className = "flex items-center space-x-2 ">
        <div className = "w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-green-900 animate-pulse"></div>
        <div className = "w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-green-900 animate-pulse delay-75"></div>
        <div className = "w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-green-900 animate-pulse delay-150"></div>
    </div>
  )
}

export default LoadingAnimation