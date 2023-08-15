const errorHandler = {
  general: (err, req, res, next) => {
    if (err instanceof Error) {
      return res.status(err.status || 500).json({ status: 'error', message: `${err.message}` })
    }
    return res.status(500).json({ status: 'error', message: `${err}` })
  },
  jwt: () => {
    
  }
}

module.exports = errorHandler