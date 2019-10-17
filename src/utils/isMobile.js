function isMobile() {
  if (typeof window === `undefined`) {
    return null
  } else {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }
}

export { isMobile }
