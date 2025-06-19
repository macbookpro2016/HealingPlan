function emotionAnalysis(text) {
  if (text.includes("难过") || text.includes("伤心") || text.includes("痛苦")) {
    return {
      emotion: "悲伤",
      suggestion: "不妨找朋友倾诉一下，或者听一些舒缓的音乐"
    };
  }
  return {
    emotion: "未知",
    suggestion: "继续记录，让心情更清晰"
  };
}

module.exports = emotionAnalysis;