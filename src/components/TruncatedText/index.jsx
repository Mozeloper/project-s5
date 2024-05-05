
const TruncatedText = ({ text=15, maxLength }) => {
  // Check if the text length is greater than the maximum length
  if (text.length > maxLength) {
    // Truncate the text to the maximum length and add ellipsis
    const truncatedText = text.slice(0, maxLength) + '...';
    return <div className="font-medium text-gray-900 cursor-pointer" title={text}>{truncatedText}</div>;
  } else {
    // Return the original text if it's not longer than the maximum length
    return <div className="font-medium text-gray-900 cursor-pointer" >{text}</div>;
  }
}

export default TruncatedText;